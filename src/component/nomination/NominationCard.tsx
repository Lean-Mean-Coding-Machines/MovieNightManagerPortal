import React, {useContext, useState} from "react";
import INomination from "../../model/nomination/INomination";
import {Box, Card, CardContent, CardMedia, Grid, Tooltip, Typography} from "@mui/material";
import {FavoriteBorder, Favorite} from "@mui/icons-material";
import INominationLike from "../../model/nomination/INominationLike";
import {UserContext} from "../../context/UserContext";
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import {toast} from "react-toastify";
import INominationLikeRequest from "../../model/nomination/INominationLikeRequest";

interface NominationCardsProps {
    nomination: INomination
}

export default function NominationCard(props: NominationCardsProps) {

    const api = useAxios();
    const {userId} = useContext(UserContext);

    const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

    const [likeCount, setLikeCount] = useState(props.nomination.nominationLikes.length);
    const [nominationLiked, setNominationLiked] = useState(
        props.nomination.nominationLikes.map((like) => like.userId).indexOf(userId) !== -1
    );
    const [nominationLikeHover, setNominationLikeHover] = useState(false);
    const [likeRequestLoading, setLikeRequestLoading] = useState(false);

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

    const isFilledLikeIcon = () => {
        return nominationLiked ? !nominationLikeHover : nominationLikeHover;
    };

    return (
        <Box key={props.nomination.id}>
            <Card variant="outlined">
                <Grid container>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            sx={{height: 140}}
                            image={poster}
                            title="green iguana"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <CardContent>
                            <Typography>
                                {props.nomination.movieTitle}
                            </Typography>
                            <Typography>
                                Submitted By: {props.nomination.submittedBy}
                            </Typography>
                            {
                                isFilledLikeIcon() ?
                                    <Favorite
                                        onClick={handleNominationLikeToggle}
                                        onMouseEnter={() => setNominationLikeHover(true)}
                                        onMouseLeave={() => setNominationLikeHover(false)}
                                    /> :
                                    <FavoriteBorder
                                        onClick={handleNominationLikeToggle}
                                        onMouseEnter={() => setNominationLikeHover(true)}
                                        onMouseLeave={() => setNominationLikeHover(false)}
                                    />
                            }
                            <Tooltip title={
                                <>
                                    {props.nomination.nominationLikes.map(like => (<Typography color="inherit">{like.username}</Typography>))}
                                </>
                            } arrow>
                                <span>{likeCount} likes</span>
                            </Tooltip>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}