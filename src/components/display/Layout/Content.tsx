"use client"

import { styled } from "styled-components"

export interface LayoutContentProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  //
}

const LayoutContent = (props: LayoutContentProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <LayoutContentContainer className={`${className}`} {...restProps}>
      {children}
    </LayoutContentContainer>
  )
}

const LayoutContentContainer = styled.main`
  flex: 1 1 0px;
  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    padding: 0 32px;
  }
  header + & {
    padding-top: 65px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    .container {
      padding: 0 16px;
    }
  }
`

export default LayoutContent
