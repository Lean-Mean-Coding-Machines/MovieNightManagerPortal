import {Backdrop, Box, CircularProgress, Fab, Grid, Tooltip, useTheme} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import NewNominationModal from '../../modals/NewNominationModal';
import useModal from '../../hooks/useModal';
import IMovieNightSegment from '../../model/IMovieNightSegment';
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import AddIcon from '@mui/icons-material/Add';
import INomination from "../../model/nomination/INomination";
import NominationCard from "../../component/nomination/NominationCard";
import { UserContext } from '../../context/UserContext';

export function HomePage() {

    const theme = useTheme();

    const [appLoading, setAppLoading] = useState(true);

    const handleAppLoadingChange = (newState: boolean) => {
        setAppLoading(newState)
    };

    const {isOpen, toggle} = useModal();

    const [segment, setSegment] = useState<IMovieNightSegment>({} as IMovieNightSegment);

    const userContext = useContext(UserContext);

    const api = useAxios();

    const getMovieNightSegment = () => {
        api.get<IMnmApiResponse<IMovieNightSegment>>("/segment/current")
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        setSegment(res.data.data);
                    }
                    handleAppLoadingChange(false);
                },
                (err) => console.log(err))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getMovieNightSegment();
    }, []);

    if (segment.nominationStartDate) {
        return (
            <>
                <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={appLoading}>
                    <CircularProgress color='inherit'/>
                </Backdrop>

                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <h2 style={{textAlign: 'center', color: '#fff'}}>
                        <div> Nomination Voting Period</div>
                        {segment.nominationStartDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0, 4)} -{' '}
                        {segment.segmentEndDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0, 4)}
                    </h2>
                    {/* To Do: Sorting isn't dynamic, need's to be updated when you click like btn */}
                    <Grid container rowSpacing={4} columnSpacing={5} sx={{background: '#14181c', paddingBottom: '5rem', marginTop: '-18px'}}>
                        {segment.nominations
                        .sort((a, b) => b.nominationLikes.length - a.nominationLikes.length)
                        .map((nom: INomination, i) => (
                            <Grid item xs={12} md={6} lg={4} key={nom.id}>
                                <div style={{color:'#fff', zIndex:1000, position: 'absolute', background:'#015f76', padding:'9px', borderRadius:'6px', fontWeight: 'bold'}}>{i + 1}</div>
                                <NominationCard nomination={nom}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* Hides Nominate btn if user isn't logged in */}
                {userContext.username && <Tooltip title="Nominate a Movie">
                    <Fab onClick={toggle} sx={{
                        visibility: isOpen ? 'hidden' : 'visible',
                        color: '#fff',
                        backgroundColor: theme.palette.primary.main,
                        position: 'fixed',
                        bottom: '64px',
                        right: '10%',
                        // Desktop
                        [theme.breakpoints.up('md')]: {
                            bottom: '64px',
                            right: '10%',
                            },
                        // Mobile 
                        [theme.breakpoints.down('sm')]: {
                            right: '5%',
                            bottom:'3%',
                          },
                        ':hover': {backgroundColor: '#D53069'}
                    }}
                         aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Tooltip>}

                <NewNominationModal isOpen={isOpen} toggle={toggle} segment={segment}
                                    segmentRefresh={getMovieNightSegment}/>
            </>
        );
    } else {
        return (<></>);
    }
}
