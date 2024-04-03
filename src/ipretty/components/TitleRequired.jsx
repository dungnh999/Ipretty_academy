import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    colorRed: {
        color: '#e53935'
    }
}))

function TitleRequired(props) {
    const classes = useStyles()
    const { required, title } = props

    return (
        <Typography align="left">
            {`${title}`} {required && <span className={classes.colorRed}> *</span>}
        </Typography>
    )
}

export default TitleRequired