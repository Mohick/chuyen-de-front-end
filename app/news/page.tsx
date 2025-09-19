"use client"

import { motion } from "framer-motion"
import { Row, Col, Card, Tag, Input, Button } from "antd"
import { SearchOutlined, CalendarOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import LayoutWrapper from "@/components/layout-wrapper"

const { Meta } = Card

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  views: number
  featured: boolean
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Xu hướng thời trang mùa hè 2024: Những gam màu nổi bật",
    excerpt:
      "Khám phá những xu hướng thời trang hot nhất mùa hè này với các gam màu tươi sáng và phong cách năng động.",
    content: "Nội dung chi tiết về xu hướng thời trang...",
    image: "/placeholder.svg?key=fashion-trend",
    author: "Nguyễn Thị Mai",
    date: "2024-03-15",
    category: "Thời trang",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 sản phẩm công nghệ đáng mua nhất tháng 3",
    excerpt: "Danh sách những sản phẩm công nghệ được đánh giá cao nhất trong tháng với tính năng vượt trội.",
    content: "Nội dung chi tiết về sản phẩm công nghệ...",
    image: "/placeholder.svg?key=tech-products",
    author: "Trần Văn Nam",
    date: "2024-03-12",
    category: "Công nghệ",
    views: 980,
    featured: true,
  },
  {
    id: 3,
    title: "Bí quyết chọn giày phù hợp với từng dáng chân",
    excerpt: "Hướng dẫn chi tiết cách chọn giày phù hợp để tôn lên vẻ đẹp và đảm bảo sự thoải mái khi di chuyển.",
    content: "Nội dung chi tiết về cách chọn giày...",
    image: "/placeholder.svg?key=shoe-guide",
    author: "Lê Thị Hoa",
    date: "2024-03-10",
    category: "Hướng dẫn",
    views: 756,
    featured: false,
  },
  {
    id: 4,
    title: "Chương trình khuyến mãi lớn nhất năm - Giảm giá đến 50%",
    excerpt: "Đừng bỏ lỡ cơ hội mua sắm với mức giảm giá hấp dẫn nhất trong năm cho tất cả các danh mục sản phẩm.",
    content: "Nội dung chi tiết về chương trình khuyến mãi...",
    image: "/placeholder.svg?key=sale-promotion",
    author: "ShopVN Team",
    date: "2024-03-08",
    category: "Khuyến mãi",
    views: 2100,
    featured: true,
  },
  {
    id: 5,
    title: "Cách bảo quản túi xách da để luôn như mới",
    excerpt: "Những mẹo hay giúp bạn bảo quản túi xách da bền đẹp theo thời gian và tránh các tác nhân gây hại.",
    content: "Nội dung chi tiết về bảo quản túi xách...",
    image: "/placeholder.svg?key=bag-care",
    author: "Phạm Thị Lan",
    date: "2024-03-05",
    category: "Hướng dẫn",
    views: 432,
    featured: false,
  },
  {
    id: 6,
    title: "Review chi tiết laptop gaming mới nhất 2024",
    excerpt: "Đánh giá toàn diện về hiệu năng, thiết kế và giá cả của những chiếc laptop gaming hot nhất hiện tại.",
    content: "Nội dung chi tiết về laptop gaming...",
    image: "/placeholder.svg?key=laptop-review",
    author: "Hoàng Văn Đức",
    date: "2024-03-03",
    category: "Review",
    views: 1680,
    featured: false,
  },
]

const categories = ["Tất cả", "Thời trang", "Công nghệ", "Hướng dẫn", "Khuyến mãi", "Review"]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Tin tức & Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về sản phẩm, xu hướng thời trang và công nghệ
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="bg-card rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Row gutter={[16, 16]} className="w-full">
            {/* Search Input - full width */}
            <Col span={24}>
              <Input
                placeholder="Tìm kiếm bài viết..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg w-full h-12"
              />
            </Col>

            {/* Category Buttons - full width, xuống dưới */}
            <Col span={24}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type={selectedCategory === category ? "primary" : "default"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-lg"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>


        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Bài viết nổi bật</h2>
            <Row gutter={[24, 24]}>
              {featuredArticles.map((article, index) => (
                <Col key={article.id} xs={24} lg={index === 0 ? 12 : 6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      hoverable
                      className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                      cover={
                        <div className={`relative overflow-hidden ${index === 0 ? "h-64" : "h-48"}`}>
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Tag color="red">Nổi bật</Tag>
                          </div>
                        </div>
                      }
                    >
                      <Meta
                        title={
                          <Link href={`/news/${article.id}`} className="hover:text-primary">
                            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{article.title}</h3>
                          </Link>
                        }
                        description={
                          <div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                  <UserOutlined />
                                  <span>{article.author}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <CalendarOutlined />
                                  <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <EyeOutlined />
                                <span>{article.views}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Tag color="blue">{article.category}</Tag>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Tất cả bài viết</h2>
            <Row gutter={[24, 24]}>
              {regularArticles.map((article, index) => (
                <Col key={article.id} xs={24} md={12} lg={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      hoverable
                      className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                      cover={
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={
                          <Link href={`/news/${article.id}`} className="hover:text-primary">
                            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{article.title}</h3>
                          </Link>
                        }
                        description={
                          <div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                  <UserOutlined />
                                  <span>{article.author}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <CalendarOutlined />
                                  <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <EyeOutlined />
                                <span>{article.views}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Tag color="blue">{article.category}</Tag>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy bài viết</h3>
            <p className="text-muted-foreground mb-4">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
            <Button
              type="primary"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Tất cả")
              }}
            >
              Xóa bộ lọc
            </Button>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Đăng ký nhận tin tức mới nhất</h3>
          <p className="text-muted-foreground mb-6">
            Nhận thông báo về các bài viết mới và xu hướng thời trang công nghệ hot nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Nhập email của bạn" className="rounded-lg h-12" />
            <Button type="primary" size="large" className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-lg">
              Đăng ký
            </Button>
          </div>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
