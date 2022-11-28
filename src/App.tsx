import React, {useState} from "react";
import './App.css';
import MovieNightSegment from "./component/MovieNightSegment";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Backdrop, CircularProgress} from "@mui/material";

function App() {

    const [appLoading, setAppLoading] = useState(true);

    const handleAppLoadingChange = (newState: boolean) => {
        setAppLoading(newState);
    }

    return (
        <div className="App" style={{backgroundColor: "ghostwhite", height: "100vh"}}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={appLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Grid2 container>
                <Grid2 xs={12}>
                    <h1>Movie Night Manager</h1>
                </Grid2>
                <Grid2 xs={12}>
                    <MovieNightSegment handleAppLoadingChange={handleAppLoadingChange}/>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default App;
