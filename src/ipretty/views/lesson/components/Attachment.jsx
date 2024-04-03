import React, { useCallback, useState } from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import Delete from '../../../../public/icon_svg/Delete.svg'
import LessonService from 'ipretty/services/LessonService'
import SnackBar from 'ipretty/components/SnackBar'
import File from '../../../../public/icons_ipretty/File.png'
import IconImage from "ipretty/components/IconImage";

const Attachment = React.memo((props) => {
    const { classes, getTranslation, indexLesson, attachment, removeLessonAttachment, indexAttachment } = props
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const handleRemovLessonAttachment = useCallback(() => {
        removeLessonAttachment(indexLesson, indexAttachment, attachment.uuid)
        setSnackbar({
            openSnackbar: true,
            message: 'Xóa file đính kèm thành công',
            variant: 'success',
        })
    }, [indexAttachment, removeLessonAttachment, indexLesson])

    return (
        <div className="attachment">
            <div className="attachment__icon">
                <IconImage srcIcon={File} />
            </div>
            <div className="attachment__title">
                <Typography>
                    {attachment.file_name || attachment.name}
                </Typography>
            </div>
            <div className="attachment__action">
                <Tooltip title={getTranslation('RemoveFile')} onClick={handleRemovLessonAttachment}>
                    <IconButton aria-label="delete">
                        <IconImage srcIcon={Delete} />
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

export default Attachment