

import React from 'react';
import { Typography, Button, Hidden, makeStyles } from '@material-ui/core'
import logoSrc from '../../../../public/logo/logo-ipretty.png';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 5.6875rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    img: {
        // marginRight: '135px',
        // width: 330
    },
    marginAuto: {
        margin: '0 auto'
    }
}))


const ErrorView = (props) => {

    const { numberError, message, getTranslation} = props;
    const history = useHistory();
    const classes = useStyles();

    function goBack(){
        history.push('/');
    }

    return (
        <div className={classes.root}>
            <div className={classes.marginAuto}>
                <img alt="error 403" src={logoSrc} className={classes.img} />
            </div>
            <div className={classes.marginAuto}>
                <Typography variant="h1" color="error" gutterBottom>
                    {numberError}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {message}
                </Typography>
                <br />
                <Button variant="contained" color="primary" onClick={goBack}>
                    {getTranslation('backToHomePage')}
                </Button>
            </div>
        </div>
    )
}

export default ErrorView;
