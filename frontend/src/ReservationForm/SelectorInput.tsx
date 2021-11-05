import { useState } from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { Input } from "./Input";

export interface SelectorInputItem {
  value: string;
  label: string;
}
interface SelectorInputProps {
  label: string;
  placeholder?: string;
  items: SelectorInputItem[];
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  error?: string | false;
}

export const SelectorInput = ({
  label,
  placeholder,
  items,
  onChange,
  value,
  disabled,
  error,
}: SelectorInputProps) => {
  const [visible, setVisible] = useState(false);
  const currentItem = items.find(item => item.value === value);

  return (
    <>
      {visible ? (
        <div
          className="fixed z-10 inset-0 bg-black opacity-50"
          onClick={() => setVisible(false)}
        />
      ) : null}
      <div className="relative">
        <Input
          disabled
          label={label}
          value={currentItem?.label ?? ""}
          placeholder={placeholder}
          trailing={
            <ArrowDownIcon className="text-black" width={25} opacity={0.3} />
          }
          onClick={!disabled ? () => setVisible(true) : undefined}
          error={error}
        />
        {visible ? (
          <ul className="absolute z-20 bg-primary-light w-full max-h-80 overflow-y-scroll">
            {items.map(item => (
              <li
                className={`cursor-pointer px-6 py-4 text-sm ${
                  item.value === value
                    ? "text-gray-500 bg-gray-300"
                    : "hover:bg-primary hover:text-white font-light"
                }`}
                key={item.value}
                onClick={
                  onChange &&
                  (() => {
                    onChange(item.value);
                    setVisible(false);
                  })
                }
              >
                {item.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};
