"use client"

import { motion } from "framer-motion"
import { Button, Card, InputNumber, Typography, Divider, Empty } from "antd"
import { DeleteOutlined, ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"
import { useCart } from "@/lib/cart-context"

const { Title, Text } = Typography

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <Empty
              image={<ShoppingCartOutlined className="text-6xl text-muted-foreground" />}
              description={
                <div>
                  <Title level={3} className="text-muted-foreground">
                    Giỏ hàng trống
                  </Title>
                  <Text className="text-muted-foreground">Bạn chưa có sản phẩm nào trong giỏ hàng</Text>
                </div>
              }
            >
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-lg font-semibold"
                >
                  Tiếp tục mua sắm
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
          <div className="flex items-center mb-8">
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="mr-4">
              Quay lại
            </Button>
            <Title level={2}>Giỏ hàng của bạn ({items.length} sản phẩm)</Title>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="rounded-xl shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">IMG</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <Title level={5} className="mb-1 line-clamp-1">
                            {item.name}
                          </Title>
                          <Text className="text-muted-foreground text-sm">{item.category}</Text>
                          <div className="mt-2">
                            <Text className="text-lg font-semibold text-primary">
                              {item.price.toLocaleString("vi-VN")}đ
                            </Text>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Text className="text-sm text-muted-foreground">Số lượng:</Text>
                            <InputNumber
                              min={1}
                              max={99}
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.id, value || 1)}
                              className="w-20"
                            />
                          </div>

                          <div className="text-right min-w-[100px]">
                            <Text className="text-lg font-bold">
                              {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                            </Text>
                          </div>

                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeItem(item.id)}
                            className="hover:bg-red-50"
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="rounded-xl shadow-sm sticky top-4">
                  <Title level={4} className="mb-4">
                    Tóm tắt đơn hàng
                  </Title>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <Text>Tạm tính:</Text>
                      <Text>{getTotalPrice().toLocaleString("vi-VN")}đ</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Phí vận chuyển:</Text>
                      <Text className="text-green-600">Miễn phí</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Giảm giá:</Text>
                      <Text>0đ</Text>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <Title level={5}>Tổng cộng:</Title>
                      <Title level={5} className="text-primary">
                        {getTotalPrice().toLocaleString("vi-VN")}đ
                      </Title>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/checkout">
                      <Button
                        type="primary"
                        size="large"
                        block
                        className="bg-primary hover:bg-primary/90 h-12 rounded-lg font-semibold"
                      >
                        Tiến hành thanh toán
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button
                        size="large"
                        block
                        className="h-12 rounded-lg font-semibold border-primary text-primary hover:bg-primary/5"
                      >
                        Tiếp tục mua sắm
                      </Button>
                    </Link>
                  </div>

                  <Divider />

                  <div className="text-center">
                    <Text className="text-muted-foreground text-sm">
                      🚚 Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                    </Text>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
