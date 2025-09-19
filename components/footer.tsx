"use client"

import { motion } from "framer-motion"
import { Layout, Row, Col, Input, Button } from "antd"
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Footer: AntFooter } = Layout

export default function Footer() {
  const quickLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Tin tức", href: "/news" },
    { label: "Liên hệ", href: "/contact" },
    { label: "Giới thiệu", href: "/about" },
  ]

  const categories = [
    { label: "Thời trang nam", href: "/products?category=men" },
    { label: "Thời trang nữ", href: "/products?category=women" },
    { label: "Giày dép", href: "/products?category=shoes" },
    { label: "Phụ kiện", href: "/products?category=accessories" },
    { label: "Công nghệ", href: "/products?category=tech" },
  ]

  const socialLinks = [
    { icon: <FacebookOutlined />, href: "#", color: "#1877f2" },
    { icon: <TwitterOutlined />, href: "#", color: "#1da1f2" },
    { icon: <InstagramOutlined />, href: "#", color: "#e4405f" },
    { icon: <YoutubeOutlined />, href: "#", color: "#ff0000" },
  ]

  return (
    <AntFooter className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Row gutter={[32, 32]} className="py-12">
          {/* Company Info */}
          <Col xs={24} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">ShopVN</h3>
              <p className="text-muted-foreground mb-4">
                Cửa hàng trực tuyến hàng đầu Việt Nam, cung cấp các sản phẩm chất lượng cao với giá cả hợp lý.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <EnvironmentOutlined />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <PhoneOutlined />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MailOutlined />
                  <span>info@shopvn.com</span>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Categories */}
          <Col xs={24} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Danh mục</h4>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link href={category.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Newsletter */}
          <Col xs={24} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Đăng ký nhận tin</h4>
              <p className="text-muted-foreground mb-4">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
              <div className="space-y-3">
                <Input placeholder="Email của bạn" prefix={<MailOutlined />} className="rounded-lg" />
                <Button type="primary" block className="rounded-lg bg-primary hover:bg-primary/90">
                  Đăng ký
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 mt-6 ">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center fill-white text-white hover:text-white transition-colors"
                    style={{ backgroundColor: social.color, color: 'white'}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-border py-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            © 2024 ShopVN. Tất cả quyền được bảo lưu. |
            <Link href="/privacy" className="hover:text-primary ml-1">
              Chính sách bảo mật
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-primary ml-1">
              Điều khoản sử dụng
            </Link>
          </p>
        </motion.div>
      </div>
    </AntFooter>
  )
}
