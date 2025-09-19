"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button, Form, Input, Card, Typography, message, Checkbox } from "antd"
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

const { Title, Text } = Typography

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      message.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.")
      router.push("/login")
    } catch (error) {
      message.error("Đăng ký thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
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
                Tạo tài khoản mới
              </Title>
              <Text className="text-gray-600">Tham gia cộng đồng ShopVN ngay hôm nay</Text>
            </div>

            <Form name="register" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item name="fullName" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Họ và tên"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" className="rounded-lg" />
              </Form.Item>

              <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Số điện thoại"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Mật khẩu"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"))
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Xác nhận mật khẩu"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[{ required: true, message: "Vui lòng đồng ý với điều khoản!" }]}
              >
                <Checkbox>
                  Tôi đồng ý với{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    Chính sách bảo mật
                  </Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 rounded-lg bg-green-600 hover:bg-green-700 border-0 text-base font-medium"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-6">
              <Text className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Đăng nhập ngay
                </Link>
              </Text>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
