import React, { useEffect, useState } from 'react';
import IMovieNightSegment from '../model/IMovieNightSegment';
import MovieNightSegmentService from '../service/MovieNightSegmentService';
import Grid2 from '@mui/material/Unstable_Grid2';
import NominationCard from './NominationCard';
import { Stack } from '@mui/material';

interface MovieNightSegmentProps {
  handleAppLoadingChange: (newState: boolean) => void;
}

export default function MovieNightSegment(props: MovieNightSegmentProps) {

  const [segment, setSegment] = useState<IMovieNightSegment>({} as IMovieNightSegment);
  
  useEffect(() => {
    MovieNightSegmentService.getCurrentSegment()
      .then(
        (res) => {
          if (res.data.status.success && res.data.data != null) {
            setSegment(res.data.data);
          }
          props.handleAppLoadingChange(false);
        },
        (err) => console.log(err))
      .catch((err) => console.log(err.message));
  }, [props]);

  if (segment.nominationStartDate != null) {
    return (
      <Grid2 container>
        <Grid2 xs={12}>
          <h2>
            {segment.nominationStartDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0, 4)} -{' '}
            {segment.segmentEndDate.toString().split('T').shift()?.replaceAll('-', '/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0, 4)}
          </h2>
        </Grid2>
        <Grid2 style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            {segment.nominations.map((nom) => (<NominationCard nomination={nom} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    );
  } else {
    return <Grid2 container />;
  }
}
