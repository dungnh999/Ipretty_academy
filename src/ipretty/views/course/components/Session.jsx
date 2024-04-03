
import React from 'react'
import TitleSession from './TitleSession'

const Session = React.memo((props) => {
    const {
        classes,
        indexChapter,
        session,
        indexSession,
        getTranslation,
        changeValueSessionChapter,
        removeSessionChapter
    } = props

    return (
        <React.Fragment>
            <TitleSession
                classes={classes}
                getTranslation={getTranslation}
                indexChapter={indexChapter}
                session={session}
                indexSession={indexSession}
                changeValueSessionChapter={changeValueSessionChapter}
                removeSessionChapter={removeSessionChapter}
            />
        </React.Fragment>
    )
})

export default Session