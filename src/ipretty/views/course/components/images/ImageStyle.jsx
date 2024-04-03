import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    smallImg: {
        width: '20px',
        height: '20px',
    },
    bigImg: {
        width: '204px',
        height: '100px'
    }
}));

function ImageStyle(props) {
    const { src , isQuestionImg } = props;
    const classes = useStyles();

    return (
        <>
            { isQuestionImg ? 
                <img src={src} className={classes.bigImg} />
                : 
                <img src={src} className={classes.smallImg} />
            }
        </>

    )
}

export default ImageStyle