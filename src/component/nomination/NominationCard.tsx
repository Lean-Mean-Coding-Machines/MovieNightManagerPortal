import React, {useContext, useState} from "react";
import INomination from "../../model/nomination/INomination";
import {Box, Card, CardActions, CardContent, CardMedia, Tooltip, Typography} from "@mui/material";
import {FavoriteBorder, Favorite, Person, InfoOutlined, Delete} from "@mui/icons-material";
import INominationLike from "../../model/nomination/INominationLike";
import {UserContext} from "../../context/UserContext";
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import {toast} from "react-toastify";
import INominationLikeRequest from "../../model/nomination/INominationLikeRequest";
import { Button } from "@mui/base";
import '../../assets/NominationCard.css';
import useModal from "../../hooks/useModal";
import MovieDetailsModal from "../../modals/MovieDetailsModal";
import DeleteNominationModal from "../../modals/DeleteNominationModal";

interface NominationCardsProps {
    nomination: INomination,
    segmentRefresh: () => void,
}

export default function NominationCard(props: NominationCardsProps) {

    const api = useAxios();
    const {userId, username} = useContext(UserContext);

    const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

    const [likeCount, setLikeCount] = useState(props.nomination.nominationLikes.length);
    const [nominationLiked, setNominationLiked] = useState(props.nomination.nominationLikes.map((like) => like.userId).indexOf(userId) !== -1);
    const [nominationLikeHover, setNominationLikeHover] = useState(false);
    const [likeRequestLoading, setLikeRequestLoading] = useState(false);

    const [expandText, setExpandText] = useState(false);

    const handleNominationLikeToggle = () => {
        if (userId && !likeRequestLoading) {
            setLikeRequestLoading(true);
            const likeRequest: INominationLikeRequest = {
                nominationId: props.nomination.id,
                userId: userId
            };
            api.post<IMnmApiResponse<INominationLike>>("/nominationlike/manage", likeRequest)
                .then(
                    (res) => {
                        if (res.data.data && res.data.status.success) {
                            setNominationLiked(res.data.data.enabled);
                            setLikeCount((prevState) => res.data.data!.enabled ? prevState + 1 : prevState - 1);
                            props.segmentRefresh();
                        }
                    },
                    (err) => console.log(err)
                )
                .catch((err) => console.log(err.message))
                .finally(() => setLikeRequestLoading(false));
        } else {
            toast.error("Please login to like a movie nomination");
        }
    };

    const deleteNomination = () => {
        api.delete<IMnmApiResponse<INomination>>(`/nomination/delete/${props.nomination.id}?userId=${userId}`)
        .then(() => {
                props.segmentRefresh();
                toast.success(`${props.nomination.movieTitle} successfully deleted`);
        })
        .catch((err) => {
            console.error("Error deleting nomination:", err);
            toast.error(`${props.nomination.movieTitle} deletion failed`)
        })
    }

    const expandHandler = () => {
        setExpandText(!expandText);
    }

    const isFilledLikeIcon = () => {
        return nominationLiked ? !nominationLikeHover : nominationLikeHover;
    };

    const {isOpen, toggle} = useModal();

    const [modalName, setModalName] = useState('');

    return (
        <>  
        <Box key={props.nomination.id} >
            <Card variant="outlined" className="card-container">

                <CardMedia
                    component="img"
                    sx={{height: '300px', width: '200px', cursor:"pointer"}}
                    image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                    title={props.nomination.movieTitle}
                    onClick={handleNominationLikeToggle}
                />

                    {/* TODO: Need to account for mobile width when editing class, this pushes all the content on zoom and looks like shit  */}
                    {/* This needs to be configured for profile and regular view make a media breakpoint?*/}
                <CardContent className="card-content-container ">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1, flexWrap: 'wrap' }}>
                            <div className="card-title-container">
                            <Tooltip title={props.nomination.movieTitle} enterDelay={900}>
                            <Typography fontWeight={'bold'}>
                                {props.nomination.movieTitle}
                            </Typography>
                            </Tooltip>
                            </div>
                            <Typography variant="body2" color="textSecondary" style={{marginBottom: '10px'}}>
                                ({props.nomination?.releaseDate.split('-')[0]})
                            </Typography>
                            </div>
                            <div className="info-icon">
                            <Tooltip title="More Info">
                                <InfoOutlined onClick={()=>{
                                    toggle();
                                    setModalName('movieDetails');
                                    }} />
                            </Tooltip>
                            </div>
                        </div>
                    
                    <div className={`${props.nomination.movieOverview?.length > 150 && !expandText ? "card-paragraph-container" : ""}`}>
                    <Typography className={`${props.nomination.movieOverview?.length > 150 && !expandText ? "long-overview-desc" : "short-overview-desc"}`}>
                        {props.nomination.movieOverview}
                    </Typography>
                    </div>
                    
                    <div>
                        { (props.nomination.movieOverview?.length > 150 && !expandText) && 
                            <Button 
                                id={`read-more-btn ${props.nomination.id}`}
                                name="readMoreBtn"
                                className="expand-btn" 
                                onClick={expandHandler}
                            >
                            Read More
                            </Button> 
                        }

                        { expandText && 
                            <Button 
                                id={`read-less-btn ${props.nomination.id}`}
                                name="readLessBtn"
                                className="expand-btn" 
                                onClick={expandHandler}
                            >
                            Read Less
                            </Button> 
                        }
                    </div>

                <CardActions className="card-actions-container">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {/*TODO: Temp location of deletion, will likely move  */}
                    {props.nomination.submittedBy === username && <Tooltip title="Delete Nomination">
                                <Delete style={{cursor:'pointer'}} onClick={()=>{toggle();setModalName('deleteNomination');}} />
                            </Tooltip>}
                        <Button 
                            id={`like-btn ${props.nomination.id}`}
                            name="likeBtn"
                            className="like-btn" 
                            onClick={handleNominationLikeToggle}
                            onMouseEnter={() => setNominationLikeHover(true)}
                            onMouseLeave={() => setNominationLikeHover(false)}
                        >
                            { isFilledLikeIcon() ? <Favorite style={{color: '#f24d85'}}/> : <FavoriteBorder style={{color: '#f24d85'}} />}
                            <Tooltip title={
                                <>
                                    {props.nomination.nominationLikes.map(like => (<Typography key={like.username} color="inherit">{like.username}</Typography>))}
                                </>
                            } arrow>
                                <span style={{font:'Raleway'}}>{ ` ${likeCount}  ${likeCount > 1 ? 'likes' : 'like'}`}</span>
                            </Tooltip>
                        </Button>

                        <Tooltip title={props.nomination.submittedBy}>
                        <Person style={{marginLeft: '10px'}}></Person>
                        </Tooltip>
                    </div>
                </CardActions>
                </CardContent>
            </Card>
        </Box>
        {/* Modals */}
        <MovieDetailsModal isOpen={isOpen} toggle={toggle} nomination={props.nomination} modalName={modalName}/>
        <DeleteNominationModal isOpen={isOpen} toggle={toggle} nomination={props.nomination} modalName={modalName} deleteNomination={deleteNomination} />
        </>
        
    )
}