import React from "react";
import { useThemeStore } from "../../stores/ThemeStore";
import { MdOutlineBedtime, MdOutlineLightMode  } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeButton() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed z-50 bottom-6 right-5 p-2 md:top-8 md:bottom-auto rounded-full bg-white/70 dark:bg-black/50 shadow-lg backdrop-blur-md cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "light" ? (
            <MdOutlineBedtime className="w-6 h-6 text-gray-800" />
          ) : (
            <MdOutlineLightMode className="w-6 h-6 text-yellow-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}