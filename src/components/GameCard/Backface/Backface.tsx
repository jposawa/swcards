import React from "react";
import { CardBackface } from "../../../shared/types";
import { BackfaceStandard } from "./";

type BackfaceProps = {
  backface: CardBackface;
};

const BackfaceMap = {
  [CardBackface.Default]: <BackfaceStandard />,
};

export const Backface: React.FC<BackfaceProps> = ({ backface }) => {
  return <>{BackfaceMap[backface]}</>;
};
