
import { Button } from '@material-ui/core'
import AddButton from 'ipretty/components/AddButton'
import IconImage from 'ipretty/components/IconImage'
import { useAuth } from 'ipretty/context/AppProvider'
import React, { useCallback } from 'react'
import Plus_White from '../../../../public/icons_ipretty/Plus_White.png'
import Questions from './Questions'
import Contents from './Contents'

const Component = React.memo((props) => {
    const {
        classes,
        addQuestion,
        stateQuestions,
        changeValueQuestion,
        stateContents,
        changeValueContent,
        stateError,
        dispatchQuestion,
        removeQuestion,
        dipacthError,
        dispatchContent
    } = props
    const { getTranslation } = useAuth()

    const handleAddQuestion = useCallback(() => {
        dipacthError({type: 'SHOW_ERROR_FAQ', payload: ''})
        addQuestion()
    }, [addQuestion])

    return (
        <div className="content-faq">
            <div className="content-faq__header">
                <div className={classes.title}>{getTranslation('FAQContent')}</div>
                <div className="add-question">
                    <AddButton
                        label={getTranslation('AddQuestion')}
                        id="update-button"
                        buttonClass="add-question--green"
                        onClick={handleAddQuestion}
                        variant='contained'
                        iconButton={<IconImage icon20 srcIcon={Plus_White} />}
                        disabled={false}
                    />
                </div>
            </div>
            <div className="content-faq__session">
                <div className="content-faq__session--theme">
                    <Contents
                        classes={classes}
                        stateContents={stateContents}
                        changeValueContent={changeValueContent}
                        stateError={stateError}
                    />
                </div>
                {stateQuestions && stateQuestions.questions && stateQuestions.questions.length > 0 && (
                    <div className="content-faq__session--question">
                        <Questions
                            classes={classes}
                            stateQuestions={stateQuestions}
                            changeValueQuestion={changeValueQuestion}
                            dispatchQuestion={dispatchQuestion}
                            stateError={stateError}
                            removeQuestion={removeQuestion}
                            dipacthError={dipacthError}
                            dispatchContent={dispatchContent}
                        />
                    </div>
                )}
                {stateError && Object.keys(stateError.error).length > 0 && stateError.error['questions'] ? (
                    <div className={classes.showError}>{stateError.error['questions']}</div>
                ) : ''}
            </div>
        </div>
    )

})

export default Component