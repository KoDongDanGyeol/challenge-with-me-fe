"use client"

import styled from "styled-components"
import Profile from "@/components/display/Profile"

export interface SolutionCardProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  imgUrl: string
  name: string
  language: string
}

const SolutionCardProfile = (props: SolutionCardProfileProps) => {
  const { cardId, imgUrl, name, language, className = "", ...restProps } = props

  return (
    <SolutionCardProfileContainer className={`${className}`} {...restProps}>
      <Profile.Picture src={imgUrl} />
      <Profile.Content name={name}>
        <span className="col-content">{language}</span>
      </Profile.Content>
    </SolutionCardProfileContainer>
  )
}

const SolutionCardProfileContainer = styled(Profile)`
  .col-content {
  }
`

export default SolutionCardProfile
