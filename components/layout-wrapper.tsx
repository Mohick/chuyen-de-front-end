"use client"

import { Layout } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useState, useEffect } from "react"
import Header from "./header"
import Footer from "./footer"
import LoadingSpinner from "./loading-spinner"
import NavigationProgress from "./navigation-progress"
import ScrollToTop from "./scroll-to-top"

const { Content } = Layout

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Handle initial page load
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    // Handle navigation loading
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, isInitialLoad])

  return (
    <Layout className="min-h-screen bg-background">
      <NavigationProgress />
      <Header />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSpinner key="loading" />
        ) : (
          <Content className="pt-16">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              {children}
            </motion.div>
          </Content>
        )}
      </AnimatePresence>

      <Footer />
      <ScrollToTop />
    </Layout>
  )
}
