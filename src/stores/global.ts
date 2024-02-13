"use client";

import { atom } from "recoil";
import { ScreenSize } from "@/styles/theme/screen";

export type TypeGlobal = {
  screen: (keyof ScreenSize)[];
  isHeaderOpened: boolean;
};

export const atomGlobal = atom<TypeGlobal>({
  key: "atomGlobal",
  default: {
    screen: [],
    isHeaderOpened: false,
  },
  effects: [],
});
