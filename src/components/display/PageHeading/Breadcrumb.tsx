"use client"

import { Children } from "react"
import Link from "next/link"
import styled from "styled-components"

export interface PageHeadingBreadcrumbProps
  extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLOListElement>> {
  //
}

const PageHeadingBreadcrumb = (props: PageHeadingBreadcrumbProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PageHeadingBreadcrumbContainer
      className={`${className}`}
      $childrenCount={Children.count(children) + 1}
      {...restProps}
    >
      <li>
        <h1>
          <Link href="/challenges">
            <span>Challenge With Me</span>
          </Link>
        </h1>
      </li>
      {Children.map(children, (child, index) => {
        const isLast = index === Children.count(children) - 1
        return (
          <li key={index} aria-current={isLast ? "page" : undefined}>
            {child}
          </li>
        )
      })}
    </PageHeadingBreadcrumbContainer>
  )
}

interface PageHeadingBreadcrumbStyled {
  $childrenCount: number
}

const PageHeadingBreadcrumbContainer = styled.ul<PageHeadingBreadcrumbStyled>`
  display: flex;
  li {
    position: relative;
    max-width: ${(props) => `${100 / props.$childrenCount}%`};
    &:not(:first-child) {
      padding-left: 44px;
    }
    &:not(:first-child):before {
      content: "";
      position: absolute;
      top: 50%;
      left: 16px;
      display: block;
      width: 8px;
      height: 8px;
      border-top: 1px solid rgb(var(--color-gray400));
      border-left: 1px solid rgb(var(--color-gray400));
      transform: translateY(-50%) rotate(135deg);
    }
  }
  a,
  span {
    display: block;
  }
  span {
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    color: rgb(var(--color-gray500));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media ${(props) => props.theme.screen.device.md} {
    li {
      max-width: 100%;
      &:first-child {
        padding-left: 20px;
      }
      &:first-child:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0px;
        display: block;
        width: 8px;
        height: 8px;
        border-top: 1px solid rgb(var(--color-gray400));
        border-left: 1px solid rgb(var(--color-gray400));
        transform: translateY(-50%) rotate(-45deg);
      }
      &:not(:first-child) {
        display: none;
      }
    }
  }
`

export default PageHeadingBreadcrumb
