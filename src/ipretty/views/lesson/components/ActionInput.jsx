import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import UploadFile from './UploadFile'
import RenderFile from './RenderFile'
import Editor from './Editor'
import Play from '../../../../public/icons_ipretty/Play.png'
import Delete from '../../../../public/icon_svg/Delete.svg'
import IconImage from "ipretty/components/IconImage";
import contextHelper from 'ipretty/helpers/contextHelper'

const ActionInput = React.memo((props) => {
    const {
        classes,
        getTranslation,
        changeDataLesson,
        lesson,
        indexLesson,
        removeLessonAttachment,
        removeMainAttachment,
        dispatcError,
        stateError
    } = props
    const { convertTommss } = contextHelper
    const [content, setContent] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setContent(lesson.lesson_content)
    }, [])

    useEffect(() => {
        changeDataLesson(indexLesson, { 'lesson_content': content })
    }, [content])

    useEffect(() => {
        setDescription(lesson.lesson_description)
    }, [])

    useEffect(() => {
        changeDataLesson(indexLesson, { 'lesson_description': description })
    }, [description])

    const onChange = nameField => useCallback((e) => {
        dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: '' })
        if (nameField == 'lesson_content') {
            changeDataLesson(indexLesson, { [nameField]: e })
        } else {
            changeDataLesson(indexLesson, { [nameField]: e.target.value })
        }
    }, [changeDataLesson, nameField, indexLesson])

    const handleUpload = (nameField, value, duration) => {
        let newValue = nameField == 'lesson_attachment' ? [...lesson.lesson_attachment, ...value] : value
        if (duration) {
            changeDataLesson(indexLesson, { [nameField]: newValue, 'leasson_duration_render': convertTommss(duration), 'lesson_duration': duration })
        } else {
            changeDataLesson(indexLesson, { [nameField]: newValue })
        }
    }

    const handleRemoveMainAttachment = useCallback(() => {
        removeMainAttachment(indexLesson)
    }, [removeMainAttachment, indexLesson])

    return (
        <div className="lesson">
            <div className="lesson__infomation box-form lesson__genaral">
                <div className={classes.title}>{getTranslation('LessonDetail')}</div>
                <div className="infomation">
                    <div className="infomation__title">
                        <TitleRequired title={getTranslation('LessonName')} required={true} />
                    </div>
                    <div className="infomation__action">
                        <TextInput
                            placeholder={getTranslation('PlaceholderLessonName')}
                            onChange={onChange('lesson_name')}
                            fullWidth
                            value={lesson.lesson_name || ''}
                            noMargin
                        />
                    </div>
                    {stateError.error && Object.keys(stateError.error).length > 0 && stateError.error['lesson_name'] ? (
                        <div className={classes.showError}>{stateError.error['lesson_name']}</div>
                    ) : ''}
                </div>
                <div className="infomation">
                    <div className="infomation__title">
                        <TitleRequired title={getTranslation('LessonDescription')} required={true} />
                    </div>
                    <div className="infomation__action">
                        <Editor
                            content={description}
                            setContent={setDescription}
                            placeholder={getTranslation('FillInTheLectureOverview')}
                        />
                    </div>
                    {stateError.error && Object.keys(stateError.error).length > 0 && stateError.error['lesson_description'] ? (
                        <div className={classes.showError}>{stateError.error['lesson_description']}</div>
                    ) : ''}
                </div>
                <div className="infomation">
                    <div className="infomation__title">
                        <TitleRequired title={getTranslation('LessonContent')} required={true} />
                    </div>
                    <div className="infomation__action">
                        <Editor
                            content={content}
                            setContent={setContent}
                            placeholder={getTranslation('FillInTheContent')}
                        />
                    </div>
                    {stateError.error && Object.keys(stateError.error).length > 0 && stateError.error['lesson_content'] ? (
                        <div className={classes.showError}>{stateError.error['lesson_content']}</div>
                    ) : ''}
                </div>
            </div>
            <div className="lesson__attachment box-form lesson__genaral">
                <div className={classes.title}>{getTranslation('downloadLectureContent')}</div>
                <div className="infomation">
                    <div className="infomation__title">
                        <TitleRequired title={getTranslation('LectureClip')} required={true} />
                    </div>
                    <div className="infomation__render-file">
                        {lesson.main_attachment && lesson.main_attachment.name ? (
                            <div className="attachment">
                                <div className="attachment__icon">
                                    <IconImage srcIcon={Play} />
                                </div>
                                <div className="attachment__title">
                                    <Typography>
                                        {lesson.main_attachment.name}
                                    </Typography>
                                </div>
                                <div className="attachment__duration">
                                    <Typography>
                                        {lesson.leasson_duration_render}
                                    </Typography>
                                </div>
                                <div className="attachment__delete">
                                    <Tooltip title={getTranslation('RemoveClip')} placement="bottom">
                                        <IconButton onClick={handleRemoveMainAttachment}>
                                            <IconImage srcIcon={Delete} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        ) : (
                            lesson.main_attachment_name && lesson.main_attachment_name != null && (
                                <div className="attachment">
                                    <div className="attachment__icon">
                                        <IconImage srcIcon={Play} />
                                    </div>
                                    <div className="attachment__title">
                                        <Typography>
                                            {lesson.main_attachment_name}
                                        </Typography>
                                    </div>
                                    <div className="attachment__delete attachment__delete--style">
                                        <Tooltip title={getTranslation('RemoveClip')} placement="bottom">
                                            <IconButton onClick={handleRemoveMainAttachment}>
                                                <IconImage srcIcon={Delete} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    {lesson.main_attachment == '' || !lesson.main_attachment ? (
                        <div className="infomation__upload-file">
                            <UploadFile
                                classes={classes}
                                attachments={'main_attachment'}
                                handleUpload={handleUpload}
                                maxFiles={1}
                                acceptFile={'video/mp4'}
                                title={getTranslation('UploadAttachments')}
                                typeFiel={'mp4'}
                                dispatcError={dispatcError}
                            />
                        </div>
                    ) : ''}
                    {stateError.error && Object.keys(stateError.error).length > 0 && stateError.error['main_attachment'] ? (
                        <div className={classes.showError}>{stateError.error['main_attachment']}</div>
                    ) : ''}
                </div>
                <div className="infomation">
                    <div className="infomation__title">
                        <TitleRequired title={getTranslation('LessonAttachment')} required={false} />
                    </div>
                    {lesson && lesson.lesson_attachment && lesson.lesson_attachment.length > 0 ? (
                        <div className="infomation__render-file">
                            <RenderFile
                                removeLessonAttachment={removeLessonAttachment}
                                classes={classes}
                                indexLesson={indexLesson}
                                lessonAttachments={lesson.lesson_attachment}
                                getTranslation={getTranslation}
                                lessonId={lesson.lesson_id || ''}
                            />
                        </div>
                    ) : ''}
                    <div className="infomation__upload-file">
                        <UploadFile
                            classes={classes}
                            attachments={'lesson_attachment'}
                            handleUpload={handleUpload}
                            maxFiles={100}
                            acceptFile={'.doc, .docx, .pptx, application/ppt, application/pdf'}
                            typeFiel={'pdf, doc, docx, ppt, pptx'}
                            title={getTranslation('UploadClipOfTheLecture')}
                            dispatcError={dispatcError}
                        />
                    </div>
                    {stateError.error && Object.keys(stateError.error).length > 0 && stateError.error['lesson_attachment'] ? (
                        <div className={classes.showError}>{stateError.error['lesson_attachment']}</div>
                    ) : ''}
                </div>
            </div>
        </div >
    )
})

export default ActionInput