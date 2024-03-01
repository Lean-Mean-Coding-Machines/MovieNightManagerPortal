import { Backdrop, CircularProgress } from '@mui/material';

interface SpinnerType {
  loadingState: boolean;
}

export function LoadingSpinner(props: SpinnerType) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loadingState}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}
