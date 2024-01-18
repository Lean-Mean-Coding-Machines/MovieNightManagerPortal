import React from "react";
import INomination from "../../model/nomination/INomination";
import {Box,CardMedia} from "@mui/material";

interface NominationCardsProps {
    nomination: INomination,
}

export default function ProfileNomCard(props: NominationCardsProps) {

    const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

    return (
    <>  
        <Box key={props.nomination.id} sx={{padding:'10px'}} >
            <CardMedia
                component="img"
                sx={{height: '300px', minHeight:'300px', width: '200px', borderRadius:'5px', border:'1px solid #666d77'}}
                image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                title={props.nomination.movieTitle}
            />
        </Box>
    </>
        
    )
}