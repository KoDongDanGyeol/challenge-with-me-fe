"use client"

import styled, { css } from "styled-components"
import { IDEGridArea } from "@/components/form/IDE/type"

export interface IDEGridProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  gridArea: IDEGridArea
}

const IDEGrid = (props: IDEGridProps) => {
  const { gridArea, className = "", children, ...restProps } = props

  return (
    <IDEGridContainer className={`${className}`} $gridArea={gridArea} {...restProps}>
      {children}
    </IDEGridContainer>
  )
}

interface IDEGridStyled {
  $gridArea: IDEGridProps["gridArea"]
}

const IDEGridLeading = css`
  margin: 0 -1px;
  padding-bottom: 24px;
`
const IDEGridCell = css`
  display: flex;
  flex-direction: column;
`

const IDEGridTrailing = css`
  margin: 0 -1px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  padding-top: 24px;
  @media ${(props) => props.theme.screen.device.md} {
    justify-content: flex-end;
  }
`

const IDEGridContainer = styled.div<IDEGridStyled>`
  grid-area: ${(props) => props.$gridArea};
  ${(props) =>
    props.$gridArea === IDEGridArea.Leading
      ? [IDEGridLeading]
      : props.$gridArea === IDEGridArea.Challenge
        ? [IDEGridCell]
        : props.$gridArea === IDEGridArea.Editor
          ? [IDEGridCell]
          : props.$gridArea === IDEGridArea.Result
            ? [IDEGridCell]
            : props.$gridArea === IDEGridArea.Trailing
              ? [IDEGridTrailing]
              : null};
`

export default IDEGrid
