"use client"

import styled from "styled-components"
import Markdown from "@/components/display/Markdown"

export interface AnswerCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  content: string
}

const AnswerCardContent = (props: AnswerCardContentProps) => {
  const { cardId, content, className = "", ...restProps } = props

  return (
    <AnswerCardContentContainer className={`${className}`} {...restProps}>
      <Markdown>{content}</Markdown>
    </AnswerCardContentContainer>
  )
}

const AnswerCardContentContainer = styled.div`
  position: relative;
  &:not(:first-child) {
    margin-top: 16px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
`

export default AnswerCardContent
