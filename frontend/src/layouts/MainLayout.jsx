import Sidebar from "../components/common/Sidebar";

import { motion } from "framer-motion";

function MainLayout({ children }) {
  return (
    <div className="flex bg-[#020617] text-white min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6 overflow-y-auto"
      >
        {children}
      </motion.div>

    </div>
  );
}

export default MainLayout;