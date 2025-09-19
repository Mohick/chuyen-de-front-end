"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, Row, Col, Statistic, Table, Button, Tag, Typography, Space, Avatar, List } from "antd"
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false)

  // Mock data
  const stats = [
    {
      title: "Tổng doanh thu",
      value: 125000000,
      prefix: "₫",
      suffix: "",
      color: "#3f8600",
      icon: <DollarOutlined />,
    },
    {
      title: "Đơn hàng",
      value: 1234,
      color: "#1890ff",
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Khách hàng",
      value: 5678,
      color: "#722ed1",
      icon: <UserOutlined />,
    },
    {
      title: "Tăng trưởng",
      value: 12.5,
      suffix: "%",
      color: "#52c41a",
      icon: <RiseOutlined />,
    },
  ]

  const recentOrders = [
    {
      key: "1",
      orderId: "#ORD-001",
      customer: "Nguyễn Văn A",
      amount: 1250000,
      status: "completed",
      date: "2024-01-15",
    },
    {
      key: "2",
      orderId: "#ORD-002",
      customer: "Trần Thị B",
      amount: 890000,
      status: "processing",
      date: "2024-01-15",
    },
    {
      key: "3",
      orderId: "#ORD-003",
      customer: "Lê Văn C",
      amount: 2100000,
      status: "pending",
      date: "2024-01-14",
    },
  ]

  const topProducts = [
    {
      name: "iPhone 15 Pro Max",
      sales: 156,
      revenue: 468000000,
    },
    {
      name: "Samsung Galaxy S24",
      sales: 134,
      revenue: 335000000,
    },
    {
      name: "MacBook Air M3",
      sales: 89,
      revenue: 267000000,
    },
    {
      name: 'iPad Pro 12.9"',
      sales: 67,
      revenue: 167500000,
    },
  ]

  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₫${amount.toLocaleString()}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          completed: "green",
          processing: "blue",
          pending: "orange",
        }
        const labels = {
          completed: "Hoàn thành",
          processing: "Đang xử lý",
          pending: "Chờ xử lý",
        }
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>
      },
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />}  />
          <Button icon={<EditOutlined />}  />
        </Space>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <Title level={1} className="text-3xl font-bold text-gray-900 mb-2">
                Bảng điều khiển Admin
              </Title>
              <Text className="text-gray-600">Quản lý cửa hàng và theo dõi hiệu suất kinh doanh</Text>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700 border-0 rounded-lg"
            >
              Thêm sản phẩm
            </Button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <Row gutter={[24, 24]} className="mb-8">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg rounded-2xl">
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    valueStyle={{ color: stat.color }}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`}
                      style={{ backgroundColor: stat.color }}
                    >
                      {stat.icon}
                    </div>
                    <Text className="text-green-600 text-sm">+8.2% từ tháng trước</Text>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {/* Recent Orders */}
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card
                title="Đơn hàng gần đây"
                className="border-0 shadow-lg rounded-2xl"
                extra={<Button type="link">Xem tất cả</Button>}
              >
                <Table columns={orderColumns} dataSource={recentOrders} pagination={false} size="middle" />
              </Card>
            </motion.div>
          </Col>

          {/* Top Products */}
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card title="Sản phẩm bán chạy" className="border-0 shadow-lg rounded-2xl h-full">
                <List
                  dataSource={topProducts}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar size="large" className="bg-blue-500">
                            {index + 1}
                          </Avatar>
                        }
                        title={item.name}
                        description={
                          <div>
                            <Text className="text-sm text-gray-600">{item.sales} đã bán</Text>
                            <br />
                            <Text className="text-sm font-medium text-green-600">₫{item.revenue.toLocaleString()}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Sales Chart Placeholder */}
        <Row gutter={[24, 24]} className="mt-8">
          <Col xs={24}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card title="Biểu đồ doanh thu" className="border-0 shadow-lg rounded-2xl">
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <Text className="text-gray-500 text-lg">Biểu đồ doanh thu sẽ được hiển thị tại đây</Text>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
