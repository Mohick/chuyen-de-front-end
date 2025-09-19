"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, Typography, Row, Col, Button, Badge } from "antd"
import {
  ShoppingOutlined,
  MobileOutlined,
  LaptopOutlined,
  HomeOutlined,
  CarOutlined,
  BookOutlined,
  HeartOutlined,
  GiftOutlined,
  CrownOutlined,
  BugOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Title, Text } = Typography

const categories = [
  {
    id: "fashion",
    name: "Thời trang",
    icon: <ShoppingOutlined />,
    color: "bg-pink-500",
    count: 1250,
    description: "Quần áo, giày dép, phụ kiện thời trang",
  },
  {
    id: "electronics",
    name: "Điện tử",
    icon: <MobileOutlined />,
    color: "bg-blue-500",
    count: 890,
    description: "Điện thoại, máy tính bảng, phụ kiện",
  },
  {
    id: "computers",
    name: "Máy tính",
    icon: <LaptopOutlined />,
    color: "bg-purple-500",
    count: 456,
    description: "Laptop, PC, linh kiện máy tính",
  },
  {
    id: "home",
    name: "Nhà cửa",
    icon: <HomeOutlined />,
    color: "bg-green-500",
    count: 678,
    description: "Nội thất, đồ gia dụng, trang trí",
  },
  {
    id: "automotive",
    name: "Ô tô - Xe máy",
    icon: <CarOutlined />,
    color: "bg-red-500",
    count: 234,
    description: "Phụ tùng, phụ kiện xe hơi, xe máy",
  },
  {
    id: "books",
    name: "Sách - Văn phòng phẩm",
    icon: <BookOutlined />,
    color: "bg-yellow-500",
    count: 567,
    description: "Sách, văn phòng phẩm, dụng cụ học tập",
  },
  {
    id: "health",
    name: "Sức khỏe - Làm đẹp",
    icon: <HeartOutlined />,
    color: "bg-rose-500",
    count: 789,
    description: "Mỹ phẩm, chăm sóc sức khỏe",
  },
  {
    id: "gifts",
    name: "Quà tặng",
    icon: <GiftOutlined />,
    color: "bg-orange-500",
    count: 345,
    description: "Quà lưu niệm, đồ handmade",
  },
  {
    id: "luxury",
    name: "Hàng cao cấp",
    icon: <CrownOutlined />,
    color: "bg-amber-500",
    count: 123,
    description: "Đồng hồ, trang sức, hàng hiệu",
  },
  {
    id: "pets",
    name: "Thú cưng",
    icon: <BugOutlined />,
    color: "bg-teal-500",
    count: 234,
    description: "Thức ăn, đồ chơi, phụ kiện thú cưng",
  },
]

export default function CategoriesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Title level={1} className="text-4xl font-bold text-gray-900 mb-4">
            Danh mục sản phẩm
          </Title>
          <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá hàng ngàn sản phẩm chất lượng trong các danh mục đa dạng
          </Text>
        </motion.div>

        <Row gutter={[24, 24]}>
          {categories.map((category, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Link href={`/products?category=${category.id}`}>
                  <Card
                    hoverable
                    className="h-full border-0 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                    bodyStyle={{ padding: "24px" }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: hoveredCard === category.id ? 1.1 : 1,
                          rotate: hoveredCard === category.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl`}
                      >
                        {category.icon}
                      </motion.div>

                      <Title level={4} className="text-gray-900 mb-2">
                        {category.name}
                      </Title>

                      <Text className="text-gray-600 text-sm mb-4 block">{category.description}</Text>

                      <Badge
                        count={`${category.count} sản phẩm`}
                        style={{
                          backgroundColor: "#f0f0f0",
                          color: "#666",
                          border: "none",
                        }}
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-2xl">
            <div className="py-8">
              <Title level={2} className="text-white mb-4">
                Không tìm thấy danh mục phù hợp?
              </Title>
              <Text className="text-blue-100 text-lg mb-6 block">Liên hệ với chúng tôi để đề xuất danh mục mới</Text>
              <Button size="large" className="bg-white text-blue-600 border-0 rounded-lg px-8 hover:bg-gray-100">
                Liên hệ ngay
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
