"use client"

import styled from "styled-components"
import Markdown from "@/components/display/Markdown"

export interface QuestionCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  content: string
}

const QuestionCardContent = (props: QuestionCardContentProps) => {
  const { cardId, content, className = "", ...restProps } = props

  return (
    <QuestionCardContentContainer className={`${className}`} {...restProps}>
      <Markdown>{content}</Markdown>
    </QuestionCardContentContainer>
  )
}

const QuestionCardContentContainer = styled.div`
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

export default QuestionCardContent
