"use client"

import React from "react"
import styled from "styled-components"

export interface IDEHeadProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  action?: React.ReactNode
}

const IDEHead = (props: IDEHeadProps) => {
  const { action, className = "", children, ...restProps } = props

  return (
    <IDEHeadContainer className={`${className}`} {...restProps}>
      <strong className="title">{children}</strong>
      {action && <div className="action">{action}</div>}
    </IDEHeadContainer>
  )
}

const IDEHeadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 0 16px;
  border-bottom: 1px solid rgb(var(--color-gray300));
  .title {
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    font-weight: 700;
  }
  .action {
    /*  */
  }
`

export default IDEHead
