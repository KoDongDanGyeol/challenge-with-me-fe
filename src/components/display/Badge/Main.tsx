"use client"

import Icon from "@/components/general/Icon"
import styled from "styled-components"

export interface BadgeMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  onRemove: () => void
}

const BadgeMain = (props: BadgeMainProps) => {
  const { className = "", children, onRemove, ...restProps } = props

  return (
    <BadgeMainContainer className={`${className}`} {...restProps}>
      {children}
      {onRemove && (
        <button type="button" className="button-remove" onClick={onRemove}>
          <Icon name="XMark" aria-hidden="true" />
          <span className="sr-only">삭제</span>
        </button>
      )}
    </BadgeMainContainer>
  )
}

const BadgeMainContainer = styled.span`
  position: relative;
  padding: 4px 10px;
  font-size: ${(props) => props.theme.typo.size.xs};
  line-height: ${(props) => props.theme.typo.leading.xs};
  color: rgb(var(--color-primary600));
  background: rgb(var(--color-primary100));
  border-radius: 12px;
  &:has(.button-remove) {
    padding-right: 26px;
  }
  .button-remove {
    position: absolute;
    top: 50%;
    right: 8px;
    display: block;
    transform: translateY(-50%);
    svg {
      width: 14px;
      stroke: rgb(var(--color-primary600));
    }
  }
`

export default BadgeMain
