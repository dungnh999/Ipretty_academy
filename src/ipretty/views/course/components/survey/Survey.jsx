

import React, { useCallback } from 'react'
import Delete from '../../../../../public/icons_ipretty/Delete.png'
import Edit from '../../../../../public/icons_ipretty/Edit.png'
import Survey_Icon from '../../../../../public/icons_ipretty/Survey_Icon.png'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'
import { useHistory, useRouteMatch } from "react-router-dom"

const Survey = React.memo((props) => {
    const {
        indexChapter,
        survey,
        handleActionRedirectEditSurvey,
        removeSurveyInChapter
    } = props
    const { getTranslation } = useAuth()
    let history = useHistory()
    let match = useRouteMatch()
    const courseId = match.params.courseId

    const handleEditSurvey = useCallback(e => {
        handleActionRedirectEditSurvey(indexChapter, survey.survey_id)
    }, [handleActionRedirectEditSurvey, indexChapter])

    const handleRemoveSurvey = useCallback(e => {
        if (courseId) {
            history.push(`/courses/${courseId}/edit?`)
        } else {
            history.push(`/courses/add?`)
        }
        removeSurveyInChapter(indexChapter, survey.survey_id)
    }, [removeSurveyInChapter, indexChapter])

    return (
        <div className="survey">
            <div className="survey__icon">
                <IconImage srcIcon={Survey_Icon} isPagi className="icon_class"/>
            </div>
            <div className="survey__title">
                <Typography>{survey.survey_title}</Typography>
            </div>
            <div className="survey__button">
                <div className="survey__button--edit">
                    <Tooltip title={getTranslation('EditSurvey')} placement="bottom">
                        <IconButton onClick={handleEditSurvey}>
                            <IconImage srcIcon={Edit} isPagi className="icon_class"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="survey__button--delete">
                    <Tooltip title={getTranslation('RemoveSurvey')} placement="bottom" >
                        <IconButton onClick={handleRemoveSurvey}>
                            <IconImage srcIcon={Delete} isPagi className="icon_class"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
})

export default Survey