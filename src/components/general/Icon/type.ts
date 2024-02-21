export const IconName = {
  ["ArrowUturnLeft"]: "ArrowUturnLeft",
  ["Bars"]: "Bars",
  ["Calendar"]: "Calendar",
  ["ChatBubbleLeftEllipsis"]: "ChatBubbleLeftEllipsis",
  ["Check"]: "Check",
  ["CheckCircle"]: "CheckCircle",
  ["ChevronLeft"]: "ChevronLeft",
  ["ChevronRight"]: "ChevronRight",
  ["ChevronUpDown"]: "ChevronUpDown",
  ["ExclamationCircle"]: "ExclamationCircle",
  ["Heart"]: "Heart",
  ["HeartSolid"]: "HeartSolid",
  ["Loading"]: "Loading",
  ["MagnifyingGlass"]: "MagnifyingGlass",
  ["Photo"]: "Photo",
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
  ["UserCircle"]: "UserCircle",
  ["XCircle"]: "XCircle",
  ["XMark"]: "XMark",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
