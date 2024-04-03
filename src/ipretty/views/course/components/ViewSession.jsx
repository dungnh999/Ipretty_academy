

import React from 'react'
import Session from './Session'

const ViewSession = React.memo((props) => {
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
            <Session
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

export default ViewSession