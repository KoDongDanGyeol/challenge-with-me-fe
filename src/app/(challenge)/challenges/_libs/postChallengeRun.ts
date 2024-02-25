import { MutationFunction } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { IDETypes } from "@/components/form/IDE"

export type ChallengeRunModel = {
  submitType: "run"
  runResult: {
    passed?: boolean
    input?: string[]
    output?: string
    expected?: string
    errorMsg?: string | null
  }[]
  submitResult: {
    passed?: boolean
    accuracyTest?: string
    errorMsg?: string | null
  }[]
}

export const postChallengeRun: MutationFunction<Response, IDETypes> = (variables) => {
  const requestHeaders = new Headers()
  requestHeaders.set("Content-Type", "application/json")
  requestHeaders.set("Authorization", getCookie("Authorization") ?? "")
  return fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges/${variables?.id ?? 0}/run`, {
    method: "post",
    credentials: "include",
    headers: requestHeaders,
    body: JSON.stringify({
      code: variables.solution,
      testcaseValues: variables?.testcaseValues?.userSaved,
    }),
    next: {
      tags: ["challengeRun", JSON.stringify(variables)],
    },
  })
}
