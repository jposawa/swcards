import React from "react";
import { CardBackface, Game } from "../../shared/types";

import styles from "./GameCard.module.css";
import { Backface } from "./Backface/";
import { CardPazaak } from "./CardPazaak";

type GameCardProps = {
  game: Game;
  backface?: CardBackface;
  className?: string;
  size?: string;
  style?: React.CSSProperties;
};

export const GameCard: React.FC<GameCardProps> = ({
  game,
  backface = CardBackface.Default,
  className = "",
  size = "8rem",
  style = {},
}) => {
  return (
    <article
      className={`${styles.cardContainer} ${className}`}
      style={
        {
          ...style,
          "--height": size,
        } as React.CSSProperties
      }
    >
      <Backface backface={backface} />

      {
        {
          [Game.Pazaak]: <CardPazaak />,
        }[game]
      }
    </article>
  );
};
