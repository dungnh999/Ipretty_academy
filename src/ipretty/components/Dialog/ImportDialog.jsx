
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconImage from "ipretty/components/IconImage";
import Plus_White from '../../../public/icons_ipretty/Plus_White.png'
import Close from '../../../public/icons_ipretty/Close.png'
import AddButton from 'ipretty/components/AddButton'
import { useAuth } from 'ipretty/context/AppProvider'
import Skeleton from '../Skeleton';

const useStyles = makeStyles((theme) => ({
    importDialog: {
        "& .header-dialog": {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px',
            [theme.breakpoints.down('xs')]: {
                padding: '5px 20px',
                flexDirection: 'column',
                alignItems: 'flex-start',//fix bug 82 chua responsive tren mobile
            },
            "& .MuiDialogTitle-root": {
                padding: 0,
                "& .MuiTypography-root": {
                    color: '#395B65',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    [theme.breakpoints.down('xs')]: {
                        fontSize: '25px',//fix bug 82 size chu lon
                        marginLeft: '5px',
                    }
                }
            },
            '& .skeleton__button': {
                display: 'flex',
                "& .MuiSkeleton-root": {
                    marginRight: 8
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
                "& .marginLeft12": {
                    marginLeft: 12
                }
            },
        },
        "& .component-import-dialog": {
            "& .header": {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 15,
                [theme.breakpoints.down("xs")]: {
                    display: 'flex',
                    flexDirection: 'column',  
                    // justifyContent: 'normal',    //fic bug 34    
                },
                "& .header__search": {

                },
                "& .header__search--leader": {
                    width: 340,
                    [theme.breakpoints.down("xs")]: {
                            width: '100%', //fic bug 34    
                        },
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
                    [theme.breakpoints.down("xs")]: {
                        display: 'flex',
                        flexDirection: 'column',      //fic bug 34    
                    },
                    "& .header__filter--item": {
                        marginRight: 15,
                        "& .MuiFormControl-root": {
                            width: 180,
                            [theme.breakpoints.down("xs")]: {
                                paddingTop: 10,     //fic bug 34    
                                width: '274px',
                                "@media screen and (max-height: 800px)": {
                                    width: '245px', //fix bug 34
                                  },
                            },
                            "& .MuiInputBase-root": {
                                "& .MuiSelect-root": {
                                    padding: 9
                                }
                            }
                        }
                    },
                    "& .header__filter--button": {
                        [theme.breakpoints.down("xs")]: {
                            marginTop: '10px',//fix34
                        },
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
    }
}));

export default function MaxWidthDialog({ componentImport: Component, ...props }) {
    const classes = useStyles();
    const {
        openDialog,
        title,
        listData,
        changeValuePaticipants,
        field,
        dispatchStatus,
        selected,
        fieldRender,
        handleActionData,
        loadingCancel,
        loadingAdd,
        loading
    } = props
    const { getTranslation } = useAuth()
    const [dataImport, setDataImport] = useState([])
    const handleClose = () => {
        dispatchStatus({ type: 'SHOW_AND_CLOSE_DIALOG', payload: { status: false, Component: '', title: '', list: '', field: '', action: '' } })
    };
    // console.log(selected, 'selected')
    // console.log(dataImport, 'dataImport')

    const handleConfirmImport = () => {
        let datas = listData.filter(val => dataImport.includes(val.id))
        handleActionData && handleActionData(datas)
        if (changeValuePaticipants) {
            changeValuePaticipants({ [field]: dataImport, [fieldRender]: datas })
            dispatchStatus({
                type: 'SHOW_AND_CLOSE_DIALOG',
                payload: {
                    status: false,
                    Component: '',
                    title: '',
                    list: '',
                    field: '',
                    fieldRender: '',
                    selected: ''
                }
            })
        }
    }

    return (
        <React.Fragment>
            <Dialog
                maxWidth={'lg'}
                fullWidth={true}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                {
                    loading ? (
                        <Skeleton type="table" />
                    ) : (
                        <div className={classes.importDialog}>
                            <div className="header-dialog">
                                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                                <DialogActions>
                                    <div className="header-dialog__action">
                                        <AddButton
                                            label={getTranslation('Cancel')}
                                            id="cancel-button"
                                            buttonClass="button button--white"
                                            onClick={handleClose}
                                            variant='contained'
                                            iconButton={<IconImage srcIcon={Close} icon20 />}
                                            disabled={false}
                                            // loading={loadingCancel}
                                        />
                                        {dataImport.length > 0 || selected.length > 0 ? (
                                            <AddButton
                                                label={getTranslation('Add')}
                                                id="create-button"
                                                buttonClass="button--white marginLeft12"
                                                onClick={handleConfirmImport}
                                                variant="contained"
                                                iconButton={<IconImage srcIcon={Plus_White} />}
                                                // disabled={dataImport.length > 0 ? false : true}
                                                loading={loadingAdd}
                                            />
                                        ) : ''}
                                    </div>
                                </DialogActions>
                            </div>
                            <DialogContent>
                                {Component && <Component
                                    dataImport={dataImport}
                                    setDataImport={setDataImport}
                                    selected={selected}
                                />}
                            </DialogContent>
                        </div>
                    )
                }
            </Dialog>
        </React.Fragment>
    );
}