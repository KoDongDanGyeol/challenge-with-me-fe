"use client"

import Layout from "@/components/display/Layout"
import { SessionProvider } from "next-auth/react"

interface ServiceLayoutProps extends React.PropsWithChildren {
  //
}

const ServiceLayout = (props: ServiceLayoutProps) => {
  const { children } = props

  return (
    <Layout>
      <SessionProvider>
        <Layout.Header />
        <Layout.Content>{children}</Layout.Content>
        <Layout.Footer />
      </SessionProvider>
    </Layout>
  )
}

export default ServiceLayout
