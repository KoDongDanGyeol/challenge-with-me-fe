"use client"

import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type PageHeadingTitleProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type PageHeadingTitleComponent = <C extends React.ElementType = "h2">(
  props: PageHeadingTitleProps<C>,
) => React.ReactNode

const PageHeadingTitle: PageHeadingTitleComponent = forwardRef(function PageHeadingTitle<
  C extends React.ElementType = "h2",
>(props: PageHeadingTitleProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <PageHeadingTitleContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </PageHeadingTitleContainer>
  )
})

const PageHeadingTitleContainer = styled.div`
  font-size: ${(props) => props.theme.typo.size["2xl"]};
  line-height: ${(props) => props.theme.typo.leading["2xl"]};
  color: rgb(var(--color-gray900));
  font-weight: 700;
  @media ${(props) => props.theme.screen.device.md} {
    font-size: ${(props) => props.theme.typo.size["xl"]};
    line-height: ${(props) => props.theme.typo.leading["xl"]};
  }
`

export default PageHeadingTitle
