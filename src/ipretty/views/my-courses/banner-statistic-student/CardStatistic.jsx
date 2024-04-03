import React, { } from 'react';
import { Grid, makeStyles, Card } from '@material-ui/core';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MyCoursesService from 'ipretty/services/MyCoursesService';
import { useAuth } from 'ipretty/context/AppProvider';
import IconImage from "ipretty/components/IconImage"
import Cap from '../../../../public/icon_svg/graduationBlu.svg'
import Test from '../../../../public/icon_svg/TestHome1.svg'

const useStyles = makeStyles(theme => ({
    mainCardCourse: {
        display: 'flex',
        padding: '30px 23px 30px 28px',
        flex: 1,
        [theme.breakpoints.down('lg')]: {
            padding: '30px 20px 30px 20px',
        },
        [theme.breakpoints.down('md')]: {
            marginRight: '5px'
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '0'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px'
        },
        marginRight: '15px', 
        borderRadius: '8px',
        '& .card' : {
            flex: 1, 
            // padding: '28px',
            alignItems: 'center',
            display: 'flex',
            marginRight: 20,
            "& .chart-wrapper": {
                width: 120,
            },
            "& div" : {
                '& img' : {
                    minWidth: 38,
                    // marginLeft: '-5px',
                    // marginTop: '-6px'
                }
        }
        }
    },
    mainCardSurvey: {
        flex: 1,
        display: 'flex',
        padding: '30px 23px 30px 28px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '8px',
            marginTop: '0',
            marginLeft: '0px'
        },
        marginLeft: '15px', 
        borderRadius: '8px'
    },
    flexContent: {
        display: 'flex',
        width: '22.222vw',
        // height: '13.194vw',
        [theme.breakpoints.down('md')]: {
            width: '30.222vw',
            height: '17.194vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '33.222vw',
            height: '19.194vw'
        },
        [theme.breakpoints.down('xs')]: {
            width: '77.222vw',
            height: '44.194vw'
        }
    },
    card: {
        flex: 1, 
        // padding: '28px',
        alignItems: 'center',
        display: 'flex',
        marginRight: 20,
        "& .chart-wrapper": {
            width: 120,
        },
    },
    textCard: {
        // width: '45%', 
        // padding: '28px 23px 28px 0',
        flex: 1
    },
    titleCard: {
        fontSize: '14px', 
        lineHeight: '17px',
        fontWeight: '600',
        color: theme.palette.primary.colorOvewViewTitle
    },
    fontSize14: {
        fontSize: '14px',
        lineHeight: '17px'
    },
    fontSize24: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: theme.palette.primary.colorOvewViewTitle,
        marginBottom: 17,
        lineHeight: '29px'
    },
    centerLayout: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        "&:last-child": {
            marginBottom: 0
        }
    },
    noLearnOrNotPass: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#EEEEEE', 
        marginRight: '5px'
    },
    passOrLearning: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#44AD92', 
        marginRight: '5px'
    },
    isCompleted: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#064E38', 
        marginRight: '5px'
    }
}));

function CardStatistic(props) {
    const {  } = props;
    const { getTranslation } = useAuth()
    const classes = useStyles();
    const [data, setData] = React.useState({
        "courses_count": 0,
        "courses_learning_count": 0,
        "courses_completed_count": 0,
        "courses_learning_not_start_count": 0,
        "my_exam_count": 0,
        "exam_passed_count": 0,
        "exam_fail_count": 0,
        "exam_doing_and_pending_count": 0
    })

    React.useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getOverviewData()
        }
    }, [localStorage.getItem('authToken')])

    function getOverviewData() {
        MyCoursesService.getOverviewData(
            (responses) => {
                setData(responses.data.data)
            }, 
            (errors) => {
                console.log(errors)
            })
    }


    return(
        <>

            <Card className={classes.mainCardCourse}>
                <div className='card'>
                    <CircularProgressbarWithChildren
                        className="chart-wrapper"
                        value={data.courses_learning_not_start_count / (data.courses_count) * 100}
                        styles={buildStyles({
                            pathColor: "#44AD92",
                            trailColor: "#eee"
                        })}
                        strokeWidth={20}
                    >
                        <CircularProgressbarWithChildren
                            className="chart-wrapper"
                            // value={(((dataOverView.overview_course.free_courses) / ((dataOverView.overview_course.group_courses) + (dataOverView.overview_course.free_courses)))*100)}
                            value={(((data.courses_learning_count) / (data.courses_count))*100)}
                            styles={buildStyles({
                                trailColor: "transparent",
                                pathColor: "#064E38"
                            })}
                            strokeWidth={20}
                            >
                                <IconImage className="iconCap" srcIcon={Cap} />
                            </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                </div>
                <div className={classes.textCard}>
                    <div className={classes.titleCard}>{getTranslation('totalNumberOfCourses')}</div>
                    <div className={classes.fontSize24}>{data.courses_count}</div>
                    <div className={classes.centerLayout}>
                        <div className={classes.passOrLearning}></div>
                        <div className={classes.fontSize14}>{getTranslation('haventStudied')} : {data.courses_learning_not_start_count}</div>
                    </div>
                    <div className={classes.centerLayout}>
                        <div className={classes.isCompleted}></div>
                        <div className={classes.fontSize14}>{getTranslation('Learning')} : {data.courses_learning_count}</div>
                    </div>
                    <div className={classes.centerLayout}>
                        <div className={classes.noLearnOrNotPass}></div>
                        <div className={classes.fontSize14}>{getTranslation('Completed')} : {data.courses_completed_count}</div>
                    </div>
                </div>
            </Card>
            <Card className={classes.mainCardSurvey}>
                <div className={classes.card}>
                    <CircularProgressbarWithChildren
                        className="chart-wrapper"
                        value={data.exam_doing_and_pending_count / (data.my_exam_count) * 100}
                        styles={buildStyles({
                            pathColor: "#44AD92",
                            trailColor: "#eee"
                        })}
                        strokeWidth={20}
                    >
                        <CircularProgressbarWithChildren
                            className="chart-wrapper"
                            value={data.exam_passed_count / data.my_exam_count * 100}
                            styles={buildStyles({
                                trailColor: "transparent",
                                pathColor: "#064E38"
                            })}
                            strokeWidth={20}
                            >
                                <IconImage srcIcon={Test} />
                        </CircularProgressbarWithChildren>
                    </CircularProgressbarWithChildren>
                    {/* <CircularProgressbar
                        className="chart-wrapper"
                        value={data.exam_passed_count}
                        text={data.my_exam_count}
                        strokeWidth={20}
                        styles={buildStyles({
                            pathColor: "#44AD92"
                        })}
                    /> */}
                </div>
                <div className={classes.textCard}>
                    <div className={classes.titleCard}>{getTranslation('totalNumberOfTests')}</div>
                    <div className={classes.fontSize24}>{data.my_exam_count}</div>
                    <div className={classes.centerLayout}>
                        <div className={classes.passOrLearning}></div>
                        <div className={classes.fontSize14}>{getTranslation('doNot')} : {data.exam_doing_and_pending_count}</div>
                    </div>
                    <div className={classes.centerLayout}>
                         <div className={classes.isCompleted}></div>
                        <div className={classes.fontSize14}>{getTranslation('Reached')} : {data.exam_passed_count}</div>
                    </div>
                    <div className={classes.centerLayout}>
                        <div className={classes.noLearnOrNotPass}></div>
                        <div className={classes.fontSize14}>{getTranslation('notReached')} : {data.exam_fail_count}</div>
                    </div>
                </div>
            </Card>
            {/* {
                dataDashboard.map((data, index) => {
                    if(data.type === 'courses') {
                        return(
                            <Card key={index} className={classes.mainCardCourse}>
                                    <div className={classes.card}>
                                        <CircularProgressbarWithChildren
                                            className="chart-wrapper"
                                            value={(data.completed +data.learning) * 10}
                                            styles={buildStyles({
                                                pathColor: "#44AD92",
                                                trailColor: "#eee"
                                            })}
                                            strokeWidth={20}
                                        >
                                            <CircularProgressbar
                                            className="chart-wrapper"
                                            value={data.completed * 10}
                                            styles={buildStyles({
                                                trailColor: "transparent",
                                                pathColor: "#064E38"
                                            })}
                                            strokeWidth={20}
                                            text={data.showContent + '%'}
                                            />
                                        </CircularProgressbarWithChildren>
                                    </div>
                                    <div className={classes.textCard}>
                                        <div className={classes.titleCard}>Tổng số khóa học</div>
                                        <div className={classes.fontSize24}>10</div>
                                        <div className={classes.centerLayout}>
                                            <div className={classes.noLearnOrNotPass}></div>
                                            <div className={classes.fontSize14}>Chưa học : 3</div>
                                        </div>
                                        <div className={classes.centerLayout}>
                                            <div className={classes.passOrLearning}></div>
                                            <div className={classes.fontSize14}>Đang học : 4</div>
                                        </div>
                                        <div className={classes.centerLayout}>
                                            <div className={classes.isCompleted}></div>
                                            <div className={classes.fontSize14}>Đã hoàn tất : 3</div>
                                        </div>
                                    </div>
                            </Card>
                        )
                    } else if(data.type === 'surveys') {
                        return(
                            <Card key={index} className={classes.mainCardSurvey}>
                                    <div className={classes.card}>
                                        <CircularProgressbar 
                                            className="chart-wrapper"
                                            value={data.pass} 
                                            text={data.showContent + '%'}
                                            strokeWidth={20}
                                            styles={buildStyles({
                                                pathColor: "#44AD92"
                                            })}
                                        />
                                    </div>
                                    <div className={classes.textCard}>
                                        <div className={classes.titleCard}>Tổng số bài test</div>
                                        <div className={classes.fontSize24}>100</div>
                                        <div className={classes.centerLayout}>
                                            <div className={classes.passOrLearning}></div>
                                            <div className={classes.fontSize14}>Đã đạt : 60</div>
                                        </div>
                                        <div className={classes.centerLayout}>
                                            <div className={classes.noLearnOrNotPass}></div>
                                            <div className={classes.fontSize14}>Chưa đạt : 40</div>
                                        </div>
                                    </div>
                            </Card>
                        )
                    } else {
                        return ''
                    }
                })
            } */}
        </>
    )
}

export default CardStatistic;