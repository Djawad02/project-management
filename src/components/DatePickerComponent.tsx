import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (dates: [Date | null, Date | null]) => void; // Updated to handle Date | null
  selectsRange?: boolean;
  dateFormat?: string;
  placeholderText?: string;
}

const DatePickerComponent = ({
  startDate,
  endDate,
  onChange,
  selectsRange = false,
  dateFormat = "yyyy-MM-dd",
  placeholderText = "",
}: DatePickerComponentProps) => {
  return (
    <DatePicker
      selected={startDate ?? null}
      startDate={startDate ?? undefined}
      endDate={endDate ?? undefined}
      onChange={(dates: [Date | null, Date | null]) => onChange(dates)}
      selectsRange={selectsRange as true} // Boolean is fine
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      inline
    />
  );
};

export default DatePickerComponent;
