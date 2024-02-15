"use client"

import styled from "styled-components"

export interface PageHeadingMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const PageHeadingMain = (props: PageHeadingMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PageHeadingMainContainer className={`${className}`} {...restProps}>
      {children}
    </PageHeadingMainContainer>
  )
}

const PageHeadingMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default PageHeadingMain
