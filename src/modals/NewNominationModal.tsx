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
    import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
    import '../assets/NewNominationModal.css';
    import dayjs from 'dayjs';
    import { useTheme } from '@mui/material/styles';
    import {toast} from 'react-toastify'
    import IWatchParty from '../model/watchParty/IWatchParty';
    import useAxios from '../hooks/useAxios';
    import {UserContext} from '../context/UserContext';
    import IMnmApiResponse from '../model/IMnmApiResponse';
    import ITmdbResult from '../model/ITmdbResult';
    import IMovieSearchResult from '../model/IMovieSearchResult';
    import { CancelRounded } from '@mui/icons-material';
    import IMovieDetails from '../model/IMovieDetails';
    import INominationRequest from '../model/nomination/INominationRequest';
    import INomination from '../model/nomination/INomination';

    interface NewNominationProps {
        isOpen: boolean,
        toggle: () => void,
        modalName?: string,
        watchParty: IWatchParty,
        watchPartyRefresh: () => void
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

        const mobileView = theme.breakpoints.down('sm');

        const desktopView = theme.breakpoints.up('md');

        const searchListStyle = {
            position: 'absolute',
            zIndex: 1000,
            maxHeight: 300,
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            borderStyle: 'solid',
            borderColor: '#eaeaea',
            bottom: '-4rem',
            top: '8rem',
            // Desktop
            [desktopView]: {
                width: '87%',
                bottom: '-4.75rem',
                top: '14.4rem',
            },
            // Mobile 
            [mobileView]: {
                width: '82%',
                bottom: '-4.25rem',
                top: '12rem',
            },
        }

        const api = useAxios();
        const {userId, selectedCommunity} = useContext(UserContext);
        const currentDate = new Date();

        const defaultNominationRequest: INominationRequest = ({
            segmentId: props.watchParty.id,
            movieId: 0,
            movieTitle: '',
            posterPath: '',
            overview: '',
            releaseDate: '',
            runtime: 0,
            genres: [],
            userId: userId
        });

        let startDay = dayjs(props.watchParty.nominationLockDate);

        // TODO: Remove WatchDate from form submission 
        useEffect(() => {
            setNominationRequest((p) => (
                {
                    ...p,
                    segmentId: props.watchParty.id,
                    userId: userId,
                    watchDate: startDay.format('YYYY-MM-DDT00:00:00.000')
                }));
        }, [props.watchParty.id, userId]);

        const [nominationRequest, setNominationRequest] = useState(defaultNominationRequest);

        function resetNominationState() {
            setNominationRequest(defaultNominationRequest);
            setMovieOptions([]);
            setSelectedMovie(null);
            setSearchTitle('');
        }

        const handleSubmit = (event: React.SyntheticEvent) => {
            event.preventDefault();

            if (nominationRequest.movieTitle === '') {
                toast.error("Movie Selection Is Required");
                return;
            }

            if (props.watchParty.nominations.findIndex(isNominationMatch) !== -1) {
                toast.error(`'${nominationRequest.movieTitle}' Already Nominated`);
                return;
            }

            createNomination();
        }

        function isNominationMatch(nomination: INomination): boolean {
            return nominationRequest.movieTitle === nomination.movieTitle && nominationRequest.releaseDate === nomination.releaseDate;
        }

        const createNomination = () => {
            api.post<IMnmApiResponse<INominationRequest>>('/nomination/create', nominationRequest)
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data !== null) {
                        props.toggle();
                        resetNominationState();
                        toast.success(`Nomination created for '${nominationRequest.movieTitle}'`);
                        props.watchPartyRefresh();
                    } 
                },
                (err) => {
                    console.log(err);
                    toast.error('Could not create Nomination');
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
                            res.data.data.total_results > 0 ? setMovieOptions(res.data.data.results) : toast.error(`0 Results for ${searchTitle}, please try another Movie Title`);
                        }
                    },
                )
                .catch((err) => {
                    console.log(err.message);
                    return err.message;
                })
                .finally(() => setIsSearching(false));
        }

        const updateMovieSelection = async (movie: IMovieSearchResult | null) => {
            setSelectedMovie(movie);

            if (movie) {
                const movieDetails = await populateMovieDetails(movie.id);
                if (movieDetails) {
                    setNominationRequest({
                        ...nominationRequest,
                        overview: movieDetails.overview,
                        genres: movieDetails.genres.map(genre => genre.name),
                        runtime: movieDetails.runtime,
                        movieTitle: movie.title,
                        movieId: movie.id,
                        posterPath: movie.posterPath,
                        releaseDate: movie.releaseDate
                    });
                } else {
                    setNominationRequest({
                        ...nominationRequest,
                        movieTitle: movie.title,
                        movieId: movie.id,
                        posterPath: movie.posterPath,
                        releaseDate: movie.releaseDate
                    });    
                }
            } else {
                setNominationRequest(defaultNominationRequest);
            }

            // Handle poster preview reset or when no poster given from tmdb
            movie?.posterPath ? setPreviewPosterPath('https://image.tmdb.org/t/p/w500' + movie.posterPath) : setPreviewPosterPath('/missingPoster.png');
        }

        async function populateMovieDetails(movieId: number) {
            return api.get<IMnmApiResponse<IMovieDetails>>(`/tmdb/movie/${movieId}`)
                .then(
                    (res) => {
                        if (res.data.data && res.data.status.success) {
                            return res.data.data;
                        }

                        return null
                    }
                )
                .catch((err) => {
                    console.log(err.message);
                    return null;
                });  
      }

        // Validates if the cancel btn is in focus when tabbing
        const inputRef = useRef(null);

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

        if (props.modalName === 'newNomination') {
        return (
            <Modal
                open={props.isOpen}
                onClose={props.toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{textAlign: 'center', marginTop: '10px'}}>
                            <div style={{float: 'right'}} onClick={props.toggle}>
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        <Box
                            component='div'
                            sx={{
                                fontWeight: 'bold',
                                fontSize: {xs: 25, sm: 25, md: 30, lg: 35, xl: 40},
                                fontFamily: 'SoraBold',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center'
                            }}>
                            <div> Nominate a movie for</div>
                            <div className='community-name-container'>{selectedCommunity.name}</div>
                        </Box>
                    </Box>

                    <Container>
                        <Box
                            component='form'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                                rowGap: '32px',
                                mt: 2,
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
                                    sx={{width: '100%', marginTop:'32px'}}
                                    value={searchTitle}
                                    onChange={(event:  ChangeEvent<HTMLInputElement>) => setSearchTitle(event.target.value)}
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
                                
                            <Box sx={{display:'flex', alignItems:'center', justifyContent: 'center', flexWrap:'nowrap', width:'100%'}}>
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
                                <h3 className='chosen-movie-heading'>Chosen Movie</h3>
                                <List sx={{maxHeight: 300, width: '100%', maxWidth: 360,}} >
                                    <ListItem alignItems='flex-start' sx={{pb: 0}}>
                                        <Avatar
                                            sx={{height: '100px', width: '70px', mr: 2}}
                                            variant='rounded'
                                            alt='Movie Poster'
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

                            <Button
                                id='submit-btn'
                                name='submitBtn'
                                type='submit'
                                variant='contained'
                                className='submit-btn'
                                disabled={selectedMovie === null}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        );
    } else {
        return <>
        </>
    }
}
