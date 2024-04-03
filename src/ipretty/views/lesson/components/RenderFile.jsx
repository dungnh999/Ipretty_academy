import React from 'react' 
import Attachment from './Attachment'

const RenderFile = React.memo((props) => {
    const { classes, getTranslation, indexLesson, lessonAttachments, removeLessonAttachment, lessonId } = props

    return lessonAttachments.map((attachment, indexAttachment) => (
        <React.Fragment key={indexAttachment}>
            <Attachment
                classes={classes}
                getTranslation={getTranslation}
                indexLesson={indexLesson}
                indexAttachment={indexAttachment}
                attachment={attachment}
                removeLessonAttachment={removeLessonAttachment}
                lessonId={lessonId}
            />
        </React.Fragment>
    ))
})

export default RenderFile