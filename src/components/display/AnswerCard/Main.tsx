"use client"

import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type AnswerCardMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

export type AnswerCardMainComponent = <C extends React.ElementType = "div">(
  props: AnswerCardMainProps<C>,
) => React.ReactNode

const AnswerCardMain: AnswerCardMainComponent = forwardRef(function AnswerCardMain<C extends React.ElementType = "div">(
  props: AnswerCardMainProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <AnswerCardMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </AnswerCardMainContainer>
  )
})

const AnswerCardMainContainer = styled.div`
  & + & {
    margin-top: 16px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    & + & {
      margin-top: 12px;
    }
  }
`

export default AnswerCardMain
