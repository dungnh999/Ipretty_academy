import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import CustomDialog from '../Dialog/Dialog';
import clsx from 'clsx'
import SnackBar from '../SnackBar'
import { useToolbarStyles } from './DataTable.style'
import { Delete } from '@material-ui/icons';

function EnhancedTableToolbar(props) {
    const classes = useToolbarStyles();
    const [openConfirm, setOpenConfirm] = useState(false)
    const [loadingLock, setLoadingLock] = useState(false)
    const { selection, handleDelete, resetSelects, getTranslation } = props

    const handleDel = () => {
        setLoadingLock(true)
        handleDelete(selection)
            .then(res => {
                resetSelects()
                setOpenConfirm(false)
            })
            .catch(err => {
                setOpenConfirm(false)
            })
    }

    const onConfirm = () => setOpenConfirm(true)

    const handleOnClose = () => {
        setOpenConfirm(false)
    }
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' });
    }

    return (
        <Toolbar className={clsx(classes.root, { [classes.highlight]: selection.length > 0 })}>
            {selection.length > 0 && (
                <Typography className={classes.title} color="primary" variant="body1" component="div">
                    {selection.length} lựa chọn
                </Typography>
            )}

            {handleDelete && selection.length > 0 && (
                <Tooltip title="Xóa">
                    <IconButton aria-label="delete" className={classes.pd0} onClick={onConfirm}>
                        <Delete color="error" />
                    </IconButton>
                </Tooltip>
            )}

            {openConfirm && (
                <CustomDialog
                    maxWidth='sm'
                    open={openConfirm}
                    onClose={handleOnClose}
                    actionLabel={'Xóa'}
                    action={handleDel}
                    loadingButton={loadingLock}
                    getTranslation={getTranslation}
                    noIcon={true}
                >
                    {'Bạn có chắc chắn muốn xóa không?'}
                </CustomDialog>
            )}

            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
            )}
        </Toolbar>
    );
};

export default EnhancedTableToolbar

EnhancedTableToolbar.prototype = {
    handleDelete: PropTypes.func,
    ids: PropTypes.array
}