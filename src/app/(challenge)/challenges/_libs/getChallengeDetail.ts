import { LibsQueryFunction } from "@/libs/utils"

export type ChallengeDetailParams = {
  problemId: string
}

export type ChallengeDetailModel = {
  id: number
  title: string
  type: string
  past: string
  description: string
  testcases: [
    {
      testcaseTypes: {
        inputTypes: string[]
        outputType: string
      }
      testcaseValues: {
        inputData: string[]
        outputData: string
      }[]
      hiddenTestcaseCount: number
    },
  ]
  questionsCount?: number
  isSuccessSoluction?: boolean
}

export type ChallengeDetailQueryKey = readonly [_1?: string, _2?: ChallengeDetailParams]

export const getChallengeDetail: LibsQueryFunction<ChallengeDetailModel> = async (context) => {
  const [, params] = context?.queryKey as ChallengeDetailQueryKey
  const newParams = new URLSearchParams({ ...params })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges/${newParams.get("problemId")}`, {
    method: "get",
    next: {
      tags: ["challengeDetail", newParams.toString()],
    },
  })
  return response.json()
}
