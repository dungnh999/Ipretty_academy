import React, {  } from 'react';
import { Typography, Box, Paper, Button, makeStyles } from '@material-ui/core';
import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';
import AnswerService from 'ipretty/services/AnswerService';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '32px 80px 32px 32px',
        [theme.breakpoints.down('lg')]: {
            // padding: '32px 40px 32px 16px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '32px',
        },
        [theme.breakpoints.down('sm')]: {
            // padding: '32px 40px 32px 16px',
        },
        [theme.breakpoints.down('xs')]: {
            // padding: '25px 15px 0px 15px'
        },
        "& .survey_wrapper": {
            padding: '32px 56px 32px 56px',
            [theme.breakpoints.down('lg')]: {
                padding: '32px 32px 32px 32px',

            },
            [theme.breakpoints.down('md')]: {
                padding: '32px',

            },
            [theme.breakpoints.down('sm')]: {
                padding: '32px 20px 32px 20px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '32px 16px 32px 16px',
            },
        },
        '& .root__title': {
            wordBreak: 'break-word',
            "& .MuiTypography-root": {
                fontFamily: 'San Francisco Display',
                fontSize: '32px',
                lineHeight: '38px',
                color: theme.palette.primary.colorOvewViewTitle,
            },
            marginBottom: '24px',
            [theme.breakpoints.down('md')]: {
                
            },
            [theme.breakpoints.down('sm')]: {
                
            },
            [theme.breakpoints.down('xs')]: {
                padding: '17px',
                fontSize: '20px', 
            },
        },
        '& .root__description': {
            // padding: '0px 32px 25px 32px', 
            wordBreak: 'break-word',
            marginBottom: 0,
            "& .MuiTypography-root": {
                fontSize: 14,
                lineHeight: '16px',
                color: theme.palette.primary.colorNameLesson
            },
            "&.final_exam": {
                marginBottom: 38,
            }
        },
        '& .root_process': {
            // padding: '0px 0px 32px 32px', 
            fontFamily: 'San Francisco Display',
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: theme.palette.primary.colorHoverButton
        },
        '& .root__end': {
            display: 'flex', 
            justifyContent: 'end',
            '& .root__end__padding': {
                // padding: '0px 32px 32px',
                marginBottom: 11,
                "& .MuiButton-contained": {
                    minWidth: 208,
                    padding: '16px 32px',
                    fontSize: 20,
                    lineHeight: '28px',
                    fontFamily: 'San Francisco Text Bold'
                }
            }
        },
        '& .root__action': {
            display: 'flex', 
            alignItems: 'center', 
            '& .root__action__rework': {
                display: 'flex', 
                justifyContent: 'end',
                [theme.breakpoints.down('md')]: {
                    justifyContent: 'center',
                },
                '& .root__action__rework__text': {
                    fontSize: '16px', 
                    fontFamily: 'San Francisco Text', 
                    fontWeight: '600', 
                },
            },
            '& .root__action__btn': {
                [theme.breakpoints.down('md')]: {
                    display: 'flex',
                    justifyContent: 'center'
                },
                [theme.breakpoints.down('xs')]: {
                    flexDirection: 'column'
                },

            },
            "&.final_exam": {
                justifyContent: 'space-between',
                [theme.breakpoints.down('xs')]: {
                    flexDirection: 'column'
                },
                '& .root__action__btn': {
                    display: 'flex',
                    alignItems: 'center',
                    [theme.breakpoints.down('md')]: {
                        justifyContent: 'center'
                    },
                    "& .root__action__rework": {
                        marginRight: 24,
                        paddingTop: 10
                    },
                    "& .MuiButton-contained": {
                        minWidth: 208,
                        padding: '16px 32px',
                        fontSize: 20,
                        lineHeight: '28px',
                        fontFamily: 'San Francisco Text Bold'
                    }
                },
                "& .redColor": {
                    color: '#C80024',
                    fontWeight: 700
                }
            }
        },
        '& .root__score': {
            padding: '0px 32px 32px 32px', 
            fontFamily: 'San Francisco Display', color: '#44AD92', fontWeight: 'bold', fontSize: '32px'
        }
    }
}));

function Survey(props) {
    const { dataLessonById, getTranslation, survey_id, course_id, navigate, chapterIndex, chapterItemIndex } = props;
    const classes = useStyles();
    const { getLessonById } = useLessonSurvey();


    const redirectWorkingSurvey = (type) => {
        if (type == 'rerun') {
            let dataSubmit = new FormData();
            dataSubmit.append('course_id', course_id);
            dataSubmit.append('survey_id', survey_id);
            AnswerService.reworkSurvey(dataSubmit, (responses) => {
                navigate(`/detail-course/${course_id}/survey/${survey_id}/working`);
                localStorage.setItem('page_number', 1);
                localStorage.setItem('chapterIndex', chapterIndex);
                localStorage.setItem('chapterItemIndex', chapterItemIndex);
            }, (errors) => {
                console.log(errors)
            });
        } else {
            navigate(`/detail-course/${course_id}/survey/${survey_id}/working`);
            localStorage.setItem('page_number', 1);
            localStorage.setItem('chapterIndex', chapterIndex);
            localStorage.setItem('chapterItemIndex', chapterItemIndex);
        }
    };

    // console.log(dataLessonById)
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

    return(
        <>
            {
                dataLessonById ?
                <div className={classes.root}>
                    <Box style={{ 
                        width: '100%',
                    }}>
                        <Paper elevation={1} className="survey_wrapper">
                            <div className="root__title">
                                <Typography variant="h1">
                                    {dataLessonById && dataLessonById.survey_title}
                                </Typography>
                            </div>
                            {
                                dataLessonById && dataLessonById.status && dataLessonById.status === 'marking' ?
                                    <>
                                    <div>
                                        <div className="root__description">
                                            <Typography>
                                                {
                                                    dataLessonById && dataLessonById.isPassed ? 
                                                    getTranslation("Bạn đã vượt qua bài kiểm tra thành công")
                                                    : 
                                                    dataLessonById && dataLessonById.rework ? 
                                                    getTranslation("Bạn chưa vượt qua bài kiểm tra")
                                                    :
                                                    getTranslation("Bạn chưa vượt qua bài kiểm tra. Vui lòng làm lại bài kiểm tra sau 24 giờ nữa")
                                                    }!
                                            </Typography>
                                        </div>
                                        <div className="root__action final_exam">
                                                <div className={`root_process ${dataLessonById && !dataLessonById.isPassed ? 'redColor' : ''} `} >
                                                {dataLessonById && dataLessonById.process} %
                                            </div>
                                            <div className="root__action__btn">
                                                {
                                                    dataLessonById && !dataLessonById.isPassed ?
                                                        <div className="root__action__rework">
                                                            <div className="root__action__rework__text">
                                                                <Button disabled={dataLessonById && !dataLessonById.rework} onClick={() => redirectWorkingSurvey("rerun")} variant="contained">{getTranslation('Làm lại kiểm tra')}</Button>
                                                            </div>
                                                        </div> : ""
                                                }
                                                {
                                                    dataLessonById && dataLessonById.index_chapter_next &&
                                                    <div className="root__action__rework">
                                                        <Button variant="contained" onClick={next}>
                                                            {getTranslation('Học bài tiếp theo')}
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                        
                                    </>
                                :
                                <>
                                    <div className="root__description final_exam">
                                        <Typography>
                                            {dataLessonById && dataLessonById.survey_description}
                                        </Typography>
                                    </div>
                                    <div className="root__end">
                                        <div className="root__end__padding">
                                            {
                                                dataLessonById && dataLessonById.survey_id &&
                                                <Button onClick={() => redirectWorkingSurvey('start')} variant="contained">{ getTranslation('startWorking') }</Button>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </Paper>
                    </Box>
                </div> : ''
            }
        </>
    )
}

export default Survey;