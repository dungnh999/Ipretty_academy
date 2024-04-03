
import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import { useAuth } from 'ipretty/context/AppProvider'
import React, { useCallback } from 'react'

const Content = React.memo((props) => {
    const {
        classes,
        changeValueContent,
        content,
        indexContent,
        stateError
    } = props
    const { getTranslation } = useAuth()

    const onChange = nameField => useCallback(e => {
        changeValueContent(indexContent, { [nameField]: e.target.value })
    }, [indexContent, changeValueContent, nameField])

    return (
        <div className="infomation">
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('Theme')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('FillInTheSubject')}
                        onChange={onChange('title')}
                        fullWidth
                        value={content.title || ''}
                        noMargin
                        helperText={stateError && Object.keys(stateError.error).length > 0 && stateError.error['title'] ? stateError.error['title'] : ''}
                    />
                </div>
            </div>
        </div>
    )
})

export default Content