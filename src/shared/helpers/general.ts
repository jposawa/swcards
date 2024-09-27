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
export const randomNumber = (min: number, max: number): number => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);

	const randomValue = Math.floor(
		Math.random() * (maxFloored - minCeiled + 1) + minCeiled
	);

	return randomValue;
};
