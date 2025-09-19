"use client"

import { Drawer, Button, List, InputNumber, Empty, Divider } from "antd"
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCart } from "@/lib/cart-context"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  return (
    <Drawer
      title={`Giỏ hàng (${itemCount} sản phẩm)`}
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      footer={
        items.length > 0 && (
          <div className="space-y-4">
            <Divider className="my-4" />
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-primary">{total.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="space-y-2">
              <Link href="/checkout">
                <Button type="primary" block size="large" className="bg-primary hover:bg-primary/90">
                  Thanh toán
                </Button>
              </Link>
              <Button block size="large" onClick={clearCart}>
                Xóa tất cả
              </Button>
            </div>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Empty image={<ShoppingOutlined className="text-6xl text-muted-foreground" />} description="Giỏ hàng trống">
            <Link href="/products">
              <Button type="primary" className="bg-primary hover:bg-primary/90">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </Empty>
        </div>
      ) : (
        <List
          dataSource={items}
          renderItem={(item, index) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <List.Item className="px-0">
                <div className="flex w-full space-x-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground line-clamp-2 mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.price.toLocaleString("vi-VN")}đ</p>
                    <div className="flex items-center justify-between">
                      <InputNumber
                        min={1}
                        max={99}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value || 1)}

                        className="w-20"
                      />
                      <Button
                        type="text"
                        danger

                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </div>
                </div>
              </List.Item>
            </motion.div>
          )}
        />
      )}
    </Drawer>
  )
}
