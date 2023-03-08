import React, { useEffect, useState } from "react";
import IMovieNightSegment from "../model/IMovieNightSegment";
import MovieNightSegmentService from "../service/MovieNightSegmentService";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";
import "../assets/NominationModal.css";
import dayjs, { Dayjs } from "dayjs";

function DateSelector() {
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  const [segment, setSegment] = useState<IMovieNightSegment | null | undefined>(
    null
  );
  useEffect(() => {
    MovieNightSegmentService.getCurrentSegment()
      .then(
        (res) => {
          setSegment(res.data.data);
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err.message));
  });
  const today = dayjs();
  const startDay = dayjs(segment?.nominationStartDate);
  const endDay = dayjs(segment?.nominationLockDate);
  const [time, setTime] = React.useState("");
  const [value, setValue] = React.useState<Dayjs | null>(today);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DateTimePicker"]}>
        <DemoItem>
          <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            minDate={startDay}
            maxDate={endDay}
            views={["year", "month", "day"]}
          />
        </DemoItem>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Time</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={time}
            label="Time"
            onChange={handleChange}
          >
            <MenuItem value={5}>5:00 PM</MenuItem>
            <MenuItem value={5.5}>5:30 PM</MenuItem>
            <MenuItem value={6}>6:00 PM</MenuItem>
            <MenuItem value={6.5}>6:30 PM</MenuItem>
            <MenuItem value={7}>7:00 PM</MenuItem>
            <MenuItem value={7.5}>7:30 PM</MenuItem>
            <MenuItem value={8}>8:00 PM</MenuItem>
            <MenuItem value={8.5}>8:30 PM</MenuItem>
            <MenuItem value={9}>9:00 PM</MenuItem>
            <MenuItem value={9.5}>9:30 PM</MenuItem>
            <MenuItem value={10}>10:00 PM</MenuItem>
          </Select>
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateSelector;
