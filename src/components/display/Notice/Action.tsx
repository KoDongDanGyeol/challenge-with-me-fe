"use client"

import styled from "styled-components"

export interface NoticeActionProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const NoticeAction = (props: NoticeActionProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <NoticeActionContainer className={`${className}`} {...restProps}>
      {children}
    </NoticeActionContainer>
  )
}

const NoticeActionContainer = styled.div`
  display: flex;
  gap: 12px;
  &:not(:first-child) {
    margin-top: 20px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
`

export default NoticeAction
