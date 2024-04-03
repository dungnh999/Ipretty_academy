import React, { useEffect, useRef, useState } from 'react';
import { Grid, makeStyles, Box, Paper, LinearProgress, Typography, Avatar } from '@material-ui/core';
import useRouter from "use-react-router";
import useNavigator from 'ipretty/hook/useNavigator';
// icons
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
// components import
import Search from '../../components/Search';
import LessonsInDetailCourse from '../detail-course/components/LessonsInDetailCourse';
import Lesson from './Lesson';
import Survey from './Survey';
// context
import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';
import { useAuth } from 'ipretty/context/AppProvider';
// services
import MyCoursesService from 'ipretty/services/MyCoursesService';
import SurveyService from 'ipretty/services/SurveyService';
// lib
import queryString from "query-string"
import contextHelper from 'ipretty/helpers/contextHelper';
import Dialog from 'ipretty/components/Dialog/Dialog';
import Bro from 'public/icon_svg/bro.svg'
import { withQueryStr } from 'ipretty/helpers/contextHelper'
import CourseService from 'ipretty/services/CourseService'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        height: '80px',
        width: '100%',
        backgroundColor: '#DADFD9',
        '& .root__header': {
            display: 'flex',
            alignItems: 'center',
            padding: '25px 0px 0px 88.44px',
            [theme.breakpoints.down('md')]: {
                padding: '23px 0px 0px 21px'
            },
            [theme.breakpoints.down('sm')]: {
                padding: '23px 0px 0px 21px'
            },
            [theme.breakpoints.down('xs')]: {
                padding: '0px 0px 0px 50px'
            },
            '& .root__header__action': {
                paddingTop: '7px',
                color: theme.palette.primary.colorOvewViewTitle,
                cursor: 'pointer'
            },
            '& .root__header__text': {
                fontFamily: 'San Francisco Text',
                fontSize: '24px',
                textTransform: 'uppercase',
                [theme.breakpoints.down('md')]: {
                    fontSize: '20px',
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: '16px'
                },
                [theme.breakpoints.down('xs')]: {
                    fontSize: '13px'
                },
                color: theme.palette.primary.colorOvewViewTitle,
                fontWeight: 'bold'
            }
        },
        '& .root__preOrNex': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '22px 93px 22px 0px',
            [theme.breakpoints.down('md')]: {
                padding: '20px 50px 20px 0px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '20px 50px 20px 0px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '0px 5px 0px 5px',
            },
            '& .root__preOrNex__paddingRight': {
                paddingRight: '36px',
                [theme.breakpoints.down('xs')]: {
                    paddingRight: '90px',
                },
                "&.root__preOrNex__action": {
                    paddingRight: '18px',
                },
                "& .MuiTextField-root .MuiInput-root": {
                    minWidth: 300,
                    [theme.breakpoints.down('lg')]: {
                        minWidth: 200,
                    },
                }
            },
            '& .root__preOrNex__action': {
                paddingTop: '7px',
                color: theme.palette.primary.colorOvewViewTitle,
                cursor: 'pointer'
            },
            '& .root__preOrNex__title': {
                fontSize: '20px',
                cursor: 'pointer',
                [theme.breakpoints.down('md')]: {
                    fontSize: '15px',
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: '15px',
                },
                [theme.breakpoints.down('xs')]: {
                   display: 'none'
                },
                fontWeight: 'bold',
                fontFamily: 'San Francisco Text',
                color: theme.palette.primary.colorOvewViewTitle,
                paddingRight: '18px'
            },
            "& .flexDisplay": {
                display: 'flex',
                alignItems: 'center',
                [theme.breakpoints.down('xs')]: {
                   paddingBottom : '20px'
                 },
                "&.disabled": {
                    "& .root__preOrNex__title": {
                        color: 'rgb(57 91 101 / 80%)',
                        cursor: 'not-allowed'
                    },
                    "& .MuiSvgIcon-fontSizeSmall": {
                        fill: 'rgb(57 91 101 / 80%)',
                        cursor: 'not-allowed'
                    }
                }
            }
        },
    },
    searchCourse: {
        position: 'relative',
        "& .search": {
            padding: 8,
            marginTop: 10,
            borderRadius: '10px',
            position: 'absolute',
            minWidth: 300,
            [theme.breakpoints.down('lg')]: {
                minWidth: 200,
            },
            maxHeight: '200px',
            background: '#FFFFFF',
            zIndex: '100',
            "& .poper-seacher": {
                maxHeight: 192,
                overflow: 'scroll',
                "& .poper-seacher__item": {
                    marginTop: 10,
                    display: 'flex',
                    "&:hover": {
                        cursor: 'pointer'
                    },
                    "& .poper-seacher__item--icon": {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    "& .poper-seacher__item--name": {
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '700'
                    }
                }
            }
        }
    },
    sidebar__content: {
        "& .MuiBox-root": {
            height: '100%'
        },
        "& .MuiPaper-root": {
            height: '100%',
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
        },
    },
    actionDialog: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        "& .MuiButton-root": {
            padding: '12px 32px',
            fontSize: 16,
            lineHeight: '16px',
            marginBottom: 14
        }
    },
    backGround: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        "& .MuiAvatar-img": {
            width: '100%',
            maxWidth: '100%'
        }
    },
    contentDialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // padding: '0px 100px',
        "& .contentDialog--title": {
            marginBottom: 18,
            textAlign: 'center',
            "& .MuiTypography-root": {
                fontFamily: 'San Francisco Display',
                fontSize: 32,
                lineHeight: '38px',
                color: '#000'
            },
        },
        "& .contentDialog--image": {
            marginBottom: 18,
            textAlign: 'center',
            "& img": {
                width: 346,
                height: 184,
                objectFit: 'cover'
            },
        },
        "& .contentDialog--text": {
            marginBottom: 12,
            textAlign: 'center',
            "& .MuiTypography-root": {
                fontSize: 20,
                lineHeight: '28px',
                color: '#000'
            },
        },
        "& .contentDialog--courseName": {
            // marginBottom: 12,
            textAlign: 'center',
            "& .MuiTypography-root": {
                fontFamily: 'San Francisco Text Bold',
                fontSize: 24,
                lineHeight: '32px',
                color: '#27384C'
            },
        },
        "& .skeleton_wrapper": {
            padding: '10px 0',
            "&.button_skeleton": {
                display: 'flex',
                justifyContent: 'center',
            }
        },
    },
    loadingClass: {
        color: 'rgba(0, 0, 0, 0.26)'
    }
}));

function LessonOrSurveyStudent(props) {
    const { match } = props;
    const { course_id, lesson_id, survey_id } = match.params;
    const { dataCourse, updateDataDetailCourse, getLessonById, getSurveyStudentWorked } = useLessonSurvey();
    const { getTranslation } = useAuth();
    const wrapperRef = useRef(null)
    const { courseInfo, teacherInfo, listChapterLesson, dataLessonById, dataSurveyWorked } = dataCourse;
    const { location: { search } } = useRouter();
    const { chapterIndex, chapterItemIndex } = queryString.parse(search);
    const navigate = useNavigator();
    const classes = useStyles();
    const [checkSurveyWorked, setCheckSurveyWorked] = useState(null);
    const [openCompleted, setOpenCompleted] = useState({
        open: false,
        course_name: "",
    })
    let history = useHistory()
    const { renderAvatar } = contextHelper
    const [loadingButton, setLoadingButton] = useState(false)
    useEffect(() => {
        if (course_id) {
            getDetailMyCourse(course_id);
        }
    }, []);

    // window.addEventListener('click', ({ target }) => {
    //     setSearchData([])
    // });

    useEffect(() => {
        if (course_id && survey_id) {
            const data = new FormData();
            data.append('course_id', course_id);
            data.append('survey_id', survey_id);
            SurveyService.getSurveyWorked(data, (responses) => getSuccess(responses), (errors) => getError(errors));
        }
    }, [survey_id])

    const getSuccess = (responses) => {
        if (responses && responses.data && responses.data.success) {
            setCheckSurveyWorked('yes');
            getSurveyStudentWorked({ chapterIndex, chapterItemIndex, result_survey: responses.data.data });
        }
    };

    const getError = (errors) => {
        setCheckSurveyWorked('no');
    };

    const getDetailMyCourse = (idCourse) => {
        MyCoursesService.getDetailCourseNew(idCourse, (responses) => getDetailMyCourseSuccess(responses), (errors) => getDetailMyCourseError(errors));
    };

    const getDetailMyCourseSuccess = (responses) => {
        if (responses && responses.data && responses.data.data) {   
            setOpenCompleted({
                ...openCompleted,
                open: responses.data.data.isCompletedCourse && !responses.data.data.isConfirmNotice,
                course_name: responses.data.data.course_name,
            })
            updateDataDetailCourse(responses.data.data);
            if (chapterIndex && chapterItemIndex) {
                getDetailItemFollowIndex(+chapterIndex, +chapterItemIndex);
            }
        };
    };

    const getDetailMyCourseError = (errors) => { };

    const getDetailItemFollowIndex = (chapterIndex, chapterItemIndex) => {
        getLessonById({ chapterIndex, chapterItemIndex });
    };

    const backDetailCourse = () => {
        navigate(`/detail-course/${course_id}`);
    };

    const next = () => {
        const { lesson_id_next, survey_id_next, index_chapter_next, index_item_next } = dataLessonById
        if (lesson_id_next) {
            navigate(`/detail-course/${course_id}/lesson/${+lesson_id_next}?chapterIndex=${+index_chapter_next}&chapterItemIndex=${+index_item_next}`)
        }
        if (survey_id_next) {
            navigate(`/detail-course/${course_id}/survey/${+survey_id_next}?chapterIndex=${+index_chapter_next}&chapterItemIndex=${+index_item_next}`)
        }
        if ((index_chapter_next && index_item_next) || index_chapter_next === 0 || index_item_next === 0) {
            getLessonById({ chapterIndex: +index_chapter_next, chapterItemIndex: +index_item_next })
        }
    };

    const pre = () => {
        const { lesson_id_pre, survey_id_pre, index_chapter_pre, index_item_pre } = dataLessonById
        if (lesson_id_pre) {
            navigate(`/detail-course/${course_id}/lesson/${+lesson_id_pre}?chapterIndex=${+index_chapter_pre}&chapterItemIndex=${+index_item_pre}`)
        }
        if (survey_id_pre) {
            navigate(`/detail-course/${course_id}/survey/${+survey_id_pre}?chapterIndex=${+index_chapter_pre}&chapterItemIndex=${+index_item_pre}`)
        }
        if ((index_chapter_pre && index_item_pre) || index_chapter_pre === 0 || index_item_pre === 0) {
            getLessonById({ chapterIndex: +index_chapter_pre, chapterItemIndex: +index_item_pre })
        }
    };

    const confirmCompleted = (e) => {
        e.preventDefault();
        setLoadingButton(true)
        // return 0
        const data = new FormData();
        data.append('course_id', course_id);

        MyCoursesService.confirmNotice(data,
            (res) => {
                setOpenCompleted({
                    ...openCompleted,
                    open: false
                })
                navigate(`/detail-course/${course_id}/completed`)
            },
            (error) => {
                setLoadingButton(false)
            })
    }

    const [searchData, setSearchData] = useState([])

    function handleSearch(value, fieldName, event) {
        let obj = {
            'keyword': value
        }
        CourseService.searchCourse(
            obj,
            res => {
                let response = res.data.data
                setSearchData(response)
            },
            err => {

            }
        )
        // setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    function redirectCourse(e, courseId) {
        history.push(`/detail-course/${courseId}`)
    }

    function finishLesson(course_name) {
        setOpenCompleted({
            ...openCompleted,
            open: true,
            course_name: course_name,
        })
    }

    function customNextNavigation(dataLessonById) {

        if (dataLessonById.index_chapter_next != null && (
            (dataLessonById.index_chapter_next === chapterIndex && dataLessonById.index_item_next !== chapterItemIndex) ||
            (dataLessonById.index_chapter_next !== chapterIndex && dataLessonById.index_item_next === chapterItemIndex) ||
            (dataLessonById.index_chapter_next !== chapterIndex && dataLessonById.index_item_next !== chapterItemIndex))
        ) {
            return (
                <div onClick={next} className="flexDisplay">
                    <div className="root__preOrNex__title">
                        {getTranslation('nextLesson')}
                    </div>
                    <div className="root__preOrNex__action">
                        <ArrowForwardIos fontSize="small" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flexDisplay disabled">
                    <div className="root__preOrNex__title">
                        {getTranslation('nextLesson')}
                    </div>
                    <div className="root__preOrNex__action">
                        <ArrowForwardIos fontSize="small" />
                    </div>
                </div>
            )
        }
    }

    function customPrevNavigation(dataLessonById) {
        if (dataLessonById.index_chapter_pre != null &&
            ((dataLessonById.index_chapter_pre === chapterIndex && dataLessonById.index_item_pre !== chapterItemIndex) ||
                (dataLessonById.index_chapter_pre !== chapterIndex && dataLessonById.index_item_pre === chapterItemIndex) ||
                (dataLessonById.index_chapter_pre !== chapterIndex && dataLessonById.index_item_pre !== chapterItemIndex))
        ) {
            return (
                <div onClick={pre} className="flexDisplay">
                    <div className="root__preOrNex__paddingRight root__preOrNex__action" >
                        <ArrowBackIos fontSize="small" />
                    </div>
                    <div className="root__preOrNex__title">
                        {getTranslation('previousLesson')}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flexDisplay disabled">
                    <div className="root__preOrNex__paddingRight root__preOrNex__action" >
                        <ArrowBackIos fontSize="small" />
                    </div>
                    <div className="root__preOrNex__title">
                        {getTranslation('previousLesson')}
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSearchData([])
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            <Grid container className={classes.root}>
                <Grid container item md={12} xs={12} sm={12} lg={12} xl={12}>
                    <Grid item md={6} xs={12} sm={6} lg={6} xl={6} >
                        <div className="root__header">
                            <div className="root__header__action" onClick={backDetailCourse}>
                                <ArrowBackIos fontSize="small" />
                            </div>
                            <div className="root__header__text">
                                {courseInfo.name ? contextHelper.compactText(courseInfo.name, 32) : ''}
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12} sm={6} lg={6} xl={6} >
                        <div className="root__preOrNex">
                            <div className="root__preOrNex__paddingRight">
                                <div className={classes.searchCourse}>
                                    <Search placeholder={getTranslation("SearchForUnit")} onSearch={handleSearch} />
                                    {searchData.length > 0 ? (
                                        <div className="search" ref={wrapperRef}>
                                            <div className="poper-seacher">
                                                {searchData.map((item, index) => (
                                                    <div className="poper-seacher__item" key={index} onClick={(e) => redirectCourse(e, item.course_id)}>
                                                        <div className="poper-seacher__item--icon">
                                                            <Avatar
                                                                variant="square"
                                                                className={classes.backGround}
                                                                src={renderAvatar(item.course_feature_image)}
                                                            />
                                                        </div>
                                                        <div className="poper-seacher__item--name">
                                                            {item.course_name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                            {
                                customPrevNavigation(dataLessonById)
                            }

                            <div className="root__preOrNex__title">
                                .
                            </div>
                            {
                                customNextNavigation(dataLessonById)
                            }

                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={4} xs={12} sm={12} lg={4} xl={4} className={classes.sidebar__content}>
                    <Box style={{
                        width: '100%',
                    }}>
                        <Paper elevation={1} >
                            {
                                listChapterLesson && listChapterLesson.length && listChapterLesson.length > 0 ?
                                    <LessonsInDetailCourse
                                        listLesson={listChapterLesson}
                                        course_id={course_id}
                                        from="lessonOrSurvey"
                                        search={search}
                                        getDetailItemFollowIndex={getDetailItemFollowIndex}
                                    /> : ''
                            }
                        </Paper>
                    </Box>
                </Grid>
                <Grid item md={8} xs={12} sm={12} lg={8} xl={8}>
                    {
                        lesson_id ? (
                            <Lesson
                                dataLessonById={dataLessonById}
                                teacherInfo={teacherInfo}
                                getTranslation={getTranslation}
                                course_id={course_id}
                                lesson_id={lesson_id}
                                chapterIndex={chapterIndex}
                                chapterItemIndex={chapterItemIndex}
                                getLessonById={getLessonById}
                                finishLesson={finishLesson}
                            />
                        ) : checkSurveyWorked == 'yes' ? (
                            <Survey
                                dataLessonById={dataSurveyWorked}
                                getTranslation={getTranslation}
                                survey_id={survey_id}
                                course_id={course_id}
                                navigate={navigate}
                                chapterIndex={chapterIndex}
                                chapterItemIndex={chapterItemIndex}
                            />
                        ) : checkSurveyWorked == 'no' ? (
                            <Survey
                                dataLessonById={dataLessonById}
                                getTranslation={getTranslation}
                                survey_id={survey_id}
                                course_id={course_id}
                                navigate={navigate}
                                chapterIndex={chapterIndex}
                                chapterItemIndex={chapterItemIndex}
                            />
                        ) : ''
                    }
                </Grid>
                {
                    openCompleted.open && (
                        <Dialog
                            maxWidth="sm"
                            open={openCompleted.open}
                            actionLabel={getTranslation("Confirm")}
                            action={confirmCompleted}
                            onClose={confirmCompleted}
                            noIcon={true}
                            getTranslation={getTranslation}
                            noButton
                            className={classes.actionDialog}
                            loadingButton={loadingButton}
                            loadingClass={classes.loadingClass}
                            primary
                        >
                            <div className={classes.contentDialog}>
                                {openCompleted.course_name ? (
                                    <>
                                        <div className="contentDialog--title">
                                            <Typography>
                                                {getTranslation("Congratulations")}
                                            </Typography>
                                        </div>
                                        <div className="contentDialog--image">
                                            <img src={Bro} />
                                        </div>
                                        <div className="contentDialog--text">
                                            <Typography>
                                                {getTranslation("Youhavesuccessfullycompletedthecourse")}
                                            </Typography>
                                        </div>
                                        <div className="contentDialog--courseName">
                                            <Typography>
                                                {openCompleted.course_name}
                                            </Typography>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="skeleton_wrapper">
                                            <Skeleton type="text" />
                                        </div>
                                        <div className="skeleton_wrapper">
                                            <Skeleton type="contactCard" height={184} />
                                        </div>
                                        <div className="skeleton_wrapper">
                                            <Skeleton type="text" />
                                        </div>
                                        <div className="skeleton_wrapper button_skeleton">
                                            <Skeleton type="button" />
                                        </div>
                                    </>
                                )}
 
                            </div>
                        </Dialog>
                    )
                }
            </Grid>
        </>
    )
}

export default LessonOrSurveyStudent
