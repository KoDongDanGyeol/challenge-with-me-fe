import { LibsQueryFunction } from "@/libs/utils"
import { SolutionFilterTypes } from "@/components/form/SolutionFilter"

export type ChallengeSolutionListParams = {
  problemId: string
}

export type ChallengeSolutionListSearchParams = {
  [key in keyof SolutionFilterTypes]?: string
}

export type ChallengeSolutionListModel = {
  content: {
    id: number
    problemId: number
    memberId: number
    submitCode: string
    language: string
    status: string
    createdAt: Date
    modifiedAt: Date
    name: string
    imgUrl: string
    correct: boolean
    isLiked?: boolean
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

export type ChallengeSolutionListQueryKey = [
  _1: string,
  _2: ChallengeSolutionListParams,
  _3: ChallengeSolutionListSearchParams,
]

export const getChallengeSolutionList: LibsQueryFunction<ChallengeSolutionListModel> = async (context) => {
  const [, params, searchParams] = context?.queryKey as ChallengeSolutionListQueryKey
  const newParams = new URLSearchParams({ ...params, ...searchParams })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/solutions/${newParams.get("problemId")}/group?${newParams.toString()}`,
    {
      method: "get",
      next: {
        tags: ["challengeSolutionList", newParams.toString()],
      },
    },
  )
  return response.json()
}
