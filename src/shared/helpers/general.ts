import { NAMESPACE } from "../constants";

export const withNamespace = (baseTxt: string): string => {
  const parsedText = baseTxt.trim();

  return `${NAMESPACE}_${parsedText}`;
};

/**
 * Since I'm using generic typing, I can't use arrow function in this case
 */
export function arrayShuffle<T>(baseArray: T[]): T[] {
  for (let i = baseArray.length - 1; i > 0; i--) {
    const targetIndex = Math.floor(Math.random() * (i + 1));

    // At this line I reassign the array item value
    [baseArray[i], baseArray[targetIndex]] = [
      baseArray[targetIndex],
      baseArray[i],
    ];
  }

  return baseArray;
}

/**
 * Return a random number using [min, max] interval
 * In other words, it will include both min and max into calculation
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
export const randomNumber = (min: number, max: number, includeMax = true): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const maxOffset = 1 * Number(includeMax);

  const randomValue = Math.floor(
    Math.random() * (maxFloored - minCeiled + maxOffset) + minCeiled
  );

  return randomValue;
};

export function cloneObj<T>(baseObj: T): T {
  const clonedObj = JSON.parse(JSON.stringify(baseObj)) as T;

  return clonedObj;
}

/**
 * Save data in localStorage or sessionStorage
 *
 * @param {string} key - Saved data key
 * @param {unknown} value - Value to be saved
 * @param {object} [options] - Saving options
 * @param {boolean} [options.needParse] - (Optional) If data need to be parsed before saving (For Arrays or Objects)
 * @param {boolean} [options.persistData] - (Optional) If it should persist after closing tab (Default true)
 */
export const saveStorage = (
  key: string,
  value: unknown,
  options: { needParse?: boolean; persistData?: boolean } = {}
) => {
  const { needParse = false, persistData = true } = options;
  const finalKey = withNamespace(key);
  const usedFunc = persistData ? localStorage : sessionStorage;
  const finalValue = needParse ? JSON.stringify(value) : (value as string);

  usedFunc.setItem(finalKey, finalValue);
};

/**
 * Load data from localStorage or sessionStorage
 *
 * @param {string} key - Data key
 * * @param {object} [options] - Loading options
 * @param {boolean} [options.needParse] - (Optional) If data need to be parsed before returning (For Arrays or Objects)
 * @param {boolean} [options.dataPersisted=true] - (Optional) If data was persisting (Default true)
 *
 * @returns {unknown | undefined} Valor que estava salvo com essa chave
 */
export const loadStorage = (
  key: string,
  options: {
    needParse?: boolean;
    dataPersisted?: boolean;
  } = {}
) => {
  const { needParse = false, dataPersisted = true } = options;
  const finalKey = withNamespace(key);
  const usedFunc = dataPersisted ? localStorage : sessionStorage;

  const rawValue = usedFunc.getItem(finalKey);

  if (!rawValue) {
    return undefined;
  }

  return needParse ? JSON.parse(rawValue) : rawValue;
};
