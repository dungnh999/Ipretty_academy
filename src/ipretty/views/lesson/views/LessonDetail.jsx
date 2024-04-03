import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import React, { useEffect, useState } from 'react'
import LessonService from 'ipretty/services/LessonService'
import { useAuth } from 'ipretty/context/AppProvider'
import { makeStyles, Typography } from '@material-ui/core'
import Skeleton from 'ipretty/components/Skeleton'
import TitleRequired from 'ipretty/components/TitleRequired'

const useStyles = makeStyles(theme => ({
    root: {

    },
    lessonDetail: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },
    lessonTitle: {
        flex: 1
    },
    valueLessonTitle: {
        flex: 3
    },
}))

function LessonDetail(props) {
    const classes = useStyles()
    const id = props.match.params.id
    const { getTranslation } = useAuth()
    const links = [{ title: getTranslation('LessonManagement'), path: '/lessons' }]
    const titleCurrent = getTranslation('LessonDetail')
    const [loading, setLoading] = useState(false)
    const [lesson, setLesson] = useState()

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailLesson(id)
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    const getDetailLesson = (id) => {
        LessonService.getDetailLesson(
            id,
            res => {
                setLesson(res.data.data)
                setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }

    function redirectEdit() {
        props.history.push(`/lessons/${id}/edit`);
    }

    return (
        <DetailPage
            redirectEdit={redirectEdit}
            links={links}
            titleCurrent={titleCurrent}
        >
            <React.Fragment>
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className={classes.lesson}>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonName')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_name ? lesson.lesson_name : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonAuthor')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_author_info ? lesson.lesson_author_info.name : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonContent')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_content ? lesson.lesson_content : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonDescription')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_description ? lesson.lesson_description : ''}</Typography>
                            </div>
                        </div>
                        {/* <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonStatus')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_status ? lesson.lesson_status : ''}</Typography>
                            </div>
                        </div> */}
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonDuration')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.lesson_duration ? lesson.lesson_duration : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('MainAttachment')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                <Typography >{lesson && lesson.main_attachment_name ? lesson.main_attachment_name : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.lessonDetail}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('LessonAttachment')} required={false} />
                            </div>
                            <div className={classes.valueLessonTitle}>
                                {lesson && lesson.lesson_attachments && lesson.lesson_attachments.length > 0 && (
                                    lesson.lesson_attachments.map((lessonAttachments, index) => (
                                        <Typography key={index} >{lessonAttachments.file_name}</Typography>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        </DetailPage>
    )
}

export default LessonDetail
