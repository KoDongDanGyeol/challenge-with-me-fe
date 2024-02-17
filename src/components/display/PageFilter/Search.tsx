"use client"

import styled from "styled-components"

export interface PageFilterSearchProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const PageFilterSearch = (props: PageFilterSearchProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PageFilterSearchContainer className={`${className}`} {...restProps}>
      {children}
    </PageFilterSearchContainer>
  )
}

const PageFilterSearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export default PageFilterSearch
