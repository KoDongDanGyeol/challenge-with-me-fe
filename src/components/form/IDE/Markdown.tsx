"use client"

import styled from "styled-components"
import Markdown from "@/components/display/Markdown"

export interface IDEMarkdownProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  children: string
}

const IDEMarkdown = (props: IDEMarkdownProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <IDEMarkdownContainer className={`${className}`} {...restProps}>
      <Markdown>{children}</Markdown>
    </IDEMarkdownContainer>
  )
}

const IDEMarkdownContainer = styled.div`
  flex: 1 1 0px;
  min-height: 0;
  padding: 16px;
  overflow-y: auto;
  @media ${(props) => props.theme.screen.device.md} {
    flex: none;
    overflow-y: inherit;
  }
`

export default IDEMarkdown
