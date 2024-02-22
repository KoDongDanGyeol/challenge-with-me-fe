import { Suspense } from "react"
import QuestionHome from "@/app/(service)/questions/_components/display/QuestionHome"

const page = () => {
  return (
    <Suspense>
      <QuestionHome asTag="section" className="container" />
    </Suspense>
  )
}

export default page
