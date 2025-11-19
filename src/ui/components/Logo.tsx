import React from "react";
import { motion } from "framer-motion";
import logo from "/Logo.png";
export default function Logo() {
  return (
    <motion.div>
      
      <motion.img
        src={logo}
        alt="Logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        className="w-32 h-32 object-contain"
      />
    </motion.div>
  );
}
