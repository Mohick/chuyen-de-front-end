"use client"

import { motion } from "framer-motion"
import { Button, Row, Col, Card, Rate, Badge } from "antd"
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

const { Meta } = Card

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const { addItem } = useCart()

  const stats = [
    { number: "10K+", label: "Khách hàng hài lòng" },
    { number: "500+", label: "Sản phẩm chất lượng" },
    { number: "50+", label: "Thương hiệu uy tín" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ]

  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                  Khám phá thế giới <span className="text-primary">mua sắm</span> trực tuyến
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-pretty">
                  Tìm kiếm những sản phẩm chất lượng cao với giá cả hợp lý. Giao hàng nhanh chóng và dịch vụ khách hàng
                  tận tâm.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products">
                    <Button
                      type="primary"
                      size="large"
                      className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
                    >
                      Khám phá ngay
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="large"
                      className="h-12 px-8 rounded-lg font-semibold border-primary text-primary hover:bg-primary/5"
                    >
                      Tìm hiểu thêm
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/modern-ecommerce-hero-shopping-bags-products.jpg"
                    alt="Hero Shopping"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm font-medium">Giao hàng nhanh</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                    <span className="text-sm font-medium">Chất lượng cao</span>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={6}>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Sản phẩm nổi bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá những sản phẩm được yêu thích nhất với chất lượng đảm bảo và giá cả hợp lý
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {featuredProducts.map((product, index) => (
              <Col key={product.id} xs={24} sm={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    hoverable
                    className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    cover={
                      <div className="relative h-48 overflow-hidden group">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute top-2 left-2">
                            <Badge.Ribbon text="Hết hàng" color="red" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<EyeOutlined />}
                              className="bg-white/90 text-foreground hover:bg-white border-none"
                            />
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<HeartOutlined />}
                              className="bg-white/90 text-foreground hover:bg-white border-none"
                            />
                          </div>
                        </div>
                      </div>
                    }
                    actions={[
                      <div className="p-2">
                        <Button
                          key="cart"
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          disabled={!product.inStock}
                          className="bg-primary  hover:bg-primary/90 border-none"
                          block
                          onClick={() => addItem(product)}
                        >
                          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                        </Button>
                      </div>,
                    ]}
                  >
                    <Meta
                      title={
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">{product.name}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <Rate disabled defaultValue={product.rating} />
                            <span className="text-xs text-muted-foreground">({product.rating})</span>
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              {product.price.toLocaleString("vi-VN")}đ
                            </span>
                            <span className="text-xs  text-muted-foreground bg-muted px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <Button
                type="primary"
                size="large"
                className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
              >
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Đăng ký nhận thông tin ưu đãi</h2>
            <p className="text-lg text-white/90 mb-8">
              Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên và cập nhật về các sản phẩm mới nhất
            </p>
            <div className="flex items-center flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1  bg-white  px-4 py-3 rounded-lg border-none outline-none text-foreground"
              />
              <Button
                type="default"
                size="large"
                className="bg-white text-primary hover:bg-white/90 border-none h-12 px-6 rounded-lg font-semibold"
              >
                Đăng ký
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </LayoutWrapper>
  )
}
