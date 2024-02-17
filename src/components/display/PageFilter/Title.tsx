"use client"

import React, { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type PageFilterTitleProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type PageFilterTitleComponent = <C extends React.ElementType = "h3">(
  props: PageFilterTitleProps<C>,
) => React.ReactNode

const PageFilterTitle: PageFilterTitleComponent = forwardRef(function PageFilterTitle<
  C extends React.ElementType = "h3",
>(props: PageFilterTitleProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <PageFilterTitleContainer ref={ref} as={asTag ?? "h3"} className={`${className}`} {...restProps}>
      {children}
    </PageFilterTitleContainer>
  )
})

const PageFilterTitleContainer = styled.h3`
  font-size: ${(props) => props.theme.typo.size.lg};
  line-height: ${(props) => props.theme.typo.leading.lg};
  color: rgb(var(--color-gray900));
  font-weight: 600;
  &:not(:first-child) {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
`

export default PageFilterTitle
