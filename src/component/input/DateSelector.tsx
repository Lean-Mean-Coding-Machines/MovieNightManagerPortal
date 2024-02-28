import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {SxProps} from "@mui/material";

interface dateSelectorProps {
  handleChangeDate: (input: dayjs.Dayjs) => void;
  labelName?: string;
  sx?: SxProps;
}

const todaysDate = dayjs();

export default function DateSelector(props: dateSelectorProps) {

  const [value, setDate] = useState<Dayjs | null>(todaysDate);
  const [dateError, setDateError] = useState('');

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      setDateError("Date is required");
      return;
    }
    if (!dayjs(date).isValid()) {
      setDateError("Invalid date selection");
      return;
    }
    setDateError('');
    props.handleChangeDate(date);
    setDate(date);
  };

  const handleClearDate = () => {
    setDate(null);
    setDateError('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
            sx={props.sx}
            label={props.labelName}
            value={value}
            minDate={todaysDate}
            onChange={(newValue) => handleDateChange(newValue)}
            views={["year", "month", "day"]}
            slotProps={{
              textField: {
                required: true,
                error: !!dateError,
                helperText: dateError
              },
              field: {
                clearable: true,
                onClear: handleClearDate
              }
            }}
          />
    </LocalizationProvider>
  );
}

