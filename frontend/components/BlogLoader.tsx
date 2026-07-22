import { motion } from "framer-motion";

/**
 * Full-screen loading overlay with an indeterminate bar. Used both as the
 * Suspense fallback while the post's JS chunk downloads and inside the post
 * while its 3D models load — so the loader shows instantly on navigation and
 * stays until everything's ready (then fades via AnimatePresence).
 */
export default function BlogLoader() {
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
