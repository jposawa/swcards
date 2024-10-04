import { atom } from "recoil";
import { PlayerData, Theme } from "../types";
import { withNamespace } from "../helpers";

export const themeAtom = atom<Theme>({
  key: withNamespace("theme"),
  default: Theme.Dark,
});

export const currentPlayerAtom = atom<PlayerData | undefined>({
  key: withNamespace("currentPlayer"),
  default: undefined,
});
