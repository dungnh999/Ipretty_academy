import React, {  } from 'react';
import { Grid, makeStyles, CardContent, Card, Button, CardActionArea, CardActions, 
    Typography, CardMedia, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import contextHelper from 'ipretty/helpers/contextHelper';
import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
    courseItem: {
        fontFamily: 'San Francisco Text',
        borderRadius: 8,
        boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)',
        "& .MuiCardMedia-media": {
            height: 180,
            // width: 'auto',
            maxWidth: '100%'
        },
        "& .MuiCardContent-root": {
            padding: '18px 18px 7px 18px',
            "& .MuiAvatar-root": {
                width: 24,
                height: 24,
                marginRight: 8
            }
        },
        "& .MuiCardActions-root": {
            justifyContent: 'space-between',
            padding: '0 18px 16px 18px',
            flexDirection: 'column',
            alignItems: 'stretch',
            "& .MuiButton-root": {
                padding: '4px 8px'
            }
        },
        '& .courseItem__title': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '15px'
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '15px'
            },
            fontSize: '18px',
            color: '#395B65',
            fontWeight: '700',
            lineHeight: '21px',
            marginBottom: '34px',
            minHeight: 42,
            overflow: 'hidden',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            'text-overflow': 'hidden',
            'text-overflow': 'ellipsis',
            display: '-webkit-box',
        },
        '& .courseItem__teacher': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            '& .courseItem__teacher__name': {
                fontSize: '12px',
            }
        },
        '& .courseItem__betweenElement': {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            minHeight: 29,
            "& .MuiSvgIcon-colorPrimary": {
                marginRight: 5,
                width: 15,
                height: 15
            },
            '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained': {
                backgroundColor: 'darkgrey'
            },
            '& .courseItem__betweenElement__centerElement': {
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                '& .courseItem__betweenElement__centerElement__star': {
                    fontWeight: '700', 
                    color: '#000', 
                    fontSize: '10px'
                }
            },
            '& .courseItem__betweenElement__textButton': {
                backgroundColor: '#44AD92', 
                clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%, 20% 55%)', 
                padding: '0 16px 0 32px',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '-18px',
                "&.localLabel": {
                    backgroundColor: '#44AD92',
                    clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%, 20% 55%)',
                    padding: '0 16px 0 32px',
                    color: theme.palette.background.paper
                },
                "&.freeLabel": {
                    backgroundColor: '#DC4F68',
                    clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%, 20% 55%)',
                    padding: '0 16px 0 32px',
                    color: theme.palette.background.paper
                },
                "&.groupLabel": {
                    backgroundColor: '#44AD92',
                    clipPath: 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%, 20% 55%)',
                    padding: '0 16px 0 32px',
                    color: theme.palette.background.paper
                },
                '& .courseItem__betweenElement__textButton__priceCourse': {
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: '#fff',
                }
            } 
        }
    },
    coursePrice : {
        color: '#44AD92',
        fontSize: '14px',
    }
}));

function CourseHighlightItem(props) {
    const { course } = props;
    const classes = useStyles();
    const { compactText } = contextHelper;
    const { getTranslation } = useAuth();
    const navigate = useNavigator();

    const detailCourse = (course) => {
        if (course.isPassedForCurUser) {
            navigate(`/detail-course/${course.course_id}/completed`);
        } else {
            navigate(`/detail-course/${course.course_id}`);

        }
    }
    return(
        <>
            <Card sx={{ maxWidth: 200 }} className={classes.courseItem} onClick={() => detailCourse(course)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={course.image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography className="courseItem__title" color="textSecondary" gutterBottom variant="h5" component="div">
                            {compactText(course.title, 85)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="courseItem__teacher" component="div">
                            <Avatar alt="Remy Sharp" src={course.teacher ? course.teacher.avatar : ""} />
                            <span className="courseItem__teacher__name">{getTranslation('GV.')} {course.teacher.name}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className="courseItem__betweenElement">
                        <div className="courseItem__betweenElement__centerElement">
                            <StarIcon
                                color="primary"
                            />
                            <span className="courseItem__betweenElement__centerElement__star">{course.star || 0}</span>
                        </div>
                        <div>
                            {
                                course.price == 0 ?
                                    <div className="courseItem__betweenElement__textButton">
                                        <span 
                                        // className="courseItem__betweenElement__textButton__priceCourse"
                                            className={classNames("courseItem__betweenElement__textButton__priceCourse",{
                                            "localLabel": course.course_type == "Local",
                                            "freeLabel": course.course_type === "Business",
                                            "groupLabel": course.course_type == "Group",
                                        })}
                                        >
                                            {course.course_type == "Group" ? getTranslation('Group') : course.course_type == "Local" ? getTranslation('Local') : getTranslation('Miễn phí') }</span>
                                    </div>
                                :
                                    <Typography variant="body2" className={classes.coursePrice}>{course.price ? course.price.toLocaleString('vi-VI') : 0} {course.unit_currency}</Typography>
                            }
                        </div>
                    </div>
                </CardActions>
            </Card>
        </>
    )
}

export default CourseHighlightItem;