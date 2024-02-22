import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {  ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import IMnmApiResponse from "../model/IMnmApiResponse";
import INewCommunity from "../model/INewCommunity";
import useAxios from "../hooks/useAxios";

interface ModalType {
    isOpen: boolean,
    toggle: () => void,
    modalName?: string,
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    background: '#f6f6f6',
    width: {xs: '80%', lg: '30%'},
    padding: '1rem 2rem 2rem 2rem',
    borderRadius: '1rem',
}

interface communityForm {
    userId: Number,
    communityName: string,
    timezone: string,
  }

export default function NewCommunityModal (props: ModalType) {

    const api = useAxios();
    
    const {userId, setSelectedCommunity, communities, setCommunities, setCommunityData} = useContext(UserContext);

    const initialCommunityState: communityForm = ({
        userId: userId,
        communityName: '',
        timezone: '',
      });
    
      const [communityRequestState, setCommunityRequestState] = useState(initialCommunityState);

    // TODO: need to add in search functionality for communities in input
    const updateCommunityName = (event: ChangeEvent<HTMLInputElement>) => { 
        setCommunityRequestState({
          ...communityRequestState,
          communityName: event.target.value,
        });
      };


      const northAmericanTimezones: string[] = [
        // United States
        'America/New_York (UTC-05:00)',
        'America/Chicago (UTC-06:00)',
        'America/Denver (UTC-07:00)',
        'America/Los_Angeles (UTC-08:00)',
        // Canada
        'America/Toronto (UTC-05:00)',
        'America/Montreal (UTC-05:00)',
        'America/Vancouver (UTC-08:00)',
        // Mexico
        'America/Mexico_City (UTC-06:00)',
        'America/Cancun (UTC-05:00)',
      ];


      const updateTimeZone = (event: SelectChangeEvent<string>) => {
        const timezone = event.target.value;
        setCommunityRequestState({
            ...communityRequestState,
            timezone: timezone,
          });
      };


      const createCommunity = (communityRequest: any) => {
        api.post<IMnmApiResponse<INewCommunity>>("/community/create", communityRequest)
            .then(
                (res) => {
                    if (res.data.data) {
                        const community = res.data.data;
                        const newCommunity = {name: community.name, id: community.id};
                        setSelectedCommunity(newCommunity);

                        const addCommunity = [...communities, newCommunity];
                        setCommunities(addCommunity);
                        setCommunityData(addCommunity);
                    }
                },
                (err) => console.log(err))
            .catch((err) => console.log(err.message));
      };
    
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.toggle();
        createCommunity(communityRequestState);
      };

      useEffect(() => {
        setCommunityRequestState((p) => (
            {
                ...p,
                userId: userId,
            }));
    }, [userId]);



    if (props.modalName === 'newCommunity') {
        return (
            <Modal
                open={props.isOpen}
                onClose={props.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                            
            <form onSubmit={handleSubmit}>
                <Box sx={modalStyle}>
                    <Box sx={{textAlign: 'center'}}>

                        <div style={{float: 'right'}}
                             onClick={props.toggle}
                        >
                            <IconButton> 
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <Box component='span'
                             sx={{
                                 fontWeight: 'bold',
                                 fontSize: {xs: 25, sm: 25, md: 30, lg: 30, xl: 30},
                                 fontFamily: 'SoraBold',
                             }}>
                            Create a new Community
                        </Box>
                    </Box>
                    <Box sx={{textAlign: 'center', marginTop: '10px'}}>
                        <div style={{display: 'flex',  flexDirection:'column'}}>
                            <div style={{marginTop:'15px'}}>

                                <TextField
                                sx={{width:'300px'}}
                                id="community-name"
                                name="communityName"
                                label="Community Name"
                                required
                                inputProps={{ maxLength: 50 }}
                                value={communityRequestState.communityName}
                                onChange={updateCommunityName}
                                />
                            </div>

                        <div style={{marginTop:'15px'}}>

                        <FormControl sx={{width:'300px'}}>

                           <InputLabel id="timezone-label">Select Timezone</InputLabel>
                                <Select
                                labelId="timezone-label"
                                id="timezone"
                                value={communityRequestState.timezone}
                                onChange={updateTimeZone}
                                label="Select Timezone"
                                required
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {northAmericanTimezones.map((timezone) => (
                                    <MenuItem key={timezone} value={timezone} tabIndex={0}>{timezone} </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>

                        </div>
            
                        <div style={{marginTop: '35px', marginRight: '15px'}}>

                            <Button
                                variant='outlined'
                                id="cancel-btn"
                                name='cancelBtn'
                                sx={{
                                    width: 100,
                                    backgroundColor: 'primary',
                                    borderRadius: 22,
                                    ':hover': {backgroundColor: 'primary'},
                                }}
                                onClick={props.toggle}
                            >Cancel
                            </Button>

                            <Button
                                variant='contained'
                                id="create-btn"
                                name='createBtn'
                                type="submit"
                                disabled={communityRequestState.communityName === '' || communityRequestState.timezone === ''}
                                sx={{
                                    width: 100,
                                    backgroundColor: 'primary',
                                    borderRadius: 22,
                                    marginLeft: '10px',
                                    ':hover': {backgroundColor: 'primary'},
                                }}
                            >Create
                            </Button>

                        </div>
                    </Box>
                </Box>
            </form>

            </Modal>
            
        )
    } else {
        return <>
        </>
    }
}