import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AnimatorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="text-center overflow-hidden">
        <motion.p
          className="font-semibold text-lg sm:text-5xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Empowering Health with Innovation
        </motion.p>

        <motion.p
          className="font-bold text-5xl sm:text-[200px] mt-7 mb-3 sm:mb-5 text-[#003441]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
          }}
        >
          <span className="text-[#01B49C]">ANU</span>med's -{" "}
          <span className="text-[#01B49C]">EMR</span>
        </motion.p>

        <motion.div
          className="flex justify-center w-full"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
        >
          <p className="text-[#01B49C] w-auto px-5 sm:w-10/12 italic text-sm sm:text-lg">
            Anumed's EMR system connects doctors, patients, and healthcare teams
            in one seamless platform. Streamline workflows, improve patient
            outcomes, and reduce administrative burden.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AnimatorPage;
