"use client"

import { motion } from "framer-motion"
import { Button, Result } from "antd"
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons"
import Link from "next/link"
import LayoutWrapper from "@/components/layout-wrapper"

export default function NotFound() {
  return (
    <LayoutWrapper>
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Result
            status="404"
            title={
              <motion.h1
                className="text-6xl font-bold text-primary mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                404
              </motion.h1>
            }
            subTitle={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Oops! Trang không tồn tại</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
                </p>
              </motion.div>
            }
            extra={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/">
                  <Button
                    type="primary"
                    size="large"
                    icon={<HomeOutlined />}
                    className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
                  >
                    Về trang chủ
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="large"
                    icon={<ShoppingOutlined />}
                    className="h-12 px-8 rounded-lg font-semibold border-primary text-primary hover:bg-primary/5"
                  >
                    Xem sản phẩm
                  </Button>
                </Link>
              </motion.div>
            }
          />

          {/* Animated decoration */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            <div className="w-96 h-96 border border-primary/10 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
