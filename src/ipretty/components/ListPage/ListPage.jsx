import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { AddCircleOutlined } from '@material-ui/icons'
import AlertDialog from 'ipretty/components/Alert/AlertDialog';
import { useAuth } from 'ipretty/context/AppProvider';
import { MailerAlertType } from 'ipretty/interfaces/MailerAlertType';

const useStyles = makeStyles(
    theme => ({
        root: {
            paddingLeft: '2.865vw',
            paddingTop: '1.688rem',
            paddingRight: '2.188vw',
            display: 'flex',
            justifyContent: 'space-between'
        },
        AddButton: {
            minWidth: 150,
            width: '16.063vw',
            height: '3.375rem',
            justifyContent: 'space-between',
            fontWeight: 'normal',
            borderRadius: theme.spacing(2.125),
            "& span": {
                fontSize: '1.125rem',
            },
            "& svg": {
                width: 28,
                height: 28
            },
        },
        sectionAlert: {
            marginTop: '-2.938rem',
            paddingLeft: '2.865vw',
            paddingRight: '2.188vw',
        }
    })
)

const ListPage = (props) => {
    const {
        children,
        onAdd,
        addBtnLabel,
    } = props;
    const classes = useStyles();
    const { getTranslation } = useAuth()

    return (
        <>
            <div className={classes.root}>
                <Button variant="contained" className={classes.AddButton} onClick={onAdd}>
                    {getTranslation(addBtnLabel)}
                    <AddCircleOutlined />
                </Button>
            </div>
            {children}
        </>
    )
}

ListPage.defaultProps = {
    // enableSectionAlert: true,
}

export default ListPage;