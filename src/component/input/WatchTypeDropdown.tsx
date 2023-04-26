import React, { useState } from "react";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

interface typeSelectorProps  {
    updateWatchType: (input: string) => void;
}

function WatchTypeDDLSelector (props: typeSelectorProps) {
    
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
    <FormControl fullWidth>
    <InputLabel variant="standard" htmlFor="watchType"> Watch Type </InputLabel>
    <NativeSelect inputProps={{name: 'watchType', id: 'watchType',}} value={type} onChange={(newValue) => handleTypeChange(newValue)} >
      <option value={'Any'}>Any</option>
      <option value={'Outside'}>Outside</option>
      <option value={'Inside'}>Inside</option>
      <option value={'Fire'}>Firepit</option>
      <option value={'Pool'}>Pool</option>
    </NativeSelect>
    </FormControl>
  );
}

export default WatchTypeDDLSelector;






