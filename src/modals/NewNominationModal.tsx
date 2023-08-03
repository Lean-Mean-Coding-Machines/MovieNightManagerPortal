import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Container
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {FormEvent, useContext, useEffect, useState} from 'react';
import '../assets/NominationModal.css';
import DateSelector from '../component/input/DatePicker';
import dayjs from 'dayjs';
import TimeSelector from '../component/input/TimePicker';
import WatchTypeDDLSelector from '../component/input/WatchTypeDropdown';
import {toast} from 'react-toastify'
import IMovieNightSegment from '../model/IMovieNightSegment';
import useAxios from '../hooks/useAxios';
import {UserContext} from '../context/UserContext';
import IMnmApiResponse from '../model/IMnmApiResponse';
import ITmdbResult from '../model/ITmdbResult';
import IMovieSearchResult from '../model/IMovieSearchResult';

interface NewNominationProps {
    isOpen: boolean,
    toggle: () => void,
    segment: IMovieNightSegment,
    segmentRefresh: () => void
}

interface nominationForm {
    segmentId: number,
    movieTitle: string,
    watchDate: string,
    watchTime: string,
    watchType: string,
    posterPath: string,
    userId: number,
}

const listStyle = {
    position: 'fixed',
    zIndex: 1000,
    bottom: '50px',
    maxHeight: 300,
    overflowY: 'scroll',
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper'
}

const modalStyle = {
    zIndex: 1,
    display: 'block',
    background: 'white',
    width: {xs: '90%', lg: '35%'},
    padding: '1rem',
    borderRadius: '1rem'
}

export default function NewNominationModal(props: NewNominationProps) {

    const api = useAxios();
    const {userId} = useContext(UserContext);

    const defaultNominationForm: nominationForm = ({
        segmentId: props.segment.id,
        movieTitle: '',
        watchDate: '',
        watchTime: '5',
        watchType: 'ANY',
        posterPath: '',
        userId: userId,
    });

    let startDay = dayjs(props.segment.nominationLockDate);
    let endDay = dayjs(props.segment.segmentEndDate);

    useEffect(() => {
        setNominationState((p) => (
            {
                ...p,
                segmentId: props.segment.id,
                userId: userId,
                watchDate: startDay.format('YYYY-MM-DDT00:00:00.000')
            }));
    }, [props.segment.id, userId]);

    const [nominationForm, setNominationState] = useState(defaultNominationForm);

    function resetNominationState() {
        setNominationState(defaultNominationForm);
        setMovieOptions([]);
        setSelectedMovie(null);
        setSearchTitle('');
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (nominationForm.movieTitle === '') {
            toast.error("Movie selection is required");
            return;
        }
        api.post<IMnmApiResponse<any>>('/nomination/create', nominationForm)
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        props.toggle();
                        resetNominationState();
                        toast.success(`Created nomination for ${nominationForm.movieTitle} on ${nominationForm.watchDate} @ ${nominationForm.watchTime}`);
                        props.segmentRefresh();
                    } else {
                        toast.error('Could not create nomination');
                    }
                },
                (err) => {
                    console.log(err);
                }
            )
            .catch(
                (err) => {
                    console.log(err.message);
                }
            );
    }

    const [selectedMovie, setSelectedMovie] = useState<IMovieSearchResult | null>(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [movieOptions, setMovieOptions] = useState<IMovieSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const handleMovieSearch = (event: any) => {
        event.preventDefault();
        setIsSearching(true);
        api.get<IMnmApiResponse<ITmdbResult<IMovieSearchResult[]>>>('/tmdb/movie/search', {params: {title: searchTitle}})
            .then(
                (res) => {
                    if (res.data.data && res.data.status.success) {
                        setMovieOptions(res.data.data.results);
                    }
                },
                (err) => console.log(err)
            )
            .catch((err) => console.log(err.message))
            .finally(() => setIsSearching(false));
    }

    const updateWatchDate = (selectedWatchDate: dayjs.Dayjs) => {
        setNominationState({
            ...nominationForm,
            watchDate: selectedWatchDate.format('YYYY-MM-DDT00:00:00.000')
        });
    }

    const updateMovieSelection = (movie: IMovieSearchResult | null) => {
        setSelectedMovie(movie);
        setNominationState({
            ...nominationForm,
            movieTitle: movie ? movie.title : '',
            posterPath: movie ? movie.posterPath : ''
        });
    }

    const updateWatchType = (selectedWatchType: string) => {
        setNominationState({
            ...nominationForm,
            watchType: selectedWatchType
        });
    }

    const updateWatchTime = (selectedWatchTime: string) => {
        setNominationState({
            ...nominationForm,
            watchTime: selectedWatchTime
        });
    }

    return (
        <>
            {props.isOpen && (
                <Box className='modal-overlay'>
                    <Box sx={modalStyle}>
                        <Box sx={{textAlign: 'center'}}>
                            <Box
                                component='span'
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: {xs: 20, sm: 25, md: 30, lg: 35, xl: 40},
                                    fontFamily: 'SoraBold'
                                }}>Nominate a Movie</Box>
                            <div style={{float: 'right'}} onClick={props.toggle}>
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </Box>

                        <Container>
                            <Box
                                component='form'
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '32px',
                                    mt: 2
                                }}
                                noValidate
                                autoComplete='on'
                                onSubmit={handleSubmit}
                            >
                                {/* Film Name Input */}
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='standard-adornment-film-name'>
                                        Movie Name
                                    </InputLabel>
                                    <Input required name='titleSearch' sx={{width: {xs: '100%', lg: '50%'}}}
                                           id='nomination-name-input'
                                           value={searchTitle}
                                           onChange={(event: any) => setSearchTitle(event.target.value)}/>
                                </FormControl>

                                <Box>
                                    <Button
                                        sx={{
                                            mr: 2,
                                            borderColor: '#54276F',
                                            color: '#54276F',
                                            ':hover': {
                                                color: '#D1439E',
                                                borderColor: '#D1439E'
                                            }
                                        }}
                                        variant='outlined'
                                        disabled={searchTitle === '' || isSearching}
                                        onClick={handleMovieSearch}>
                                        {isSearching ? 'Searching' : 'Search'}
                                    </Button>
                                    <Button
                                        sx={{
                                            borderColor: '#54276F',
                                            color: '#54276F',
                                            ':hover': {
                                                color: '#D1439E',
                                                borderColor: '#D1439E'
                                            }
                                        }}
                                        variant='outlined'
                                        onClick={() => {
                                            setMovieOptions([]);
                                            updateMovieSelection(null);
                                            setSearchTitle('');
                                        }}>
                                        Clear
                                    </Button>
                                </Box>

                                <Box hidden={selectedMovie === null}>
                                    <h3 style={{margin: 0, textAlign: 'center'}}>Chosen Movie</h3>
                                    <List sx={{maxHeight: 300, width: '100%', maxWidth: 360}}>
                                        <ListItem alignItems='flex-start' sx={{pb: 0}}>
                                            <Avatar
                                                sx={{height: '100px', width: '70px', mr: 2}}
                                                variant='rounded'
                                                alt='Movie Poster'
                                                src={`https://image.tmdb.org/t/p/w500${selectedMovie ? selectedMovie.posterPath : ''}`}/>
                                            <ListItemText
                                                primary={selectedMovie ? selectedMovie.title : ''}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{display: 'inline'}}
                                                            component='span'
                                                            variant='body2'
                                                            color='text.primary'
                                                        >
                                                            Release Date:
                                                        </Typography>
                                                        {selectedMovie ? selectedMovie.releaseDate : ''}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Box>

                                <List hidden={movieOptions.length === 0} sx={listStyle}>
                                    {
                                        movieOptions.map(option => (
                                            <>
                                                <ListItem alignItems='flex-start' onClick={() => {
                                                    updateMovieSelection(option);
                                                    setMovieOptions([]);
                                                }} sx={{
                                                    '&:hover': {
                                                        background: 'rgba(0,0,0,0.5)',
                                                        cursor: 'pointer'
                                                    }
                                                }}>
                                                    <ListItemAvatar>
                                                        <Avatar alt='Movie Poster'
                                                                src={`https://image.tmdb.org/t/p/w500${option.posterPath}`}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={option.title}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{display: 'inline'}}
                                                                    component='span'
                                                                    variant='body2'
                                                                    color='text.primary'
                                                                >
                                                                    Release Date:
                                                                </Typography>
                                                                {option.releaseDate}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant='inset' component='li'/>
                                            </>
                                        ))
                                    }
                                </List>

                                <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}}}>
                                    <Box
                                        sx={{
                                            pr: {xs: 0, lg: 1},
                                            pb: {xs: 1, lg: 0},
                                            width: {xs: '100%', lg: '50%'},
                                            flexGrow: 1
                                        }}>
                                        <DateSelector sx={{width: '100%', pr: {xs: 0, lg: 1}, flexGrow: 1}}
                                                      handleChangeDate={updateWatchDate} startDay={startDay}
                                                      endDay={endDay}/>
                                    </Box>
                                    <Box
                                        sx={{
                                            pl: {xs: 0, lg: 1},
                                            pt: {xs: 1, lg: 0},
                                            width: {xs: '100%', lg: '50%'},
                                            flexGrow: 1
                                        }}>
                                        <TimeSelector sx={{width: '100%'}}
                                                      handleChangeTime={updateWatchTime}/>
                                    </Box>
                                </Box>

                                <WatchTypeDDLSelector sx={{width: {xs: '100%', lg: '50%'}}}
                                                      updateWatchType={updateWatchType}/>


                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{
                                        width: 125,
                                        color: 'black',
                                        backgroundColor: '#F8E924',
                                        borderRadius: 22,
                                        ':hover': {backgroundColor: '#38CD2C'}
                                    }}>
                                    Submit
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            )}
        </>
    );
}
