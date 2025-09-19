"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button, Rate, InputNumber, Tabs, Card, Row, Col, Tag, Avatar, Progress, message } from "antd"
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  TruckOutlined,
  SafetyOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import LayoutWrapper from "@/components/layout-wrapper"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

const { TabPane } = Tabs

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <LayoutWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
            <Button type="primary" onClick={() => router.push("/products")}>
              Quay lại cửa hàng
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    message.success(isWishlisted ? "Đã xóa khỏi wishlist" : "Đã thêm vào wishlist")
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất tốt, chất lượng như mô tả. Giao hàng nhanh!",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      comment: "Đẹp, chất lượng ổn. Giá hơi cao một chút nhưng xứng đáng.",
      date: "2024-01-10",
    },
  ]

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Trang chủ
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-primary">
              Sản phẩm
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <Row gutter={[48, 48]}>
            {/* Product Images */}
            <Col xs={24} lg={12}>
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">Hết hàng</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail images */}
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            {/* Product Info */}
            <Col xs={24} lg={12}>
              <div className="space-y-6">
                <div>
                  <Tag color="blue" className="mb-2">
                    {product.category}
                  </Tag>
                  <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

                  <div className="flex items-center space-x-4 mb-4">
                    <Rate disabled defaultValue={product.rating} />
                    <span className="text-muted-foreground">({product.rating} sao)</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">156 đánh giá</span>
                  </div>

                  <div className="text-3xl font-bold text-primary mb-6">{product.price.toLocaleString("vi-VN")}đ</div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-foreground font-medium">Số lượng:</span>
                    <InputNumber
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      className="w-24"
                    />
                    <span className="text-muted-foreground">{product.inStock ? "Còn hàng" : "Hết hàng"}</span>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      disabled={!product.inStock}
                      onClick={handleAddToCart}
                      className="bg-primary hover:bg-primary/90 flex-1 h-12 rounded-lg font-semibold"
                    >
                      Thêm vào giỏ hàng
                    </Button>

                    <Button
                      size="large"
                      icon={<HeartOutlined />}
                      onClick={handleWishlist}
                      className={`h-12 px-6 rounded-lg ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                    />

                    <Button size="large" icon={<ShareAltOutlined />} className="h-12 px-6 rounded-lg" />
                  </div>

                  <Link href="/checkout">
                    <Button
                      size="large"
                      disabled={!product.inStock}
                      className="w-full h-12 rounded-lg font-semibold border-primary text-primary hover:bg-primary/5"
                    >
                      Mua ngay
                    </Button>
                  </Link>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="flex items-center space-x-3">
                    <TruckOutlined className="text-primary text-xl" />
                    <div>
                      <div className="font-medium">Giao hàng nhanh</div>
                      <div className="text-sm text-muted-foreground">2-3 ngày</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <SafetyOutlined className="text-primary text-xl" />
                    <div>
                      <div className="font-medium">Bảo hành</div>
                      <div className="text-sm text-muted-foreground">12 tháng</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <ReloadOutlined className="text-primary text-xl" />
                    <div>
                      <div className="font-medium">Đổi trả</div>
                      <div className="text-sm text-muted-foreground">7 ngày</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultActiveKey="description" size="large">
              <TabPane tab="Mô tả sản phẩm" key="description">
                <Card className="rounded-xl">
                  <div className="prose max-w-none">
                    <h3>Thông tin chi tiết</h3>
                    <p>{product.description}</p>
                    <p>
                      Sản phẩm được thiết kế với chất lượng cao, đảm bảo độ bền và tính thẩm mỹ. Phù hợp cho nhiều đối
                      tượng khách hàng với thiết kế hiện đại và tiện dụng.
                    </p>

                    <h4>Đặc điểm nổi bật:</h4>
                    <ul>
                      <li>Chất lượng cao, bền đẹp</li>
                      <li>Thiết kế hiện đại, thời trang</li>
                      <li>Giá cả hợp lý, phù hợp túi tiền</li>
                      <li>Bảo hành chính hãng</li>
                    </ul>
                  </div>
                </Card>
              </TabPane>

              <TabPane tab={`Đánh giá (${reviews.length})`} key="reviews">
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <Card className="rounded-xl">
                    <Row gutter={[24, 24]}>
                      <Col xs={24} md={8}>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary mb-2">{product.rating}</div>
                          <Rate disabled defaultValue={product.rating} className="mb-2" />
                          <div className="text-muted-foreground">156 đánh giá</div>
                        </div>
                      </Col>
                      <Col xs={24} md={16}>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center space-x-2">
                              <span className="w-8">{star} ⭐</span>
                              <Progress
                                percent={star === 5 ? 70 : star === 4 ? 20 : 10}
                                showInfo={false}
                                className="flex-1"
                              />
                              <span className="text-muted-foreground text-sm w-12">
                                {star === 5 ? 109 : star === 4 ? 31 : 16}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Card>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="rounded-xl">
                        <div className="flex items-start space-x-4">
                          <Avatar icon={<UserOutlined />} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">{review.user}</span>
                              <Rate disabled defaultValue={review.rating}  />
                              <span className="text-muted-foreground text-sm">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Sản phẩm liên quan</h2>
              <Row gutter={[24, 24]}>
                {relatedProducts.map((relatedProduct, index) => (
                  <Col key={relatedProduct.id} xs={24} sm={12} lg={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/products/${relatedProduct.id}`}>
                        <Card
                          hoverable
                          className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                          cover={
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={relatedProduct.image || "/placeholder.svg"}
                                alt={relatedProduct.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          }
                        >
                          <div>
                            <h4 className="font-semibold line-clamp-1 mb-2">{relatedProduct.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-primary font-bold">
                                {relatedProduct.price.toLocaleString("vi-VN")}đ
                              </span>
                              <Rate disabled defaultValue={relatedProduct.rating}  />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
