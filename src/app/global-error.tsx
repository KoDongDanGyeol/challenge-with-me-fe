"use client"

import { useEffect } from "react"
import "@/styles/error.css"
import { useRouter } from "next/navigation"
import Button from "@/components/general/Button"

interface PageProps {
  error: Error & {
    digest?: string
  }
  reset: () => void
}

const Page = (props: PageProps) => {
  const { error, reset } = props

  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()
  return (
    <main className="not-found-container">
      <p className="error-code">500</p>
      <h2 className="not-found-h2">앗,문제가 생겼습니다</h2>
      <p className="not-found-p">
        문제를 해결중에 있습니다.
        <br />
        다시 한번 시도해주세요.
      </p>

      <Button emphasis="bold" shape="square" size="lg" variants="primary" onClick={() => router.push("/signIn")}>
        홈으로 이동
      </Button>
    </main>
  )
}

export default Page
