"use client"

import { motion } from "framer-motion"
import { Row, Col, Card, Form, Input, Button, message } from "antd"
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, SendOutlined } from "@ant-design/icons"
import LayoutWrapper from "@/components/layout-wrapper"

const { TextArea } = Input

export default function ContactPage() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Form values:", values)
    message.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")
    form.resetFields()
  }

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="text-2xl text-primary" />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
      description: "Ghé thăm showroom của chúng tôi",
    },
    {
      icon: <PhoneOutlined className="text-2xl text-primary" />,
      title: "Điện thoại",
      content: "+84 123 456 789",
      description: "Hotline hỗ trợ 24/7",
    },
    {
      icon: <MailOutlined className="text-2xl text-primary" />,
      title: "Email",
      content: "info@shopvn.com",
      description: "Gửi email cho chúng tôi",
    },
    {
      icon: <ClockCircleOutlined className="text-2xl text-primary" />,
      title: "Giờ làm việc",
      content: "8:00 - 22:00",
      description: "Thứ 2 - Chủ nhật",
    },
  ]

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </p>
        </motion.div>

        <Row gutter={[32, 32]}>
          {/* Contact Information */}
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Thông tin liên hệ</h2>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{info.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-foreground font-medium mb-1">{info.content}</p>
                        <p className="text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="rounded-xl overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <EnvironmentOutlined className="text-4xl text-primary mb-2" />
                      <p className="text-muted-foreground">Bản đồ vị trí cửa hàng</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={16}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6">Gửi tin nhắn cho chúng tôi</h2>

                <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
                      >
                        <Input placeholder="Nhập họ và tên của bạn" className="rounded-lg h-12" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email!" },
                          { type: "email", message: "Email không hợp lệ!" },
                        ]}
                      >
                        <Input placeholder="Nhập email của bạn" className="rounded-lg h-12" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                      >
                        <Input placeholder="Nhập số điện thoại" className="rounded-lg h-12" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="subject"
                        label="Chủ đề"
                        rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
                      >
                        <Input placeholder="Chủ đề tin nhắn" className="rounded-lg h-12" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="message"
                    label="Tin nhắn"
                    rules={[{ required: true, message: "Vui lòng nhập tin nhắn!" }]}
                  >
                    <TextArea rows={6} placeholder="Nhập tin nhắn của bạn..." className="rounded-lg" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      icon={<SendOutlined />}
                      className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
                    >
                      Gửi tin nhắn
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* FAQ Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Câu hỏi thường gặp</h2>
            <p className="text-muted-foreground">Một số câu hỏi phổ biến từ khách hàng</p>
          </div>

          <Row gutter={[24, 24]}>
            {[
              {
                question: "Thời gian giao hàng là bao lâu?",
                answer:
                  "Chúng tôi giao hàng trong vòng 1-3 ngày làm việc tại TP.HCM và 3-7 ngày cho các tỉnh thành khác.",
              },
              {
                question: "Có chính sách đổi trả không?",
                answer: "Có, chúng tôi hỗ trợ đổi trả trong vòng 30 ngày với điều kiện sản phẩm còn nguyên vẹn.",
              },
              {
                question: "Làm thế nào để theo dõi đơn hàng?",
                answer: "Bạn sẽ nhận được mã theo dõi qua email sau khi đơn hàng được xác nhận và vận chuyển.",
              },
              {
                question: "Có hỗ trợ thanh toán trả góp không?",
                answer: "Có, chúng tôi hỗ trợ thanh toán trả góp qua thẻ tín dụng và các ứng dụng fintech.",
              },
            ].map((faq, index) => (
              <Col key={index} xs={24} md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="rounded-xl shadow-sm h-full">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
