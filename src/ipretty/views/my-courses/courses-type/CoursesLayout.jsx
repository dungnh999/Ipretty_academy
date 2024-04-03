import React, { } from 'react';
import { Grid, makeStyles, Button, CardActionArea, CardActions, 
        Typography, CardMedia, CardContent, Card, Avatar, LinearProgress } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import useNavigator from 'ipretty/hook/useNavigator';
import contextHelper from 'ipretty/helpers/contextHelper';
import { useAuth } from 'ipretty/context/AppProvider';
import classNames from 'classnames';

    const useStyles = makeStyles(theme => ({
    mainLayoutCourses: {
        marginTop: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '-16px',
        marginRight: '-16px',
        "& .MuiPaper-rounded": {
            borderRadius: 8,
            boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)'
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
            padding: '0 18px 3px 18px',
            flexDirection: 'column',
            alignItems: 'stretch',
            "& .MuiButton-root": {
                padding: '4px 8px'
            }
        },
        "& .teacher-name": {
            maxWidth: 'calc(100% - 32px)',
            maxHeight: '20px',
            overflow: 'hidden',
            'text-overflow': 'ellipsis',

        },
        "& .course_noData": {
            minHeight: 366,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: '16px',
            paddingRight: '16px',
            "& .wrapper_section": {
                background: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                borderRadius: 8
            },
            "& .MuiTypography-root": {
                color: theme.palette.primary.colorOvewViewTitle,
                fontSize: '20px',
                fontFamily: 'San Francisco Text Bold',
            }
        }
    },
    courseItem: {
        [theme.breakpoints.down('md')]: {

        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '50%',
            minWidth: '50%',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            minWidth: '100%',
        },
        flex: 1,
        padding: '0 16px',
        maxWidth: '25%',
        minWidth: '25%',
        marginBottom: 32,
        "& .MuiCardMedia-media": {
            height: 180,
            width: '100%',
            maxWidth: '100%'
        },
        "& .process-bar": {
            marginLeft: 0
        }
    },
    courseItemStart: {
        [theme.breakpoints.down('md')]: {
            marginLeft: '0',
            marginRight: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            // paddingLeft: '5px'
        },
        flex: 1,
        marginLeft: '0',
        marginRight: '16px',
    },
    titleCourse: {
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
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
    },
    teacherCourse: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '12px',
    },
    startCourse: {
        fontWeight: '700', 
        color: '#000', 
        fontSize: '12px',
        lineHeight: '12px'
    },
    centerElement: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        "& .MuiSvgIcon-colorPrimary": {
            marginRight: 5,
            width: 15,
            height: 15
        },
    },
    betweenElement: {
        position: 'relative',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 9,
        minHeight: 29,
        '& button.MuiButtonBase-root.MuiButton-root.MuiButton-contained': {
            backgroundColor: '#DADFD9',
            color: '#395B65',
            marginRight: '-18px',
            fontWeight: 400,
            fontSize: 12,
            textTransform: 'inherit',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            minWidth: 'auto',
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
            "&.priceLabel": {
                backgroundColor: 'transparent',
                border: 'none',
                // padding: '0 16px 0 32px',
                color: '#44AD92'
            }
        },
        "& .MuiButton-contained": {
            cursor: 'default',
        }
    },
    processCourse: {
        marginBottom: '3px'
    }
}));

function CoursesLayout(props) {
    const { data, status } = props;
    const classes = useStyles();
    const navigate = useNavigator();
    const { getTranslation, user } = useAuth();
    const detailCourse = (course) => {
        if (course.student_result && course.student_result.length) {
            let myResult = course.student_result.find(result => result.student_id == user.id && result.isPassed);
            if (myResult) {
                navigate(`/detail-course/${course.course_id}/completed`);
            }else {
                navigate(`/detail-course/${course.course_id}`);
            }
        }else {
            navigate(`/detail-course/${course.course_id}`);

        }
    }

    function myLinearProcess(course) {
        if (course.student_result && course.student_result.length) {
            let myResult = course.student_result.find(result => result.student_id == user.id);
            if (myResult) {
                return myResult.percent_finish
            } else {
                return 0
            }
        } else {
            return 0

        }
    }

    return(
        <>
            <div className={classes.mainLayoutCourses}>
                {
                    data.length ? data.map((course, index) => {
                        return(
                            <div key={index} className={classes.courseItem}>
                                <Card onClick={() => detailCourse(course)}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        // height="140"
                                        image={course.course_feature_image}
                                        alt="cover image"
                                    />
                                    <CardContent>
                                        <Typography className={classes.titleCourse} color="textSecondary" gutterBottom variant="h5" component="div">
                                            {course.course_name ? contextHelper.compactText(course.course_name, 100) : ''}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" className={classes.teacherCourse} component="div">
                                            <Avatar src={course.teacher ? course.teacher.avatar : ""} />
                                            <Typography className="teacher-name" variant="subtitle2">{getTranslation('GV.')} {course.teacher.name}</Typography>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        <div className={classes.betweenElement}>
                                            <div className={classes.centerElement}>
                                                <StarIcon
                                                    color="primary"
                                                />
                                                <span className={classes.startCourse}>{course.course_rating || 0}</span>
                                            </div>
                                            <div>
                                                <Button variant="contained"
                                                    className={classNames({
                                                        "localLabel": course.course_status === "Local",
                                                        "freeLabel": course.course_status === "Free",
                                                        "groupLabel": course.course_status === "Group",
                                                        "priceLabel": course.course_status !== "Completed" && course.course_status !== "Learning" && course.course_status !== "Free" && course.course_status !== "Local" && course.course_status !== "Group",
                                                    })}
                                                >
                                                    {getTranslation(course.course_status)}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="process-bar">
                                            <LinearProgress
                                                variant="determinate"
                                                value={myLinearProcess(course)}
                                                className={classes.course_price}
                                            />
                                        </div>
                                </CardActions>

                                </Card>
                            </div>
                        )
                    }) : 
                    <div className="course_noData">
                        <div className="wrapper_section">
                            <Typography>
                                {getTranslation('noData')}
                            </Typography>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default CoursesLayout;