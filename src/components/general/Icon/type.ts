export const IconName = {
  ["Bars"]: "Bars",
  ["Loading"]: "Loading",
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
  ["XCircle"]: "XCircle",
  ["XMark"]: "XMark",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
