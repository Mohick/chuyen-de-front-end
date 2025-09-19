"use client"

import { motion } from "framer-motion"
import { Button, Result, Card, Timeline, Typography } from "antd"
import {
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingOutlined,
  TruckOutlined,
  PhoneOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import LayoutWrapper from "@/components/layout-wrapper"
import { Package2 } from "lucide-react"

const { Title, Text } = Typography

export default function OrderSuccessPage() {
  const orderNumber = "DH" + Date.now().toString().slice(-6)

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Result
            icon={
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <CheckCircleOutlined className="text-green-500" />
              </motion.div>
            }
            title={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Title level={2} className="text-green-600 mb-2">
                  Đặt hàng thành công!
                </Title>
              </motion.div>
            }
            subTitle={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-8"
              >
                <Text className="text-lg text-muted-foreground">
                  Cảm ơn bạn đã mua sắm tại ShopVN. Đơn hàng #{orderNumber} của bạn đã được tiếp nhận.
                </Text>
              </motion.div>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <Card className="rounded-xl shadow-sm">
              <Title level={4} className="mb-4">
                Thông tin đơn hàng
              </Title>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text className="text-muted-foreground">Mã đơn hàng:</Text>
                  <Text className="font-semibold">#{orderNumber}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-muted-foreground">Ngày đặt:</Text>
                  <Text className="font-semibold">{new Date().toLocaleDateString("vi-VN")}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-muted-foreground">Phương thức thanh toán:</Text>
                  <Text className="font-semibold">COD</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-muted-foreground">Trạng thái:</Text>
                  <Text className="font-semibold text-orange-600">Đang xử lý</Text>
                </div>
              </div>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <Title level={4} className="mb-4">
                Thời gian giao hàng dự kiến
              </Title>
              <Timeline
                items={[
                  {
                    dot: <CheckCircleOutlined className="text-green-500" />,
                    children: (
                      <div>
                        <Text className="font-medium">Đơn hàng đã được tiếp nhận</Text>
                        <br />
                        <Text className="text-muted-foreground text-sm">{new Date().toLocaleString("vi-VN")}</Text>
                      </div>
                    ),
                  },
                  {
                    dot: <Package2 className="text-orange-500" />,
                    children: (
                      <div>
                        <Text className="font-medium">Đang chuẩn bị hàng</Text>
                        <br />
                        <Text className="text-muted-foreground text-sm">
                          Dự kiến: {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN")}
                        </Text>
                      </div>
                    ),
                  },
                  {
                    dot: <TruckOutlined className="text-blue-500" />,
                    children: (
                      <div>
                        <Text className="font-medium">Đang giao hàng</Text>
                        <br />
                        <Text className="text-muted-foreground text-sm">
                          Dự kiến: {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN")}
                        </Text>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card className="rounded-xl shadow-sm bg-blue-50 border-blue-200 mb-8">
              <div className="flex items-start space-x-4">
                <PhoneOutlined className="text-blue-600 text-xl mt-1" />
                <div>
                  <Title level={5} className="text-blue-800 mb-2">
                    Cần hỗ trợ?
                  </Title>
                  <Text className="text-blue-700">
                    Liên hệ hotline: <strong>1900 1234</strong> hoặc email: <strong>support@shopvn.com</strong>
                    <br />
                    Chúng tôi sẵn sàng hỗ trợ bạn 24/7
                  </Text>
                </div>
              </div>
            </Card>

            <div className="text-center space-x-4">
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
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
