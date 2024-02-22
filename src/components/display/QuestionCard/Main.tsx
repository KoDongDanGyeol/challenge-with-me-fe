"use client"

import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type QuestionCardMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type QuestionCardMainComponent = <C extends React.ElementType = "div">(
  props: QuestionCardMainProps<C>,
) => React.ReactNode

const QuestionCardMain: QuestionCardMainComponent = forwardRef(function QuestionCardMain<
  C extends React.ElementType = "div",
>(props: QuestionCardMainProps<C>, ref?: PolymorphicRef<C>): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <QuestionCardMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </QuestionCardMainContainer>
  )
})

const QuestionCardMainContainer = styled.div`
  & + & {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    & + & {
      margin-top: 16px;
    }
  }
`

export default QuestionCardMain
