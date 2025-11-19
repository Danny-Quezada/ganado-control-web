import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos, MdOutlineInventory2, MdOutlinePieChartOutline, MdOutlineDoorFront,MdOutlineSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/UserStore";
import { PiCow } from "react-icons/pi";
import { FaRegChartBar } from "react-icons/fa";

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  closed: {
    x: -250,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.2} },
};

export default function NavBar() {
  const { signOut } = useUserStore();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    if (window.innerWidth < 650) {
      setIsOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="relative z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.aside
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 min-w-[5rem] w-20 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
          >
            <nav className="flex flex-col justify-between items-center h-full py-6">
              <ul className="flex flex-col gap-6 mt-4">
                <NavItem key="dashboard" to="/dashboard" icon={<FaRegChartBar />} />
                <NavItem key="cow" to="/cow" icon={<PiCow />} />
                <NavItem key="dashboard" to="/dashboard" icon={<MdOutlinePieChartOutline />} />
              </ul>
              <div className="flex flex-col gap-2 items-center">
                <NavItem key="settings" to="/settings"  className="mb-2 p-2" icon={<MdOutlineSettings />} />
                <button
                  onClick={() => {
                    signOut();
                    navigate("/login");
                  }}
                  className="mb-2 p-2 group rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer dark:text-gray-500"
                >
                  <MdOutlineDoorFront className="group-hover:text-red-500  text-xl" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mb-2 p-2 rounded-full group hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer md:hidden"
                >
                  <IoIosArrowBack className="text-gray-500 group-hover:text-principal" />
                </button>
                
              </div>
            </nav>
          </motion.aside>
        ) : (
          <motion.button
            key="toggle"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setIsOpen(true)}
            className="fixed cursor-pointer md bottom-6 left-5 w-10 h-10 flex items-center justify-center bg-principal rounded-full p-2 text-white shadow"
          >
            <MdArrowForwardIos />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ to, icon, className }: { to: string; icon: React.ReactNode, className?: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-2xl transition ${
          isActive
            ? "text-principal"
            : `text-gray-500 hover:text-principal ${className}`
        }`
      }
    >
      {icon}
    </NavLink>
  );
}