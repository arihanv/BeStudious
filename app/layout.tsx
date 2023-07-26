import "@/styles/globals.css"
import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: "BeStudious",
    template: "%s - BeStudious",
  },
  description: "Learn, Share, and Grow with an online community of students.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://bestudious.vercel.app/",
    title: "BeStudious",
    description: "Learn, Share, and Grow with an online community of students.",
    images: [
      {
        url: "https://cdn.discordapp.com/attachments/1123787740253786154/1132134958526369822/slZOAAAAFXRFWHRUaHVtYjo6U2l6ZQAzLjE0Nzg2TUL08octAAAAFnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly9QTkc6pipnIgAAAABJRU5ErkJggg.png",
        width: 1200,
        height: 630,
        alt: "BeStudious",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeStudious",
    description: "Learn, Share, and Grow with an online community of students.",
    images: [
      {
        url: "https://cdn.discordapp.com/attachments/1123787740253786154/1132134958526369822/slZOAAAAFXRFWHRUaHVtYjo6U2l6ZQAzLjE0Nzg2TUL08octAAAAFnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly9QTkc6pipnIgAAAABJRU5ErkJggg.png",
        width: 1200,
        height: 630,
        alt: "BeStudious",
      }
    ]
  }
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <head>
            <title>BeStudious</title>
          </head>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="dark">
              <div className="relative flex flex-col">
                <SiteHeader />
                <div className="relative flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}
