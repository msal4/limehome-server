import {
  FocusEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler,
} from "react";

interface InputProps {
  className?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClick?: MouseEventHandler;
  trailing?: React.ReactNode;
  disabled?: boolean;
  onBlur?: FocusEventHandler;
  error?: string | false;
}

export const Input = ({
  className,
  name,
  type,
  label,
  required = true,
  value,
  placeholder,
  onChange,
  onClick,
  trailing,
  disabled,
  onBlur,
  error,
}: InputProps) => {
  return (
    <div className={className}>
      <label className="font-light text-sm tracking-wide">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>
      <div
        className={`flex items-center mt-2 ${
          !disabled ? "hover:bg-gray-100" : ""
        } ${type !== "button" ? "focus-within:bg-white" : ""} ${
          trailing ? "pr-4" : ""
        }`}
        style={{ border: `1px solid ${error ? "#f87171" : "black"}` }}
        onClick={onClick}
      >
        <input
          name={name}
          disabled={disabled}
          type={type}
          className="py-4 px-6 bg-transparent font-light w-full text-left text-sm outline-none"
          value={value}
          placeholder={placeholder}
          onChange={onChange && (e => onChange(e.target.value))}
          onBlur={onBlur}
        />
        {trailing}
      </div>
      {error ? <div className="text-xs text-red-400 mt-1">{error}</div> : null}
    </div>
  );
};
