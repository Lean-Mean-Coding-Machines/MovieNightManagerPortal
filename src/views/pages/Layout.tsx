import React, {ReactNode} from 'react';
import AppBar from '../../component/nav/AppNav';
import Container from '@mui/material/Container';
import {Grid} from '@mui/material';
import Footer from '../../component/nav/Footer';

export default function Layout(props: { children: ReactNode }) {

  return (
    <Grid container sx={{ background: '#14181c' }}>
      <Grid item id="header" xs={12}>
        <AppBar/>
      </Grid>
      <Grid item xs={12} style={{ flex: 1, background: '#14181c', minHeight: '85vh' }}>
        <Container maxWidth="xl" style={{ flex: 1 }}>
          {props.children}
        </Container>
      </Grid>
       <Footer/>
    </Grid>
  );
}
