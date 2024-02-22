"use client"

import styled from "styled-components"
import Profile from "@/components/display/Profile"
import Button from "@/components/general/Button"

export interface QuestionCardProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  imgUrl: string
  name: string
  createdAt: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const QuestionCardProfile = (props: QuestionCardProfileProps) => {
  const { cardId, imgUrl, name, createdAt, className = "", onEdit, onDelete, ...restProps } = props

  return (
    <QuestionCardProfileContainer className={`${className}`} {...restProps}>
      <Profile.Picture src={imgUrl} />
      <Profile.Content name={name}>
        <span className="col-content">{new Date(createdAt).toJSON().slice(0, 10)}</span>
        {onEdit && (
          <Button
            type="button"
            emphasis="minimal"
            shape="plain"
            size="sm"
            variants="primary"
            onClick={() => onEdit?.(cardId)}
          >
            수정
          </Button>
        )}
        {onDelete && (
          <Button
            type="button"
            emphasis="minimal"
            shape="plain"
            size="sm"
            variants="primary"
            onClick={() => onDelete?.(cardId)}
          >
            삭제
          </Button>
        )}
      </Profile.Content>
    </QuestionCardProfileContainer>
  )
}

const QuestionCardProfileContainer = styled(Profile)`
  .col-content {
  }
`

export default QuestionCardProfile
