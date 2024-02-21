"use client"

import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type PageFilterMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type PageFilterMainComponent = <C extends React.ElementType = "div">(
  props: PageFilterMainProps<C>,
) => React.ReactNode

const PageFilterMain: PageFilterMainComponent = forwardRef(function PageFilterMain<C extends React.ElementType = "div">(
  props: PageFilterMainProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <PageFilterMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </PageFilterMainContainer>
  )
})

const PageFilterMainContainer = styled.div`
  position: relative;
`

export default PageFilterMain
