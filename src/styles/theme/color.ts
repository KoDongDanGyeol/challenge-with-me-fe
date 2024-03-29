export type Color = typeof colorLight | typeof colorDark
export type ColorKey = keyof Color

export const colorLight = {
  gray0: "255, 255, 255",
  gray50: "249, 250, 251",
  gray100: "243, 244, 246",
  gray200: "229, 231, 235",
  gray300: "209, 213, 219",
  gray400: "156, 163, 175",
  gray500: "107, 114, 128",
  gray600: "75, 85, 99",
  gray700: "55, 65, 81",
  gray800: "31, 41, 55",
  gray900: "17, 24, 39",

  red50: "254, 242, 242",
  red100: "254, 226, 226",
  red200: "254, 202, 202",
  red300: "252, 165, 165",
  red400: "248, 113, 113",
  red500: "239, 68, 68",
  red600: "220, 38, 38",
  red700: "185, 28, 28",
  red800: "153, 27, 27",
  red900: "127, 29, 29",

  yellow50: "255, 251, 235",
  yellow100: "254, 243, 199",
  yellow200: "253, 230, 138",
  yellow300: "252, 211, 77",
  yellow400: "251, 191, 36",
  yellow500: "245, 158, 11",
  yellow600: "217, 119, 6",
  yellow700: "180, 83, 9",
  yellow800: "146, 64, 14",
  yellow900: "120, 53, 15",

  green50: "236, 253, 245",
  green100: "209, 250, 229",
  green200: "167, 243, 208",
  green300: "110, 231, 183",
  green400: "52, 211, 153",
  green500: "16, 185, 129",
  green600: "5, 150, 105",
  green700: "4, 120, 87",
  green800: "6, 95, 70",
  green900: "6, 78, 59",

  primary50: "230, 246, 255",
  primary100: "173, 224, 255",
  primary200: "133, 204, 255",
  primary300: "87, 172, 242",
  primary400: "46, 141, 230",
  primary500: "9, 109, 217",
  primary600: "0, 80, 179",
  primary700: "0, 58, 140",
  primary800: "0, 39, 102",
  primary900: "0, 22, 64",
}

export const colorDark = {
  gray0: "255, 255, 255",
  gray50: "249, 250, 251",
  gray100: "243, 244, 246",
  gray200: "229, 231, 235",
  gray300: "209, 213, 219",
  gray400: "156, 163, 175",
  gray500: "107, 114, 128",
  gray600: "75, 85, 99",
  gray700: "55, 65, 81",
  gray800: "31, 41, 55",
  gray900: "17, 24, 39",

  red50: "254, 242, 242",
  red100: "254, 226, 226",
  red200: "254, 202, 202",
  red300: "252, 165, 165",
  red400: "248, 113, 113",
  red500: "239, 68, 68",
  red600: "220, 38, 38",
  red700: "185, 28, 28",
  red800: "153, 27, 27",
  red900: "127, 29, 29",

  yellow50: "255, 251, 235",
  yellow100: "254, 243, 199",
  yellow200: "253, 230, 138",
  yellow300: "252, 211, 77",
  yellow400: "251, 191, 36",
  yellow500: "245, 158, 11",
  yellow600: "217, 119, 6",
  yellow700: "180, 83, 9",
  yellow800: "146, 64, 14",
  yellow900: "120, 53, 15",

  green50: "236, 253, 245",
  green100: "209, 250, 229",
  green200: "167, 243, 208",
  green300: "110, 231, 183",
  green400: "52, 211, 153",
  green500: "16, 185, 129",
  green600: "5, 150, 105",
  green700: "4, 120, 87",
  green800: "6, 95, 70",
  green900: "6, 78, 59",

  primary50: "230, 246, 255",
  primary100: "173, 224, 255",
  primary200: "133, 204, 255",
  primary300: "87, 172, 242",
  primary400: "46, 141, 230",
  primary500: "9, 109, 217",
  primary600: "0, 80, 179",
  primary700: "0, 58, 140",
  primary800: "0, 39, 102",
  primary900: "0, 22, 64",
}
