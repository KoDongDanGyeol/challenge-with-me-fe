import { Metadata } from "next"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import { ChallengeTestcaseParams, getChallengeTestcase } from "@/app/(challenge)/challenges/_libs/getChallengeTestcase"
import ChallengeDetail from "@/app/(challenge)/challenges/_components/form/ChallengeDetail"

interface PageProps {
  params: ChallengeDetailParams & ChallengeTestcaseParams
}

export const generateMetadata: (props: PageProps) => Promise<Metadata> = async ({ params }) => {
  const data = await getChallengeDetail({ queryKey: ["challengeDetail", params] })
  return {
    title: `${data?.title} - 챌린지 상세`,
    description: `${data?.title} - 챌린지 상세`,
  }
}

const Page = async ({ params }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
  })
  await queryClient.prefetchQuery({
    queryKey: ["challengeTestcase", params],
    queryFn: getChallengeTestcase,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChallengeDetail asTag="article" params={params} className="container" />
    </HydrationBoundary>
  )
}

export default Page
