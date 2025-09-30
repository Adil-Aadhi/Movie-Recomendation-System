import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
      {/* Animated 404 */}
      <motion.h1
        className="text-9xl font-extrabold text-yellow-400 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, duration: 1 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-xl mt-4 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Oops! The page you’re looking for doesn’t exist. 🚧
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <Link
          to="/home"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transition"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>

      {/* Floating Animation */}
      <motion.div
        className="mt-10 text-6xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🎬
      </motion.div>
    </div>
  );
}

export default NotFound;
