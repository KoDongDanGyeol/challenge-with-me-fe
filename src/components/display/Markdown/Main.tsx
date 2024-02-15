"use client"

import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import rehypeHighlight from "rehype-highlight"
import styled from "styled-components"
import "highlight.js/styles/a11y-light.min.css"

export interface MarkdownMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  children: string
}

const MarkdownMain = (props: MarkdownMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <MarkdownMainContainer
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize, rehypeHighlight]}
      components={{
        table: ({ node, className, children, ...restProps }) => (
          <div className={`markdown-table markdown-table-auto ${className}`} {...restProps}>
            <table>{children}</table>
          </div>
        ),
        code: ({ node, className, children, ...restProps }) => {
          if (!/language-(\w+)/.exec(className || "")) {
            return <span className="code-inline">{children}</span>
          }
          return (
            <code className={`code-block code-block-hljs ${className}`} {...restProps}>
              {children}
            </code>
          )
        },
      }}
      className={`markdown ${className}`}
      {...restProps}
    >
      {children}
    </MarkdownMainContainer>
  )
}

const MarkdownMainContainer = styled(Markdown)`
  /*  */
`

export default MarkdownMain
