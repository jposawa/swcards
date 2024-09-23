import { atom } from "recoil";
import { Theme } from "../types";
import { withNamespace } from "../helpers";

export const themeAtom = atom<Theme>({
  key: withNamespace("theme"),
  default: Theme.Dark,
});
