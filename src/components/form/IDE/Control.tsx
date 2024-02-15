"use client"

import styled from "styled-components"

export interface IDEControlProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const IDEControl = (props: IDEControlProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <IDEControlContainer className={`${className}`} {...restProps}>
      {children}
    </IDEControlContainer>
  )
}

const IDEControlContainer = styled.div`
  display: flex;
  gap: 12px;
`

export default IDEControl
