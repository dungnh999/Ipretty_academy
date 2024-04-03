
import React, { useCallback, useState } from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import SnackBar from 'ipretty/components/SnackBar'

const Attachment = React.memo((props) => {
    const { classes, getTranslation, attachment, indexAttachment, removeQuestionAttachment, indexQuestion } = props
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const handleRemovLessonAttachment = useCallback(() => {
        removeQuestionAttachment(indexQuestion, indexAttachment)
        setSnackbar({
            openSnackbar: true,
            message: 'Xóa file đính kèm thành công',
            variant: 'success',
        })
    }, [indexAttachment, removeQuestionAttachment, indexQuestion])

    return (
        <div className="attachment-name">
            <Typography>
                {attachment.name}
            </Typography>
            <Tooltip title={getTranslation('RemoveFile')} onClick={handleRemovLessonAttachment}>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
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

export default Attachment