"use client"

import styled, { css } from "styled-components"
import { NoticeType } from "@/components/display/Notice/type"

export interface NoticeMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  type: NoticeType
}

const NoticeMain = (props: NoticeMainProps) => {
  const { type, className = "", children, ...restProps } = props

  return (
    <NoticeMainContainer className={`${className}`} $type={type} {...restProps}>
      {children}
    </NoticeMainContainer>
  )
}

interface NoticeMainStyled {
  $type: NoticeMainProps["type"]
}

const NoticeMainBlock = css`
  padding: 36px 32px;
  border: 1px solid rgb(var(--color-gray200));
  border-radius: 8px;
  @media ${(props) => props.theme.screen.device.md} {
    padding: 28px 16px;
  }
`

const NoticeMainContent = css`
  /*  */
`

const NoticeMainContainer = styled.div<NoticeMainStyled>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    props.$type === NoticeType.Block ? NoticeMainBlock : props.$type === NoticeType.Content ? NoticeMainContent : null}
`

export default NoticeMain
