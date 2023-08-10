import React, {useState} from "react";
import {FormControl, InputLabel, NativeSelect, SxProps} from "@mui/material";

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
            <NativeSelect inputProps={{name: 'watchType', id: 'watchType',}} value={type}
                          onChange={(newValue) => handleTypeChange(newValue)}>
                <option value={'ANY'}>Any</option>
                <option value={'OUTSIDE'}>Outside</option>
                <option value={'INSIDE'}>Inside</option>
                <option value={'FIRE'}>Firepit</option>
                <option value={'POOL'}>Pool</option>
            </NativeSelect>
        </FormControl>
    );
}

export default WatchTypeDDLSelector;






