
import React from 'react'
import ViewSession from './ViewSession'

const Sessions = React.memo((props) => {
    const {
        classes,
        chapter,
        indexChapter,
        getTranslation,
        changeValueSessionChapter,
        removeSessionChapter
    } = props

    return chapter.sessions.map((session, indexSession) => (
        <React.Fragment key={indexSession}>
            <ViewSession
                classes={classes}
                getTranslation={getTranslation}
                chapter={chapter}
                indexChapter={indexChapter}
                session={session}
                indexSession={indexSession}
                changeValueSessionChapter={changeValueSessionChapter}
                removeSessionChapter={removeSessionChapter}
            />
        </React.Fragment>
    ))
})

export default Sessions