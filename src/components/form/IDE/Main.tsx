"use client"

import styled from "styled-components"

export interface IDEMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  //
}

const IDEMain = (props: IDEMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <IDEMainContainer noValidate className={`${className}`} {...restProps}>
      {children}
    </IDEMainContainer>
  )
}

const IDEMainContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 0.5px));
  grid-template-rows: auto 1fr 1fr auto;
  grid-template-areas:
    "leading leading"
    "challenge editor"
    "challenge result"
    "trailing trailing";
  height: 100vh;
  padding: 0 1px;
  grid-gap: 1px;
  background-color: rgb(var(--color-gray300));
  > div {
    background-color: rgb(var(--color-gray0));
  }
  @media ${(props) => props.theme.screen.device.md} {
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "leading"
      "challenge"
      "editor"
      "result"
      "trailing";
    height: auto;
  }
`

export default IDEMain
