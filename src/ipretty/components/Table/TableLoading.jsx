import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from './DataTable.style'

export default function TableLoading({ loading }) {
    const classes = useStyles()
    return (
        <>
            {loading && <div className={classes.loading}> <CircularProgress /> </div>}
        </>
    )
}
