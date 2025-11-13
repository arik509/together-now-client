import React from "react";
import { motion } from "framer-motion";
import errorImg from "../assets/error.png"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen justify-center items-center">
      <motion.div
        className="flex flex-col justify-center items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.img
          src={errorImg}
          alt=""
          className="w-[300px]"
          initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        />
        <motion.h1
          className="text-center font-bold text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Something Went Wrong
        </motion.h1>
        <motion.button
          onClick={() => navigate(-1)}
          className="btn btn-primary text-accent flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          whileHover={{ scale: 1.08, backgroundColor: "#dc143c" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Error;
