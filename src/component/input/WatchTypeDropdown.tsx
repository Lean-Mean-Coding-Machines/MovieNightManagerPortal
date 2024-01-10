import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SxProps} from "@mui/material";

interface typeSelectorProps {
    updateWatchType: (input: string) => void;
    sx?: SxProps
}

function WatchTypeDDLSelector(props: typeSelectorProps) {

    const [type, setWatchType] = useState("Any");

    const handleTypeChange = (event: any) => {
        if (event === null) {
            console.log(event);
            return;
        }
        // Update state from new nomination modal 
        props.updateWatchType(event.target.value);
        setWatchType(event.target.value);
    };
      

    return (
        <FormControl fullWidth sx={props.sx}>
            <InputLabel variant="standard" htmlFor="watchType"> Watch Type </InputLabel>
            <Select inputProps={{name: 'watchType', id: 'watchType',}} 
                        value={type}
                        onChange={(newValue) => handleTypeChange(newValue)}
                      
                          >
                <MenuItem value={'ANY'}>Any</MenuItem>
                <MenuItem value={'OUTSIDE'}>Outside</MenuItem>
                <MenuItem value={'INSIDE'}>Inside</MenuItem>
                <MenuItem value={'FIRE'}>Firepit</MenuItem>
                <MenuItem value={'POOL'}>Pool</MenuItem>
            </Select>
        </FormControl>
    );
}

export default WatchTypeDDLSelector;






