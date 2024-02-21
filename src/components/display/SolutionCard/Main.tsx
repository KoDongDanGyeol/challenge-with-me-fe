"use client"

import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type SolutionCardMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type SolutionCardMainComponent = <C extends React.ElementType = "div">(
  props: SolutionCardMainProps<C>,
) => React.ReactNode

const SolutionCardMain: SolutionCardMainComponent = forwardRef(function SolutionCardMain<
  C extends React.ElementType = "div",
>(props: SolutionCardMainProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <SolutionCardMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </SolutionCardMainContainer>
  )
})

const SolutionCardMainContainer = styled.div`
  & + & {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    & + & {
      margin-top: 16px;
    }
  }
`

export default SolutionCardMain
