"use client"

import styled from "styled-components"
import Profile from "@/components/display/Profile"
import Button from "@/components/general/Button"

export interface AnswerCardProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: number
  imgUrl: string
  name: string
  createdAt: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const AnswerCardProfile = (props: AnswerCardProfileProps) => {
  const { cardId, imgUrl, name, createdAt, className = "", onEdit, onDelete, ...restProps } = props

  return (
    <AnswerCardProfileContainer className={`${className}`} {...restProps}>
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
    </AnswerCardProfileContainer>
  )
}

const AnswerCardProfileContainer = styled(Profile)`
  .col-content {
  }
`

export default AnswerCardProfile
