import { LibsQueryFunction } from "@/libs/utils"
import { ChallengeFilterTypes } from "@/components/form/ChallengeFilter"

export type ChallengeListSearchParams = {
  [key in keyof ChallengeFilterTypes]?: string
}

export type ChallengeListModel = {
  past?: string[]
  content: {
    id: number
    title: string
    state?: string
    past?: string
    type: string
    level: string
    correctRate: number
    completedUserCount: number
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

export type ChallengeListQueryKey = [_1: string, _2: ChallengeListSearchParams]

export const getChallengeList: LibsQueryFunction<ChallengeListModel> = async (context) => {
  const [, searchParams] = context?.queryKey as ChallengeListQueryKey
  const newParams = new URLSearchParams({ ...searchParams })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges?${newParams.toString()}`, {
    method: "get",
    next: {
      tags: ["challengeList", newParams.toString()],
    },
  })
  return response.json()
}
