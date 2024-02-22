import { Suspense } from "react"
import ChallengeQuestionHome from "@/app/(service)/challenges/_components/display/ChallengeQuestionHome"

const page = () => {
  return (
    <Suspense>
      <ChallengeQuestionHome asTag="section" className="container" />
    </Suspense>
  )
}

export default page
