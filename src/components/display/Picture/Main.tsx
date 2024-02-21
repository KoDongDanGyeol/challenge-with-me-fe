"use clinet"

import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"
import styled, { css } from "styled-components"
import { NonUndefined, isEquals } from "@/libs/utils"
import Icon, { IconName } from "@/components/general/Icon"
import { PictureRounded } from "@/components/display/Picture/type"

export interface PictureMainProps extends ImageProps {
  alt: string
  icon?: IconName
  ratio?: [number, number]
  rounded?: PictureRounded
  src: string
  text?: string
  className?: string
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  onError?: React.ReactEventHandler<HTMLImageElement>
}

const PictureMain = (props: PictureMainProps) => {
  const { alt, icon, ratio, rounded = PictureRounded.NONE, src, text, className, onLoad, onError, ...restProps } = props

  const [structure, setStructure] = useState<{
    isLoaded: boolean
    isErrored: boolean
    src: string | null
  }>({
    isLoaded: false,
    isErrored: false,
    src: src ?? null,
  })

  useEffect(() => {
    setStructure((prev) => ({
      ...prev,
      isLoaded: false,
      isErrored: false,
      src: src ?? null,
    }))
  }, [src])

  return (
    <PictureMainContainer className={`${className}`} $ratio={ratio ?? [0, 0]} $rounded={rounded ?? "none"}>
      {structure.src && !structure.isErrored ? (
        <Image
          fill={true}
          alt={alt}
          sizes="100%"
          src={structure.src}
          onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setStructure((prev) => ({ ...prev, isLoaded: true }))
            onLoad?.(event)
          }}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setStructure((prev) => ({ ...prev, isErrored: true, src: null }))
            onError?.(event)
          }}
          {...restProps}
        />
      ) : text ? (
        <PictureMainFallback>
          <span>{text}</span>
        </PictureMainFallback>
      ) : (
        <PictureMainFallback>
          <Icon name={icon ?? "Photo"} aria-hidden={true} />
        </PictureMainFallback>
      )}
    </PictureMainContainer>
  )
}

interface PictureMainStyled {
  $ratio: NonUndefined<PictureMainProps["ratio"]>
  $rounded: NonUndefined<PictureMainProps["rounded"]>
}

const PictureMainFallback = styled.div`
  background: rgb(var(--color-gray300));
  span,
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  span {
    display: block;
    width: 100%;
    color: rgb(var(--color-gray700));
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transform: translate(-50%, -50%) scale(0.85);
  }
  svg {
    width: 50%;
    stroke: rgb(var(--color-gray500));
    transform: translate(-50%, -50%);
  }
`

const PictureMainRatio = css<PictureMainStyled>`
  img {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
  &:before {
    content: "";
    display: block;
    padding-top: ${(props) => (props.$ratio[1] / props.$ratio[0]) * 100}%;
  }
  ${PictureMainFallback} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const PictureMainAuto = css`
  img {
    position: relative !important;
    width: 100% !important;
    height: auto !important;
  }
  ${PictureMainFallback} {
    position: relative;
    width: 100%;
    height: auto;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }
`

const PictureMainContainer = styled.div<PictureMainStyled>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${(props) => (props.$ratio && !isEquals(props.$ratio, [0, 0]) ? PictureMainRatio : PictureMainAuto)}
  border-radius: ${(props) =>
    props.$rounded === PictureRounded.NONE
      ? "0px"
      : props.$rounded === PictureRounded.FULL
        ? props.$ratio && !isEquals(props.$ratio, [0, 0])
          ? "50%"
          : "9999px"
        : ""}
`

export default PictureMain
