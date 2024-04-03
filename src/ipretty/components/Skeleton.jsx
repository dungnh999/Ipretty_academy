import React from 'react'
import PropTypes from 'prop-types'
import MuiSkeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        "& .skeleton-wrapper": {
            flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
        },
        "& .mbt-16": {
            marginTop: 16,
            marginBottom: 16
        }
    }
}))

function Skeleton(props) {
    const classes = useStyles();
    switch (props.type) {
        case 'table':
            return (
                <div style={{ width: '100%', padding: '2px 2px 0px 2px' }}>
                    <MuiSkeleton variant='rect' style={{ height: 32, marginBottom: 1 }} />
                    <MuiSkeleton variant='rect' style={{ height: 80, marginBottom: 1 }} />
                    <MuiSkeleton variant='rect' style={{ height: 80, marginBottom: 1 }} />
                    <MuiSkeleton variant='rect' style={{ height: 80, marginBottom: 1 }} />
                    <MuiSkeleton variant='rect' style={{ height: 80, marginBottom: 1 }} />
                    <MuiSkeleton variant='rect' style={{ height: 80 }} />
                </div>
            )
        case 'pageMenu':
            return (
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 272, padding: '4px 4px 0px 2px' }}>
                        <MuiSkeleton variant='rect' style={{ height: 64, marginBottom: 1 }} />
                        <MuiSkeleton variant='rect' style={{ height: 40, marginBottom: 1 }} />
                        <MuiSkeleton variant='rect' style={{ height: 40, marginBottom: 1 }} />
                        <MuiSkeleton variant='rect' style={{ height: 40, marginBottom: 1 }} />
                        <MuiSkeleton variant='rect' style={{ height: 40, marginBottom: 1 }} />
                        <MuiSkeleton variant='rect' style={{ height: 40 }} />
                    </div>
                    <div style={{ width: '100%', padding: '4px 2px 0px 4px' }}>
                        <MuiSkeleton variant='rect' style={{ height: 500 }} />
                    </div>
                </div>
            )
        case 'text':
            return (
                <MuiSkeleton variant='rect' style={{ height: props.height || 30, marginBottom: 5 }} width={props.width ? props.width : '100%'}/>
            )
        case 'multiline':
            return (
                <div>
                    <MuiSkeleton variant='rect' style={{ height: props.height || 30, marginBottom: 8 }} />
                    <MuiSkeleton variant='rect' style={{ height: props.height || 30, marginBottom: 8 }} />
                    <MuiSkeleton variant='rect' style={{ height: props.height || 30, marginBottom: 8 }} />
                </div>
            )
        case 'contactCard':
            return (
                <MuiSkeleton variant='rect' style={{ height: props.height || 300 }} />
            )
        case 'circle':
            return (
                <MuiSkeleton variant='circle' width={props.width} height={props.height} />
            )
        case 'button':
            return (
                <MuiSkeleton variant='rect' width={props.width ? props.width : 160} height={props.height ? props.height : 60} />
            )
        case 'list':
            return (
                <div className={classes.root}>
                    {
                        props.numberItems && Array.from(Array(props.numberItems).keys()).map(item => (
                            <div className="skeleton-wrapper mbt-16" key={item}>
                                <MuiSkeleton variant='rect' height={props.height ? props.height : 100} />
                            </div>
                        ))
                    }
                </div>
            )
        default:
            return <div />
    }
}

Skeleton.propTypes = {
    type: PropTypes.oneOf(['table', 'pageMenu', 'text', 'contactCard', 'multiline', 'circle', 'button', 'list'])
}

export default Skeleton
