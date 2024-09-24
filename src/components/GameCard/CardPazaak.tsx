import React from "react";
import { PazaakCore, PazaakSign } from "../../shared/types";
import { SIGN_MAP } from "../../shared/constants";

import styles from "./GameCard.module.css";
import pazaakStyles from "./CardPazaak.module.css";

type CardPazaakProps = PazaakCore & {
  className?: string;
  style?: React.CSSProperties;
};

export const CardPazaak: React.FC<CardPazaakProps> = ({
  sign,
  value,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`${styles.card} ${pazaakStyles.base} ${className}`}
      style={
        {
          ...style,
          "--cardMainColor": SIGN_MAP[sign].color[0],
          "--cardSecondColor":
            SIGN_MAP[sign].color[1] || SIGN_MAP[sign].color[0],
        } as React.CSSProperties
      }
    >
      <header>
        <span
          className={`${pazaakStyles.signCircle} ${pazaakStyles.cardColor}`}
        >
          {SIGN_MAP[sign].label}
        </span>
      </header>

      <section className={pazaakStyles.cardCore}>
        <span className={`${pazaakStyles.cardColor} ${pazaakStyles.mainColor}`} />

        <div className={pazaakStyles.valueContainer}>
          <span className={pazaakStyles.triangle} />

          <span className={pazaakStyles.value}>
            {SIGN_MAP[sign].label}
            {value}
          </span>

          <span
            className={`${pazaakStyles.triangle} ${pazaakStyles.inverted}`}
          />
        </div>

        <span
          className={`${pazaakStyles.cardColor} ${pazaakStyles.inverted} ${pazaakStyles.altColor}`}
        />
      </section>

      <footer className={pazaakStyles.cardColor}>
        {sign === PazaakSign.Both && (
          <>
            <span>-</span>
            <span>+</span>
          </>
        )}
      </footer>
    </div>
  );
};
