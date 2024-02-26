"use client"

import Button from "@/components/general/Button"
import "@/styles/error.css"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  return (
    <main className="not-found-container">
      <p className="error-code">404</p>
      <h2 className="not-found-h2">페이지를 찾지 못했습니다.</h2>
      <p className="not-found-p">
        주소가 잘못되었거나
        <br />더 이상 제공되지 않는 페이지 입니다.
      </p>

      <Button emphasis="bold" shape="square" size="lg" variants="primary" onClick={() => router.push("/signIn")}>
        홈으로 이동
      </Button>
    </main>
  )
}

export default Page
