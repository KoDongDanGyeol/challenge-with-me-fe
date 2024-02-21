"use client"

import styled from "styled-components"
import Picture from "@/components/display/Picture"

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
      <SolutionCardProfilePicture ratio={[1, 1]} rounded="full" src={imgUrl} alt="" />
      <SolutionCardProfileInfo>
        <strong>{name}</strong>
        <span>{language}</span>
      </SolutionCardProfileInfo>
    </SolutionCardProfileContainer>
  )
}

const SolutionCardProfilePicture = styled(Picture)`
  width: 40px;
`

const SolutionCardProfileInfo = styled.div`
  flex: 1 1 0px;
  strong {
    display: block;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    font-weight: 500;
  }
  span {
    display: block;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
  }
`

const SolutionCardProfileContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export default SolutionCardProfile
