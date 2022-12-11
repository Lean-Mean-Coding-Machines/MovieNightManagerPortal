import React from "react";
import INomination from "../model/INomination";
import {Box, Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";

interface NominationCardsProps {
    nomination: INomination
}

export default function NominationCard(props: NominationCardsProps) {
    return (
        <Box key={props.nomination.id}>
            <Card variant="outlined">
                <CardContent>
                    <Typography >
                        {props.nomination.movieTitle}
                    </Typography>
                    <Typography>
                        {props.nomination.watchType}
                    </Typography>
                    <Typography>
                        {props.nomination.likes == undefined ? 0 : props.nomination.likes.length} Likes
                    </Typography>
                    <Typography>
                        Submitted By: {props.nomination.submittedBy}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}