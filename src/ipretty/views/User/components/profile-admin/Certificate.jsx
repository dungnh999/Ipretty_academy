import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { CardContent, Card , Grid, Typography, makeStyles} from '@material-ui/core';
import IconImage from "ipretty/components/IconImage";
import Medal from "../../../../../public/icons_ipretty/Medal.svg"
import contextHelper from 'ipretty/helpers/contextHelper'
import Skeleton from 'ipretty/components/Skeleton';

const useStyles = makeStyles(theme => ({
    contextInfo : { 
        display : 'flex',
        position : 'relative',
        flex : 1,
        '& .contentInfo__content--password' : {
            width : '100%',
            '& .contentInfo__content--card__right' : {
                width : '100%',
                height : '100%',
                '& .cardContent' : {
                    padding : 24,
                    '& .userDetail' : {
                        display: 'flex',
                        padding: '0 0 6px',
                        '& .title' : {
                            fontWeight : 700,
                            fontSize : "20px",
                            color : '#27384C',
                            paddingBottom : "16px"
                        },
                        '& .userTitle' : {
                            color : '#27384C !important',
                            fontWeight : 400
                        },
                    }, 
                    '& .certificates' : {
                        display : 'flex',
                        '& .icon' : {
                            '& img' : {
                                height : 48,
                                minWidth : 48
                            },
                        },
                        '& .certificates__context': {
                            padding : "0 28px 29px",
                            marginTop : "5px",
                            fontFamily : 'San Francisco Text',
                            "& .certificate_name" : {
                                fontSize : 16
                            },
                            "& .certificate_at" : {
                                fontSize : 12
                            }
                        }
                    }
                },
            }
        },
    }
}))

function Infomation(props) {
    const classes = useStyles()
    const { dataUser , loading} = props
    const { getTranslation } = useAuth()
    const { convertLocalDateToDateFormat } = contextHelper;

    return (
        <>
            <div className={classes.contextInfo}>
                <Grid container>
                    { 
                        loading ? 
                            <Skeleton type="table" />
                        :
                            <Grid item  className="contentInfo__content--password" >
                                <Card className="contentInfo__content--card__right" sx={{ minWidth: 496 }}>
                                    <CardContent className ='cardContent'>
                                        <div className="userDetail">
                                            <Typography  className="title">{getTranslation('CertificatesReceived')} </Typography> 
                                        </div>
                                        {
                                            dataUser && dataUser.certificates && dataUser.certificates.length > 0 ? dataUser.certificates.map((item , index) => {
                                                return(
                                                    <div className="certificates" key={index}> 
                                                        <div className="icon">
                                                            <IconImage srcIcon={Medal} /> 
                                                        </div>
                                                        <div className="certificates__context">
                                                            <div className="certificate_name">{item.certificate_name}</div>
                                                            <div className="certificate_at">{getTranslation('day')}{' '}{convertLocalDateToDateFormat(item.completed_at)}</div>
                                                        </div>
                                                    </div>  
                                                )
                                            }) : ''
                                        }
                                    </CardContent>
                                </Card> 
                            </Grid>
                    }
                </Grid> 
            </div>
        </>
    )
}

export default Infomation