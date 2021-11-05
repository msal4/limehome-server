import { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`mt-4 py-4 px-12 text-white ${
        disabled ? "bg-gray-300" : "bg-primary"
      } font-light text-sm tracking-widest`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
