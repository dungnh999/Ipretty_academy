import React from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import TextInput from 'ipretty/components/TextInput'

const FieldsUpdate = (props) => {
    const { classes, getTranslation, user, onChange } = props

    return (
        <React.Fragment>
            <div className={classes.lessonItem}>
                <div className={classes.lessonTitle}>
                    <TitleRequired title={getTranslation('Phone')} required={true} />
                </div>
                <div className={classes.textInput}>
                    <TextInput
                        placeholder={getTranslation('PlaceholderPhone')}
                        onChange={onChange('phone')}
                        fullWidth
                        value={user.phone || ''}
                        noMargin
                    />
                </div>
            </div>

            <div className={classes.lessonItem}>
                <div className={classes.lessonTitle}>
                    <TitleRequired title={getTranslation('Address')} required={true} />
                </div>
                <div className={classes.textInput}>
                    <TextInput
                        placeholder={getTranslation('PlaceholderAddress')}
                        onChange={onChange('address')}
                        fullWidth
                        value={user.address || ''}
                        noMargin
                    />
                </div>
            </div>

            <div className={classes.lessonItem}>
                <div className={classes.lessonTitle}>
                    <TitleRequired title={getTranslation('IDNumber')} required={true} />
                </div>
                <div className={classes.textInput}>
                    <TextInput
                        placeholder={getTranslation('PlaceholderIDNumber')}
                        onChange={onChange('id_number')}
                        fullWidth
                        value={user.id_number || ''}
                        noMargin
                    />
                </div>
            </div>

            {/* <div className={classes.lessonItem}>
                <div className={classes.lessonTitle}>
                    <TitleRequired title={getTranslation('Birthday')} required={true} />
                </div>
                <div className={classes.textInput}>

                </div>
            </div> */}
        </React.Fragment>
    )
}

export default FieldsUpdate