import * as React from 'react';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteAccountModal from '../../modals/DeleteAccountModal';
import useModal from '../../hooks/useModal';
import AccountDropdownNav from '../../component/nav/AccountDropdownNav';
import EditProfilePicModal from '../../modals/EditProfilePicModal';
import {useContext, useEffect, useState} from 'react';
import {Stack, TextField} from "@mui/material";
import {UserContext} from "../../context/UserContext";
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import IUser from "../../model/user/IUser";
import INomination from "../../model/INomination";
import NominationCard from "../../component/nomination/NominationCard";
import INominationLike from "../../model/INominationLike";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const emptyUser: IUser = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    nominations: [],
    nominationLikes: []
};

export function ProfilePage() {
    const {userId} = useContext(UserContext);

    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/')
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Toggles Delete Modal & Edit Modal open and close
    const {isOpen, toggle, modalName} = useModal();

    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(emptyUser);

    const api = useAxios();

    useEffect(() => {
        if (userId) {
            api.get<IMnmApiResponse<IUser>>("/user/details/" + userId)
                .then(
                    (res) => {
                        if (res.data.status.success && res.data.data != null) {
                            setUser(res.data.data);
                        }
                        setUserLoading(false);
                    },
                    (err) => console.log(err))
                .catch((err) => console.log(err.message));
        } else {
            navigate('/');
        }
    }, [userId]);

    return (
        <>
            <nav>
                <Button onClick={navigateHome}>MnM Logo</Button>
                <AccountDropdownNav/>
            </nav>
            <span>

        </span>
            <h1 style={{marginLeft: 15}}>Your Profile</h1>

            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .1,
                borderColor: '#000000',
                width: 625,
                marginLeft: 15
            }}/>

            <h3 style={{marginLeft: 15, marginBottom: 15}}>Your Info</h3>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': {m: 1, width: '40ch'},
                }}
                noValidate
                autoComplete="on"
            >
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="First Name"
                    defaultValue=""
                    value={user.firstName}
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Last Name"
                    defaultValue=""
                    value={user.lastName}
                />
            </Box>

            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .1,
                borderColor: '#000000',
                width: 625,
                marginLeft: 15
            }}/>

            <h3 style={{marginLeft: 15, marginBottom: 15, alignSelf: 'left'}}>Your Nominations</h3>

            <Stack direction='row' spacing={2}>
                {user.nominations.map((nom: INomination) => (<NominationCard nomination={nom}/>))}
            </Stack>


            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .1,
                borderColor: '#000000',
                width: 625,
                marginLeft: 15
            }}/>

            {/* Modals */}
            <DeleteAccountModal isOpen={isOpen} toggle={toggle} modalName={modalName}></DeleteAccountModal>
            <EditProfilePicModal isOpen={isOpen} toggle={toggle} modalName={modalName}></EditProfilePicModal>

        </>
    );
}

