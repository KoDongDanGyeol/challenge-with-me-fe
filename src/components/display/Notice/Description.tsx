"use client"

import styled from "styled-components"

export interface NoticeDescriptionProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>> {
  //
}

const NoticeDescription = (props: NoticeDescriptionProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <NoticeDescriptionContainer className={`${className}`} {...restProps}>
      {children}
    </NoticeDescriptionContainer>
  )
}

const NoticeDescriptionContainer = styled.p`
  font-size: ${(props) => props.theme.typo.size.sm};
  line-height: ${(props) => props.theme.typo.leading.sm};
  color: rgb(var(--color-gray500));
  &:not(:first-child) {
    margin-top: 4px;
  }
`

export default NoticeDescription
