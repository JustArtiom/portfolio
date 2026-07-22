import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { blogs } from "@/constants";
import RacingScene from "@/components/three/RacingScene";
import { useTimedProgress } from "@/components/three/useTimedProgress";
import { smoothstep } from "@/components/three/sceneConfig";
import { useInView } from "@/utils/useInView";
import { useScrollProgress } from "@/utils/useScrollProgress";

// Car intro plays over 1s once the models are loaded.
const CAR_ANIMATION = 1000;
// Sensor mount slides on over 1s once its section scrolls into view.
const MOUNT_ANIMATION = 500;

// Resting offset of the car stage (before it centers).
const REST_X = 0; // %
const REST_Y = 10; // %

const UHRA_LOGO = "/assets/img/UHRA_logo.webp";
const FS_LOGO = "/assets/img/Formula_student_logo.webp";
const GALLERY_ROOT = "/assets/blogs/uhra-2026/gallery";

function ArticleSection({
  num,
  eyebrow,
  title,
  children,
}: {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-wider text-muted mb-5">
        <span className="text-accent">{num}</span> · {eyebrow}
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.03em] font-medium text-balance mb-6">
        {title}
      </h2>
      <div className="flex flex-col gap-5 text-lg leading-[1.72] text-ink-2 text-pretty">
        {children}
      </div>
    </section>
  );
}

function VideoFigure({
  src,
  poster,
  caption,
  controls = false,
}: {
  src: string;
  poster?: string;
  caption: string;
  controls?: boolean;
}) {
  return (
    <figure>
      <div className="rounded-glass border border-line overflow-hidden bg-neutral-100">
        <video
          className="w-full h-auto block"
          autoPlay
          muted
          loop
          playsInline
          controls={controls}
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

function isVideo(src: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(src);
}

/**
 * Blur-up lazy image. Shows the tiny preview immediately (blurred), then fades
 * in the full image once it loads — smooth even on a slow connection.
 */
function LazyImage({
  src,
  preview,
  alt = "",
}: {
  src: string;
  preview: string;
  alt?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden">
      <img
        src={preview}
        alt=""
        aria-hidden
        className={
          "w-full h-auto block scale-[1.05] blur-lg transition-opacity duration-700 " +
          (loaded ? "opacity-0" : "opacity-100")
        }
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 " +
          (loaded ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}

/**
 * Masonry gallery. `root` is a base path; each item is a filename resolving to
 * `{root}/original/{file}` (full) and `{root}/preview/{file}` (tiny). Filenames
 * ending in a video extension render as an autoplaying video instead.
 */
function Gallery({ root, items }: { root: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {items.map((file, i) => (
        <div
          key={i}
          className="mb-4 break-inside-avoid overflow-hidden rounded-glass border border-line bg-neutral-100"
        >
          {isVideo(file) ? (
            <video
              className="w-full h-auto block"
              src={`${root}/original/${file}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <LazyImage
              src={`${root}/original/${file}`}
              preview={`${root}/preview/${file}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/** Blank screen with an indeterminate loading bar, shown until the scene is ready. */
function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-48 h-[3px] rounded-full bg-line overflow-hidden">
        <motion.div
          className="h-full w-1/3 rounded-full bg-accent"
          animate={{ x: ["-120%", "360%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Team / contributors. Edit this to list the real people. Each member has a
// name, a short description, and optional socials.
// ---------------------------------------------------------------------------
type SocialKey =
  | "linkedin"
  | "instagram"
  | "youtube"
  | "github"
  | "x"
  | "website";

interface Member {
  name: string;
  description?: string;
  socials?: Partial<Record<SocialKey, string>>;
}

interface TeamGroup {
  label: string;
  members: Member[];
}

const SOCIALS: { key: SocialKey; icon: IconType; label: string }[] = [
  { key: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
  { key: "instagram", icon: FaInstagram, label: "Instagram" },
  { key: "youtube", icon: FaYoutube, label: "YouTube" },
  { key: "github", icon: FaGithub, label: "GitHub" },
  { key: "x", icon: FaXTwitter, label: "X" },
  { key: "website", icon: FaGlobe, label: "Website" },
];

const team: TeamGroup[] = [
  {
    label: "Team lead",
    members: [
      {
        name: "Benjamin Joel",
        description:
          "Our fearless leader. Kept the team on track and the car on the wheels.",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/benjamin-joel3herts?utm_source=artiom.me",
        },
      },
    ],
  },
  {
    label: "ASR",
    members: [
      {
        name: "Fred Jordan bland",
        description:
          "Ensured everyone is safe, gave orders, head of electrical and presses big red button",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/fred-jordan-bland?utm_source=artiom.me",
        },
      },
    ],
  },
  {
    label: "Developers",
    members: [
      {
        name: "Artiom Cebotari",
        description:
          "Lead Developer, Involved in Localization, planning and control",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/artiom-cebotari?utm_source=artiom.me",
          github: "https://github.com/JustArtiom?utm_source=artiom.me",
          instagram: "https://www.instagram.com/im_artiom?utm_source=artiom.me",
        },
      },
      {
        name: "Sanchit Acharya",
        description:
          "Developer, specialized in acceleration events and code debugging.",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/acharyasanchit?utm_source=artiom.me",
        },
      },
      {
        name: "Issac (Khant Zwe Naing)",
        description:
          "Our Docker whisperer. Built the dev environment and spent way too many nights twisting camera and LiDAR data into submission",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/issackhant?utm_source=artiom.me",
          github: "https://github.com/jadstrike",
        },
      },
    ],
  },
];

function MemberSocials({
  socials,
  className = "",
}: {
  socials: Member["socials"];
  className?: string;
}) {
  const links = SOCIALS.filter((s) => socials?.[s.key]);
  if (!links.length) return null;
  return (
    <div className={"flex items-center gap-3 " + className}>
      {links.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.key}
            href={socials![s.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-muted hover:text-accent transition-colors"
          >
            <Icon className="w-[18px] h-[18px]" />
          </a>
        );
      })}
    </div>
  );
}

function Team({ num }: { num: string }) {
  if (!team.length) return null;
  return (
    <div className="mt-24 md:mt-32">
      <p className="font-mono text-xs uppercase tracking-wider text-muted mb-5">
        <span className="text-accent">{num}</span> · Team
      </p>
      <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.03em] font-medium text-balance mb-10">
        The people behind it.
      </h2>

      <div className="flex flex-col gap-12">
        {team.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
              {group.label}
            </p>
            <div className="border-b border-line">
              {group.members.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 py-4 border-t border-line px-4"
                >
                  <h3 className="font-medium text-ink sm:w-52 shrink-0">
                    {m.name}
                  </h3>
                  {m.description && (
                    <p className="text-sm text-ink-2 leading-relaxed text-pretty flex-1">
                      {m.description}
                    </p>
                  )}
                  <MemberSocials
                    socials={m.socials}
                    className="mt-1 sm:mt-0 sm:ml-auto shrink-0"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted max-w-[62ch] text-pretty">
        This is only part of the team. A few preferred to stay off the page,
        and that&rsquo;s completely fair. None of this happened without the whole
        crew{" "}
        <span className="text-accent">&hearts;</span>
      </p>
    </div>
  );
}

export default function Uhra2026() {
  const gallery = blogs["uhra-2026"].gallery ?? [];
  const [ready, setReady] = useState(false);
  const carProgress = useTimedProgress(CAR_ANIMATION, ready);

  // Mount animation: plays once the sensor section reaches mid-screen.
  const [mountSectionRef, mountInView] =
    useInView<HTMLElement>("-35% 0px -35% 0px");
  const mountProgress = useTimedProgress(MOUNT_ANIMATION, ready && mountInView);

  // Centering: scroll-driven (reversible) as the final section scrolls up.
  const [centerSectionRef, centerProgress] = useScrollProgress<HTMLElement>();

  // Slide the stage from its resting offset to centered as we center.
  const c = smoothstep(centerProgress / 100);
  const stageTransform = `translateX(${REST_X * (1 - c)}%) translateY(${
    REST_Y * (1 - c)
  }%)`;

  return (
    <div>
      <AnimatePresence>{!ready && <LoadingScreen />}</AnimatePresence>

      {/* 3D stage zone — the car stays pinned across the welcome, sensor, and
          centering sections, then scrolls away. */}
      <div className="relative">
        {/* Sticky full-screen canvas. */}
        <div className="sticky top-0 h-dvh w-full overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ transform: stageTransform }}
          >
            <RacingScene
              carProgress={carProgress}
              mountProgress={mountProgress}
              centerProgress={centerProgress}
              onReady={() => setReady(true)}
            />
          </div>
        </div>

        {/* Content overlaid on top of the pinned canvas. */}
        <div className="relative z-10 -mt-[100dvh]">
          {/* Welcome */}
          <section className="min-h-[70dvh] flex items-center">
            <div className="max-w-page mx-auto w-full px-5 md:px-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-6 mb-10">
                  <img
                    src={FS_LOGO}
                    alt="Formula Student — Institution of Mechanical Engineers"
                    className="h-16 w-auto"
                  />
                  <img
                    src={UHRA_LOGO}
                    alt="UH Racing Autonomous"
                    className="h-9 md:h-10 w-auto"
                  />
                </div>
                <h1 className="text-[clamp(40px,6vw,80px)] leading-[1.02] tracking-[-0.035em] font-medium text-balance mb-6">
                  Driving the future of{" "}
                  <span className="text-accent">autonomous motorsport</span>.
                </h1>
                <p className="text-xl leading-[1.55] text-ink-2 max-w-[46ch] text-pretty">
                  How we built the software that drives a fully driverless
                  Formula Student race car, all the way from the raw sensor data
                  down to the wheel.
                </p>
              </div>
            </div>
          </section>

          {/* Sensor mount */}
          <section
            ref={mountSectionRef}
            className="min-h-[70dvh] flex items-center"
          >
            <div className="max-w-page mx-auto w-full px-5 md:px-10">
              <div className="max-w-xl">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  The hardware
                </span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-medium mt-4 mb-6 text-balance">
                  The sensor mount
                </h2>
                <p className="text-lg leading-[1.65] text-ink-2 max-w-[52ch] text-pretty">
                  With no driver in the seat, this rig is the car&rsquo;s head.
                  It carries everything the car needs to sense the track and
                  think for itself. Bolt it on, and the car can find its own way
                  around.
                </p>
                <ul className="mt-8 flex flex-col gap-3 font-mono text-sm">
                  {[
                    ["Compute", "NVIDIA Jetson AGX Orin"],
                    ["Vision", "ZED 2i stereo camera"],
                    ["Range", "Velodyne LiDAR"],
                    ["Motion", "SBG IMU + GNSS"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex gap-4">
                      <span className="w-20 shrink-0 uppercase tracking-wider text-accent">
                        {k}
                      </span>
                      <span className="text-ink-2">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Centering — empty; scrolling through it moves the car to center,
              front pointing at you, then the stage unpins. */}
          <section ref={centerSectionRef} className="h-[80dvh]" />
        </div>
      </div>

      {/* Article — the 3D stage has scrolled away by here. */}
      <div className="max-w-page mx-auto px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-[680px] mx-auto flex flex-col gap-24 pt-8 md:pt-16">
          <ArticleSection
            num="01"
            eyebrow="The event"
            title="Same track. No driver."
          >
            <p>
              Formula Student AI is exactly what it sounds like: the same
              cone-lined circuits as Formula Student, but with nobody in the
              car. We compete in the IMechE&rsquo;s FS-AI class, where the car
              runs Acceleration, Skid Pad, Autocross and Trackdrive entirely on
              its own.
            </p>
            <p>
              To do that it has to spot the cones, work out where the track
              goes, plan a line through it, and drive that line. All in real
              time, all from what it can sense right then. Get a single cone
              wrong and you clip it. Get the whole loop wrong and the car simply
              won&rsquo;t move.
            </p>
          </ArticleSection>

          <ArticleSection
            num="02"
            eyebrow="The stack"
            title="One pipeline, sensor to wheel."
          >
            <p>
              Under the shell it&rsquo;s a single chain:{" "}
              <span className="text-ink">
                perception → localization &amp; mapping → planning → control
              </span>
              . The cameras and LiDAR find the cones, SLAM builds a map and
              places the car on it, the planner draws a line through the cones,
              and the controller turns that line into steering and speed.
            </p>
            <p>
              It all runs in ROS 2 on an NVIDIA Jetson bolted to the car. Most
              of it is C++ and Python, with the cone detector in PyTorch.
              Everything has to keep up with a moving vehicle, so &ldquo;fast
              enough&rdquo; is a hard requirement, not a nice-to-have.
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-sm border-t border-line pt-6 mt-1">
              {[
                ["Framework", "ROS 2 Humble"],
                ["Compute", "Jetson AGX Orin"],
                ["Languages", "C++ · Python"],
                ["Perception", "PyTorch"],
              ].map(([k, v]) => (
                <li key={k} className="flex flex-col gap-0.5">
                  <span className="text-faint uppercase tracking-wider text-[11px]">
                    {k}
                  </span>
                  <span className="text-ink-2">{v}</span>
                </li>
              ))}
            </ul>
          </ArticleSection>

          <ArticleSection
            num="03"
            eyebrow="Perception"
            title="Turning grey into cones."
          >
            <p>
              The car&rsquo;s eyes are a ZED 2i stereo camera and a Velodyne
              LiDAR. A neural network picks cones out of the camera frames and
              reads their colour (blue down one side, yellow down the other,
              orange for the start and finish), while the LiDAR gives us range
              we can trust.
            </p>
            <p>
              Between them they take a blur of grey tarmac and hand the rest of
              the stack something clean to work with: a list of coloured cones,
              each with a position relative to the car.
            </p>
          </ArticleSection>

          <ArticleSection
            num="04"
            eyebrow="Acceleration"
            title="Flat out down the straight."
          >
            <p>
              Acceleration is the simplest event to describe: a straight-line
              sprint, as fast as the car dares, with no cones to thread through.
              Point it, send it, and don&rsquo;t lift.
            </p>
            <p>
              We got the car down the strip and over the line. There was a
              little swerve right at the end, enough to make us hold our breath,
              but it stayed on and finished the run. Sanchit was the one who
              worked on this one.
            </p>
            <VideoFigure
              src="/assets/blogs/uhra-2026/acceleration.mp4"
              poster="/assets/blogs/uhra-2026/acceleration-poster.jpg"
              caption="Off the line at Silverstone."
            />
          </ArticleSection>

          <ArticleSection
            num="05"
            eyebrow="Localization"
            title="The hardest question: where am I?"
          >
            <p>
              On the software side I worked across localization, planning, and
              control, mostly for the Trackdrive and Sprint events. Localization
              was the piece I kept coming back to. It sounds trivial. Where is
              the car? But with no external reference to lean on, it turns out
              to be the hardest thing in the stack. I built it around an
              EKF-SLAM that maps the cones and locates the car against them at
              the same time.
            </p>
            <p>
              The lesson that took longest: not every sensor tells the truth.
              The camera&rsquo;s visual odometry read almost zero even at speed.
              The GNSS-aided IMU, the moment it lost its fix, drifted into a
              smooth phantom 13&nbsp;m/s in a dead straight line. So I stripped
              it back to what actually held up:{" "}
              <span className="text-ink">
                cone-based SLAM for position, the IMU purely for heading
              </span>
              . Then I added a gate so a cone has to be seen a few times before
              the filter trusts it, which quietly killed a lot of false
              positives.
            </p>
            <VideoFigure
              src="/assets/blogs/uhra-2026/localization.mp4"
              poster="/assets/blogs/uhra-2026/localization-poster.jpg"
              caption="The localization stack running on a Skid Pad log. Left: EKF-SLAM building the cone map and tracking the car. Top right: the ZED camera watching the real cones go by. Bottom right: the depth it works from."
            />
          </ArticleSection>

          <ArticleSection
            num="06"
            eyebrow="The track day"
            title="A clean lap, then straight through the cones."
          >
            <p>
              On our first real track drive the car put in a clean lap 1. Then,
              on lap 2, it calmly followed its planned line straight through the{" "}
              <span className="text-ink">outside</span> of the cones.
            </p>
            <blockquote className="border-l-2 border-accent pl-6 text-xl leading-[1.5] text-ink">
              The map had frozen after lap 1, and with no velocity sensor the
              car had been quietly dead-reckoning. One lap of drift was enough
              to put the racing line where the track wasn&rsquo;t.
            </blockquote>
            <p>
              The fix I&rsquo;m running now treats the map as a rolling window:
              every cone carries a last-seen timestamp and ages out about thirty
              seconds after the car last looked at it. The map never freezes and
              always reflects the cones actually in front of us. The proper
              long-term answer is feeding wheel-speed odometry into the filter.
              For now, reliability that drives a clean lap beats a faster line
              that ends in the grass.
            </p>
            <VideoFigure
              src="/assets/blogs/uhra-2026/trackdrive.mp4"
              poster="/assets/blogs/uhra-2026/trackdrive-poster.jpg"
              caption="The car out on track, driving itself between the cones. Sped up 2x, and nobody's at the wheel."
              controls
            />
          </ArticleSection>

          <ArticleSection
            num="07"
            eyebrow="What's next"
            title="A long way to go, and worth it."
          >
            <p>
              There&rsquo;s plenty left: wheel-speed odometry fused into the
              filter, faster perception on the Jetson, a proper racing line once
              the drift is bounded. Every event teaches us something the
              simulator never did.
            </p>
            <p>
              But there&rsquo;s nothing quite like watching something you wrote
              steer a real car around a track, with no one in it.
            </p>
          </ArticleSection>
        </div>

        <Team num="08" />

        {gallery.length > 0 && (
          <div className="mt-24 md:mt-32">
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-5">
              <span className="text-accent">09</span> · Gallery
            </p>
            <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.03em] font-medium text-balance mb-8">
              From the garage and the track.
            </h2>
            <Gallery root={GALLERY_ROOT} items={gallery} />
          </div>
        )}
      </div>
    </div>
  );
}
