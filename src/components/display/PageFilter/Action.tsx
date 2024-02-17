"use client"

import styled from "styled-components"

export interface PageFilterActionProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const PageFilterAction = (props: PageFilterActionProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PageFilterActionContainer className={`${className}`} {...restProps}>
      {children}
    </PageFilterActionContainer>
  )
}

const PageFilterActionContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  height: 28px;
  align-items: center;
  gap: 12px;
`

export default PageFilterAction
