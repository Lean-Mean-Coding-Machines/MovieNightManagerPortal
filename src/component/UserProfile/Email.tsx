import React, { Fragment } from "react";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Button, FormControl, OutlinedInput } from "@mui/material";


//Styling for IOS Toggle
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));



export default function Email() {
  return (
    <Fragment>
      <div style={{ marginLeft: 50 }}>
        <h3>Update Email Address</h3>
        <div style={{ fontWeight: 'bold' }}> Current Email
        </div>
        <div>{`Your current email address is GlobLauncher@gmail.com`}</div>

        <div style={{ marginTop: 10, fontWeight: 'bold' }}> New Email</div>

        <div>
          <FormControl variant='outlined'>
            <OutlinedInput sx={{ width: 250, height: 30 }} id='update-email' />
          </FormControl>
        </div>
        <div>
          <Button variant='contained' sx={{ width: 155, backgroundColor: '#1F1F1F', marginTop: 2, borderRadius: 22, ':hover': { backgroundColor: '#1F1F1F', }, }}>
            Save Changes
          </Button>
        </div>


        <FormControl>
          <div style={{ marginTop: 10 }}>
            <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} label="Email Notifications" />
          </div>
        </FormControl>
      </div>
    </Fragment>
  );
};
