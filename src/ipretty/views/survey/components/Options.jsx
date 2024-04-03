
import React, { memo } from 'react'
import Option from './Option'

const Options = memo((props) => {
    const {
        classes,
        getTranslation,
        stateOptions,
        indexQuestion,
        changeValueOption,
        questionType,
        changeValueMultipleChoice,
        changeValueSingleChoice,
        removeOptionInQuestion,
        removeOptionAttachment,
        addOption,
        stateError,
        dispatchError
    } = props

    return stateOptions.map((option, indexOption) => (
        <React.Fragment key={indexOption}>
            <Option
                classes={classes}
                getTranslation={getTranslation}
                option={option}
                indexOption={indexOption}
                indexQuestion={indexQuestion}
                changeValueOption={changeValueOption}
                questionType={questionType}
                changeValueMultipleChoice={changeValueMultipleChoice}
                changeValueSingleChoice={changeValueSingleChoice}
                removeOptionInQuestion={removeOptionInQuestion}
                removeOptionAttachment={removeOptionAttachment}
                addOption={addOption}
                stateError={stateError}
                stateOptions={stateOptions}
                dispatchError={dispatchError}
            />
        </React.Fragment>
    ))
})

export default Options