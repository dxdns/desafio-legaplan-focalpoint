import type { Metadata } from "next"
import "./globals.css"
import Image from "next/image"
import logo from "@/assets/logo.png"

export const metadata: Metadata = {
  title: "focalpoint",
  description: "description",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <nav>
          <Image src={logo} width={150} height={36} alt="logo" />
          <h1>Bem-vindo de volta, Marcus</h1>
          <div>{new Date().toLocaleString("pt-BR", { dateStyle: "full" })}</div>
        </nav>
        {children}
      </body>
    </html>
  )
}
