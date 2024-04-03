import React, { useState, useEffect , useMemo} from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import {Button , TextField, IconButton, InputAdornment, Container, Grid, Typography, Link, makeStyles, Box, Paper  } from '@material-ui/core';
import AddButton from 'ipretty/components/AddButton';
import IconImage from "ipretty/components/IconImage";
import { styled } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom"
import Dialog from 'ipretty/components/Dialog/Dialog'
import UserService from 'ipretty/services/UserService'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import PlusWhite from "../../../../public/icons_ipretty/Plus_White.png"
import Upload_white from "../../../../public/icons_ipretty/Upload_white.svg"
const useStyles = makeStyles(
    theme => ({
        root : {
            width : '100vw',
            [theme.breakpoints.up("sm")]: {
                padding : '28px 0 32px',
            },
            [theme.breakpoints.up("lg")]: {
                padding : '28px 0 32px',
            },
            [theme.breakpoints.up("xl")]: {
                padding : '28px 0 32px',
            },
            borderRadius : '8px',
            flexWrap: 'wrap',
            '& .paperStyle' : {
                [theme.breakpoints.up("md")]: {
                    padding: '32px 32px 13px 32px',
                },
                [theme.breakpoints.down("sm")]: {
                    padding: '32px 0px 13px 0px',
                },
                [theme.breakpoints.down("400")]: {
                    padding: '32px 15px 13px 2px',
                },
               
            },
            '& .showError' : {
                fontWeight: 400,
                fontSize: 10.5,
                color: '#f44336',
                paddingTop: 4,
                paddingBottom : 15
            },
            '& .invite-view' : {
                '& .view__action' : {
                    [theme.breakpoints.down("sm")]: {
                        padding: '10px',
                    },
                    '& .view__action--title' :{
                        fontWeight: 700,
                        fontSize: '20px',
                        fontFamily: 'San Francisco Text',
                        color: theme.palette.primary.colorTextTitle
                    },
                    '& .view__action--content' :{
                        padding : '24px 0 16px',
                        fontSize : '14px',
                        fontFamily: 'San Francisco Text',
                        color: "#395B65"
                    },
                    '& .view__action--button' :{
                        [theme.breakpoints.up("md")]: {
                           display: 'flex'
                        },
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        '& .view__action--input' : {
                            '& .MuiInput-formControl' : {
                                background : '#F3F3F3',
                                border : '1px solid #DADFD9',
                                '& input' : {
                                    minWidth : '327px',
                                    fontStyle : 'normal'
                                }
                            },
                            '& .spanStyle' : {
                                color: '#c32929'
                            },
                            '& .errorInput' : {
                                color: 'red',
                                "& .MuiInputBase-formControl" :{
                                    border: '1.5px solid red',
                                },
                            },
                        },
                        '& .button--upload' : {
                            '& img' : {
                                width : 20,
                                height : 20,
                                paddingTop : 2,
                            },
                            '& .button' : {
                                fontSize : '16px',
                                lineHeight : '16px',
                                padding : '8px 30px 8px 14px',
                            },
                        }
                    },
                }
            },
        },
        styleDialogContent: {
            fontSize : 16,
            '& .button-upload' : {
                display: 'flex',
                paddingTop: 10,
                paddingBottom : 5,
                '& .MuiTypography-root' : {
                    padding : 10
                }
            },
            '& .showError' : {
                maxHeight : 50 , 
                color: '#DC4F68' , 
                fontSize : 12 , 
                overflow : 'auto',
                '& .errorTitle' : {
                    fontSize : 14
                }
            }
        }
    }))
    const Input = styled('input')({
        display: 'none',
      });

function InviteEmail (props) {
    const classes = useStyles()
    const {user , setUser , errors , setLoadingAction , setErrors ,loadingAction} = props
    const accept = useMemo(() => '.xlsm,.xlsx,.xls,.xltx', []);
    const { getTranslation, logout  , updateProfileUser} = useAuth()
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const { makeShortMessage } = useNotiStackContext();
    const [dataFile , setDataFile] = useState()
    let history = useHistory()

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, []);

    const onChange = nameField => (e) => {
            setUser({ ...user, [nameField]: e.target.value });
    }
    
    function redirectUploadFile () {
        setIsShowUploadFile(true);
    }

    function handleCloseUploadFile () {
        setErrors(false)
        setIsShowUploadFile(false)
    }

    function handleChangeFile (e) {
        const { name } = e.target.files[0]
        setDataFile(e.target.files[0])
    }

    function handleUploadFileUsers() {
        setLoadingAction(true)
        setErrors(false)
        const data = new FormData()
        data.append('importFile', dataFile);
       UserService.uploadFileUsers(
        data,
        res => {
            if(res.status == '200' && res.data.error) {
                setLoadingAction(false)
                _handleErrorRes(res)
                makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                setDataFile('')
            } else {
                setLoadingAction(false)
                makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                setDataFile('')
                setTimeout(() => {
                    setIsShowUploadFile(false)
                    history.push('/users/add')
                }, 2000)
            }
        },
        err => {
            setLoadingAction(false)
           _handleError(err) 
        }
       )
    }
    function _handleErrorRes(res) {
        setDataFile('')
        setErrors(res.data.error)
    }

    function _handleError(err) {
        setDataFile('')
        if(err.response.data){
            if(err.response.data.errors){
              setErrors(err.response.data.errors)
            } else if(err.response.data.data) {
                setErrors(err.response.data.data)
            } else {
                setErrors(err.response.data.message)
            }
          }
    }
    
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };
    
    function redirectDownloadTemplate(params) {
        UserService.getExportTemplateInvite(
            { ...params , oneColumn : 1},
            res => {
                handleAfterExport(res.data, 'Template user')
            },
            err => {
                console.log(err)
            }
        )
    }

    const handleAfterExport = (data, nameFile) => {
        var blob = new Blob([data]);
        var downloadUrl = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.setAttribute('download', nameFile + '.xlsx');
        document.body.appendChild(a);
        a.click();
        makeShortMessage(getTranslation('Fileexportsuccessful'), "success")
    }
    
    return (
        <>
            <Grid container >
                    <Box className={classes.root}>
                        <Paper elevation={1} className="paperStyle" >
                            <div className="invite-view">
                                <div className="view__action">
                                    <div className="view__action--title">
                                        {getTranslation('Entermemberemail')}
                                    </div>
                                    <div className="view__action--content">
                                        {getTranslation('Introductory')}
                                    </div>
                                    <div className="view__action--button">
                                        <div className="view__action--input">
                                            <label className='centerInput'>E-mail:<span className="spanStyle">*</span></label>
                                            <TextField
                                                id="textFieldUsername"
                                                placeholder={getTranslation('EnterEmail')}
                                                fullWidth
                                                autoComplete="username"
                                                autoFocus
                                                value={user.email}
                                                helperText={(errors && errors.email) ? errors.email : ' ' }
                                                error={errors && errors.email}
                                                onChange={onChange('email')}
                                                onKeyPress={validateKeyPress}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                className={`textField ${errors && errors.email ? "errorInput" : ''} `}
                                            />
                                        </div>
                                        <div className="button--upload">
                                            <AddButton
                                                label={getTranslation('uploadmemberlist')}
                                                id="update-button"
                                                onClick={redirectUploadFile}
                                                buttonClass="button"
                                                variant='contained'
                                                // loading={loadingAction}
                                                iconButton={<IconImage srcIcon={PlusWhite} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                                    {isShowUploadFile && (
                                        <Dialog
                                            maxWidth="xs"
                                            onDownload={redirectDownloadTemplate}
                                            open={isShowUploadFile}
                                            onClose={handleCloseUploadFile}
                                            actionLabel={getTranslation("UpLoad")}
                                            action={handleUploadFileUsers}
                                            noIcon={false}
                                            loadingButton={loadingAction}
                                            title={getTranslation("Uploadnewlistings")}
                                            iconButton={<IconImage srcIcon={Upload_white} />}
                                            getTranslation={getTranslation}
                                            rootDialogContentStyle={classes.styleDialogContent}
                                        >
                                            {getTranslation("UploadLists")}
                                            <div className="button-upload">
                                                <label id="contained-button-file">
                                                    <Button 
                                                        variant="outlined" 
                                                        component="span"
                                                    >
                                                        {getTranslation('ChooseFile')}
                                                    </Button>
                                                    <input accept={accept} onChange={handleChangeFile} id="contained-button-file" hidden={true} type="file" />
                                                </label>
                                                    {
                                                        dataFile && dataFile.name ? 
                                                        <Typography htmlFor="contained-button-file" >{dataFile.name}</Typography>
                                                        : 
                                                        <Typography htmlFor="contained-button-file">{getTranslation('NoChooseFile')}</Typography>
                                                    }
                                            </div>
                                                {
                                                    errors && errors.importFile && errors.importFile.length > 0 ? (
                                                        <>
                                                            <div className="showError" >
                                                            {
                                                                    errors.importFile.map((item) => 
                                                                    <ul>
                                                                        <li>{item}</li>
                                                                    </ul> 
                                                                    ) 
                                                            }
                                                            </div>
                                                        </>
                                                    ) : errors && errors.exists_email  && errors.exists_email.length > 0 ? (
                                                            <div className="showError" >
                                                                <p className="errorTitle">{getTranslation('Emailalreadyexists')}:</p>
                                                                {
                                                                    errors.exists_email.map((item) => 
                                                                    <ul>
                                                                        <li>{item}</li>
                                                                    </ul> 
                                                                    )
                                                                }
                                                            </div>
                                                    ) : errors && errors.invalid_format  && errors.invalid_format.length > 0 ?  (
                                                            <div className="showError" >
                                                                <p className="errorTitle">{getTranslation('Emailalreadyexists')}:</p>
                                                                {
                                                                    errors.invalid_format.map((item) => 
                                                                    <ul>
                                                                        <li>{item}</li>
                                                                    </ul> 
                                                                    )
                                                                }
                                                            </div>
                                                    ) : errors && typeof (errors) === 'string' ?
                                                    (
                                                        <>
                                                            <div className="showError" >
                                                                {errors}
                                                            </div>
                                                        </>
                                                    )
                                                        : ""
                                                }
                                        </Dialog>
                                    )}
                             </div>
                        </Paper>
                    </Box>
             </Grid>                        
         </>
        
    )
}

export default InviteEmail;