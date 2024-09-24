import { PazaakSign, SignInfo } from "../types";

export const SIGN_MAP: Record<PazaakSign, SignInfo> = {
  [PazaakSign.Minus]: {
    color: ["red"],
    label: "-",
  },
  [PazaakSign.Plus]: {
    color: ["blue"],
    label: "+",
  },
  [PazaakSign.Both]: {
    color: ["blue", "red"],
    label: "\u00b1",
  },
  [PazaakSign.Special]: {
    color: ["gold"],
  },
  [PazaakSign.Standard]: {
    color: ["green"],
  },
};
