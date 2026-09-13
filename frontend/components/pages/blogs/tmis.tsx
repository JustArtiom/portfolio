import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Music, Pause, Play } from "lucide-react";
import { cn } from "@/utils/cn";
import { staggerChild, staggerOnMount } from "@/utils/motion";

// Unlisted demo post. It's deliberately NOT in `blogs` (constants) so it never
// shows up on /blog — it's only reachable by URL: /blog/tmis
const TITLE = "The most inefficient speaker";
const ROOT = "/assets/blogs/tmis";

// The source recording has two audio tracks (microphone + MIDI). Browsers can't
// play two embedded tracks at once with separate volumes, so they're split out
// into standalone files and kept in sync with a muted video.
const VIDEO_SRC = `${ROOT}/stepper.mp4`;
const POSTER_SRC = `${ROOT}/poster.jpg`;

interface Track {
  key: string;
  label: string;
  hint: string;
  src: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  initial: number;
}

const TRACKS: Track[] = [
  {
    key: "microphone",
    label: "Microphone",
    hint: "what the motors actually sound like in the room",
    src: `${ROOT}/microphone.m4a`,
    icon: Mic,
    initial: 1,
  },
  {
    key: "midi",
    label: "MIDI",
    hint: "the notes the computer is sending to the motors",
    src: `${ROOT}/midi.m4a`,
    icon: Music,
    initial: 0.5,
  },
];

// Audio is re-aligned to the video whenever it drifts more than this (seconds).
const MAX_DRIFT = 0.12;

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

function Slider({
  value,
  max,
  step,
  onChange,
  onScrubStart,
  onScrubEnd,
  className,
  ...aria
}: {
  value: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  className?: string;
  "aria-label": string;
  "aria-valuetext"?: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <input
      type="range"
      min={0}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onPointerDown={onScrubStart}
      onPointerUp={onScrubEnd}
      onPointerCancel={onScrubEnd}
      className={cn("range", className)}
      style={{ "--range-fill": `${pct}%` } as React.CSSProperties}
      {...aria}
    />
  );
}

function VolumeControl({
  track,
  value,
  onChange,
}: {
  track: Track;
  value: number;
  onChange: (v: number) => void;
}) {
  const Icon = track.icon;
  const pct = Math.round(value * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <Icon className="w-4 h-4 text-accent" />
          {track.label}
        </span>
        <span className="font-mono text-xs text-muted tabular-nums">
          {pct}%
        </span>
      </div>
      <Slider
        value={value}
        max={1}
        step={0.01}
        onChange={onChange}
        aria-label={`${track.label} volume`}
        aria-valuetext={`${pct}%`}
      />
      <span className="font-mono text-[11px] text-muted leading-relaxed">
        {track.hint}
      </span>
    </div>
  );
}

/**
 * Muted <video> + one <audio> per track, kept in lockstep. Each audio element
 * is routed through a Web Audio GainNode so the volume sliders work everywhere
 * (iOS ignores `HTMLMediaElement.volume`); plain `.volume` is the fallback.
 */
function DualTrackPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRefs = useRef<(GainNode | null)[]>([]);
  const scrubbing = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumes, setVolumes] = useState(() => TRACKS.map((t) => t.initial));

  const audios = () =>
    audioRefs.current.filter((a): a is HTMLAudioElement => !!a);

  // Build the Web Audio graph once, on the first user gesture (autoplay policy).
  const ensureGraph = useCallback(() => {
    if (ctxRef.current) {
      if (ctxRef.current.state === "suspended")
        ctxRef.current.resume().catch(() => {});
      return;
    }
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return; // fallback: `.volume` is applied directly below
    try {
      const ctx = new Ctx();
      ctxRef.current = ctx;
      audios().forEach((a, i) => {
        const gain = ctx.createGain();
        gain.gain.value = volumes[i];
        ctx.createMediaElementSource(a).connect(gain).connect(ctx.destination);
        gainRefs.current[i] = gain;
      });
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
    } catch {
      ctxRef.current = null;
    }
    // `volumes` is only read for the initial gain; later changes go via setVolume.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setVolume = (i: number, v: number) => {
    setVolumes((prev) => prev.map((p, j) => (j === i ? v : p)));
    const gain = gainRefs.current[i];
    if (gain) gain.gain.value = v;
    else {
      const a = audioRefs.current[i];
      if (a) a.volume = v;
    }
  };

  const syncAudio = useCallback((force = false) => {
    const v = videoRef.current;
    if (!v) return;
    for (const a of audios()) {
      if (force || Math.abs(a.currentTime - v.currentTime) > MAX_DRIFT)
        a.currentTime = v.currentTime;
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const playAudio = () => {
      ensureGraph();
      syncAudio(true);
      for (const a of audios()) a.play().catch(() => {});
    };
    const pauseAudio = () => {
      for (const a of audios()) a.pause();
    };

    const onPlaying = () => {
      playAudio();
      setPlaying(true);
    };
    const onPause = () => {
      pauseAudio();
      setPlaying(false);
    };
    // Video is buffering: hold the audio so it can't run ahead.
    const onWaiting = () => pauseAudio();
    const onSeek = () => syncAudio(true);
    const onTime = () => {
      if (!scrubbing.current) setTime(v.currentTime);
      if (!v.paused) syncAudio();
    };
    const onMeta = () => setDuration(v.duration);

    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onPause);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("seeking", onSeek);
    v.addEventListener("seeked", onSeek);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    if (v.readyState >= 1) onMeta();

    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onPause);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("seeking", onSeek);
      v.removeEventListener("seeked", onSeek);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      pauseAudio();
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, [ensureGraph, syncAudio]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    // Create/resume the AudioContext inside the click itself so the gesture
    // unlocks audio output, not just the video.
    ensureGraph();
    if (v.paused || v.ended) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    setTime(t);
    v.currentTime = t;
  };

  return (
    <div className="rounded-glass border border-line overflow-hidden bg-bg-2">
      {/* Stage */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="metadata"
          onClick={togglePlay}
          className="w-full block cursor-pointer"
          style={{ aspectRatio: "1 / 1" }}
        />
        {TRACKS.map((t, i) => (
          <audio
            key={t.key}
            ref={(el) => {
              audioRefs.current[i] = el;
            }}
            src={t.src}
            preload="auto"
          />
        ))}

        {/* Big play button while paused */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className={cn(
            "absolute inset-0 m-auto w-20 h-20 rounded-full grid place-items-center",
            "bg-bg/90 text-ink border border-line shadow-lg backdrop-blur",
            "transition-all duration-300 hover:scale-105 hover:text-accent",
            playing
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100",
          )}
        >
          <Play className="w-8 h-8 translate-x-0.5 fill-current" />
        </button>
      </div>

      {/* Transport */}
      <div className="border-t border-line px-4 py-3 md:px-5 flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 w-9 h-9 rounded-full grid place-items-center border border-line text-ink hover:border-ink hover:text-accent transition-colors"
        >
          {playing ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 translate-x-px fill-current" />
          )}
        </button>
        <Slider
          value={Math.min(time, duration || 0)}
          max={duration || 0}
          step={0.01}
          onChange={seek}
          onScrubStart={() => {
            scrubbing.current = true;
          }}
          onScrubEnd={() => {
            scrubbing.current = false;
          }}
          aria-label="Seek"
          aria-valuetext={formatTime(time)}
          className="flex-1"
        />
        <span className="shrink-0 font-mono text-xs text-muted tabular-nums">
          {formatTime(time)}
          <span className="text-faint"> / </span>
          {formatTime(duration)}
        </span>
      </div>

      {/* Mixer */}
      <div className="border-t border-line px-4 py-4 md:px-5 md:py-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-4">
          Mix
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {TRACKS.map((t, i) => (
            <VolumeControl
              key={t.key}
              track={t}
              value={volumes[i]}
              onChange={(v) => setVolume(i, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Tmis() {
  // Not in `blogs`, so BlogPost can't set the title for us.
  useEffect(() => {
    document.title = `${TITLE} — Artiom`;
    return () => {
      document.title = "Artiom";
    };
  }, []);

  return (
    <div className="max-w-page mx-auto px-5 md:px-10 pb-28">
      <motion.div
        className="max-w-[760px] mx-auto pt-10 md:pt-16"
        {...staggerOnMount(0.1, 0.05)}
      >
        <motion.p
          variants={staggerChild({ side: "bottom", distance: 16 })}
          className="font-mono text-xs uppercase tracking-wider text-muted mb-4"
        >
          <span className="text-accent">TMIS</span> · Demo - WIP
        </motion.p>

        <motion.h1
          variants={staggerChild({ side: "bottom", distance: 24 })}
          className="text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-medium text-balance mb-5"
        >
          {TITLE}.
        </motion.h1>

        <motion.p
          variants={staggerChild({ side: "bottom", distance: 20 })}
          className="text-lg leading-[1.6] text-ink-2 max-w-[58ch] text-pretty mb-10"
        >
          Four stepper motors, a driver board, and a MIDI file. Every note
          becomes a step frequency, every motor becomes a voice, and together
          they whine their way through a song. Press play, then mix between what
          the microphone picked up and what the computer was actually telling
          them to play.
        </motion.p>

        <motion.div variants={staggerChild({ side: "bottom", distance: 24 })}>
          <DualTrackPlayer />
        </motion.div>
      </motion.div>
    </div>
  );
}
