import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ConfigProvider } from "antd"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShopVN - Cửa hàng trực tuyến hàng đầu Việt Nam",
  description:
    "Khám phá thế giới mua sắm trực tuyến với ShopVN - Sản phẩm chất lượng, giá cả hợp lý, giao hàng nhanh chóng",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0891b2",
                colorSuccess: "#10b981",
                colorWarning: "#f59e0b",
                colorError: "#ef4444",
                borderRadius: 8,
                fontFamily: "var(--font-geist-sans)",
              },
            }}
          >
            <CartProvider>{children}</CartProvider>
          </ConfigProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
