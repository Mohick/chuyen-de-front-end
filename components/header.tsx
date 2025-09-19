"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout, Badge } from "antd"
import {
  HomeOutlined,
  ShopOutlined,
  ContactsOutlined,
  ReadOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import CartDrawer from "./cart-drawer"

const { Header: AntHeader } = Layout

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { key: "/", label: "Trang chủ", icon: <HomeOutlined /> },
    { key: "/products", label: "Sản phẩm", icon: <ShopOutlined /> },
    { key: "/news", label: "Tin tức", icon: <ReadOutlined /> },
    { key: "/contact", label: "Liên hệ", icon: <ContactsOutlined /> },
    { key: "/about", label: "Giới thiệu", icon: <InfoCircleOutlined /> },
  ]

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AntHeader className="px-4 lg:px-8 h-16 flex items-center justify-between border-none">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ShopVN
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link key={item.key} href={item.key}>
                <motion.div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.key
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link href="/search">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SearchOutlined className="text-xl text-foreground hover:text-primary cursor-pointer" />
              </motion.div>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <HeartOutlined className="text-xl text-foreground hover:text-primary cursor-pointer" />
              </motion.div>
            </Link>

            {/* Profile */}
            <Link href="/profile">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <UserOutlined className="text-xl text-foreground hover:text-primary cursor-pointer" />
              </motion.div>
            </Link>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Badge count={itemCount} >
                <ShoppingCartOutlined
                  className="text-xl text-foreground hover:text-primary cursor-pointer"
                  onClick={() => setIsCartOpen(true)}
                />
              </Badge>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuOutlined className="text-xl" />
            </button>
          </div>
        </AntHeader>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link key={item.key} href={item.key}>
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.key
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}

              <Link href="/search">
                <motion.div
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <SearchOutlined />
                  <span className="font-medium">Tìm kiếm</span>
                </motion.div>
              </Link>

              <Link href="/wishlist">
                <motion.div
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HeartOutlined />
                  <span className="font-medium">Yêu thích</span>
                </motion.div>
              </Link>

              <Link href="/profile">
                <motion.div
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserOutlined />
                  <span className="font-medium">Tài khoản</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
