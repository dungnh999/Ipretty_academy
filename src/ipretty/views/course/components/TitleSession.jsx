

import { Tooltip, IconButton } from '@material-ui/core'
import React, { useCallback } from 'react'
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import TitleRequired from "ipretty/components/TitleRequired"
import TextInput from "ipretty/components/TextInput"

const TitleSession = React.memo((props) => {
    const {
        classes,
        indexChapter,
        session,
        indexSession,
        getTranslation,
        changeValueSessionChapter,
        removeSessionChapter
    } = props

    const onChange = useCallback((e) => {
        changeValueSessionChapter(indexChapter, indexSession, { session_name: e.target.value })
    }, [changeValueSessionChapter, indexChapter, indexSession])

    const handleRemoveSessionChapter = useCallback(() => {
        removeSessionChapter(indexChapter, indexSession)
    }, [removeSessionChapter, indexChapter, indexSession])

    return (
        <div className={classes.titleSession}>
            <div className={classes.itemSesison}>
                <div className={classes.lableSession}>
                    <TitleRequired title={` ${getTranslation('LabelLesson')} ${indexSession + 1}`} required={true} />
                </div>
                <div className={classes.inputSession}>
                    <TextInput
                        placeholder={getTranslation('PlaceholderCourseName')}
                        onChange={onChange}
                        fullWidth
                        value={session.session_name || ''}
                        noMargin
                    />
                </div>
                <div className={classes.buttonReomveSession}>
                    <Tooltip title={getTranslation('RemoveLesson')} placement="bottom" onClick={handleRemoveSessionChapter}>
                        <IconButton className={classes.buttonAction}>
                            <IndeterminateCheckBoxOutlinedIcon style={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
})

export default TitleSession