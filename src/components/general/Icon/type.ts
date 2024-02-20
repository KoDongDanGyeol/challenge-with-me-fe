export const IconName = {
  ["ArrowUturnLeft"]: "ArrowUturnLeft",
  ["Bars"]: "Bars",
  ["Check"]: "Check",
  ["ChevronLeft"]: "ChevronLeft",
  ["ChevronRight"]: "ChevronRight",
  ["ChevronUpDown"]: "ChevronUpDown",
  ["Loading"]: "Loading",
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
  ["XCircle"]: "XCircle",
  ["XMark"]: "XMark",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
