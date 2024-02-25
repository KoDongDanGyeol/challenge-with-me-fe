import { Metadata } from "next"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { ChallengeListParams, getChallengeList } from "@/app/(service)/challenges/_libs/getChallengeList"
import ChallengeHome from "@/app/(service)/challenges/_components/display/ChallengeHome"

interface PageProps {
  searchParams: ChallengeListParams
}

export const metadata: Metadata = {
  title: "챌린지 홈",
  description: "챌린지 홈",
}

const page = async ({ searchParams }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["challengeList", searchParams],
    queryFn: getChallengeList,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChallengeHome asTag="section" searchParams={searchParams} className="container" />
    </HydrationBoundary>
  )
}

export default page
