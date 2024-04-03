
import React, { useCallback, useState } from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import Close from '../../../../public/icons_ipretty/Close.png'
import IconImage from "ipretty/components/IconImage"
import SnackBar from 'ipretty/components/SnackBar'
import contextHelper from 'ipretty/helpers/contextHelper'

const RenderOptiionAttachment = React.memo((props) => {
    const {
        getTranslation,
        indexQuestion,
        optionAttachment,
        removeOptionAttachment,
        indexOption,
        optionAttachmantName
    } = props
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const { compactText } = contextHelper

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const handleRemoveOptionAttachment = useCallback(() => {
        removeOptionAttachment(indexQuestion, indexOption)
        setSnackbar({
            openSnackbar: true,
            message: 'Xóa file đính kèm thành công',
            variant: 'success',
        })
    }, [indexQuestion, indexOption])

    return (
        <div className="option__acttachment--render">
            <div className="option__acttachment--title">
                <Tooltip title={optionAttachmantName || optionAttachment}>
                    <Typography>
                        {compactText(optionAttachmantName, 40) || compactText(optionAttachment, 40)}
                    </Typography>
                </Tooltip>
                
            </div>
            <div className="option__acttachment--remove">
                <Tooltip title={getTranslation('RemoveFile')} placement="bottom">
                    <IconButton className="button option__acttachment--remove-button" onClick={handleRemoveOptionAttachment}>
                        <IconImage srcIcon={Close} />
                    </IconButton>
                </Tooltip>
            </div>
            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
            )}
        </div>
    )
})

export default RenderOptiionAttachment