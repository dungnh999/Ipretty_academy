
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconImage from "ipretty/components/IconImage";
import Save_white from '../../../public/icon_svg/Save_white.svg'
import AddButton from 'ipretty/components/AddButton'
import { useAuth } from 'ipretty/context/AppProvider'
import { Close} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    importDialog: {
        "& .header-dialog": {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px',
            "& .MuiDialogTitle-root": {
                padding: 0,
                "& .MuiTypography-root": {
                    color: '#395B65',
                    fontSize: '32px',
                    fontWeight: 'bold'
                }
            },
            "& .header-dialog__action": {
                "& .button": {
                    border: '1px solid #147B65',
                    background: '#fff',
                    color: '#147B65',
                    // marginRight: 20,
                    padding: '5px 9px',
                    minWidth: 82
                },
                "& .button--close" : {
                    padding: '5px 23px',
                    marginRight : 24
                },
                "& .marginLeft12": {
                    marginLeft: 12
                }
            },
        },
        '& .MuiDialogContent-root' : {
            paddingLeft : 32,
            paddingRight : 36
        },
        "& .component-import-dialog": {
            "& .header": {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 15,
                "& .header__search": {

                },
                "& .header__search--leader": {
                    width: 340,
                    "& .MuiFormControl-root": {
                        width: '100%',
                        "& .MuiInputBase-root": {
                            padding: 2
                        }
                    }
                },
                "& .header__filter": {
                    display: 'flex',
                    flexDirection: 'row',
                    "& .header__filter--item": {
                        marginRight: 15,
                        "& .MuiFormControl-root": {
                            width: 180,
                            "& .MuiInputBase-root": {
                                "& .MuiSelect-root": {
                                    padding: 9
                                }
                            }
                        }
                    },
                    "& .header__filter--button": {
                        " & button": {
                            "&:hover": {
                                'backgroundColor': '#147B65'
                            },
                            "&:active": {
                                'backgroundColor': '#147B65'
                            }
                        }
                    }
                }
            }
        }
    },
    dialogPaper: {
        borderRadius: theme.spacing(2.5),
        [theme.breakpoints.up("400")]: {
            padding: theme.spacing(3),
        },
    },
    headerImg : {
        display: 'flex',
        justifyContent: 'end'
    }
}));

export default function MaxWidthDialog({ componentImport: Component, ...props }) {
    const classes = useStyles();
    const {
        openDialog,
        title,
        handleSave,
        maxWidth,
        isForm,
        children,
        handleClose,
        CustomWidth,
        fileImage,
        onClose
    } = props
    const { getTranslation } = useAuth()

    function renderFile(fileImage) {
        return (
            <>
                <div className={classes.headerImg}>
                    <DialogTitle id="max-width-dialog-title">
                        <IconButton onClick={onClose} color={'secondary'}>
                            <Close />
                        </IconButton>
                    </DialogTitle>
                </div>
                <DialogContent>
                    {fileImage && <img src={fileImage} style={{ width: '600px' , objectFit : 'contain', paddingBottom : '32px' }} />}              
                </DialogContent>
            </>
        )
    } 

    return (
        <React.Fragment>
            <Dialog
                maxWidth={maxWidth}
                // fullWidth={true}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <div className={classes.importDialog}>
                    {
                        !fileImage ? 
                            <>
                                <div className="header-dialog">
                                    <DialogTitle id="max-width-dialog-title">{getTranslation(title)}</DialogTitle>
                                </div>
                                <DialogContent>
                                    {children}
                                </DialogContent>
                        </>
                        : (
                            fileImage && renderFile(fileImage)
                        )
                    }
                </div>
            </Dialog>
        </React.Fragment>
    );
}