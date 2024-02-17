"use client"

import { Children } from "react"
import styled from "styled-components"
import Icon from "@/components/general/Icon"

export interface PageFilterBadgeProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  onReset?: () => void
}

const PageFilterBadge = (props: PageFilterBadgeProps) => {
  const { className = "", children, onReset, ...restProps } = props

  return (
    <PageFilterBadgeContainer className={`${className}`} {...restProps}>
      {children}
      {onReset && !!Children.toArray(children).filter((child) => !!child).length && (
        <button type="button" className="button-reset" onClick={onReset}>
          <span>초기화</span>
          <Icon name="ArrowUturnLeft" aria-hidden="true" />
        </button>
      )}
    </PageFilterBadgeContainer>
  )
}

const PageFilterBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .button-reset {
    position: relative;
    padding-right: 20px;
    font-size: ${(props) => props.theme.typo.size.xs};
    line-height: ${(props) => props.theme.typo.leading.xs};
    color: rgb(var(--color-primary600));
    svg {
      position: absolute;
      top: 50%;
      right: 0;
      width: 14px;
      transform: translateY(-50%);
    }
  }
  &:not(:empty):not(:first-child) {
    margin-top: 16px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    &:not(:empty):not(:first-child) {
      margin-top: 16px;
    }
  }
`

export default PageFilterBadge
