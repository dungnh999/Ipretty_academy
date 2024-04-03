import React, {  } from 'react';
import { makeStyles } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons'
import useNavigator from 'ipretty/hook/useNavigator';
import { useAuth } from 'ipretty/context/AppProvider';
import IconImage from "ipretty/components/IconImage";
import BackSVG from 'public/icon_svg/back.svg'

const useStyles = makeStyles(theme => ({
    goBack: {
        fontSize: '16px', 
        fontWeight: '600', 
        fontFamily: 'San Francisco Text Semibold', 
        // letterSpacing: '-0.011em',
        lineHeight: '16px',
        cursor: 'pointer'
    },
    buttonGoback: {
        cursor: 'pointer',
        paddingTop : 2,
    },
    title: {
        marginLeft: 17,
        fontWeight: '700',
        fontSize: 32,
        lineHeight: '38px',
        color: '#395B65',
        [theme.breakpoints.down("xs")]: {
            fontSize: 18,
            lineHeight: '38px',//fix bug 56 , buton và size chư quas lớn
            marginLeft: 0,
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: 18,
            lineHeight: '38px',//fix bug 56 , buton và size chư quas lớn
            marginLeft: 0,
        },
    },
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function Goback(props) {
    const { path, clearStorage, title } = props;
    const classes = useStyles();
    const navigate = useNavigator();
    const { getTranslation } = useAuth()
    const handleGoBack = () => {
        navigate(`${path}`);
        if(clearStorage && clearStorage.length && clearStorage.length > 0) {
            clearStorage.forEach(item => {
                localStorage.removeItem(item);
            });
        }
    };

    return(
        <>
            <div className={classes.main} onClick={handleGoBack}>
                <span className={classes.buttonGoback} >
                    <ArrowBackIos fontSize="small" />
                    {/* <IconImage srcIcon={BackSVG} icon16/> */}
                </span>
                <span className={title ? classes.title : classes.goBack}>
                    {title ? title : getTranslation('Back')}
                </span>  
            </div>
        </>
    )
}

export default Goback;