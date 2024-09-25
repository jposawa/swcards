import React from "react";
import styles from "./Backface.module.css";
import standardStyles from "./BackfaceStandard.module.css";

const HalfCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`${standardStyles.halfContainer} ${className}`}>
      <span className={standardStyles.cornerContainer}>
        <span className={standardStyles.cornerContent}>
          <h4>..</h4>
        </span>
      </span>

      <span
        className={`${standardStyles.trapezoid} ${standardStyles.trapezContainer}`}
      >
        <span
          className={`${standardStyles.trapezoid} ${standardStyles.bgShape} ${standardStyles.outerShape}`}
        >
          <span
            className={`${standardStyles.trapezoid} ${standardStyles.innerTrapezoid}`}
          />
        </span>
      </span>
    </div>
  );
};

export const BackfaceStandard: React.FC = () => {
  return (
    <div className={`${styles.backface} ${standardStyles.base}`}>
      <div className={standardStyles.artContainer}>
        <HalfCard />

        <HalfCard className={styles.inverted} />
      </div>
    </div>
  );
};
