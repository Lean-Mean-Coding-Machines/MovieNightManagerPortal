import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import NominationCard from './nomination/NominationCard';
import { Stack } from '@mui/material';
import INomination from '../model/INomination';

interface MovieNightSegmentProps {
  handleAppLoadingChange: (newState: boolean) => void;
  segment: any;
}

export default function MovieNightSegment(props: MovieNightSegmentProps) {

  if (props.segment.nominationStartDate != null) {
    return (
      <Grid2 container>
        <Grid2 xs={12}>
          <h2>
            {props.segment.nominationStartDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + props.segment.segmentEndDate.toString().slice(0, 4)} -{' '}
            {props.segment.segmentEndDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + props.segment.segmentEndDate.toString().slice(0, 4)}
          </h2>
        </Grid2>
        <Grid2 style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            {props.segment.nominations.map((nom: INomination) => (<NominationCard nomination={nom} />))}
          </Stack>
        </Grid2>
      </Grid2>
    );
  } else {
    return <Grid2 container />;
  }
}
