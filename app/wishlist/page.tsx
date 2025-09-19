"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button, Card, Row, Col, Empty, Rate, message } from "antd"
import { HeartOutlined, ShoppingCartOutlined, DeleteOutlined, HeartFilled } from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  // Mock wishlist - in real app this would come from context/state management
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 3))
  const { addItem } = useCart()

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
    message.success("Đã xóa khỏi danh sách yêu thích")
  }

  const addToCart = (product: any) => {
    addItem(product)
    message.success("Đã thêm vào giỏ hàng")
  }

  if (wishlistItems.length === 0) {
    return (
      <LayoutWrapper>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <Empty
              image={<HeartOutlined className="text-6xl text-muted-foreground" />}
              description={
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Danh sách yêu thích trống</h2>
                  <p className="text-muted-foreground">Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
                </div>
              }
            >
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
                >
                  Khám phá sản phẩm
                </Button>
              </Link>
            </Empty>
          </motion.div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Danh sách yêu thích</h1>
              <p className="text-muted-foreground">Bạn có {wishlistItems.length} sản phẩm trong danh sách yêu thích</p>
            </div>

            <HeartFilled className="text-4xl text-red-500" />
          </div>

          <Row gutter={[24, 24]}>
            {wishlistItems.map((product, index) => (
              <Col key={product.id} xs={24} sm={12} lg={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    cover={
                      <div className="relative h-64 overflow-hidden group">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Remove from wishlist button */}
                        <Button
                          type="primary"
                          danger
                          shape="circle"
                          icon={<DeleteOutlined />}
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromWishlist(product.id)}
                        />
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-2">
                          <Rate disabled defaultValue={product.rating}  />
                          <span className="text-xs text-muted-foreground">({product.rating})</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price.toLocaleString("vi-VN")}đ</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          disabled={!product.inStock}
                          onClick={() => addToCart(product)}
                          className="bg-primary hover:bg-primary/90 flex-1 rounded-lg"
                        >
                          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                        </Button>

                        <Button
                          danger
                          icon={<HeartOutlined />}
                          onClick={() => removeFromWishlist(product.id)}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button
                size="large"
                className="h-12 px-8 rounded-lg font-semibold border-primary text-primary hover:bg-primary/5"
              >
                Tiếp tục khám phá sản phẩm
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
