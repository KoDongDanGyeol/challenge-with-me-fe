"use client"

import styled from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { HelperVariants } from "@/components/entry/Helper/type"

export interface HelperMainProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  variants?: HelperVariants
}

const HelperMain = (props: HelperMainProps) => {
  const { variants = HelperVariants.Default, className = "", children, ...restProps } = props

  if (!children) {
    return null
  }

  return (
    <HelperMainContainer className={`${className}`} $variants={variants} {...restProps}>
      {children}
    </HelperMainContainer>
  )
}

interface HelperMainStyled {
  $variants: NonUndefined<HelperMainProps["variants"]>
}

const HelperMainContainer = styled.div<HelperMainStyled>`
  font-size: ${({ theme }) => theme.typo.size.sm};
  line-height: ${({ theme }) => theme.typo.leading.sm};
  color: ${(props) =>
    props.$variants === HelperVariants.Default
      ? `rgb(var(--color-gray500))`
      : props.$variants === HelperVariants.Error
        ? `rgb(var(--color-red600))`
        : ""};
`

export default HelperMain
