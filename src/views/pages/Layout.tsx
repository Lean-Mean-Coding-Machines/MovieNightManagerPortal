import React, {ReactNode} from 'react';
import AppBar from "../../component/nav/AppNav";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";

export default function Layout(props: { children: ReactNode }) {
    return (
        <Grid container>
            <Grid item id='header' xs={12}>
                <AppBar/>
            </Grid>
            <Grid item xs={12}>
                <Container maxWidth="xl">
                    {props.children}
                </Container>
            </Grid>
        </Grid>
    );
}

