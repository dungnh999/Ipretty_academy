
import React from 'react' 
import Attachment from './Attachment'

const RenderFile = React.memo((props) => {
    const { classes, getTranslation, indexQuestion, questionAttachments, removeQuestionAttachment } = props

    return questionAttachments.map((attachment, indexAttachment) => (
        <React.Fragment key={indexAttachment}>
            <Attachment
                classes={classes}
                getTranslation={getTranslation}
                indexQuestion={indexQuestion}
                indexAttachment={indexAttachment}
                attachment={attachment}
                removeQuestionAttachment={removeQuestionAttachment}
            />
        </React.Fragment>
    ))
})

export default RenderFile