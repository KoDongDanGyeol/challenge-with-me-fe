import { Suspense } from "react"
import ChallengeHome from "@/app/(service)/challenges/_components/display/ChallengeHome"

const page = () => {
  return (
    <Suspense>
      <ChallengeHome asTag="section" className="container" />
    </Suspense>
  )
}

export default page
