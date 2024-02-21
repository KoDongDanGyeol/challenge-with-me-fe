"use client"

import styled from "styled-components"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"
import Markdown from "@/components/display/Markdown"

export interface SolutionCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  language: string
  submitCode: string
  isLiked: boolean
  onLike?: (id: number) => void
}

const SolutionCardContent = (props: SolutionCardContentProps) => {
  const { cardId, language, submitCode, isLiked, className = "", onLike, ...restProps } = props

  return (
    <SolutionCardContentContainer className={`${className}`} $hasLike={Boolean(onLike)} {...restProps}>
      <Markdown>{`~~~${language} ${submitCode}`}</Markdown>
      {onLike && (
        <Button
          type="button"
          shape="square"
          variants="primary"
          emphasis={isLiked ? "bold" : "subtle"}
          size="xs"
          className="button-like"
          onClick={() => onLike?.(cardId)}
          aria-pressed={isLiked}
        >
          <Icon name={isLiked ? "HeartSolid" : "Heart"} aria-hidden={true} />
          좋아요
        </Button>
      )}
    </SolutionCardContentContainer>
  )
}

interface SolutionCardContentStyled {
  $hasLike: boolean
}

const SolutionCardContentContainer = styled.div<SolutionCardContentStyled>`
  position: relative;
  &:not(:first-child) {
    margin-top: 16px;
  }
  .code-block {
    padding-bottom: ${(props) => (props.$hasLike ? "3.5em" : "")};
  }
  .button-like {
    position: absolute;
    bottom: 1em;
    left: 1em;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
`

export default SolutionCardContent
