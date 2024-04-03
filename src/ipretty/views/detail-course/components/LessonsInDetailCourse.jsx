import React, {  } from 'react';
import { Grid, makeStyles, Divider, Typography  } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useNavigator from 'ipretty/hook/useNavigator';
import queryString from "query-string"
import { useAuth } from 'ipretty/context/AppProvider';
import LessonDoneIcon from '../../../../public/icons_ipretty/Done.svg'
import LessonLearnIcon from '../../../../public/icons_ipretty/Play.svg'
import SurveyWorkIcon from '../../../../public/icons_ipretty/Test.svg'
import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';
import contextHelper from 'ipretty/helpers/contextHelper'
import Spacer from 'ipretty/components/Spacer';
import classNames from "classnames";
import CourseService from 'ipretty/services/CourseService';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import SVG from "react-inlinesvg";

const useStyles = makeStyles(theme => ({
    item_wrapper: {
        borderBottom: '1px solid #DADFD9',
        [theme.breakpoints.down('lg')]: {
            padding: '0 20px 30px 25px'
        },
        [theme.breakpoints.down('sm')]: {

        },
        [theme.breakpoints.down('xs')]: {

        },
        padding: '0 43px 0 56px',
        "&.view__lesson": {
            [theme.breakpoints.down('lg')]: {
                padding: '0 20px 30px 25px'
            },
            [theme.breakpoints.down('sm')]: {

            },
            [theme.breakpoints.down('xs')]: {

            },
            padding: '0 56px 0 80px',
            '& .lessonInDetailCourse__content__parentItem': {
                paddingLeft: '33px',
                paddingRight: '0',
                [theme.breakpoints.down('lg')]: {
                    paddingLeft: '20px',
                    paddingRight: '0',
                },
                [theme.breakpoints.down('md')]: {
                    paddingLeft: '16px',
                    paddingRight: '0',
                },
                [theme.breakpoints.down('xs')]: {
                },
            }
        },
        "& .MuiCollapse-wrapperInner": {
            marginBottom: '19px'
        },
        '& .lessonInDetailCourse__content__parentItem': {
            paddingLeft: '62px',
            paddingRight: '72px',

            [theme.breakpoints.down('lg')]: {
                paddingLeft: '40px',
                paddingRight: '46px',
            },
            [theme.breakpoints.down('md')]: {
                paddingLeft: '0px',
                paddingRight: '50px !important',//Chi tiết khóa học, Lịch trình bài học
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: '0px',
                paddingRight: '50px !important',//Chi tiết khóa học, Lịch trình bài học
            },
            '& .lessonInDetailCourse__content__item': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                wordBreak: 'break-word',
                 [theme.breakpoints.down('md')]: {
                    wordBreak: 'normal',
                        },//fix bug 6 lich trinh khoa hoc tu xuong hàng
                "& .content__item--name": {
                    flex: 6,
                    "& .MuiListItem-root.MuiListItem-gutters": {
                        alignItems: 'flex-start'
                    },
                    "& .icon-status-lesson": {
                        display: 'flex',
                        margin: '4px 0'
                    },
                    "& .content__item--selected": {
                        background: 'transparent',
                        "& svg path": {
                            stroke: theme.palette.primary.colorHoverButton
                        },
                        "& .MuiTypography-root": {
                            color: theme.palette.primary.colorHoverButton
                        }
                    }
                },
                "& .content__item--duration": {
                    flex: 2,
                    margin: '4px 0',
                    display: 'flex',
                    justifyContent: 'flex-end'
                },
                '& .lessonInDetailCourse__content__item__chapterItemTitle': {
                    "& .MuiListItemText-primary:hover": {
                        color: theme.palette.primary.colorHoverButton,
                    },
                    '& .MuiListItemText-primary': {
                        fontSize: '15px',
                        color: theme.palette.primary.colorNameLesson,
                        cursor: 'pointer',
                        [theme.breakpoints.down('md')]: {
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '12px',
                        },
                        [theme.breakpoints.down('xs')]: {
                        },
                    },
                    marginLeft: '9px'
                },
                '& .lessonInDetailCourse__content__item__color': {
                    '& span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock': {
                        color: theme.palette.primary.colorHoverButton,
                    }
                },
                '& .lessonInDetailCourse__content__item__timer': {
                    textAlign: 'right',
                    padding: '10px 0',
                    lineHeight: '16px',
                    fontSize: '12px',
                    [theme.breakpoints.down('xs')]: {
                        wordBreak: 'normal',//fix bug 6
                    },
                    color: theme.palette.primary.colorNameLesson
                }
            }
        }
    },
    lessonInDetailCourse:{
        fontFamily: 'San Francisco Text',
        padding: '16px 0 32px 0',
        '& .lessonInDetailCourse__calendar': {
            [theme.breakpoints.down('lg')]: {
                padding: '0 20px 0 25px'
            },
            [theme.breakpoints.down('sm')]: {

            },
            [theme.breakpoints.down('xs')]: {

            },
            padding: '0 43px 0 56px',
            fontFamily: 'San Francisco Text Bold',
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '28px',
            // marginBottom: ,
            color: theme.palette.primary.colorOvewViewTitle
        },
        '& .lessonInDetailCourse__content': {

            maxHeight: '859px',
            overflow: 'auto',
            "&.view__lesson_content": {
                minHeight: 'calc(100vh - 5.6875rem - 130px)',
                maxHeight: 'none',
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'auto',//fix khoang trang bug 62
                },
                [theme.breakpoints.down('xs')]: {
                    minHeight: 'auto',//fix khoang trang bug 62
                },
            },
            // paddingTop: '8px',
            '& li.MuiListItem-root.MuiListItem-gutters': {
                paddingLeft: '0px !important',
                paddingRight: '0px !important',
                alignItems: 'flex-start'
            },
            '& .lessonInDetailCourse__content__titleChapter': {
                flex: 6,
                marginTop: 0,
                marginBottom: 0,
                '& .MuiListItemText-primary': {
                    fontFamily: 'San Francisco Text Bold',
                    fontSize: '20px', 
                    cursor: 'pointer',
                    color: theme.palette.primary.colorOvewViewTitle,
                    [theme.breakpoints.down('md')]: {
                    },
                    [theme.breakpoints.down('sm')]: {
                        // fontSize: '12px', 
                    },
                    [theme.breakpoints.down('xs')]: {
                    },
                }
            },
            '& .lessonInDetailCourse__content__action': {
                flex: 3,
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                '& .lessonInDetailCourse__content__action__lesson': {
                    marginRight: 30,
                    fontFamily: 'San Francisco Text Bold',
                    fontSize: '20px',
                    fontWeight: 'bold', 
                    color: theme.palette.primary.colorOvewViewTitle,
                    [theme.breakpoints.down('lg')]: {
                        marginRight: 7,
                    },
                    [theme.breakpoints.down('sm')]: {
                        // fontSize: '12px', 
                        marginRight: 14,
                    },
                    [theme.breakpoints.down('xs')]: {
                    },
                },
                '& .lessonInDetailCourse__content__action__button': {
                    // padding: '10px 0px 0px 10px'
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                }
            },
        }
    }
}));

function LessonsInDetailCourse(props) {
    const { listLesson, course_id, from, search, getDetailItemFollowIndex } = props;
    const { openChapter } = useLessonSurvey();
    const { getTranslation } = useAuth();
    const classes = useStyles();
    const navigate = useNavigator();
    const { makeShortMessage } = useNotiStackContext();
    let index_chapter = undefined;
    let index_chapterItem = undefined;

    if(search) {
        const { chapterIndex, chapterItemIndex } = queryString.parse(search);
        index_chapter = chapterIndex;
        index_chapterItem = chapterItemIndex;
    };

    const redirectDetail = (chapterItem, indexChapter, indexChapterItem) => {
        if(chapterItem.survey_id) {
            checkIsJoinCourse(
                course_id,
                (res) => {
                    navigate(`/detail-course/${course_id}/survey/${chapterItem.survey_id}?chapterIndex=${indexChapter}&chapterItemIndex=${indexChapterItem}`);
                }
                )
        } else {
            checkIsJoinCourse(
                course_id, 
                (res) => {
                    navigate(`/detail-course/${course_id}/lesson/${chapterItem.id}?chapterIndex=${indexChapter}&chapterItemIndex=${indexChapterItem}`);
                    }
                )
        }
        if(from && from === 'lessonOrSurvey') {
            if(indexChapterItem != index_chapterItem || index_chapter != indexChapter) {
                getDetailItemFollowIndex(indexChapter, indexChapterItem);
            }
        }
    };

    function checkIsJoinCourse (course_id, callback) {
        CourseService.checkJoinCourse(course_id, (responses) => callback(responses), (errors) => handleError(errors))
    }

    const handleError = (err) => {
        makeShortMessage(err.response.data.message, "error");
    };

    const handleClick = (chapterIndex) => {
        openChapter(chapterIndex);
    };

    const checkRenderIcon = (chapterItem) => {
        if(chapterItem.survey_title) {
            if(chapterItem.isPassed) {
                return(
                    <div 
                    className="icon-status-lesson"
                    className={classNames("icon-status-lesson", {
                        
                    })}
                    >
                        <SVG src={LessonDoneIcon} height="22px" width="22px" />
                        {/* <img alt="icon" height="22px" width="22px" src={LessonDoneIcon} /> */}
                    </div>
                )
            } else {
                return(
                    <div className="icon-status-lesson">
                        <SVG src={SurveyWorkIcon} height="22px" width="22px" />
                        {/* <img alt="icon" height="22px" width="22px" src={SurveyWorkIcon} /> */}
                    </div>
                )
            }
        } else {
            if(chapterItem.isPassed) {
                return(
                    <div className="icon-status-lesson">
                        <SVG src={LessonDoneIcon} height="22px" width="22px" />
                        {/* <img alt="icon" height="22px" width="22px" src={LessonDoneIcon} /> */}
                    </div>
                )
            } else {
                return(
                    <div className="icon-status-lesson">
                        <SVG src={LessonLearnIcon} height="22px" width="22px" />
                        {/* <img alt="icon" height="22px" width="22px" src={LessonLearnIcon} /> */}
                    </div>
                )
            }
        }
    }

    function getNumberOfLessons (chapter_items) {
        let lessons = chapter_items.length && chapter_items.filter(item => item.lesson_name);
        return lessons.length
    }

    function formatForLesson(chapter_item, indexChapterItem) {
        if (chapter_item.lesson_id) {
            return getTranslation("Bài") + ' ' + (indexChapterItem + 1) + ': ' + chapter_item.chapter_item_name
        }else {
            return chapter_item.chapter_item_name

        }
    }

    return(
        <div className={classes.lessonInDetailCourse}>
            {
                from && from === 'lessonOrSurvey' ? '' :
                    <div className="lessonInDetailCourse__calendar">
                        { getTranslation('lessonSchedule').toUpperCase() }
                    </div>
            }
            <div  
                className={classNames("lessonInDetailCourse__content", {
                    "view__lesson_content": props.from === 'lessonOrSurvey',
                })}>
                {
                    listLesson && listLesson.length && listLesson.length > 0 &&
                    listLesson.map((chapter, indexChapter) => {
                        return(
                            <div key={indexChapter} 
                                className={classNames(classes.item_wrapper, {
                                    "view__lesson": props.from === 'lessonOrSurvey',
                                })}
                                >
                                <List
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListItem onClick={() => handleClick(indexChapter)}>
                                        <ListItemText className="lessonInDetailCourse__content__titleChapter" primary={`${getTranslation('Chapter')} ${indexChapter + 1} : ${chapter.chapter_name}`} />
                                        <Spacer />
                                        <div className="lessonInDetailCourse__content__action">
                                            <Typography className="lessonInDetailCourse__content__action__lesson" display="block">
                                                {props.from !== 'lessonOrSurvey' && chapter.lessons && chapter.lessons.length ? `${getNumberOfLessons(chapter.chapter_items)} ${getTranslation('lecture')}` : ""}
                                            </Typography>
                                            <div className="lessonInDetailCourse__content__action__button">
                                                {chapter.status ? <ExpandLess /> : <ExpandMore />}
                                            </div>
                                        </div>
                                    </ListItem>
                                    <Collapse in={chapter.status} timeout="auto" unmountOnExit>
                                        {
                                            chapter.chapter_items.map((chapter_item, indexChapterItem) => {
                                                // console.log(chapter_item)
                                                return(
                                                    <List onClick={() => redirectDetail(chapter_item, indexChapter, indexChapterItem)} className="lessonInDetailCourse__content__parentItem" key={indexChapterItem} component="div" disablePadding>
                                                        <div className="lessonInDetailCourse__content__item">
                                                            <div className="content__item--name">
                                                                <ListItem sx={{ pl: 4 }}
                                                                    selected={(index_chapter && index_chapter == indexChapter) && (index_chapterItem && index_chapterItem == indexChapterItem)}
                                                                    classes={{ selected: "content__item--selected" }}
                                                                >
                                                                    { checkRenderIcon(chapter_item) }
                                                                    <ListItemText className="lessonInDetailCourse__content__item__chapterItemTitle" primary={`${formatForLesson(chapter_item, indexChapterItem)}`} />
                                                                </ListItem>
                                                            </div>
                                                            <Spacer />
                                                            <div className="content__item--duration">
                                                                <div className="lessonInDetailCourse__content__item__timer">
                                                                    {chapter_item.timer ? contextHelper.convertTommss(chapter_item.timer) : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </List>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </List>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LessonsInDetailCourse;