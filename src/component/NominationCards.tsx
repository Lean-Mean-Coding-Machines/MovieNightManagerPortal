import React from 'react';
import INomination from '../model/INomination';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

interface NominationCardsProps {
  nominations: INomination[];
}

export default function NominationCards(props: NominationCardsProps) {
  function nominationToCard(nomination: INomination) {
    return (
      <Box key={nomination.id}>
        <Card variant='outlined'>
          <CardContent>
            <Typography>{nomination.movieTitle}</Typography>
            <Typography>{nomination.watchType}</Typography>
            <Typography>
              {nomination.likes === undefined ? 0 : nomination.likes.length}{' '}
              Likes
            </Typography>
            <Typography>Submitted By: {nomination.submittedBy}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      {props.nominations.map((nom) => nominationToCard(nom))}
    </Stack>
  );
}
