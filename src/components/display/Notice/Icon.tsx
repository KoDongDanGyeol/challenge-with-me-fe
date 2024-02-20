"use client"

import styled from "styled-components"
import Icon, { IconName } from "@/components/general/Icon"
import { NoticeIconStatus } from "@/components/display/Notice/type"

export interface NoticeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  status: NoticeIconStatus
  name: IconName
}

const NoticeIcon = (props: NoticeIconProps) => {
  const { name, status, className = "", ...restProps } = props

  return (
    <NoticeIconContainer className={`${className}`} {...restProps}>
      <Icon name={name} className={`color-${status}`} aria-hidden={true} />
    </NoticeIconContainer>
  )
}

const NoticeIconContainer = styled.div`
  svg {
    width: 44px;
    padding: 12px;
    border-radius: 50%;
    &.color-success {
      stroke: rgb(var(--color-primary600));
      background: rgb(var(--color-primary100));
    }
    &.color-danger {
      stroke: rgb(var(--color-red600));
      background: rgb(var(--color-red100));
    }
  }
`

export default NoticeIcon
