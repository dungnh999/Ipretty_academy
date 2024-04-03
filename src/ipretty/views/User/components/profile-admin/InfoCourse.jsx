import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { CardContent, Card , Grid, Typography, makeStyles , withStyles} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import CourseItem from '../CourseItem'
import queryString from "query-string"
import Skeleton from 'ipretty/components/Skeleton';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#6F9396',
    },
  }))(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    contextInfo : { 
        '& .contentInfo__content--password' : {
            width : '100%',
            '& .contentInfo__content--card__right' : {
                width : '100%',
                fontFamily : "San Francisco Text",
                '& .cardContent' : {
                    padding : '24px',
                    '& .userDetail' : {
                        display: 'flex',
                        padding: '0 0 6px',
                        '& .title' : {
                            fontWeight : 700,
                            fontSize : "20px",
                            color : '#27384C',
                            paddingBottom : "34px",
                        },
                        '& .userTitle' : {
                            color : '#27384C !important',
                            fontWeight : 400
                        },
                    },
                    "& .relatedCourse__content" : {
                        flexDirection : 'column',
                    },
                    "& .context" : {
                        alignItems : "center",
                        paddingBottom : "18px",
                        "& .course_name" : {
                            fontSize : "18px",
                            color : '#27384C',
                            [theme.breakpoints.down("sm")]: {
                                fontSize : "16px",
                            },
                        },
                        "& .percent_finish" : {
                            "& .percent_finish--determinate" : {
                                paddingRight : '34px',
                            },
                            "& .valueProgress" : {
                                fontSize : 12,
                            }
                        }
                    }
                },
            }
        },
    }
}))

function InfoCourse(props) {
    const classes = useStyles()
    const { dataUser , location , isProfile , loading} = props
    const { getTranslation } = useAuth()
    const { type } = queryString.parse(location.search)

    return (
        <>
            <div className={classes.contextInfo}>
                <Grid container>
                    { 
                        loading ? 
                            <Skeleton type="table" />
                         :
                        <Grid item className="contentInfo__content--password" >
                            <Card className="contentInfo__content--card__right">
                                <CardContent className="cardContent">
                                {
                                    (dataUser && dataUser.isTeacher === true && type === 'TeacherInformation') ?
                                        <>
                                            <div className="userDetail">
                                                <Typography  className="title"> {getTranslation('courseisbeingtaught')} </Typography> 
                                            </div>
                                            {
                                                <Grid className="relatedCourse__content" container>
                                                {
                                                    dataUser &&  dataUser.courses_teaching && dataUser.courses_teaching.length > 0 ? dataUser.courses_teaching.map((course, index) => {
                                                        return(
                                                            <Grid key={index}>
                                                                <CourseItem
                                                                    course={course}
                                                                />
                                                            </Grid>
                                                        )
                                                    }) : ''
                                                } 
                                            </Grid>
                                            }
                                        </>
                                    : (
                                        <>
                                            <div className="userDetail">
                                                    <Typography  className="title"> {getTranslation('coursebeingstudied')} </Typography>      
                                            </div>
                                            {
                                                dataUser && dataUser.courses_learning && dataUser.courses_learning.length > 0 ? dataUser.courses_learning.map((item , index) => {
                                                    return( 
                                                        <Grid container className="context" key={index}>
                                                            <Grid item xs={6} md={6} sm={6} lg={6} className="course_name">
                                                                    {item.course_name}
                                                            </Grid>
                                                            <Grid item xs={6} md={6} sm={6} lg={6} className="percent_finish">
                                                                <Grid container>
                                                                    <Grid item xs={2} md={5} sm={5} lg={5} className="percent_finish"></Grid>
                                                                    <Grid item xs={3} md={1} sm={1} lg={1} className="valueProgress">
                                                                        <div className="valueProgress">{item.percent_finish}{''}%</div>
                                                                    </Grid>
                                                                    <Grid item xs={7} md={6} sm={6} lg={6} className="percent_finish--determinate">
                                                                        <BorderLinearProgress variant="determinate" value={item.percent_finish} />
                                                                    </Grid>
                                                                </Grid> 
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }) : ''
                                            }
                                        </>
                                    ) 
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

export default InfoCourse