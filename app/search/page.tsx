"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Input, Card, Row, Col, Button, Select, Empty, Tag } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"
import { products, categories } from "@/lib/products"

const { Option } = Select

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        case "relevance":
        default:
          // Simple relevance: exact name matches first
          const aExact = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0
          const bExact = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0
          return bExact - aExact
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  const popularSearches = ["áo thun", "giày sneaker", "túi xách", "đồng hồ", "laptop", "váy"]

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Tìm kiếm sản phẩm</h1>
            <div className="max-w-2xl mx-auto">
              <Input.Search
                placeholder="Nhập từ khóa tìm kiếm..."
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                className="rounded-lg"
                enterButton={
                  <Button type="primary" className="bg-primary hover:bg-primary/90">
                    <SearchOutlined />
                  </Button>
                }
              />
            </div>
          </div>

          {/* Popular Searches */}
          {!searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Tìm kiếm phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <Tag
                      key={index}
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      onClick={() => handleSearch(term)}
                    >
                      {term}
                    </Tag>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Search Results */}
          {searchTerm && (
            <>
              {/* Filters and Sort */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <Card className="rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-foreground font-medium">
                        Tìm thấy {searchResults.length} kết quả cho "{searchTerm}"
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Select
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className="w-40"
                        placeholder="Danh mục"
                      >
                        {categories.map((category) => (
                          <Option key={category} value={category}>
                            {category}
                          </Option>
                        ))}
                      </Select>

                      <Select value={sortBy} onChange={setSortBy} className="w-40" placeholder="Sắp xếp">
                        <Option value="relevance">Liên quan nhất</Option>
                        <Option value="name">Tên A-Z</Option>
                        <Option value="price-low">Giá thấp đến cao</Option>
                        <Option value="price-high">Giá cao đến thấp</Option>
                        <Option value="rating">Đánh giá cao nhất</Option>
                      </Select>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Results Grid */}
              {searchResults.length > 0 ? (
                <Row gutter={[24, 24]}>
                  {searchResults.map((product, index) => (
                    <Col key={product.id} xs={24} sm={12} lg={8} xl={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/products/${product.id}`}>
                          <Card
                            hoverable
                            className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                            cover={
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            }
                          >
                            <div>
                              <Tag color="blue" className="mb-2">
                                {product.category}
                              </Tag>
                              <h4 className="font-semibold line-clamp-2 mb-2 h-12">{product.name}</h4>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-primary font-bold text-lg">
                                  {product.price.toLocaleString("vi-VN")}đ
                                </span>
                                <span className="text-muted-foreground text-sm">⭐ {product.rating}</span>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Empty
                    description={
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
                        <p className="text-muted-foreground">
                          Không có sản phẩm nào phù hợp với từ khóa "{searchTerm}"
                        </p>
                      </div>
                    }
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Gợi ý:</p>
                      <ul className="text-muted-foreground text-left space-y-1">
                        <li>• Kiểm tra lại chính tả</li>
                        <li>• Thử từ khóa khác</li>
                        <li>• Sử dụng từ khóa tổng quát hơn</li>
                      </ul>
                      <Link href="/products">
                        <Button type="primary" className="bg-primary hover:bg-primary/90">
                          Xem tất cả sản phẩm
                        </Button>
                      </Link>
                    </div>
                  </Empty>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
