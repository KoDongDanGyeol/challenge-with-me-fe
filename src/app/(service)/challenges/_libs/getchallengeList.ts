import { QueryFunction } from "@tanstack/query-core"
import { ChallengeFilterTypes } from "@/components/form/ChallengeFilter"

export type ChallengeListParams = {
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

export type GetchallengeList = QueryFunction<ChallengeListModel, [_1: string, _2: ChallengeListParams]>

export const getchallengeList: GetchallengeList = async ({ queryKey }) => {
  const [, queries] = queryKey
  const params = new URLSearchParams({ ...queries })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges?${params.toString()}`, {
    method: "get",
    next: {
      tags: ["challengeList", params.toString()],
    },
  })
  return response.json()
}
