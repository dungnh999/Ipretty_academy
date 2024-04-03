import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
//image
import ImageBanner from '../../../../public/images/bg_banner_student.png';
import CardStatistic from './CardStatistic';
import { useAuth } from 'ipretty/context/AppProvider';
import { appName } from 'ipretty/helpers/config';
import { LineWeight } from '@material-ui/icons';
import AddButton from 'ipretty/components/AddButton'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    styleBackground: {
        backgroundImage: `url(${ImageBanner})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            padding: '12px 20px 12px 20px'
        },
        [theme.breakpoints.down('md')]: {
            padding: '22px 6.9vw 22px 6.9vw'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '22px 4.9vw 22px 4.9vw' // scroll bug 80
        },
        padding: '32px 14.444vw 31px 14.444vw',
        "& .contentBanner": {
            flex: 1,
            // marginRight: 11,
            color: theme.palette.background.paper,
            [theme.breakpoints.down('sm')]: {
                paddingBottom: 12,
                minWidth: 341,
            },
            [theme.breakpoints.up('md')]: {
                // minWidth: 341,
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: 310,
            },
            "& .contentBanner__wrapper": {
                maxWidth: 299,
            },
            "& .contentBanner__contentLeftTitle": {
                [theme.breakpoints.down('sm')]: {
                    fontSize: '25px',
                },
                [theme.breakpoints.down('md')]: {
                    fontSize: '25px',
                },
                fontSize: '36px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat',
                lineHeight: 1.5,
                letterSpacing: '- 0.011em'
            },
            "& .contentBanner__contentLeftDes": {
                "& .MuiTypography-body2": {
                    lineHeight: '20px',
                    // letterSpacing: '- 0.011em'
                }
            },
            '& .button__contentLeft' : {
                paddingTop : 18,
                "& .button--white": {
                    background: '#FFFFFF',
                    color: '#44AD92',
                    padding: '10px 16px',
                    fontSize: '16px',
                    [theme.breakpoints.down('xs')]: {
                        minWidth: 67,
                        height: 36
                    },
                },

            }
        },
        "& .banner__chart": {
            flex: 2,
            display: 'flex',
            flexWrap: 'wrap',
            [theme.breakpoints.down('md')]: {
                flex: 3,
            },
            [theme.breakpoints.down('sm')]: {
                flex: 'auto',
            },
            [theme.breakpoints.down('xs')]: {
                flex: 'auto',
                flexDirection: 'column' 
            },

        }
        
    },
    contentLeftDes: {
        color: 'white',
        fontFamily: 'San Francisco Text',
        fontSize: '14px'
    },
    layoutCenter: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    twoCard: {
        [theme.breakpoints.down('xs')]: {
        },
    }
}));

function BannerStudent(props) {
    const {  } = props;
    const { user, getTranslation } = useAuth();
    const classes = useStyles();
    const history = useHistory();
    const [loadingButton , setLoadingButton] = useState(false)
    const API_URL = process.env.API_URL;

    function handleAction (){
      window.open(API_URL)
    }
    return(
        <>
            <div className={classes.styleBackground}>
                <div className="contentBanner">
                    <div className="contentBanner__wrapper">
                        <div className="contentBanner__contentLeftTitle">
                            <div>{appName}</div>
                            <div>{getTranslation('greetings')}!</div>
                        </div>
                        <div className="contentBanner__contentLeftDes">
                            <Typography variant='body2'>{getTranslation('introduction')}</Typography>
                        </div>
                    </div>
                    <div className="button__contentLeft">
                        <AddButton
                            label={getTranslation('CourseLibrary')}
                            buttonClass="button button--white"
                            onClick={handleAction}
                            variant='contained'
                            disabled={false}
                            noIcon={true}
                            loading={loadingButton}
                        />
                    </div>
                </div>
                <div className="banner__chart">
                    {/* <div className={classes.twoCard} direction="row" justifyContent="space-between" alignItems="center"> */}
                        <CardStatistic />
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
export default BannerStudent;