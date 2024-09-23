import { NAMESPACE } from "../constants";

export const withNamespace = (baseTxt: string): string => {
  const parsedText = baseTxt.trim();

  return `${NAMESPACE}_${parsedText}`;
}