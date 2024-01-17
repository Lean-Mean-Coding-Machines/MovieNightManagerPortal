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
    const {isOpen, toggle} = useModal();
    const [modalName, setModalName] = useState('');


    const handleNominationLikeToggle = () => {
        if (likeCount === 1 && props.nomination.submittedBy === username) {
            toggleModal('deleteNomination');
            return;
        }

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
                toast.success(` '${props.nomination.movieTitle}' successfully deleted`);
        })
        .catch((err) => {
            console.error("Error deleting nomination:", err);
            toast.error(`${props.nomination.movieTitle} deletion failed`)
        })
    }

    const isFilledLikeIcon = () => {
        return nominationLiked ? !nominationLikeHover : nominationLikeHover;
    };

    const toggleModal = (modalName: string) => {
        toggle();
        setModalName(modalName);
    }



    return (
        <>  
        <Box key={props.nomination.id} >
            <Card variant="outlined" className="card-container">
                <CardContent className="card-content-container ">
                <div>
                            <div style={{height:'78px'}}>
                            <div className="card-title-container">
                            <Tooltip
                                title={
                                    <>
                                    {<Typography>
                                        {props.nomination.movieTitle}
                                    </Typography>
                                    }
                                    </>
                                    } 
                                enterDelay={900}
                                placement="bottom-start"
                            >
                             
                            <Typography fontWeight={'bold'}> {props.nomination.movieTitle}</Typography>
                            </Tooltip>
                            </div>
                            <Typography variant="body2" color="textSecondary" style={{marginBottom: '10px'}}>
                                ({props.nomination?.releaseDate.split('-')[0]})
                            </Typography>
                            </div>
                            <div className="info-icon">
                            <Tooltip
                            title={
                                <>
                                {<Typography>
                                    More Info
                                </Typography>
                                }
                                </>
                                } 
                            arrow
                            >
                                <InfoOutlined onClick={()=>{
                                    toggleModal('movieDetails');
                                    }} />
                            </Tooltip>
                            </div>
                            </div>
                            
                <CardMedia
                    component="img"
                    sx={{height: '300px', minHeight:'300px', width: '200px', cursor:"pointer"}}
                    image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                    title={props.nomination.movieTitle}
                    onClick={handleNominationLikeToggle}  
                />

            <CardActions sx={{justifyContent:'space-around'}} >
                    <div className='card-actions-container'>
                        {/*TODO: Temp location of deletion, will likely move  */}
                    {props.nomination.submittedBy === username && 
                            <Tooltip title={
                                <>
                                {<Typography>
                                    Delete Nomination
                                </Typography>
                                }
                                </>
                                } 
                            arrow>
                                <Delete style={{cursor:'pointer'}} onClick={()=>{toggleModal('deleteNomination');}} />
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
                                    {props.nomination.nominationLikes.map(like => (<Typography key={like.username}>{like.username}</Typography>))}
                                </>
                            } arrow>
                                <span style={{font:'Raleway'}}>{ ` ${likeCount}  ${likeCount > 1 ? 'likes' : 'like'}`}</span>
                            </Tooltip>
                        </Button>

                        <Tooltip 
                        
                        title={
                            <>
                            {<Typography>
                                {props.nomination.submittedBy}
                            </Typography>
                            }
                            </>
                            } 
                        arrow>
                        <Person style={{marginLeft: '10px'}}></Person>
                        </Tooltip >
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