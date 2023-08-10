import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {SxProps} from "@mui/material";

interface dateSelectorProps {
  handleChangeDate: (input: dayjs.Dayjs) => void;
  startDay: dayjs.Dayjs;
  endDay?: dayjs.Dayjs;
  sx?: SxProps;
}

function DateSelector(props: dateSelectorProps) {

  const [value, setDate] = useState<Dayjs | null>(props.startDay);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      console.log(date);
      return;
    }
    props.handleChangeDate(date!);
    setDate(date!);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
            sx={props.sx}
            label="Preferred Watch Date"
            value={value}
            onChange={(newValue) => handleDateChange(newValue)}
            defaultValue={props.startDay}
            minDate={props.startDay}
            maxDate={props.endDay}
            views={["year", "month", "day"]}
          />
    </LocalizationProvider>
  );
}

export default DateSelector;
