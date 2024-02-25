import { Metadata } from "next"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import {
  ChallengeSolutionListParams,
  ChallengeSolutionListSearchParams,
  getChallengeSolutionList,
} from "@/app/(service)/challenges/_libs/getChallengeSolutionList"
import ChallengeSolutionHome from "@/app/(service)/challenges/_components/display/ChallengeSolutionHome"

interface PageProps {
  params: ChallengeDetailParams & ChallengeSolutionListParams
  searchParams: ChallengeSolutionListSearchParams
}

export const generateMetadata: (props: PageProps) => Promise<Metadata> = async ({ params }) => {
  const data = await getChallengeDetail({ queryKey: ["challengeDetail", params] })
  return {
    title: `${data?.title} - 챌린지 풀이`,
    description: `${data?.title} - 챌린지 풀이`,
  }
}

const page = async ({ params, searchParams }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
  })
  await queryClient.prefetchQuery({
    queryKey: ["challengeSolutionList", params, searchParams],
    queryFn: getChallengeSolutionList,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChallengeSolutionHome asTag="section" params={params} searchParams={searchParams} className="container" />
    </HydrationBoundary>
  )
}

export default page
