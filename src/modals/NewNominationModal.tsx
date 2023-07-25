import {Box, Button, FormControl, IconButton, Input, InputLabel, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, {FormEvent, useContext, useEffect, useState} from "react";
import '../assets/NominationModal.css';
import DateSelector from "../component/input/DatePicker";
import dayjs from "dayjs";
import TimeSelector from "../component/input/TimePicker";
import WatchTypeDDLSelector from "../component/input/WatchTypeDropdown";
import {toast} from 'react-toastify'
import IMovieNightSegment from "../model/IMovieNightSegment";
import useAxios from "../hooks/useAxios";
import {UserContext} from "../context/UserContext";
import IMnmApiResponse from "../model/IMnmApiResponse";
import ITmdbResult from "../model/ITmdbResult";
import IMovieSearchResult from "../model/IMovieSearchResult";

interface NewNominationProps {
    isOpen: boolean,
    toggle: () => void,
    segment: IMovieNightSegment,
    segmentRefresh: () => void
}

interface nominationForm {
    segmentId: number,
    movieTitle?: string,
    watchDate?: string,
    watchTime?: string,
    watchType?: string,
    posterPath?: string,
    userId: number,
}

const defaultNominationForm: nominationForm = ({
    segmentId: 0,
    movieTitle: undefined,
    watchDate: undefined,
    watchTime: undefined,
    watchType: 'ANY',
    posterPath: undefined,
    userId: 0,
});

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

export default function NewNominationModal(props: NewNominationProps) {

    const api = useAxios();
    const {userId} = useContext(UserContext);

    const [nominationForm, setNominationState] = useState(defaultNominationForm);

    useEffect(() => {
        setNominationState((p) => ({...p, segmentId: props.segment.id, userId: userId}));
    }, [props.segment.id, userId]);

    function resetNominationState() {
        setNominationState(defaultNominationForm);
        setMovieOptions([]);
        setSelectedMovie(null);
        setSearchTitle("");
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        api.post<IMnmApiResponse<any>>("/nomination/create", nominationForm)
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
    const [searchTitle, setSearchTitle] = useState("");
    const [movieOptions, setMovieOptions] = useState<IMovieSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const handleMovieSearch = (event: any) => {
        event.preventDefault();
        setIsSearching(true);
        api.get<IMnmApiResponse<ITmdbResult<IMovieSearchResult[]>>>("/tmdb/movie/search", { params: { title: searchTitle}})
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

    const startDay = dayjs(props.segment.nominationLockDate);
    const endDay = dayjs(props.segment.segmentEndDate);
    const updateWatchDate = (selectedWatchDate: dayjs.Dayjs) => {
        setNominationState({
            ...nominationForm,
            watchDate: selectedWatchDate.format("YYYY-MM-DDT00:00:00.000")
        });
    }

    const updateMovieSelection = (movie: IMovieSearchResult | null) => {
        setSelectedMovie(movie);
        setNominationState({
            ...nominationForm,
            movieTitle: movie ? movie.title : undefined,
            posterPath: movie ? movie.posterPath : undefined
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
                <div className="nomination-modal-overlay">
                    <div className="nomination-modal-box">
                        <span style={{fontWeight: 'bold', fontSize: 40, fontFamily: 'SoraBold'}}>Nominate a Movie</span>
                        <div style={{float: 'right'}} onClick={props.toggle}>
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </div>

                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                '& .MuiTextField-root': {m: 1, width: '40ch'},
                            }}
                            noValidate
                            autoComplete="on"
                            onSubmit={handleSubmit}
                        >
                            <div className="nomination-inputs-container">
                                {/* Film Name Input */}
                                <FormControl variant='standard'>
                                    <InputLabel htmlFor='standard-adornment-film-name'>
                                        Movie Name
                                    </InputLabel>
                                    <Input required name="titleSearch" sx={{width: 300}} id='nomination-name-input'
                                           value={searchTitle} onChange={(event: any) => setSearchTitle(event.target.value)}/>
                                </FormControl>

                                <Button disabled={searchTitle === '' || isSearching} onClick={handleMovieSearch}>
                                    {isSearching ? "Searching" : "Search"}
                                </Button>

                                <Box hidden={selectedMovie === null}>
                                    <h3>Chosen Movie</h3>
                                    <List sx={{maxHeight: 300, width: '100%', maxWidth: 360}}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                {
                                                    selectedMovie ?
                                                        <Avatar alt="Movie Poster" src={`https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}`} /> :
                                                        <></>
                                                }
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={selectedMovie ? selectedMovie.title : ""}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            Release Date:
                                                        </Typography>
                                                        {selectedMovie ? selectedMovie.releaseDate : ""}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Box>

                                <Button onClick={() => { setMovieOptions([]); updateMovieSelection(null); }}>
                                    Clear
                                </Button>

                                <List hidden={movieOptions.length === 0} sx={listStyle}>
                                    {
                                        movieOptions.map(option => (
                                        <>
                                            <ListItem alignItems="flex-start" onClick={() => { updateMovieSelection(option); setMovieOptions([]); }} sx={{'&:hover': { background: "rgba(0,0,0,0.5)", cursor: 'pointer'}}}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Movie Poster" src={`https://image.tmdb.org/t/p/w500${option.posterPath}`} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={option.title}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Release Date:
                                                            </Typography>
                                                            {option.releaseDate}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    ))
                                    }
                                </List>

                                {/* Watch Date Picker */}
                                <DateSelector handleChangeDate={updateWatchDate} startDay={startDay}
                                              endDay={endDay}/>
                                {/* Watch Time Picker */}
                                <TimeSelector handleChangeTime={updateWatchTime}/>

                                {/* Watch Type Picker */}
                                <span style={{marginTop: 15}}>
                                    <WatchTypeDDLSelector updateWatchType={updateWatchType}/>
                                </span>
                            </div>

                            {/* Submit Btn */}
                            <div className="new-nomination-btn">
                                <Button
                                    type="submit"
                                    variant='contained'
                                    sx={{
                                        width: 125,
                                        backgroundColor: '#1F1F1F',
                                        borderRadius: 22,
                                        ':hover': {backgroundColor: '#1F1F1F'},
                                    }}>
                                    Submit
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            )}
        </>
    );
}
