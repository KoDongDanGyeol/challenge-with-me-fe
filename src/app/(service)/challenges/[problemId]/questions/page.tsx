import { Metadata } from "next"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { ChallengeDetailParams, getChallengeDetail } from "@/app/(challenge)/challenges/_libs/getChallengeDetail"
import {
  ChallengeQuestionListParams,
  ChallengeQuestionListSearchParams,
  getChallengeQuestionList,
} from "@/app/(service)/challenges/_libs/getChallengeQuestionList"
import ChallengeQuestionHome from "@/app/(service)/challenges/_components/display/ChallengeQuestionHome"

interface PageProps {
  params: ChallengeDetailParams & ChallengeQuestionListParams
  searchParams: ChallengeQuestionListSearchParams
}

export const generateMetadata: (props: PageProps) => Promise<Metadata> = async ({ params }) => {
  const data = await getChallengeDetail({ queryKey: ["challengeDetail", params] })
  return {
    title: `${data?.title} - 챌린지 질문/답변`,
    description: `${data?.title} - 챌린지 질문/답변`,
  }
}

const page = async ({ params, searchParams }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["challengeDetail", params],
    queryFn: getChallengeDetail,
  })
  await queryClient.prefetchQuery({
    queryKey: ["challengeQuestionList", params, searchParams],
    queryFn: getChallengeQuestionList,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChallengeQuestionHome asTag="section" params={params} searchParams={searchParams} className="container" />
    </HydrationBoundary>
  )
}

export default page
