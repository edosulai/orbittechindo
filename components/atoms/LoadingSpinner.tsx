import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-background z-50"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full"></div>
    </motion.div>
  );
};