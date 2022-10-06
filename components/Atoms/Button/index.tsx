
import React, { ButtonHTMLAttributes, ReactElement } from "react";

interface ButtonProp {
  label: string;
  size?: "small" | "medium" | "large";
  rounded?: boolean;
  color?: "primary" | "secondary" | "white";
  icon?: ReactElement;
  iconRight?:ReactElement;
  iconLeft?:ReactElement;
  noMargin?:boolean;
}

function Button(props: ButtonProp & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { label, size="medium", rounded, color, icon, iconLeft, iconRight, noMargin=false } = props;
    return (
    <button
      className={` w-full ${noMargin?"":" m-4 lg:m-6"} ${rounded ? "rounded-full" : "rounded-lg"} ${
        size === "small" ? "text-[14px] px-4 py-3" : "text-sm lg:text-base font-normal px-3 lg:px-5 py-3 lg:py-[14px]"
      }
      ${
        color === "primary"
          ? "bg-primary"
          : color === "secondary"
          ? "bg-secondary text-white"
          : color === "white"
          ? "bg-white border border-[#DEE3E9]"
          : "bg-secondary"
      }`}
      {...props}

    >
      {label}
    </button>
  );
}
export default Button;