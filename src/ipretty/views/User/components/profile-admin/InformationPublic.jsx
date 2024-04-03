import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { CardContent, Card , Grid, Typography, makeStyles} from '@material-ui/core';
import queryString from "query-string"

const useStyles = makeStyles(theme => ({
    contextInfo : { 
        display : "flex",
        position : "relative",
        flex : 1,
        '& .contentInfo__content--info' : {
            width : '100%',
           '& .contentInfo__content--card__left' : {
               width : '100%',
               height : '100%',
            },
            "& .cardContent" : {
                padding : '24px',
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
                    '& .valueUserTitle' : {
                        padding : '0 10px',
                        color : '#27384C !important',
                        fontWeight : 400,
                        fontSize : "16px",
                    },
                }, 
                '& .userDetailEmail' : {
                    display : 'flex',
                    paddingBottom : '6px',
                    '& .userTitle' : {
                        color : '#27384C !important',
                        fontWeight : 400
                    },
                    '& .button-check' : {
                        '& img' : {
                            width: '17px',
                            paddingTop : '2px'
                        }
                    },
                    '& .valueUserTitle' : {
                        padding : '0 10px',
                        color : '#27384C !important',
                        fontWeight : 400,
                        fontSize : "16px",
                    },
                },
                '& .userDetailAbout' : {
                    display : 'flex',
                    flexDirection : 'column',
                    '& .userTitleAbout' : {
                        color : '#27384C !important',
                        fontWeight : 400,
                    },
                    '& .valueUserTitleAbout' : {
                        color : '#27384C !important',
                        fontWeight : 400,
                        fontSize : "16px",
                    },
                } 
            }, 
        },
    },
    
}))

function InformationPublic(props) {
    const classes = useStyles()
    const { dataUser , location ,isProfile} = props
    const { getTranslation } = useAuth()
    const { type } = queryString.parse(location.search)
    return (
        <>
            <div className={classes.contextInfo}>
                <Grid container  >
                    <Grid item className="contentInfo__content--info">
                        <Card className="contentInfo__content--card__left" sx={{ maxWidth: 456 }}>
                            <CardContent className="cardContent">
                                <div className="userDetail">
                                    { 
                                        isProfile 
                                         ?  
                                            (
                                                (dataUser && dataUser.role == 'user') ?
                                                    <Typography  className="title"> {getTranslation('Studentinformation')} </Typography>
                                                : 
                                                    <Typography  className="title"> {getTranslation('Staffinformation')} </Typography>
                                            ) 
                                         : <Typography  className="title"> {getTranslation(`${type}`)} </Typography> 
                                    }
                                </div>
                                <div className="userDetail">
                                    <Typography className="userTitle" >{getTranslation('Company')}:</Typography>
                                    <div>
                                        <Typography className="valueUserTitle">{dataUser && dataUser.company ? dataUser.company : ''}</Typography>
                                    </div>
                                </div>
                                <div className="userDetail">
                                    <Typography className="userTitle">{getTranslation('Position')}:</Typography>
                                    <div>
                                        <Typography className="valueUserTitle">{dataUser && dataUser.position ? dataUser.position : ''}</Typography>
                                    </div>
                                </div>
                                <div className="userDetail">
                                    
                                    <Typography className="userTitle" >{getTranslation('Department')}:</Typography>
                                    <div>
                                        <Typography className="valueUserTitle">{dataUser && dataUser.department ? dataUser.department.department_name : ''}</Typography>
                                    </div>
                                </div>
                                <div className="userDetail">
                                    <Typography className="userTitle" >{getTranslation('Gender')}:</Typography>
                                    <div>
                                        <Typography className="valueUserTitle">{dataUser && dataUser.gender ? dataUser.gender : ''}</Typography>
                                    </div>
                                </div>
                                <div className="userDetail">
                                    <Typography className="userTitle" >{getTranslation('Code')}:</Typography>
                                    <div >
                                        <Typography className="valueUserTitle">{dataUser && dataUser.code ? dataUser.code : ''}</Typography>
                                    </div>
                                </div>
                                {
                                    (dataUser && dataUser.isTeacher === true) ?
                                        <>
                                            <div className="userDetail">
                                                <Typography className="userTitle" >{getTranslation('numberofcoursesbeingtaught')}:</Typography>
                                                <div>
                                                    <Typography className="valueUserTitle">
                                                        {dataUser && dataUser.courses_teaching ? dataUser.courses_teaching.length : ''}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="userDetailAbout">
                                                <Typography className="userTitleAbout" >About:</Typography>
                                                <div>
                                                    <Typography className="valueUserTitleAbout">
                                                        {dataUser && dataUser.about ? dataUser.about : ''}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </>
                                    : (
                                        ''
                                    ) 
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default InformationPublic