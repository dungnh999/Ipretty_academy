import { Backdrop, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useAuth } from '../../context/AppProvider';

const useStyles = makeStyles((theme) => 
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            backgroundColor: '#fff'
        },
    })
);

const SplashScreen = () => {
    const classes = useStyles();
    const { appReady } = useAuth();
    return (
        <Backdrop className={classes.backdrop} open={!appReady}>
            <h1>Welcome</h1>
        </Backdrop>
    );
}

export default SplashScreen;