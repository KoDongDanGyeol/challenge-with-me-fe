"use client"

import React, { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type NoticeTitleProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type NoticeTitleComponent = <C extends React.ElementType = "strong">(
  props: NoticeTitleProps<C>,
) => React.ReactNode

const NoticeTitle: NoticeTitleComponent = forwardRef(function NoticeTitle<C extends React.ElementType = "strong">(
  props: NoticeTitleProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <NoticeTitleContainer ref={ref} as={asTag ?? "strong"} className={`${className}`} {...restProps}>
      {children}
    </NoticeTitleContainer>
  )
})

const NoticeTitleContainer = styled.strong`
  font-size: ${(props) => props.theme.typo.size.lg};
  line-height: ${(props) => props.theme.typo.leading.lg};
  color: rgb(var(--color-gray900));
  font-weight: 500;
  &:not(:first-child) {
    margin-top: 16px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
`

export default NoticeTitle
