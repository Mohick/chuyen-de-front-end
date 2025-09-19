export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  rating: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: "Áo Thun Nam Cao Cấp",
    price: 299000,
    image: "/modern-men-s-t-shirt.jpg",
    description: "Áo thun nam chất liệu cotton cao cấp, thoáng mát và bền đẹp",
    category: "Thời trang nam",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Giày Sneaker Thể Thao",
    price: 899000,
    image: "/white-sneakers-shoes.jpg",
    description: "Giày sneaker thể thao phong cách, phù hợp cho mọi hoạt động",
    category: "Giày dép",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: "Túi Xách Nữ Thời Trang",
    price: 599000,
    image: "/elegant-women-s-handbag.jpg",
    description: "Túi xách nữ thiết kế sang trọng, chất liệu da cao cấp",
    category: "Phụ kiện",
    rating: 4.3,
    inStock: false,
  },
  {
    id: 4,
    name: "Đồng Hồ Nam Thông Minh",
    price: 1299000,
    image: "/modern-smartwatch.png",
    description: "Đồng hồ thông minh với nhiều tính năng hiện đại",
    category: "Công nghệ",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: "Váy Nữ Dự Tiệc",
    price: 799000,
    image: "/elegant-party-dress.jpg",
    description: "Váy nữ thiết kế thanh lịch, phù hợp cho các buổi tiệc",
    category: "Thời trang nữ",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 6,
    name: "Laptop Gaming Cao Cấp",
    price: 25999000,
    image: "/gaming-laptop-computer.jpg",
    description: "Laptop gaming hiệu năng cao, cấu hình mạnh mẽ",
    category: "Công nghệ",
    rating: 4.9,
    inStock: true,
  },
]

export const categories = ["Tất cả", "Thời trang nam", "Thời trang nữ", "Giày dép", "Phụ kiện", "Công nghệ"]
