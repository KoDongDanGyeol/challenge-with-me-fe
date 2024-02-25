import { LibsQueryFunction } from "@/libs/utils"
import { ChallengeFilterTypes } from "@/components/form/ChallengeFilter"

export type QuestionListSearchParams = {
  [key in keyof ChallengeFilterTypes]?: string
}

export type QuestionListModel = {
  content: {
    id: number
    problemTitle: string
    problemId: number
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
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type QuestionListQueryKey = [_1: string, _2: QuestionListSearchParams]

export const getQuestionList: LibsQueryFunction<QuestionListModel> = async (context) => {
  const [, searchParams] = context?.queryKey as QuestionListQueryKey
  const newParams = new URLSearchParams({ ...searchParams })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/questions/group?${newParams.toString()}`, {
    method: "get",
    next: {
      tags: ["questionList", newParams.toString()],
    },
  })
  return response.json()
}
