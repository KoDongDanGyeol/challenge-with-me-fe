export const IconName = {
  ["ArrowUturnLeft"]: "ArrowUturnLeft",
  ["Bars"]: "Bars",
  ["Check"]: "Check",
  ["CheckCircle"]: "CheckCircle",
  ["ChevronLeft"]: "ChevronLeft",
  ["ChevronRight"]: "ChevronRight",
  ["ChevronUpDown"]: "ChevronUpDown",
  ["ExclamationCircle"]: "ExclamationCircle",
  ["Loading"]: "Loading",
  ["MagnifyingGlass"]: "MagnifyingGlass",
  ["Photo"]: "Photo",
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
  ["XCircle"]: "XCircle",
  ["XMark"]: "XMark",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
