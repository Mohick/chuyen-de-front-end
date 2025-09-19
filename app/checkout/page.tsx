"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button, Form, Input, Select, Radio, Card, Steps, Row, Col, Divider, message, Space, Typography } from "antd"
import {
  ShoppingCartOutlined,
  UserOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { useRouter } from "next/navigation"
import LayoutWrapper from "@/components/layout-wrapper"
import { useCart } from "@/lib/cart-context"

const { Title, Text } = Typography
const { Option } = Select

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [loading, setLoading] = useState(false)
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()

  const steps = [
    {
      title: "Thông tin giao hàng",
      icon: <UserOutlined />,
    },
    {
      title: "Phương thức thanh toán",
      icon: <CreditCardOutlined />,
    },
    {
      title: "Xác nhận đơn hàng",
      icon: <CheckCircleOutlined />,
    },
  ]

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["name", "phone", "email", "address", "city", "district"])
      }
      setCurrentStep(currentStep + 1)
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc")
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      message.success("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại ShopVN")
      clearCart()
      router.push("/order-success")
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <ShoppingCartOutlined className="text-6xl text-muted-foreground mb-4" />
            <Title level={3}>Giỏ hàng trống</Title>
            <Text className="text-muted-foreground">Bạn chưa có sản phẩm nào trong giỏ hàng</Text>
            <div className="mt-6">
              <Button
                type="primary"
                size="large"
                onClick={() => router.push("/products")}
                className="bg-primary hover:bg-primary/90"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </motion.div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Title level={2} className="text-center mb-8">
            Thanh toán
          </Title>

          <Steps current={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Steps.Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className="rounded-xl shadow-sm">
                <Form form={form} layout="vertical" size="large">
                  {currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Title level={4} className="mb-6">
                        <EnvironmentOutlined className="mr-2" />
                        Thông tin giao hàng
                      </Title>

                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="name"
                            label="Họ và tên"
                            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                          >
                            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" className="rounded-lg" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                              { required: true, message: "Vui lòng nhập số điện thoại" },
                              { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ" },
                            ]}
                          >
                            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" className="rounded-lg" />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              { required: true, message: "Vui lòng nhập email" },
                              { type: "email", message: "Email không hợp lệ" },
                            ]}
                          >
                            <Input prefix={<MailOutlined />} placeholder="Nhập địa chỉ email" className="rounded-lg" />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            name="address"
                            label="Địa chỉ"
                            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                          >
                            <Input.TextArea placeholder="Nhập địa chỉ chi tiết" rows={3} className="rounded-lg" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="city"
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                          >
                            <Select placeholder="Chọn tỉnh/thành phố" className="rounded-lg">
                              <Option value="hanoi">Hà Nội</Option>
                              <Option value="hcm">TP. Hồ Chí Minh</Option>
                              <Option value="danang">Đà Nẵng</Option>
                              <Option value="haiphong">Hải Phòng</Option>
                              <Option value="cantho">Cần Thơ</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="district"
                            label="Quận/Huyện"
                            rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
                          >
                            <Select placeholder="Chọn quận/huyện" className="rounded-lg">
                              <Option value="district1">Quận 1</Option>
                              <Option value="district2">Quận 2</Option>
                              <Option value="district3">Quận 3</Option>
                              <Option value="district4">Quận 4</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Title level={4} className="mb-6">
                        <CreditCardOutlined className="mr-2" />
                        Phương thức thanh toán
                      </Title>

                      <Radio.Group
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full"
                      >
                        <Space direction="vertical" className="w-full" size="large">
                          <Radio value="cod" className="w-full">
                            <Card className="ml-4 cursor-pointer hover:border-primary transition-colors">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold">COD</span>
                                  </div>
                                </div>
                                <div>
                                  <Title level={5} className="mb-1">
                                    Thanh toán khi nhận hàng
                                  </Title>
                                  <Text className="text-muted-foreground">
                                    Thanh toán bằng tiền mặt khi nhận được hàng
                                  </Text>
                                </div>
                              </div>
                            </Card>
                          </Radio>

                          <Radio value="bank" className="w-full">
                            <Card className="ml-4 cursor-pointer hover:border-primary transition-colors">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <CreditCardOutlined className="text-blue-600" />
                                  </div>
                                </div>
                                <div>
                                  <Title level={5} className="mb-1">
                                    Chuyển khoản ngân hàng
                                  </Title>
                                  <Text className="text-muted-foreground">Chuyển khoản qua ATM, Internet Banking</Text>
                                </div>
                              </div>
                            </Card>
                          </Radio>
                        </Space>
                      </Radio.Group>

                      {paymentMethod === "bank" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6"
                        >
                          <Card className="bg-blue-50 border-blue-200">
                            <Title level={5}>Thông tin chuyển khoản</Title>
                            <div className="space-y-2">
                              <Text>
                                <strong>Ngân hàng:</strong> Vietcombank
                              </Text>
                              <Text>
                                <strong>Số tài khoản:</strong> 1234567890
                              </Text>
                              <Text>
                                <strong>Chủ tài khoản:</strong> SHOPVN COMPANY
                              </Text>
                              <Text>
                                <strong>Nội dung:</strong> Thanh toan don hang [Mã đơn hàng]
                              </Text>
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Title level={4} className="mb-6">
                        <CheckCircleOutlined className="mr-2" />
                        Xác nhận đơn hàng
                      </Title>

                      <div className="space-y-4">
                        <Card className="bg-green-50 border-green-200">
                          <Text className="text-green-700">
                            Vui lòng kiểm tra lại thông tin đơn hàng trước khi xác nhận
                          </Text>
                        </Card>

                        <div>
                          <Title level={5}>Thông tin giao hàng</Title>
                          <div className="bg-muted p-4 rounded-lg">
                            <Text>
                              <strong>Họ tên:</strong> {form.getFieldValue("name")}
                            </Text>
                            <br />
                            <Text>
                              <strong>Điện thoại:</strong> {form.getFieldValue("phone")}
                            </Text>
                            <br />
                            <Text>
                              <strong>Email:</strong> {form.getFieldValue("email")}
                            </Text>
                            <br />
                            <Text>
                              <strong>Địa chỉ:</strong> {form.getFieldValue("address")}
                            </Text>
                          </div>
                        </div>

                        <div>
                          <Title level={5}>Phương thức thanh toán</Title>
                          <div className="bg-muted p-4 rounded-lg">
                            <Text>
                              {paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản ngân hàng"}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Form>

                <Divider />

                <div className="flex justify-between">
                  {currentStep > 0 && (
                    <Button size="large" onClick={handlePrev} className="rounded-lg">
                      Quay lại
                    </Button>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleNext}
                      className="bg-primary hover:bg-primary/90 rounded-lg ml-auto"
                    >
                      Tiếp tục
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      loading={loading}
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90 rounded-lg ml-auto"
                    >
                      Đặt hàng
                    </Button>
                  )}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card className="rounded-xl shadow-sm sticky top-4">
                <Title level={4} className="mb-4">
                  Đơn hàng của bạn
                </Title>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">IMG</span>
                      </div>
                      <div className="flex-1">
                        <Text className="font-medium line-clamp-1">{item.name}</Text>
                        <Text className="text-muted-foreground text-sm">
                          {item.price.toLocaleString("vi-VN")}đ x {item.quantity}
                        </Text>
                      </div>
                      <Text className="font-semibold">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</Text>
                    </div>
                  ))}
                </div>

                <Divider />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text>Tạm tính:</Text>
                    <Text>{getTotalPrice().toLocaleString("vi-VN")}đ</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Phí vận chuyển:</Text>
                    <Text>Miễn phí</Text>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <Title level={5}>Tổng cộng:</Title>
                    <Title level={5} className="text-primary">
                      {getTotalPrice().toLocaleString("vi-VN")}đ
                    </Title>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
