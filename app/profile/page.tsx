"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, Tabs, Form, Input, Button, Avatar, Upload, Table, Tag, Row, Col, Statistic, message } from "antd"
import {
  UserOutlined,
  UploadOutlined,
  ShoppingOutlined,
  HeartOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import LayoutWrapper from "@/components/layout-wrapper"

const { TabPane } = Tabs

export default function ProfilePage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Mock user data
  const userData = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar: null,
    joinDate: "2024-01-01",
  }

  // Mock order history
  const orderHistory = [
    {
      key: "1",
      orderNumber: "DH001234",
      date: "2024-01-15",
      total: 1299000,
      status: "delivered",
      items: 2,
    },
    {
      key: "2",
      orderNumber: "DH001235",
      date: "2024-01-10",
      total: 599000,
      status: "shipping",
      items: 1,
    },
    {
      key: "3",
      orderNumber: "DH001236",
      date: "2024-01-05",
      total: 899000,
      status: "processing",
      items: 3,
    },
  ]

  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Số sản phẩm",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (amount: number) => <span className="font-semibold text-primary">{amount.toLocaleString("vi-VN")}đ</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig = {
          delivered: { color: "green", text: "Đã giao" },
          shipping: { color: "blue", text: "Đang giao" },
          processing: { color: "orange", text: "Đang xử lý" },
          cancelled: { color: "red", text: "Đã hủy" },
        }
        const config = statusConfig[status as keyof typeof statusConfig]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Button type="link" icon={<EyeOutlined />}>
          Xem chi tiết
        </Button>
      ),
    },
  ]

  const handleUpdateProfile = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Cập nhật thông tin thành công!")
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Profile Header */}
          <Card className="rounded-xl mb-8">
            <div className="flex items-center space-x-6">
              <Avatar size={80} icon={<UserOutlined />} />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-1">{userData.name}</h1>
                <p className="text-muted-foreground mb-2">{userData.email}</p>
                <p className="text-sm text-muted-foreground">
                  Thành viên từ {new Date(userData.joinDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              {/* Stats */}
              <div className="hidden md:flex space-x-8">
                <Statistic title="Đơn hàng" value={orderHistory.length} prefix={<ShoppingOutlined />} />
                <Statistic title="Yêu thích" value={12} prefix={<HeartOutlined />} />
              </div>
            </div>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultActiveKey="profile" size="large">
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  Thông tin cá nhân
                </span>
              }
              key="profile"
            >
              <Card className="rounded-xl">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={userData}
                  onFinish={handleUpdateProfile}
                  size="large"
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                      >
                        <Input placeholder="Nhập họ và tên" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email" },
                          { type: "email", message: "Email không hợp lệ" },
                        ]}
                      >
                        <Input placeholder="Nhập email" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item name="avatar" label="Ảnh đại diện">
                        <Upload>
                          <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                        </Upload>
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                      >
                        <Input.TextArea placeholder="Nhập địa chỉ chi tiết" rows={3} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      className="bg-primary hover:bg-primary/90 px-8 rounded-lg"
                    >
                      Cập nhật thông tin
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <ShoppingOutlined />
                  Lịch sử đơn hàng
                </span>
              }
              key="orders"
            >
              <Card className="rounded-xl">
                <Table
                  columns={orderColumns}
                  dataSource={orderHistory}
                  pagination={{ pageSize: 10 }}
                  className="rounded-lg"
                />
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <SettingOutlined />
                  Cài đặt
                </span>
              }
              key="settings"
            >
              <div className="space-y-6">
                <Card className="rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
                  <Form layout="vertical" size="large">
                    <Form.Item
                      name="currentPassword"
                      label="Mật khẩu hiện tại"
                      rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
                    >
                      <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      label="Mật khẩu mới"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới" },
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                      ]}
                    >
                      <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Xác nhận mật khẩu mới"
                      rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error("Mật khẩu xác nhận không khớp"))
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Xác nhận mật khẩu mới" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" size="large" className="bg-primary hover:bg-primary/90 px-8 rounded-lg">
                        Đổi mật khẩu
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>

                <Card className="rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Thông báo</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Nhận thông báo qua email</span>
                      <Button type="primary">Bật</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thông báo khuyến mãi</span>
                      <Button>Tắt</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thông báo đơn hàng</span>
                      <Button type="primary">Bật</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
