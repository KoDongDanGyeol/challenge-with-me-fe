import { MutationFunction } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { IDETypes } from "@/components/form/IDE"

export type ChallengeSubmitModel = {
  submitType: "submit"
} & {
  [key in "runResult" | "submitResult"]: {
    input?: string[]
    output?: string
    passed?: boolean
    expected?: string
    errorMsg?: string | null
  }[]
}

export const postChallengeSubmit: MutationFunction<Response, IDETypes> = (variables) => {
  const requestHeaders = new Headers()
  requestHeaders.set("Content-Type", "application/json")
  requestHeaders.set("Authorization", getCookie("Authorization") ?? "")
  return fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/challenges/${variables?.id ?? 0}/submit`, {
    method: "post",
    credentials: "include",
    headers: requestHeaders,
    body: JSON.stringify({
      code: variables.solution,
      // testcaseValues: variables?.testcaseValues?.userSaved,
    }),
    next: {
      tags: ["challengeSubmit", JSON.stringify(variables)],
    },
  })
}
