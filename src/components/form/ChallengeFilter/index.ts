import ChallengeFilterMain, { ChallengeFilterMainProps } from "@/components/form/ChallengeFilter/Main"

export interface ChallengeFilterTypes {
  state: string[]
  type: string[]
  level: number[]
  pedigree: string[]
  keyword: string
  sort: string
  page: number
}

export type { ChallengeFilterMainProps }

export default Object.assign(ChallengeFilterMain, {
  //
})
