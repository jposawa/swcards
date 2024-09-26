import { NAMESPACE } from "../constants";

export const withNamespace = (baseTxt: string): string => {
  const parsedText = baseTxt.trim();

  return `${NAMESPACE}_${parsedText}`;
}

/**
 * Since I'm using generic typing, I can't use arrow function in this case
 */
export function arrayShuffle<T>(baseArray: T[]): T[] {
  for (let i = baseArray.length - 1; i > 0; i--) {
    const targetIndex = Math.floor(Math.random() * (i + 1));

    // At this line I reassign the array item value
    [baseArray[i], baseArray[targetIndex]] = [baseArray[targetIndex], baseArray[i]];
  }

  return baseArray;
}