import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";
import "../assets/NominationModal.css";

interface timeSelectorProps  {
    updateWatchTime: (input: string) => void;
}

function TimeSelector (props: timeSelectorProps) {
    
    const [time, setTime] = useState("5");
    
    const handleTimeChange = (event: SelectChangeEvent | null) => {
        if (event === null) {
            console.log(event);
            return; 
        }
        // Update state from new nomination modal 
        props.updateWatchTime(event.target.value);
        setTime(event.target.value as string);
    };

  return (
        <FormControl fullWidth>
          <InputLabel id="nomination-time-label">Time</InputLabel>
          <Select
            label="Time"
            value={time}
            onChange={(newValue) => handleTimeChange(newValue)}
            labelId="nomination-time-label"
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
  );
}

export default TimeSelector;
