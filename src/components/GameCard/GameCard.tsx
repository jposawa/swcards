import React from "react";
import {
  CardBackface,
  CardPazaakSpec,
  CardType,
  GameCategory,
} from "../../shared/types";
import { Backface } from "./Backface/";
import { CardPazaak } from "./CardPazaak";

import styles from "./GameCard.module.css";

type GameCardProps = CardType & {
  backface?: CardBackface;
  className?: string;
  size?: string;
  startTurned?: boolean;
  style?: React.CSSProperties;
  turnOnHover?: boolean;
};

export const GameCard: React.FC<GameCardProps> = (props) => {
  const {
    game,
    backface = CardBackface.Default,
    className = "",
    size = "12rem",
    startTurned = false,
    style = {},
    turnOnHover = false,
  } = props;

  return (
    <article
      className={`${styles.cardContainer} ${startTurned ? styles.turned : ""} ${
        turnOnHover ? styles.turnable : ""
      } ${className}`}
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
          [GameCategory.Pazaak]: (
            <CardPazaak
              sign={(props as CardPazaakSpec).sign}
              value={(props as CardPazaakSpec).value}
            />
          ),
          [GameCategory.KesselSabacc]: <></>,
        }[game]
      }
    </article>
  );
};
