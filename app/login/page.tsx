"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button, Form, Input, Card, Typography, Divider, message } from "antd"
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

const { Title, Text } = Typography

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      message.success("Đăng nhập thành công!")
      router.push("/profile")
    } catch (error) {
      message.error("Đăng nhập thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Title level={2} className="text-gray-800 mb-2">
                Chào mừng trở lại
              </Title>
              <Text className="text-gray-600">Đăng nhập vào tài khoản của bạn</Text>
            </div>

            <Form name="login" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Email" className="rounded-lg" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Mật khẩu"
                  className="rounded-lg"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 border-0 text-base font-medium"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <Divider className="my-6">
              <Text className="text-gray-500">Hoặc đăng nhập với</Text>
            </Divider>

            <div className="space-y-3">
              <Button
                icon={<GoogleOutlined />}
                className="w-full h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600"
              >
                Tiếp tục với Google
              </Button>
              <Button
                icon={<FacebookOutlined />}
                className="w-full h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600"
              >
                Tiếp tục với Facebook
              </Button>
            </div>

            <div className="text-center mt-8">
              <Text className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Đăng ký ngay
                </Link>
              </Text>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
