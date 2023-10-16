import React, {useContext, useState} from "react";
import INomination from "../../model/nomination/INomination";
import {Box, Card, CardActions, CardContent, CardMedia, Tooltip, Typography} from "@mui/material";
import {FavoriteBorder, Favorite, Person} from "@mui/icons-material";
import INominationLike from "../../model/nomination/INominationLike";
import {UserContext} from "../../context/UserContext";
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import {toast} from "react-toastify";
import INominationLikeRequest from "../../model/nomination/INominationLikeRequest";
import { Button } from "@mui/base";
import '../../assets/NominationCard.css';

interface NominationCardsProps {
    nomination: INomination
}

export default function NominationCard(props: NominationCardsProps) {

    const api = useAxios();
    const {userId} = useContext(UserContext);

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
                userId: userId,
                watchDate: "2023-01-14T18:30:00.000", // TODO :: un-hardcode these
                watchType: "FIRE"
            };
            api.post<IMnmApiResponse<INominationLike>>("/nominationlike/manage", likeRequest)
                .then(
                    (res) => {
                        if (res.data.data && res.data.status.success) {
                            setNominationLiked(res.data.data.enabled);
                            setLikeCount((prevState) => res.data.data!.enabled ? prevState + 1 : prevState - 1);
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

    const expandHandler = () => {
        setExpandText(!expandText);
    }

    const isFilledLikeIcon = () => {
        return nominationLiked ? !nominationLikeHover : nominationLikeHover;
    };

    return (
        <Box key={props.nomination.id} >
            <Card variant="outlined" className="card-container">

                <CardMedia
                    component="img"
                    sx={{height: '300px', width: '200px', cursor:"pointer"}}
                    // Need to add in failed poster option here when poster fails to load
                    image={poster ? poster : ''}
                    title={props.nomination.movieTitle}
                    onClick={handleNominationLikeToggle}
                />

                <CardContent sx={{position: 'relative'}}  >
                    <Typography fontWeight={'bold'}>
                        {props.nomination.movieTitle}
                    </Typography>

                    <div className={`${props.nomination.movieOverview.length > 280 && !expandText ? "card-paragraph-container" : ""}`}>
                    <Typography className={`${props.nomination.movieOverview.length > 280 && !expandText ? "long-overview-desc" : "short-overview-desc"}`}>
                        {props.nomination.movieOverview}
                    </Typography>
                    </div>
                    <div>
                    { (props.nomination.movieOverview.length > 280 && !expandText) && 
                    <Button className="expand-btn" onClick={expandHandler}>
                      Read More
                    </Button> 
                    }
                    { expandText && 
                    <Button className="expand-btn" onClick={expandHandler}>
                      Read Less
                    </Button> 
                    }
                    </div>

                <CardActions className="card-actions-container">
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        {/* Display liked by on the tooltip of likes */}
                        <Button className="like-btn" onClick={handleNominationLikeToggle}
                            onMouseEnter={() => setNominationLikeHover(true)}
                            onMouseLeave={() => setNominationLikeHover(false)}
                        >
                            {
                                isFilledLikeIcon() ?
                                    <Favorite/> :
                                    <FavoriteBorder/>
                            }
                            <Tooltip title={
                                <>
                                    {props.nomination.nominationLikes.map(like => (<Typography color="inherit">{like.username}</Typography>))}
                                </>
                            } arrow>
                                <span>{ `${likeCount} ${likeCount > 1 ? 'likes' : 'like'}`}</span>
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
    )
}