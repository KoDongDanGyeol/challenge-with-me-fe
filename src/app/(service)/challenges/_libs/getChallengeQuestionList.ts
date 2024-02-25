import { LibsQueryFunction } from "@/libs/utils"
import { QuestionFilterTypes } from "@/components/form/QuestionFilter"

export type ChallengeQuestionListParams = {
  problemId: string
}

export type ChallengeQuestionListSearchParams = {
  [key in keyof QuestionFilterTypes]?: string
}

export type ChallengeQuestionListModel = {
  content: {
    id: number
    problemId: number
    // problemTitle: string
    title: string
    memberId: number
    answerCounts: number
    name: string
    profileImgUrl: string
    createdAt: Date
    modifiedAt: Date
  }[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  empty: boolean
}

export type ChallengeQuestionListQueryKey = [
  _1: string,
  _2: ChallengeQuestionListParams,
  _3: ChallengeQuestionListSearchParams,
]

export const getChallengeQuestionList: LibsQueryFunction<ChallengeQuestionListModel> = async (context) => {
  const [, params, searchParams] = context?.queryKey as ChallengeQuestionListQueryKey
  const newParams = new URLSearchParams({ ...params, ...searchParams })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/questions/${newParams.get("problemId")}/group?${newParams.toString()}`,
    {
      method: "get",
      next: {
        tags: ["challengeQuestionList", newParams.toString()],
      },
    },
  )
  return response.json()
}
