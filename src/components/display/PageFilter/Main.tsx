"use client"

import styled from "styled-components"

export interface PageFilterMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const PageFilterMain = (props: PageFilterMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PageFilterMainContainer className={`${className}`} {...restProps}>
      {children}
    </PageFilterMainContainer>
  )
}

const PageFilterMainContainer = styled.div`
  position: relative;
`

export default PageFilterMain
