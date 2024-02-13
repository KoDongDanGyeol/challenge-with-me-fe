export const ButtonEmphasis = {
  Bold: "bold",
  Subtle: "subtle",
  Minimal: "minimal",
} as const

export type ButtonEmphasis = (typeof ButtonEmphasis)[keyof typeof ButtonEmphasis]

export const ButtonShape = {
  Square: "square",
  Plain: "plain",
} as const

export type ButtonShape = (typeof ButtonShape)[keyof typeof ButtonShape]

export const ButtonSize = {
  XS: "xs",
  SM: "sm",
  BASE: "base",
  LG: "lg",
  XL: "xl",
} as const

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]

export const ButtonVariants = {
  Primary: "primary",
  Secondary: "secondary",
  Negative: "negative",
} as const

export type ButtonVariants = (typeof ButtonVariants)[keyof typeof ButtonVariants]
