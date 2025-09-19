"use client"

import { motion } from "framer-motion"
import { Row, Col, Card, Statistic } from "antd"
import { TeamOutlined, ShopOutlined, TrophyOutlined, HeartOutlined } from "@ant-design/icons"
import Image from "next/image"
import LayoutWrapper from "@/components/layout-wrapper"

export default function AboutPage() {
  const stats = [
    { title: "Khách hàng hài lòng", value: 10000, suffix: "+", icon: <HeartOutlined /> },
    { title: "Sản phẩm chất lượng", value: 500, suffix: "+", icon: <ShopOutlined /> },
    { title: "Nhân viên tận tâm", value: 50, suffix: "+", icon: <TeamOutlined /> },
    { title: "Giải thưởng", value: 15, suffix: "+", icon: <TrophyOutlined /> },
  ]

  const team = [
    {
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      image: "/placeholder.svg?key=ceo",
      description: "Với hơn 10 năm kinh nghiệm trong lĩnh vực thương mại điện tử",
    },
    {
      name: "Trần Thị B",
      position: "Marketing Director",
      image: "/placeholder.svg?key=marketing",
      description: "Chuyên gia marketing với nhiều chiến dịch thành công",
    },
    {
      name: "Lê Văn C",
      position: "Technical Lead",
      image: "/placeholder.svg?key=tech",
      description: "Kỹ sư phần mềm với chuyên môn cao về công nghệ web",
    },
  ]

  const values = [
    {
      title: "Chất lượng",
      description: "Cam kết cung cấp sản phẩm chất lượng cao nhất cho khách hàng",
      icon: "🏆",
    },
    {
      title: "Tận tâm",
      description: "Phục vụ khách hàng với sự tận tâm và chuyên nghiệp",
      icon: "❤️",
    },
    {
      title: "Đổi mới",
      description: "Không ngừng cải tiến và áp dụng công nghệ mới",
      icon: "🚀",
    },
    {
      title: "Tin cậy",
      description: "Xây dựng lòng tin với khách hàng qua từng giao dịch",
      icon: "🤝",
    },
  ]

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Về chúng tôi</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ShopVN được thành lập với sứ mệnh mang đến trải nghiệm mua sắm trực tuyến tuyệt vời nhất cho người tiêu dùng
            Việt Nam. Chúng tôi cam kết cung cấp sản phẩm chất lượng cao với dịch vụ khách hàng tận tâm.
          </p>
        </motion.div>

        {/* Company Story */}
        <Row gutter={[48, 48]} align="middle" className="mb-16">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Được thành lập vào năm 2020, ShopVN bắt đầu từ một ý tưởng đơn giản: tạo ra một nền tảng mua sắm trực
                  tuyến mà mọi người Việt Nam đều có thể tin tưởng và yêu thích.
                </p>
                <p>
                  Từ một team nhỏ chỉ 3 người, chúng tôi đã phát triển thành một công ty với hơn 50 nhân viên tận tâm,
                  phục vụ hàng chục nghìn khách hàng trên toàn quốc.
                </p>
                <p>
                  Chúng tôi tự hào là một trong những nền tảng thương mại điện tử được yêu thích nhất tại Việt Nam, với
                  cam kết không ngừng cải tiến để mang lại trải nghiệm tốt nhất cho khách hàng.
                </p>
              </div>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image src="/placeholder.svg?key=company-story" alt="Company Story" fill className="object-cover" />
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Statistics */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={6}>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl text-primary mb-2">{stat.icon}</div>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: "#0891b2", fontSize: "2rem", fontWeight: "bold" }}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Giá trị cốt lõi</h2>
            <p className="text-lg text-muted-foreground">Những giá trị định hướng mọi hoạt động của chúng tôi</p>
          </div>

          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col key={index} xs={24} md={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-lg text-muted-foreground">Những con người tài năng đứng sau thành công của ShopVN</p>
          </div>

          <Row gutter={[24, 24]} justify="center">
            {team.map((member, index) => (
              <Col key={index} xs={24} md={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </LayoutWrapper>
  )
}
