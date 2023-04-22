import React, { useEffect, useState } from "react";
import IMovieNightSegment from "../model/IMovieNightSegment";
import MovieNightSegmentService from "../service/MovieNightSegmentService";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../assets/NominationModal.css";
import dayjs, { Dayjs } from "dayjs";

interface dateSelectorProps  {
  updateWatchDate: (input: dayjs.Dayjs) => void;
}

function DateSelector (props: dateSelectorProps) {
  
  // State for managing segment start date & end date
  const [segment, setSegment] = useState<IMovieNightSegment | null | undefined>(null);
  
  const today = dayjs();
  const startDay = dayjs(segment?.nominationLockDate);
  const endDay = dayjs(segment?.segmentEndDate);
  const [value, setDate] = useState<Dayjs | null>(today);

  useEffect(() => {
    MovieNightSegmentService.getCurrentSegment()
    .then(
      (res) => {
        setSegment(res.data.data);
      },
      (err) => console.log(err)
      ).catch(
        (err) => console.log(err.message));
      });
      
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
