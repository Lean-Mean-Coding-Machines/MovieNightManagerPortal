    import {
        Box,
        Button,
        IconButton,
        List,
        ListItem,
        Divider,
        ListItemText,
        ListItemAvatar,
        Avatar,
        Typography,
        Container,
        Modal,
        TextField,
        InputAdornment
    } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import React, {useContext, useEffect, useRef, useState} from 'react';
    import '../assets/NominationModal.css';
    import DateSelector from '../component/input/DatePicker';
    import dayjs from 'dayjs';
    import { useTheme } from '@mui/material/styles';
    import {toast} from 'react-toastify'
    import IMovieNightSegment from '../model/IMovieNightSegment';
    import useAxios from '../hooks/useAxios';
    import {UserContext} from '../context/UserContext';
    import IMnmApiResponse from '../model/IMnmApiResponse';
    import ITmdbResult from '../model/ITmdbResult';
    import IMovieSearchResult from '../model/IMovieSearchResult';
    import { CancelRounded } from '@mui/icons-material';

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
        releaseDate: string,
        userId: number,
        overview: string
    }

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'block',
        background: '#f6f6f6',
        width: {xs: '85%', lg: '30%'},
        padding: '1rem',
        borderRadius: '1rem',
    }

    export default function NewNominationModal(props: NewNominationProps) {
        
        const theme = useTheme();

        const searchListStyle = {
            position: 'absolute',
            zIndex: 1000,
            maxHeight: 300,
            overflowY: 'scroll',
            maxWidth: 360,
            bgcolor: 'background.paper',
            borderStyle: 'solid',
            borderColor: '#eaeaea',
            bottom: '-4rem',
            top: '8rem',
            // Desktop
            [theme.breakpoints.up('md')]: {
                width: '100%',
                bottom: '-4.75rem',
                top: '8.75rem',
            },
            // Mobile 
            [theme.breakpoints.down('sm')]: {
                width: '87%',
                bottom: '-4.25rem',
                top: '7.75rem',
            },
        }

        const api = useAxios();
        const {userId} = useContext(UserContext);
        const currentDate = new Date();

        const defaultNominationForm: nominationForm = ({
            segmentId: props.segment.id,
            movieTitle: '',
            watchDate: '',
            watchTime: '5',
            watchType: 'ANY',
            posterPath: '',
            overview: '',
            releaseDate: '',
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

        // Need to account for duplicate Movie selections here
        const handleSubmit = (event: React.SyntheticEvent) => {
            event.preventDefault();
            if (nominationForm.movieTitle === '') {
                toast.error("Movie Selection Is Required");
                return;
            }

            if (nominationForm.movieTitle) {
                for (let i = 0; i < props.segment.nominations.length; i++) {
                    if (nominationForm.movieTitle === props.segment.nominations[i].movieTitle && nominationForm.releaseDate === props.segment.nominations[i].releaseDate) {
                        toast.error(`${nominationForm.movieTitle} Already Nominated`);
                        return;
                    }
                }
            }

            if (nominationForm.watchDate === 'Invalid Date') {
                toast.error("Preferred Watch Date Required");
                return;
            }
            api.post<IMnmApiResponse<any>>('/nomination/create', nominationForm)
                .then(
                    (res) => {
                        if (res.data.status.success && res.data.data != null) {
                            props.toggle();
                            resetNominationState();
                            toast.success(`Created nomination for ${nominationForm.movieTitle} on ${nominationForm.watchDate.split('T')[0].split('-').reverse().join('-')}`);
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
        const [previewPosterPath, setPreviewPosterPath] = useState('');
        const [searchTitle, setSearchTitle] = useState('');
        const [movieOptions, setMovieOptions] = useState<IMovieSearchResult[]>([]);
        const [isSearching, setIsSearching] = useState(false);
        const handleMovieSearch = (event: any) => {
            event.preventDefault();
            api.get<IMnmApiResponse<ITmdbResult<IMovieSearchResult[]>>>('/tmdb/movie/search', { params: { title: searchTitle}})
                .then(
                    (res) => {
                        if (res.data.data && res.data.status.success) {
                            res.data.data.total_results > 0 ? setMovieOptions(res.data.data.results) : toast.error(`0 Results for ${searchTitle}, please try another Movie Title`) ;
                        }
                    },
                )
                .catch((err) => {
                    console.log(err.message);
                    return err.message;
                })
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
            movie?.posterPath ? setPreviewPosterPath('https://image.tmdb.org/t/p/w500' + movie.posterPath) : setPreviewPosterPath('/missingPoster.png');
            setNominationState({
                ...nominationForm,
                movieTitle: movie ? movie.title : '',
                posterPath: movie ? movie.posterPath : '',
                overview: movie ? movie.overview : '',
                releaseDate: movie ? movie.releaseDate: ''
            });
        }

        // Validates if the cancel btn is in focus when tabbing
        const inputRef = useRef(null);
        const searchListInputRef = useRef(null);

        const handleClickClearMovieInput = () => {
            setMovieOptions([]);
            updateMovieSelection(null);
            setSearchTitle('');
        };

        const clearMovieTitleInput = (event: any) => {
            if (event.key === "Enter" && inputRef.current === document.activeElement) {
                event.preventDefault();
                handleClickClearMovieInput();
                return;
            }
        };

        // Filters out movie dates that are further out than current date, we can change this in the future if we want to leverage all options
        const filterMovieDates = movieOptions.filter((option) => {
            const releaseDate = new Date(option.releaseDate);
            return releaseDate <= currentDate;
          });

        return (
            <Modal
                open={props.isOpen}
                onClose={props.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{textAlign: 'center', marginTop: '10px'}}>
                        <Box
                            component='span'
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: 20, sm: 25, md: 30, lg: 35, xl: 40},
                                fontFamily: 'SoraBold'
                            }}>
                            Nominate a Movie
                        </Box>
                        <div style={{float: 'right', marginTop: '-5px'}} onClick={props.toggle}>
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
                            {/* Movie Name Input */}
                                <TextField
                                    label="Movie Name"
                                    name='titleSearch' 
                                    id='nomination-name-input'
                                    required 
                                    sx={{width: {xs: '100%', lg: '50%'}}}
                                    value={searchTitle}
                                    onChange={(event: any) => setSearchTitle(event.target.value)}
                                    InputProps={{endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                ref={inputRef}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickClearMovieInput}
                                                onMouseDown={clearMovieTitleInput}
                                                onKeyDown={(e) => { clearMovieTitleInput(e)}}
                                                >
                                                {searchTitle ? <CancelRounded sx={{color: theme.palette.primary.main}}/> : ''}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && (inputRef.current !== document.activeElement)) {
                                            handleMovieSearch(e);
                                        }
                                    }}
                                />
                                
                            <Box>
                                <Button
                                    sx={{mr: 2}}
                                    id='search-button'
                                    name='searchButton'
                                    className='search-btn'
                                    variant='outlined'
                                    disabled={searchTitle === '' || isSearching}
                                    onClick={handleMovieSearch}>
                                    {isSearching ? 'Searching' : 'Search'}

                                </Button>

                                <Button
                                    id='clear-button'
                                    name='clearButton'
                                    className='clear-btn'
                                    variant='outlined'
                                    disabled={searchTitle === ''}
                                    onClick={handleClickClearMovieInput}>
                                    Clear
                                </Button>
                            </Box>

                            {/* Search Results */}
                            <List hidden={movieOptions.length === 0} sx={searchListStyle} >
                            {filterMovieDates.map((option) => (
                                        <div key={option.id} >
                                            <ListItem 
                                                tabIndex={0}
                                                alignItems='flex-start'  
                                                onKeyDown={(e) => { 
                                                        if (e.key === "Enter") {
                                                            updateMovieSelection(option);
                                                            setMovieOptions([]);                                                    
                                                        }
                                                    }}
                                                onClick={() => {
                                                    updateMovieSelection(option);
                                                    setMovieOptions([]);
                                                }}          
                                                sx={{
                                                    '&:hover': {
                                                    background: '#808080',
                                                    cursor: 'pointer'
                                                    },
                                                    '&:focus': {
                                                        background: '#808080',
                                                        outlineColor:'#808080'
                                                    }
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt='Movie Poster'
                                                            src={`${option.posterPath ? 'https://image.tmdb.org/t/p/w500' + option.posterPath : ''}`}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={option.title}
                                                primaryTypographyProps={{
                                                    fontWeight: 600
                                                  }}
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
                                                            {` ${option.releaseDate}`}
                                                        </React.Fragment>
                                                    }
                                                    />
                                            </ListItem>
                                            <Divider variant='inset' component='li'/>
                                        </div>
                                    ))
                                }
                            </List>

                            {/* Chosen Movie */}
                            <Box hidden={selectedMovie === null}>
                                <h3 style={{margin: 0, textAlign: 'center', color: '#000'}}>Chosen Movie</h3>
                                <List sx={{maxHeight: 300, width: '100%', maxWidth: 360,}} >
                                    <ListItem alignItems='flex-start' sx={{pb: 0}}>
                                        <Avatar
                                            sx={{height: '100px', width: '70px', mr: 2}}
                                            variant='rounded'
                                            alt='Movie Poster'
                                            // Img isn't populating correctly currently, need to fix use effect? or make it async? 
                                            src={previewPosterPath}/>
                                        <ListItemText
                                            primary={selectedMovie ? selectedMovie.title : ''}
                                            primaryTypographyProps={{
                                                fontWeight: 600
                                              }}
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
                                                    {` ${selectedMovie ? selectedMovie.releaseDate : ''}`}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Box>


                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}}}>
                                <Box
                                    sx={{
                                        pr: {xs: 0, lg: 1},
                                        pb: {xs: 1, lg: 0},
                                        width: {xs: '100%', lg: '50%'},
                                        flexGrow: 1,
                                    }}>
                                    <DateSelector
                                        sx={{
                                        width: '50%', 
                                        pr: {xs: 0, lg: 1}, 
                                        flexGrow: 1
                                        }}
                                        handleChangeDate={updateWatchDate} 
                                        startDay={startDay}
                                        endDay={endDay}
                                    />
                                </Box>
                            </Box>

                            <Button
                                id='submit-btn'
                                name='submitBtn'
                                type='submit'
                                variant='contained'
                                className='submit-btn'
                            >
                                Submit
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        );
    }
