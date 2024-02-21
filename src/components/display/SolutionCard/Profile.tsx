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
      <Picture ratio={[1, 1]} rounded="full" src={imgUrl} alt="" />
      <div>
        <strong>{name}</strong>
        <span>{language}</span>
      </div>
    </SolutionCardProfileContainer>
  )
}

const SolutionCardProfileContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 40px 1fr;
  align-items: center;
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

export default SolutionCardProfile
