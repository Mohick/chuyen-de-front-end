"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Row, Col, Card, Button, Select, Input, Slider, Rate, Badge, Drawer, Space, Tag } from "antd"
import {
  SearchOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"
import { products, categories, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

const { Meta } = Card
const { Option } = Select

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const { addItem } = useCart()

  const maxPrice = Math.max(...products.map((p) => p.price))

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, priceRange, sortBy])

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Danh mục</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Khoảng giá</h4>
        <Slider
          range
          min={0}
          max={maxPrice}
          step={100000}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
          tooltip={{
            formatter: (value) => `${value?.toLocaleString("vi-VN")}đ`,
          }}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>{priceRange[0].toLocaleString("vi-VN")}đ</span>
          <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        block
        onClick={() => {
          setSelectedCategory("Tất cả")
          setPriceRange([0, maxPrice])
          setSearchTerm("")
        }}
      >
        Xóa bộ lọc
      </Button>
    </div>
  )

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        hoverable
        className={`h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex-row" : ""
          }`}
        cover={
          <div className={`relative overflow-hidden group ${viewMode === "list" ? "w-48 h-48" : "h-64"}`}>
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
                <Link href={`/products/${product.id}`}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EyeOutlined />}
                    className="bg-white/90 text-foreground hover:bg-white border-none"
                  />
                </Link>
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
                <span className="text-lg font-bold text-primary">{product.price.toLocaleString("vi-VN")}đ</span>
                <Tag color="blue" className="text-xs">
                  {product.category}
                </Tag>
              </div>
            </div>
          }
        />
      </Card>
    </motion.div>
  )

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Cửa hàng sản phẩm</h1>
          <p className="text-lg text-muted-foreground">
            Khám phá bộ sưu tập đa dạng với hơn {products.length} sản phẩm chất lượng
          </p>
        </motion.div>

        <Row gutter={[24, 24]}>
          {/* Desktop Sidebar */}
          <Col xs={0} lg={6}>
            <motion.div
              className="bg-card rounded-xl p-6 sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">Bộ lọc</h3>
              <FilterContent />
            </motion.div>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18}>
            {/* Search and Controls */}
            <motion.div
              className="bg-card rounded-xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={8}>
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-lg"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Select value={sortBy} onChange={setSortBy} className="w-full" placeholder="Sắp xếp theo">
                    <Option value="name">Tên A-Z</Option>
                    <Option value="price-low">Giá thấp đến cao</Option>
                    <Option value="price-high">Giá cao đến thấp</Option>
                    <Option value="rating">Đánh giá cao nhất</Option>
                  </Select>
                </Col>
                <Col xs={12} md={4}>
                  <Space>
                    <Button
                      type={viewMode === "grid" ? "primary" : "default"}
                      icon={<AppstoreOutlined />}
                      onClick={() => setViewMode("grid")}
                    />
                    <Button
                      type={viewMode === "list" ? "primary" : "default"}
                      icon={<BarsOutlined />}
                      onClick={() => setViewMode("list")}
                    />
                  </Space>
                </Col>
                <Col xs={24} md={6} className="lg:hidden">
                  <Button block icon={<FilterOutlined />} onClick={() => setFilterDrawerOpen(true)}>
                    Bộ lọc
                  </Button>
                </Col>
              </Row>
            </motion.div>

            {/* Results Info */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground">
                Hiển thị {filteredProducts.length} sản phẩm
                {selectedCategory !== "Tất cả" && ` trong danh mục "${selectedCategory}"`}
                {searchTerm && ` cho "${searchTerm}"`}
              </p>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <Row gutter={[24, 24]}>
                {filteredProducts.map((product, index) => (
                  <Col key={product.id} xs={24} sm={viewMode === "grid" ? 12 : 24} lg={viewMode === "grid" ? 8 : 24}>
                    <ProductCard product={product} index={index} />
                  </Col>
                ))}
              </Row>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <Button
                  type="dashed"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Tất cả")
                    setPriceRange([0, maxPrice])
                  }}

                >
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}
          </Col>
        </Row>

        {/* Mobile Filter Drawer */}
        <Drawer
          title="Bộ lọc sản phẩm"
          placement="left"
          onClose={() => setFilterDrawerOpen(false)}
          open={filterDrawerOpen}
          width={300}
        >
          <FilterContent />
        </Drawer>
      </div>
    </LayoutWrapper>
  )
}
