export const IconName = {
  ["Bars"]: "Bars",
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
  ["XMark"]: "XMark",
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
