"use client"

import { forwardRef } from "react"
import styled, { css } from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { ButtonEmphasis, ButtonShape, ButtonSize, ButtonVariants } from "@/components/general/Button/type"

export type ButtonMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    emphasis?: ButtonEmphasis
    shape?: ButtonShape
    size?: ButtonSize
    variants?: ButtonVariants
  }
>

export type ButtonMainComponent = <C extends React.ElementType = "button">(props: ButtonMainProps<C>) => React.ReactNode

const ButtonMain: ButtonMainComponent = forwardRef(function ButtonMain<C extends React.ElementType = "button">(
  props: ButtonMainProps<C>,
  ref?: PolymorphicRef<C>,
): React.ReactNode {
  const {
    asTag,
    emphasis = ButtonEmphasis.Bold,
    shape = ButtonShape.Square,
    size = ButtonSize.BASE,
    variants = ButtonVariants.Primary,
    className = "",
    children,
    ...restProps
  } = props

  return (
    <ButtonMainContainer
      ref={ref}
      as={asTag ?? "button"}
      $emphasis={emphasis}
      $shape={shape}
      $size={size}
      $variants={variants}
      className={`${className}`}
      {...restProps}
    >
      {children}
    </ButtonMainContainer>
  )
})

interface ButtonMainStyled<C extends React.ElementType = "button"> {
  $emphasis: NonUndefined<ButtonMainProps<C>["emphasis"]>
  $shape: NonUndefined<ButtonMainProps<C>["shape"]>
  $size: NonUndefined<ButtonMainProps<C>["size"]>
  $variants: NonUndefined<ButtonMainProps<C>["variants"]>
}

const Square = css<ButtonMainStyled>`
  padding: ${(props) =>
    props.$size === ButtonSize.XS || props.$size === ButtonSize.SM
      ? "4px 8px"
      : props.$size === ButtonSize.BASE
        ? "6px 10px"
        : props.$size === ButtonSize.LG
          ? "8px 12px"
          : props.$size === ButtonSize.XL
            ? "10px 14px"
            : ""};
  font-size: ${(props) =>
    props.$size === ButtonSize.XS
      ? props.theme.typo.size.xs
      : props.$size === ButtonSize.SM ||
          props.$size === ButtonSize.BASE ||
          props.$size === ButtonSize.LG ||
          props.$size === ButtonSize.XL
        ? props.theme.typo.size.sm
        : ""};
  font-weight: 700;
  line-height: ${(props) =>
    props.$size === ButtonSize.XS
      ? props.theme.typo.leading.xs
      : props.$size === ButtonSize.SM ||
          props.$size === ButtonSize.BASE ||
          props.$size === ButtonSize.LG ||
          props.$size === ButtonSize.XL
        ? props.theme.typo.leading.sm
        : ""};
  border-width: 1px;
  border-style: solid;
  border-radius: ${(props) =>
    props.$size === ButtonSize.XS || props.$size === ButtonSize.SM
      ? "4px"
      : props.$size === ButtonSize.BASE || props.$size === ButtonSize.LG || props.$size === ButtonSize.XL
        ? "6px"
        : ""};
`

const SquarePrimary = css<ButtonMainStyled>`
  color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-gray0))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-primary500))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-primary500))`
          : ""};
  background: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-primary500))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-gray0))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  border-color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-primary500))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-primary500))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  &:hover,
  &:focus {
    background: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-primary500))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-primary50))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-primary50))`
            : ""};
    border-color: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-primary500))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-primary500))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-primary50))`
            : ""};
  }
`

const SquareSecondary = css<ButtonMainStyled>`
  color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-gray900))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-gray900))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray900))`
          : ""};
  background: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-gray200))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-gray0))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  border-color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-gray200))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-gray200))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  &:hover,
  &:focus {
    background: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-gray300))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-gray100))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-gray100))`
            : ""};
    border-color: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-gray300))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-gray200))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-gray100))`
            : ""};
  }
`

const SquareNegative = css<ButtonMainStyled>`
  color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-gray0))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-red600))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-red600))`
          : ""};
  background: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-red600))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-gray0))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  border-color: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? `rgb(var(--color-red600))`
      : props.$emphasis === ButtonEmphasis.Subtle
        ? `rgb(var(--color-red600))`
        : props.$emphasis === ButtonEmphasis.Minimal
          ? `rgb(var(--color-gray0))`
          : ""};
  &:hover,
  &:focus {
    background: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-red600))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-red100))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-red100))`
            : ""};
    border-color: ${(props) =>
      props.$emphasis === ButtonEmphasis.Bold
        ? `rgb(var(--color-red600))`
        : props.$emphasis === ButtonEmphasis.Subtle
          ? `rgb(var(--color-red100))`
          : props.$emphasis === ButtonEmphasis.Minimal
            ? `rgb(var(--color-red100))`
            : ""};
  }
`

const Plain = css<ButtonMainStyled>`
  font-size: ${(props) => props.theme.typo.size[props.$size]};
  line-height: ${(props) => props.theme.typo.leading[props.$size]};
  font-weight: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? ""
      : props.$emphasis === ButtonEmphasis.Subtle
        ? 700
        : props.$emphasis === ButtonEmphasis.Minimal
          ? ""
          : ""};
  text-decoration: ${(props) =>
    props.$emphasis === ButtonEmphasis.Bold
      ? "underline"
      : props.$emphasis === ButtonEmphasis.Subtle
        ? ""
        : props.$emphasis === ButtonEmphasis.Minimal
          ? ""
          : ""};
`

const PlainPrimary = css<ButtonMainStyled>`
  color: rgb(var(--color-primary500));
`

const PlainSecondary = css<ButtonMainStyled>`
  color: rgb(var(--color-gray900));
`

const PlainNegative = css<ButtonMainStyled>`
  color: rgb(var(--color-red600));
`

const ButtonMainContainer = styled.button<ButtonMainStyled>`
  display: flex;
  align-items: center;
  gap: 4px;
  ${(props) =>
    props.$shape === ButtonShape.Square
      ? props.$variants === ButtonVariants.Primary
        ? [Square, SquarePrimary]
        : props.$variants === ButtonVariants.Secondary
          ? [Square, SquareSecondary]
          : props.$variants === ButtonVariants.Negative
            ? [Square, SquareNegative]
            : null
      : props.$shape === ButtonShape.Plain
        ? props.$variants === ButtonVariants.Primary
          ? [Plain, PlainPrimary]
          : props.$variants === ButtonVariants.Secondary
            ? [Plain, PlainSecondary]
            : props.$variants === ButtonVariants.Negative
              ? [Plain, PlainNegative]
              : null
        : null}
  &:disabled {
    opacity: 0.8;
  }
  svg {
    width: ${(props) =>
      props.$size === ButtonSize.XS
        ? "14px"
        : props.$size === ButtonSize.SM
          ? "16px"
          : props.$size === ButtonSize.BASE
            ? "16px"
            : props.$size === ButtonSize.LG
              ? "18px"
              : props.$size === ButtonSize.XL
                ? "18px"
                : ""};
  }
`

export default ButtonMain
