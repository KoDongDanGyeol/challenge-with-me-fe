import { Suspense } from "react"
import ChallengeSolutionHome from "@/app/(service)/challenges/_components/display/ChallengeSolutionHome"

const page = () => {
  return (
    <Suspense>
      <ChallengeSolutionHome asTag="section" className="container" />
    </Suspense>
  )
}

export default page
