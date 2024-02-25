import { Metadata } from "next"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { QuestionListSearchParams, getQuestionList } from "@/app/(service)/questions/_libs/getQuestionList"
import QuestionHome from "@/app/(service)/questions/_components/display/QuestionHome"

interface PageProps {
  searchParams: QuestionListSearchParams
}

export const metadata: Metadata = {
  title: "질문/답변 홈",
  description: "질문/답변 홈",
}

const page = async ({ searchParams }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["questionList", searchParams],
    queryFn: getQuestionList,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <QuestionHome asTag="section" searchParams={searchParams} className="container" />
    </HydrationBoundary>
  )
}

export default page
