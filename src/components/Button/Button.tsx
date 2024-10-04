import React from "react";

import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  preset?: "filled" | "outline" | "link";
}

export const Button: React.FC<ButtonProps> = ({
  className="",
  type="button",
  preset="filled",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${styles[preset]}`}
      type={type}
      {...props} 
    />
  )
}