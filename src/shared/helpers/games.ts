import { PazaakCore, PazaakSign } from "./../types/cards";

/**
 * Receive an Array of Pazaak cards and return total score of them
 *
 * @param {PazaakCore[]} cards
 *
 * @returns {number} total score
 */
export const getSumPazaakDeck = (cards: PazaakCore[]): number => {
	const score = cards.reduce((currentScore, card) => {
		let parsedValue = card.value as number;

		if (card.sign === PazaakSign.Minus) {
			parsedValue *= -1;
		}

		return currentScore + parsedValue;
	}, 0);

	return score;
};
