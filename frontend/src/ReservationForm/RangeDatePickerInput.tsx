import dayjs from "dayjs";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { CalendarIcon } from "./CalendarIcon";
import { Input } from "./Input";

interface RangeDatePickerInputProps {
  label: string;
  value: [Date, Date];
  onChange: (startDate: Date, endDate: Date) => void;
  disabled?: boolean;
}

export const RangeDatePickerInput = ({
  label,
  value,
  onChange,
  disabled,
}: RangeDatePickerInputProps) => {
  const [visible, setVisible] = useState(false);
  const startDate = dayjs(value[0]);
  const endDate = dayjs(value[1]);
  const tomorrow = dayjs().add(1, "day");

  return (
    <div>
      {visible ? (
        <div
          className="fixed z-10 inset-0 bg-black opacity-50"
          onClick={() => setVisible(false)}
        />
      ) : null}
      <Input
        type="button"
        label={label}
        value={`${startDate.format("MMMM DD")} - ${endDate.format("MMMM DD")}`}
        trailing={
          <CalendarIcon className="text-black" width={25} opacity={0.3} />
        }
        disabled={disabled}
        onClick={!disabled ? () => setVisible(true) : undefined}
      />
      {visible ? (
        <DateRangePicker
          className="absolute z-20"
          ranges={[{ key: "default", startDate: value[0], endDate: value[1] }]}
          onChange={rangeMap => {
            const range = rangeMap["default"];
            onChange(
              range.startDate ?? new Date(),
              range.endDate ?? new Date()
            );
          }}
          minDate={new Date()}
          fixedHeight={true}
          rangeColors={["#a2ab99"]}
          staticRanges={[
            {
              range: () => ({
                startDate: tomorrow.toDate(),
                endDate: tomorrow.toDate(),
              }),
              isSelected: ({ startDate, endDate }) =>
                dayjs(startDate).isBefore(tomorrow.add(1, "minute")) &&
                dayjs(endDate).isAfter(tomorrow.add(-1, "minute")),
              label: "Tomorrow",
            },
          ]}
          classNames={{
            dateRangeWrapper: "bg-primary-light",
            dateDisplayWrapper: "bg-primary-light",
            prevButton: "bg-primary-light",
            nextPrevButton: "bg-primary-light",
          }}
        />
      ) : null}
    </div>
  );
};
