"use client"

import styled from "styled-components"
import { ChallengeSolutionListModel } from "@/app/(service)/challenges/_libs/getChallengeSolutionList"
import Profile from "@/components/display/Profile"

export interface SolutionCardProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  solution: ChallengeSolutionListModel["content"][number]
}

const SolutionCardProfile = (props: SolutionCardProfileProps) => {
  const { solution, className = "", ...restProps } = props

  return (
    <SolutionCardProfileContainer className={`${className}`} {...restProps}>
      <Profile.Picture src={solution?.imgUrl} />
      <Profile.Content name={solution?.name}>
        <span className="col-content">
          {solution?.language} · {new Date(solution?.createdAt).toJSON().slice(0, 10)}
        </span>
      </Profile.Content>
    </SolutionCardProfileContainer>
  )
}

const SolutionCardProfileContainer = styled(Profile)`
  .col-content {
  }
`

export default SolutionCardProfile
