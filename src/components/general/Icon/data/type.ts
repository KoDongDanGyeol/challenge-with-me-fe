export const IconName = {
  ["SymbolGithub"]: "SymbolGithub",
  ["SymbolGoogle"]: "SymbolGoogle",
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
