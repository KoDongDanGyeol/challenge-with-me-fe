import type { Metadata } from "next"
import RecoilProvider from "@/app/_components/config/RecoilProvider"
import StyledProvider from "@/app/_components/config/StyledProvider"
import MocksProvider from "@/app/_components/config/MocksProvider"
import notoSansKr from "@/styles/font/notoSansKr"
import "@/styles/reset.css"

export const metadata: Metadata = {
  title: {
    default: "Challenge With Me",
    template: "%s | Challenge With Me",
  },
  description: "Challenge With Me",
  keywords: "Challenge With Me",
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps extends React.PropsWithChildren {
  //
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ko" className={notoSansKr.variable} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{
              const stored = localStorage.getItem("ChallengeWithMe_atomTheme");
              const initial = stored ? stored : typeof window !== "undefined" && window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
              document?.documentElement?.setAttribute("data-theme", initial);
            })()`,
          }}
        />
      </head>
      <body>
        <RecoilProvider flag={false}>
          <MocksProvider />
          <StyledProvider>{children}</StyledProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}

export default RootLayout
