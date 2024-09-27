import React from "react";
import { GameCard } from "../components";
import { arrayShuffle, randomNumber } from "../shared/helpers";
import {
	GameCategory,
	PazaakCardValue,
	PazaakCore,
	PazaakSign,
} from "../shared/types";

import styles from "./pages.module.css";
import { PazaakDeckPlayer } from "../fragments";
import { PAZAAK_PLAYERS } from "../shared/constants";

const getTableDeck = (
	options: {
		numCopies?: number;
		shuffle?: boolean;
	} = {}
) => {
	// Standard values
	const { numCopies = 4, shuffle = true } = options;
	const deckTableValues = [];

	/**
	 * This first for will run 10 times, from 1 to 10 (included)
	 */
	for (let i = 1; i <= 10; i++) {
		/**
		 * This one will run 4 times, from 0 to 4 (excluded)
		 * Note the comparison symbol at the middle statement
		 */
		for (let j = 0; j < numCopies; j++) {
			deckTableValues.push(i);
		}
	}

	if (shuffle) {
		return arrayShuffle(deckTableValues);
	}

	return deckTableValues;
};

export const Pazaak = () => {
	const [deckTable, setDeckTable] = React.useState(getTableDeck());
	const [deckPlayer1, setDeckPlayer1] = React.useState<PazaakCore[]>([]);
	const [deckPlayer2, setDeckPlayer2] = React.useState<PazaakCore[]>([]);
	const [playerTurn, setPlayerTurn] = React.useState<0 | 1>(0);

	const flipCard = React.useCallback(
		(state: PazaakCore[], setState: (param: PazaakCore[]) => void) => {
			const _deckTable = [...deckTable];
			const topCard = _deckTable[_deckTable.length - 1];
			const updatedPlayerDeck = [
				...state,
				{
					value: topCard,
					sign: PazaakSign.Standard,
				} as PazaakCore,
			];
			_deckTable.pop();
			setDeckTable(_deckTable);
			setState(updatedPlayerDeck);
		},
		[deckTable]
	);

	const switchPlayer = () => {
		setPlayerTurn(playerTurn === 0 ? 1 : 0);
	};

	const handleFlipCard = (alternate = false) => {
		if (playerTurn === 0) {
			flipCard(deckPlayer1, setDeckPlayer1);
		} else {
			flipCard(deckPlayer2, setDeckPlayer2);
		}

		if (alternate) {
			switchPlayer();
		}
	};

	React.useEffect(() => {
		const rawRandomValue = randomNumber(1, 100);
		// The chosen player index will be 0 or 1, to match the array
		// So I'm using the mod operator (%) that returns the missing part of a division
		const chosenPlayerIndex = rawRandomValue % 2;

		setPlayerTurn(chosenPlayerIndex as 0 | 1);
	}, []);

	const currentPlayer = React.useMemo(() => {
		const activePlayer = PAZAAK_PLAYERS[playerTurn];

		return activePlayer;
	}, [playerTurn]);

	return (
		<>
			<section className={styles.decksGroup}>
				<div className={styles.tableDeckContainer}>
					<div className={styles.actionContainer}>
						<h3>Table Deck</h3>
						<p>
							{deckTable.length} card{deckTable.length !== 1 && "s"}
						</p>
						<p>
							Current player: <b>{currentPlayer.name}</b>
						</p>
						{deckTable.length > 0 && (
							<>
								<p>
									<button onClick={() => handleFlipCard()}>Get a card</button>
								</p>

								<p>
									<button onClick={switchPlayer}>Finish turn</button>
								</p>
							</>
						)}
					</div>

					<div className={styles.tableCardsContainer}>
						{deckTable.map((value, index) => (
							<GameCard
								key={`${value}-${index}`}
								game={GameCategory.Pazaak}
								sign={PazaakSign.Standard}
								size="10rem"
								value={value as PazaakCardValue}
								className={styles.stackDeck}
								style={
									{
										"--offset": `${0.1 * index}rem`,
									} as React.CSSProperties
								}
								turned
							/>
						))}
					</div>
				</div>

				<div className={styles.playerDecksGroup}>
					<PazaakDeckPlayer
						playerInfo={PAZAAK_PLAYERS[0]}
						cards={deckPlayer1}
					/>

					<PazaakDeckPlayer
						playerInfo={PAZAAK_PLAYERS[1]}
						cards={deckPlayer2}
					/>
				</div>
			</section>
		</>
	);
};
