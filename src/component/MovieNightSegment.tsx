import React, { useEffect, useState } from 'react';
import IMovieNightSegment from '../model/IMovieNightSegment';
import MovieNightSegmentService from '../service/MovieNightSegmentService';
import Grid2 from '@mui/material/Unstable_Grid2';
import NominationCards from './NominationCards';

interface MovieNightSegmentProps {
  handleAppLoadingChange: (newState: boolean) => void;
}

export default function MovieNightSegment(props: MovieNightSegmentProps) {
  const [segment, setSegment] = useState<IMovieNightSegment | null | undefined>(
    null
  );

  useEffect(() => {
    MovieNightSegmentService.getCurrentSegment()
      .then(
        (res) => {
          setSegment(res.data.data);
          props.handleAppLoadingChange(false);
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err.message));
  }, [props]);

  if (segment != null) {
    return (
      <Grid2 container>
        <Grid2 xs={12}>
          <h2>
            {segment.nominationStartDate.toString()} -{' '}
            {segment.segmentEndDate.toString()}
          </h2>
        </Grid2>
        <Grid2 style={{ justifyContent: 'center', alignItems: 'center' }}>
          <NominationCards nominations={segment.nominations} />
        </Grid2>
      </Grid2>
    );
  } else {
    return <Grid2 container />;
  }
}
