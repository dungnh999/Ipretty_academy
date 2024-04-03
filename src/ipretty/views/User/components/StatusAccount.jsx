import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { styled } from "@material-ui/core/styles";
import { ArrowBackIos, Visibility, VisibilityOff } from '@material-ui/icons'
import {Button , TextField, IconButton, InputAdornment, Container, Grid, Typography, Link, makeStyles, Box, Paper  } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import UserService from 'ipretty/services/UserService'
import { useHistory } from "react-router-dom";
import AddButton from 'ipretty/components/AddButton';
import contextHelper from 'ipretty/helpers/contextHelper'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import IconImage from "ipretty/components/IconImage";
import Lock from "../../../../public/icons_ipretty/Lock.png"
import UnLock from "../../../../public/icons_ipretty/Unlock.png"
const useStyles = makeStyles(
    theme => ({
        root : {
            width : '100vw',
            [theme.breakpoints.up("lg")]: {
                padding : '0 0 8rem',
            },
            [theme.breakpoints.up("xl")]: {
                padding : '0 0 8rem',
            },
            borderRadius : '8px',
            flexWrap: 'wrap',
            '& .contentInfo__title' : {
                marginBottom : '20px',
                fontWeight: 700,
                fontSize: '20px',
                fontFamily: 'San Francisco Text Bold',
                color: theme.palette.primary.colorTextTitle
            },
            '& .paperStyle' : {
                padding: '32px',
            },
            '& .userDetail' : {
                display: 'flex',
                padding: '0 10px 20px',
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
                '& .valueUserTitle' : {
                    padding : '0 10px',
                    color : '#27384C !important',
                    fontWeight : 400,
                    fontSize : "16px",
                },
            },
            '& .banner__button' : {
                '& .button' :    {
                    '& img' : {
                        width: '17px',
                        height: '20px',
                        marginBottom : '4px'
                    }
                } ,
                '& .banners__button--restart' :{
                    fontFamily: 'San Francisco Text Bold',
                    fontSize: '16px',
                    padding : '5px 32px',
                    [theme.breakpoints.down("sm")]: {
                        marginBottom : 10
                    },

                },
                '& .banners__button--lock' : {
                    padding : '5px 23px',
                    margin : '0px 8px',
                    fontFamily: 'San Francisco Text Bold',
                    fontSize: '16px',
                    [theme.breakpoints.down("sm")]: {
                        marginBottom : 10
                    },
                },
                '& .banners__button--unlock' :{
                    padding : '5px 24px',
                    fontFamily: 'San Francisco Text Bold',
                    fontSize: '16px',
                    [theme.breakpoints.down("sm")]: {
                        marginBottom : 10
                    },
                },
            }
        }
    }))

function StatusAccount (props) {
    const classes = useStyles()
    let history = useHistory()
    const [reload, setReload] = useState(false)
    const {user , setUser , errors , getTranslation, id , type} = props
    const { makeShortMessage } = useNotiStackContext();
    const [loadingActive, setLoadingActive] = useState(false)
    const [loadingLock, setLoadingLock] = useState(false)
    const [loadingUnlock , setLoadingUnload] = useState(false)

    function handleClick (check) {
        if(check === 'active'){
            setLoadingActive(true)
            UserService.active(
                id,
                res => {
                   makeShortMessage(res.data.message, "success")
                   setTimeout(() => {
                        setLoadingActive(false)
                        setUser({...user , isActive:res.data.data.isActive})
                  }, 1000)
                },
                err => {
                    console.log(err)
                }
            )
        } else if (check === 'lock') {
            setLoadingLock(true)
            const data = new FormData()
            data.append('isLocked' , 1) 
            UserService.lockUser (
                id,
                data,
                res => {
                    makeShortMessage(res.data.message, "success")
                    setTimeout(() => {
                        setLoadingLock(false)
                        setUser({...user , isLocked:res.data.data.isLocked })
                  }, 1000)
                },
                err => {
                   console.log(err)
                }
            )

        } else {
            setLoadingUnload(true)
            const data = new FormData()
            data.append('isLocked' , 0)
            UserService.lockUser (
                id,
                data,
                res => {
                  makeShortMessage(res.data.message, "success")
                  setTimeout(() => {
                    setLoadingUnload(false)
                    setUser({...user , isLocked:res.data.data.isLocked})
                }, 1000)
                },
                err => {
                   console.log(err)
                }
            )
        }
    }

   
    
    return (
        <>
            <Grid container >
                <Box className={classes.root}>
                    <Paper elevation={1} className="paperStyle" >
                        <Grid container>
                            <div>
                                <div className="contentInfo__title">
                                    {getTranslation('AccountStatus')}
                                </div>
                                <div className="userDetail">
                                    <Typography className="userTitle" >{getTranslation('MemberStatus')}:</Typography>
                                    <div >
                                        {
                                                (user.isActive != false && !user.isLocked) ?
                                                    <Typography className="valueUserTitle">{getTranslation('active')}</Typography>
                                                : (user.isLocked) ?
                                                    <Typography className="valueUserTitle">{getTranslation('deactivated')}</Typography>
                                                :
                                                <Typography className="valueUserTitle">{getTranslation('notactivated')}</Typography>              
                                        }
                                    </div>
                                </div>
                                <div className="banner__button">
                                    {
                                        (user && user.isActive != false && !user.isLocked) ?
                                        <>
                                            <AddButton label={getTranslation('Restart')} id="update-button" disabled={true} onClick={(check) => handleClick('active') } buttonClass="button banners__button--restart"  variant='outlined' noIcon loading={loadingActive}/>
                                            <AddButton label={getTranslation('Lock')} id="update-button" onClick={(check) => handleClick('lock') } buttonClass="button banners__button--lock"  variant='outlined' iconButton={<IconImage srcIcon={Lock} /> } loading={loadingLock}/>
                                            <AddButton label={getTranslation('Unlock')} id="update-button" disabled={true}  onClick={(check) => handleClick('unlock') } buttonClass="button banners__button--unlock"  variant='outlined' iconButton={<IconImage srcIcon={UnLock} /> } loading={loadingUnlock}/>
                                        </>
                                        : (user.isLocked) ?
                                        <>
                                            <AddButton label={getTranslation('Restart')} id="update-button" disabled={true} onClick={(check) => handleClick('active') } buttonClass="button banners__button--restart"  variant='outlined' noIcon loading={loadingActive}/>
                                            <AddButton label={getTranslation('Lock')} id="update-button" disabled={true} onClick={(check) => handleClick('lock') } buttonClass="button banners__button--lock"  variant='outlined' iconButton={<IconImage srcIcon={Lock} /> } loading={loadingLock}/>
                                            <AddButton label={getTranslation('Unlock')} id="update-button" onClick={(check) => handleClick('unlock') } buttonClass="button banners__button--unlock"  variant='outlined' iconButton={<IconImage srcIcon={UnLock} /> } loading={loadingUnlock}/>
                                        </>
                                        : 
                                        <>
                                            <AddButton label={getTranslation('Restart')} id="update-button"  onClick={(check) => handleClick('active') } buttonClass="button banners__button--restart"  variant='outlined' noIcon  loading={loadingActive}/>
                                            <AddButton label={getTranslation('Lock')} id="update-button" disabled={true} onClick={(check) => handleClick('lock') } buttonClass="button banners__button--lock"  variant='outlined' iconButton={<IconImage srcIcon={Lock} /> } loading={loadingLock}/>
                                            <AddButton label={getTranslation('Unlock')} id="update-button" disabled={true} onClick={(check) => handleClick('unlock') } buttonClass="button banners__button--unlock"  variant='outlined' iconButton={<IconImage srcIcon={UnLock} /> } loading={loadingUnlock}/>
                                        </>
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>        
        </>
        
    )
}

export default StatusAccount;
