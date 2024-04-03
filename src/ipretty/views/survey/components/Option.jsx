
import React, { memo, useCallback } from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import SurveyService from 'ipretty/services/SurveyService'
import TextInput from 'ipretty/components/TextInput'
import { Checkbox } from '@material-ui/core'
import { IconButton, Tooltip } from '@material-ui/core'
import UploadFile from 'ipretty/components/UploadFile/UploadFile'
import RenderOptiionAttachment from './RenderOptiionAttachment'
import Radio from '@material-ui/core/Radio'
import Plus from '../../../../public/icons_ipretty/Plus.png'
import Upload from '../../../../public/icons_ipretty/Upload.png'
import Delete_black from '../../../../public/icons_ipretty/Delete_black.png'
import IconImage from "ipretty/components/IconImage"

const Option = memo((props) => {
    const {
        classes,
        getTranslation,
        option,
        indexOption,
        indexQuestion,
        changeValueOption,
        questionType,
        changeValueMultipleChoice,
        changeValueSingleChoice,
        removeOptionInQuestion,
        removeOptionAttachment,
        addOption,
        stateError,
        stateOptions,
        dispatchError
    } = props
    console.log(option, 'option ----')
    const acceptFile = 'image/png, image/jpeg, image/jpg, image/gif'

    const handleAddOption = useCallback(() => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        addOption(indexQuestion, indexOption)
    }, [addOption, indexQuestion, indexOption])

    const onChange = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        changeValueOption(indexQuestion, indexOption, { [nameField]: e.target.value })
    }, [changeValueOption, indexQuestion, nameField, indexOption])

    const handleUpload = (nameField, value, files) => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        if (value.length == 0) {
            dispatchError({ type: 'GET_ERROR', payload: { render_option_attachment: [{ error: `Vui lòng chọn file đúng định dạng ${acceptFile}`, indexQuestion: indexQuestion, indexOption: indexOption }] } })
            return false
        } else if (value.length > 1) {
            dispatchError({ type: 'GET_ERROR', payload: { render_option_attachment: [{ error: `Chỉ được chọn 1 file`, indexQuestion: indexQuestion, indexOption: indexOption }] } })
            return false
            // let newValue = [...option.render_option_attachment, ...value]
            // let optionAttachments = [...option.option_attachments, ...files]
            // changeValueOption(indexQuestion, indexOption, { [nameField]: newValue, option_attachments: optionAttachments, option_attachmant_name: value[0].name })
        } else {
            let data = new FormData()
            data.append('image_attachment', value[0])
            SurveyService.uploadFile(
                data,
                res => {
                    let response = res.data.data
                    changeValueOption(indexQuestion, indexOption, { [nameField]: response.url, option_attachments: response.url, option_attachmant_name: response.file_name })
                },
                err => {
                    console.log(err)
                }
            )
        }
    }

    const handleChangeValueMultipleChoice = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        changeValueMultipleChoice(indexQuestion, indexOption, { [nameField]: e.target.checked })
    }, [changeValueMultipleChoice, indexQuestion, nameField, indexOption])

    const handleChangeValueSingleChoice = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        changeValueSingleChoice(indexQuestion, indexOption, { [nameField]: e.target.checked })
    }, [changeValueSingleChoice, indexQuestion, nameField, indexOption])

    const handleRemoveOption = useCallback(() => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        removeOptionInQuestion(indexQuestion, indexOption)
    }, [removeOptionInQuestion, indexQuestion, indexOption])

    return (
        <React.Fragment>
            <div className="option">
                <div className="option__action">
                    <div className="option__action--checkbock">
                        {questionType == 'MultipleChoice' ? (
                            <Checkbox
                                checked={option.right_answer}
                                onChange={handleChangeValueMultipleChoice('right_answer')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        ) : (
                            <Radio
                                checked={option.right_answer}
                                onChange={handleChangeValueSingleChoice('right_answer')}
                                value={option.right_awer}
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        )}
                    </div>
                    <div className="option__action--input">
                        <TextInput
                            placeholder={getTranslation('PlaceholderOptionBody')}
                            onChange={onChange('option_body')}
                            fullWidth
                            value={option.option_body || ''}
                            noMargin
                        />
                    </div>
                    <div className="option__action--button">
                        <Tooltip title={getTranslation('AddOption')} placement="bottom">
                            <IconButton className="button option__action--button-add" onClick={handleAddOption}>
                                <IconImage srcIcon={Plus} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="option__acttachment">
                    {option.render_option_attachment && option.render_option_attachment != '' ? (
                        <RenderOptiionAttachment
                            removeOptionAttachment={removeOptionAttachment}
                            classes={classes}
                            indexQuestion={indexQuestion}
                            optionAttachmantName={option.option_attachmant_name}
                            optionAttachment={option.render_option_attachment}
                            getTranslation={getTranslation}
                            indexOption={indexOption}
                        />
                    ) : (
                        <div className="option__acttachment--upload">
                            <UploadFile
                                classes={classes}
                                attachments={'render_option_attachment'}
                                handleUpload={handleUpload}
                                maxFiles={100}
                                uploadMultipleFiles={true}
                                iconUpload={<IconImage srcIcon={Upload} />}
                                titleButton={getTranslation('UploadNewPhotos')}
                                // accept={'jpeg, png, jpg, gif, pdf, xls, xlsx, doc, docx, ppt, pptx, zip, rar'}
                                acceptFile={'image/png, image/jpeg, image/jpg, image/gif'}
                                dispatchError={dispatchError}
                            />
                        </div>
                    )}
                    {stateOptions && stateOptions.length > 1 ? (
                        <div className="option__acttachment--remove">
                            <Tooltip title={getTranslation('RemoveOption')} placement="bottom">
                                <IconButton className="button option__acttachment--remove-button" onClick={handleRemoveOption}>
                                    <IconImage srcIcon={Delete_black} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : ''}
                </div>
            </div >
            {stateError && Object.keys(stateError.error).length > 0 && stateError.error['render_option_attachment'] && stateError.error['render_option_attachment'][0].indexQuestion == indexQuestion && stateError.error['render_option_attachment'][0].indexOption == indexOption ? (
                <div className={classes.showError}>{stateError.error['render_option_attachment'][0].error}</div>
            ) : ''}
            {stateError &&
                Object.keys(stateError.error).length > 0 &&
                stateError.error['questions'] &&
                stateError.error['questions'][indexQuestion] &&
                (stateError.error['questions'][indexQuestion].index || stateError.error['questions'][indexQuestion].index == 0) &&
                stateError.error['questions'][indexQuestion].index === indexQuestion &&
                stateError.error['questions'][indexQuestion].options.length > 0 &&
                stateError.error['questions'][indexQuestion].show == true &&
                stateError.error['questions'][indexQuestion].options[indexOption].indexOption === indexOption ? (
                <div className={classes.showError}>{stateError.error['questions'][indexQuestion].options[indexOption].error}</div>
            ) : ''}
        </React.Fragment>
    )
})

export default Option