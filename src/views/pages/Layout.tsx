import React, {ReactNode} from 'react';
import AppBar from "../../component/nav/AppNav";
import Container from "@mui/material/Container";

export default function Layout(props: { children: ReactNode }) {
    return (
        <>
            <AppBar/>
            <Container maxWidth="xl">
                {props.children}
            </Container>
        </>
    );
}

