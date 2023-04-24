import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../assets/NominationModal.css";
import dayjs, { Dayjs } from "dayjs";

interface dateSelectorProps  {
  updateWatchDate: (input: dayjs.Dayjs) => void;
  segment: any;
}

function DateSelector (props: dateSelectorProps) {

  const today = dayjs();
  const startDay = dayjs(props.segment?.nominationLockDate);
  const endDay = dayjs(props.segment?.segmentEndDate);
  const [value, setDate] = useState<Dayjs | null>(today);
      
  const handleDateChange = ( date: dayjs.Dayjs | null) => {
    if (date === null) {
      console.log(date);
      return; 
    }
    props.updateWatchDate(date);
    setDate(date);
    };
      
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => handleDateChange(newValue)}
            minDate={startDay}
            maxDate={endDay}
            views={["year", "month", "day"]}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateSelector;
