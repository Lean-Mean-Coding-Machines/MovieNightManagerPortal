import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface dateSelectorProps {
  handleChangeDate: (input: dayjs.Dayjs) => void;
  startDay?: dayjs.Dayjs;
  endDay?: dayjs.Dayjs;
}

function DateSelector(props: dateSelectorProps) {

  const [value, setDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      console.log(date);
      return;
    }
    props.handleChangeDate(date);
    setDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => handleDateChange(newValue)}
            minDate={props.startDay}
            maxDate={props.endDay}
            views={["year", "month", "day"]}
          />
    </LocalizationProvider>
  );
}

export default DateSelector;
