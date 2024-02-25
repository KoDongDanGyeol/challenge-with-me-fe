import { LibsQueryFunction } from "@/libs/utils"

export type ChallengeTestcaseParams = {
  problemId: string
}

export type ChallengeTestcaseModel = {
  testcaseTypes: {
    input: string[]
    expected: string
  }
  testcaseValues: {
    input: string[]
    expected: string
  }[]
}

export type ChallengeTestcaseQueryKey = readonly [_1?: string, _2?: ChallengeTestcaseParams]

export const getChallengeTestcase: LibsQueryFunction<ChallengeTestcaseModel> = async (context) => {
  const [, queries] = context?.queryKey as ChallengeTestcaseQueryKey
  const params = new URLSearchParams({ ...queries })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges/${queries?.problemId}/testcase`, {
    method: "get",
    next: {
      tags: ["challengeTestcase", params.toString()],
    },
  })
  return response.json()
}
