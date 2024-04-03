

import React, { useCallback, useState } from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import Close from '../../../../public/icons_ipretty/Close.png'
import IconImage from "ipretty/components/IconImage"
import SnackBar from 'ipretty/components/SnackBar'

const OptionAttachment = React.memo((props) => {
    const {
        getTranslation,
        attachment,
        indexAttachment,
        removeOptionAttachment,
        indexQuestion,
        indexOption
    } = props
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const handleRemoveOptionAttachment = useCallback(() => {
        removeOptionAttachment(indexQuestion, indexOption, indexAttachment)
        setSnackbar({
            openSnackbar: true,
            message: 'Xóa file đính kèm thành công',
            variant: 'success',
        })
    }, [indexAttachment, removeOptionAttachment, indexQuestion, indexOption])

    return (
        <div className="option__acttachment--render">
            <div className="option__acttachment--remove">
                <Typography>
                    {attachment.name}
                </Typography>
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

export default OptionAttachment