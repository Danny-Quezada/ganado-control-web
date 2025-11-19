import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ThemeButton from "../../components/ThemeButton";
import { AnimatePresence, motion } from "motion/react";
export default function InventoryLayout() {
  return (
    <div className="flex h-[100dvh] w-[100dvw] dark:bg-gray-900">
      <ThemeButton key={"ThemeButtonMain"} />
      <AnimatePresence key={"Main"}>
        <NavBar key={"NavBarMain"} />
        <motion.main
          className="flex-1 overflow-y-auto w-full flex justify-center items-center "
        >
          <div className="w-full p-4 h-full md:w-[70%] md:p-0 dark:bg-gray-900">
            <Outlet />
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}