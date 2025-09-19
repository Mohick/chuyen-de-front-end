"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Logo */}
        <motion.div
          className="text-3xl font-bold text-primary mb-6"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          ShopVN
        </motion.div>

        {/* Main Spinner */}
        <div className="relative w-12 h-12 mx-auto mb-4">
          <motion.div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        >
          Đang tải...
        </motion.p>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-primary/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
