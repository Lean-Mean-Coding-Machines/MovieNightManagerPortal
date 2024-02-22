import {Box, Button, IconButton, Modal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DateSelector from "../component/input/DateSelector";
import dayjs from "dayjs";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import IWatchPartyRequest from "../model/IWatchPartyRequest";
import useAxios from "../hooks/useAxios";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IWatchParty from "../model/IWatchParty";

interface ModalType {
    isOpen: boolean,
    toggle: () => void,
    modalName?: string,
    setWatchParty: React.Dispatch<React.SetStateAction<IWatchParty>>;
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

export default function NewWatchPartyModal (props: ModalType) {

    const api = useAxios();

    const userContext = useContext(UserContext);

    const todaysDate = dayjs().toISOString().replace(new RegExp('Z', "g"), "");

    const initialWatchPartyRequest: IWatchPartyRequest = ({
        chosenWatchDate: todaysDate,
        nominationLockDate: todaysDate,
        userId: userContext.userId,
        communityId: userContext.selectedCommunity.id,
      });
    
    const [watchPartyRequestState, setWatchPartyRequestState] = useState(initialWatchPartyRequest);


    const updateWatchDateSelector = (selectedWatchDate: dayjs.Dayjs, lockDate?: boolean) => {
        const parsedDate = selectedWatchDate.toISOString().replace(new RegExp('Z', "g"), "");
        if (!parsedDate) {
            console.error("Error parsing selected date:", selectedWatchDate);
            return;
        }
    
        setWatchPartyRequestState({
            ...watchPartyRequestState,
            chosenWatchDate: lockDate ? watchPartyRequestState.chosenWatchDate : parsedDate,
            nominationLockDate: parsedDate,
        });
    };


    const createWatchParty = (request: IWatchPartyRequest) => {
        api.post<IMnmApiResponse<IWatchParty>>("/segment/create", request)
            .then(
                (res) => {
                    if (res.data.data) {
                        props.setWatchParty(res.data.data ? res.data.data : {} as IWatchParty);
                    }
                },
                (err) => console.log(err))
            .catch((err) => console.log(err.message));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.toggle();
        createWatchParty(watchPartyRequestState);
    }

    useEffect(() => {
        setWatchPartyRequestState((p) => (
            {
                ...p,
                communityId: userContext.selectedCommunity.id,
            }));
    }, [userContext.selectedCommunity.id]);

    if (props.modalName === 'newWatchParty') {
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
                            Create a new Watch Party
                        </Box>
                    </Box>
                    <Box sx={{textAlign: 'center', marginTop: '10px'}}>

                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                             <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <div style={{marginTop:'15px'}}>
                             <DateSelector handleChangeDate={updateWatchDateSelector} labelName="Watch Date" ></DateSelector>

                                </div>
                                <div style={{marginTop:'30px'}}>
                             <DateSelector handleChangeDate={(date) => updateWatchDateSelector(date, true)} labelName="Nomination Lock Date"/>
                                </div>
                             </div>
                             
                                {/* TODO: Need to add in some error handling regarding parsed date, can't be greater than nomination date */}

                        </Box>
            

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