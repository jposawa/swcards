import React from "react";
import { GameCategory, PazaakCore, PlayerData } from "../../shared/types";

import styles from "./PazaakDeckPlayer.module.css";
import { GameCard } from "../../components";
import { getSumPazaakDeck } from "../../shared/helpers";

type PazaakDeckPlayerProps = {
	playerInfo: PlayerData;
	cards: PazaakCore[];
	className?: string;
	style?: React.CSSProperties;
};

export const PazaakDeckPlayer: React.FC<PazaakDeckPlayerProps> = ({
	playerInfo,
	cards,
	className = "",
	style = {},
}) => {
	const playerScore = React.useMemo(() => {
		const score = getSumPazaakDeck(cards);

		return score;
	}, [cards]);

	return (
		<section
			className={`${styles.pazaakPlayerContainer} ${className}`}
			style={style}
		>
			<h4>{playerInfo.name}</h4>
			<p>
				<b>Score</b>: {playerScore}
			</p>

			<div className={styles.cardsContainer}>
				{cards.map((card, index) => (
					<GameCard
						key={`${card.value}-${index}`}
						game={GameCategory.Pazaak}
						sign={card.sign}
						value={card.value}
						className={styles.playerDeck}
					/>
				))}
			</div>
		</section>
	);
};
