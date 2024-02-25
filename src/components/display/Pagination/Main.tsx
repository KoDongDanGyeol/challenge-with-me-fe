"use client"

import { useMemo } from "react"
import styled from "styled-components"
import Icon from "@/components/general/Icon"

export interface PaginationMainProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPaging?: (number: number) => void
}

const PaginationMain = (props: PaginationMainProps) => {
  const { page, totalPages, className = "", onPaging, ...restProps } = props

  const paging = useMemo(() => {
    const size = 5
    const start = Math.max(Math.floor((page - 1) / size) * size + 1, 1)
    const end = Math.min(start + (size - 1), totalPages)
    return [...Array(end - start + 1).keys()].map((i) => i + start)
  }, [page, totalPages])

  if (!totalPages) {
    return null
  }

  return (
    <PaginationMainContainer role="navigation" className={`${className}`} {...restProps}>
      <button type="button" disabled={page === 1} onClick={() => onPaging?.(page - 1)}>
        <Icon name="ChevronLeft" aria-hidden={true} />
        <span className="sr-only">이전 페이지</span>
      </button>
      {paging.map((number) => (
        <button type="button" key={number} aria-current={number === page} onClick={() => onPaging?.(number)}>
          {number === page && <span className="sr-only">현재 페이지</span>}
          <span>{number}</span>
        </button>
      ))}
      <button type="button" disabled={page === totalPages} onClick={() => onPaging?.(page + 1)}>
        <Icon name="ChevronRight" aria-hidden={true} />
        <span className="sr-only">다음 페이지</span>
      </button>
    </PaginationMainContainer>
  )
}

const PaginationMainContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
  button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    svg {
      margin: 0 auto;
      width: 16px;
    }
    &:hover,
    &:focus {
      background: rgb(var(--color-gray100));
    }
    &:disabled {
      color: rgb(var(--color-gray400));
      stroke: rgb(var(--color-gray400));
    }
    &[aria-current="true"] {
      color: rgb(var(--color-primary400));
      background: rgb(var(--color-gray0));
      border: 1px solid rgb(var(--color-primary400));
    }
  }
`

export default PaginationMain
