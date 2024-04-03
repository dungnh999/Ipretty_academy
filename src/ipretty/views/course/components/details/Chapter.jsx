
import { useAuth } from 'ipretty/context/AppProvider'
import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Play from '../../../../../public/icons_ipretty/Play.png'
import Survey_Icon from '../../../../../public/icons_ipretty/Survey_Icon.png'
import IconImage from "ipretty/components/IconImage"
import contextHelper from 'ipretty/helpers/contextHelper'

const Chapter = React.memo((props) => {
    const { classes, chapters } = props
    const { getTranslation } = useAuth()
    const { convertTommss, compactText } = contextHelper

    return chapters.map((chapter, indexChapter) => (
        <Box className={classes.boxForm} width={1} my={4} px={3} py={2} key={indexChapter}>
            <div className="chapter-item" >
                <div className="chapter__title">
                    <Typography>{`${getTranslation('Chapter')} ${indexChapter + 1}: `}<span>{chapter.chapter_name}</span></Typography>
                </div>

                {chapter.lessons && chapter.lessons.length > 0 ? (
                    <div className="chapter__lesson">
                        {chapter.lessons.map((lesson, indexLesson) => (
                            <div className="lesson" key={indexLesson}>
                                <div className="lesson__icon">
                                    <IconImage srcIcon={Play} isPagi className="icon_class" />
                                </div>
                                <div className="lesson__title">
                                    <Typography>{`${getTranslation('LabelLesson')} ${indexLesson + 1}: `}<span>{compactText(lesson.lesson_name, 50)}</span></Typography>
                                </div>
                                <div className="lesson__duration">
                                    <Typography>{convertTommss(lesson.lesson_duration)}</Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : ''}

                {chapter.survey && Object.keys(chapter.survey).length > 0 ? (
                    <div className="chapter__survey">
                        <div className="chapter__survey--icon">
                            <IconImage srcIcon={Survey_Icon} isPagi className="icon_class" />
                        </div>
                        <div className="chapter__survey--title">
                            <Typography>{chapter.survey.survey_title}</Typography>
                        </div>
                    </div>
                ) : ''}
            </div>
        </Box>
    ))
})

export default Chapter
