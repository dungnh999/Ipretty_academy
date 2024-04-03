import React, { useState } from 'react';
import { makeStyles, Grid, Box, Paper, Typography, Button, styled, FormHelperText , Link} from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider'
import TextInput from 'ipretty/components/TextInput';
import Upload from '../../../public/icon_svg/Upload.svg';
import IconImage from "ipretty/components/IconImage";
import AddButton from "ipretty/components/AddButton";
import Analytics from "public/images/Setup-Analytics-bro.png";
import { ArrowBackIos } from '@material-ui/icons'
import { useHistory } from "react-router-dom";
import ErrorService from 'ipretty/services/ErrorService';
import ReportErrorImage from './components/ReportErrorImage';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import Send from '../../../public/icons_ipretty/Send.png';

const useStyles = makeStyles(
    theme => ({
        root: {
            [theme.breakpoints.up("1600")]: {
                padding: '120px 496px 0px 496px',//fix bug 37
            },
            [theme.breakpoints.down("1600")]: {
                padding: '100px 320px 0px 320px',//fix bug 37
            },
            [theme.breakpoints.down("1500")]: {
                padding: '100px 253px 114px 253px',//fix bug 37
            },
            [theme.breakpoints.down("1300")]: {
                padding: '80px 65px',
            },
            [theme.breakpoints.down("sm")]: {
                padding: '50px 10px 50px 10px',
            },
            '& .layout': {
                [theme.breakpoints.up("md")]: {
                    display: 'flex'
                },
                '& .layoutLeft': {
                    [theme.breakpoints.up("md")]: {
                        paddingLeft: '32px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: '0px 30px'
                    },
                    [theme.breakpoints.down("xs")]: {
                        padding: '0px 15px'
                    },
                    '& .title': {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        lineHeight: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#27384C',
                        paddingTop: '32px'

                    },
                    '& .descripte': {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '18px',
                        lineHeight: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#147B65',
                        paddingTop: '16px',
                        '& .spanStyle': {
                            color: '#c32929',
                            paddingLeft: 5,
                        },
                    },
                    '& .userFormTextarea': {
                        '& .MuiInput-formControl': {
                            background: '#F3F3F3',
                        },
                        '& .MuiTypography-alignLeft': {
                            paddingTop: 32,
                            fontFamily: 'San Francisco Text',
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#147B65',
                            paddingBottom: 8
                        }
                    },
                    '& .attach': {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '18px',
                        lineHeight: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#147B65',
                        paddingTop: '29px',
                        paddingBottom: '8px'
                    },
                    '& .button-upload': {
                        paddingTop: '29px',
                        paddingBottom: '29px',
                        display: 'flex',
                        '& .MuiButton-outlined': {
                            fontFamily: 'San Francisco Text',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '-0.011em',
                            color: '#147B65',
                            padding: '4px 12px 4px 6px',
                            width: '200px',
                            height: '40px'
                        }
                    }
                },
                '& .layoutRight': {
                    [theme.breakpoints.up("md")]: {
                        paddingTop: '99px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        paddingTop: '99px',
                        display: 'none',//fix bug 37
                    },
                    [theme.breakpoints.down("xs")]: {
                        paddingTop: '30px',
                        display: 'none',//fix bug 37
                    },
                    
                    '& img': {
                        [theme.breakpoints.up("md")]: {
                            width: '416px',
                            height: '416px'
                        },
                        [theme.breakpoints.down("sm")]: {
                            width: '316px',
                            height: '316px',
                            marginLeft: '23vw'
                        },
                        [theme.breakpoints.down("xs")]: {
                            width: '316px',
                            height: '316px',
                            marginLeft: '15vw'
                        },
                        [theme.breakpoints.down("500")]: {
                            width: '316px',
                            height: '316px',
                            marginLeft: '4vw'
                        },
                    }
                }

            }
        },
        backGround: {
            width: '100%',
            height: '130px',
            background: '#CECCCC'
        },
        sendStyle: {
            width: '106px',
            height: '40px',
            paddingLeft: '15px',
            fontSize: '14px !important',
            borderRadius: '4px',
            minWidth: '0px',
            marginLeft: '15px',
            '& img': {
                width: '18px',
                height: '18px',
                marginTop: '3px',
            }
        },
        goBack: {
            margin: '16px 0px 0px 32px',
            display: 'flex',
            fontFamily: 'San Francisco Text',
            color: theme.palette.primary.colorText,
            fontFamily: 'San Francisco Text',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '16px',
            letterSpacing: '-0.011em',
            color: '#395B65'
        }

    }))

const Input = styled('input')({
    display: 'none',
});
function ReportError(props) {
    const { getTranslation } = useAuth()
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const [errors, setErrors] = useState({
        report_content: '',
        attachments: ''
    })
    const history = useHistory();
    const [dataReportError, setDataReportError] = useState({
        report_content: '',
        attachments: null
    });
    function onChangePath(e, name) {
        setDataReportError({
            ...dataReportError,
            [name]: e.target.value
        })
    }
    function setImage(image) {
        setDataReportError({
            ...dataReportError,
            attachments: image
        });
    }
    function sendClick() {
        setIsLoading(true);
        let data = new FormData()
        for (let key in dataReportError) {
            if (key == 'attachments' && typeof (dataReportError[key]) === 'string') {
                data.append(key, "");
            } else {
                data.append(key, dataReportError[key]);
            }
        }
        ErrorService.createReportError(data,
            res => {
                setIsLoading(false);
                makeShortMessage(res.data.message, "success")
                setTimeout(() => {
                    goBack()
                }, 1000)
            },
            err => {
                setIsLoading(false);
                setErrors({
                    ...errors,
                    report_content: err.response.data.errors.report_content ? err.response.data.errors.report_content : "",
                    attachments: err.response.data.errors.attachments ? err.response.data.errors.attachments : ""
                })
            }
        )
    }
    function goBack() {
        history.goBack()
    }

    return (
        <>
            <Link
                id="linkBack"
                component="button"
                variant="body2"
                classes={{
                    root: classes.goBack
                }}
                onClick={() =>
                    history.goBack()
                }
            >
                <ArrowBackIos fontSize="small" />
                {getTranslation('Back')}
            </Link>
            <Box className={classes.root}>
                <Paper >
                    <Grid className="layout" item xs={12}>
                        <Grid className="layoutLeft" item xs={12} sm={12} md={6}>
                            <Typography className="title">{getTranslation('helpImproveProduct')}</Typography>
                            <Typography className="descripte">{getTranslation('Description')}<span className="spanStyle">*</span></Typography>
                            <div className="userFormTextarea">
                                <TextInput
                                    id="textFieldDescription"
                                    placeholder={getTranslation('enterDetailedDescription')}
                                    autoFocus
                                    fullWidth
                                    autoComplete="description"
                                    helperText={errors.report_content ? errors.report_content : ''}
                                    error={errors.report_content && errors.report_content.length ? true : false}
                                    value={dataReportError.report_content}
                                    onChange={(e) => onChangePath(e, 'report_content')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    rows={5}
                                />
                            </div>
                            <Typography className="attach">{getTranslation('attach')}</Typography>
                            <div className="content-image">
                                <ReportErrorImage
                                    id='update-avatar'
                                    setImage={setImage}
                                    value={dataReportError.attachments}
                                    classes={classes}
                                />
                            </div>
                            <FormHelperText id="my-helper-text" error={errors.attachments && errors.attachments.length ? true : false}>{errors.attachments}</FormHelperText>
                            <div className="button-upload">
                                <label htmlFor="update-avatar">
                                    <Button variant="outlined" component="span">
                                        <IconImage srcIcon={Upload} />
                                        {getTranslation('uploadPhotoOrVideo')}
                                    </Button>
                                </label>
                                <AddButton
                                    id="btnSubmit"
                                    buttonClass={classes.sendStyle}
                                    label={getTranslation('Send')}
                                    onClick={sendClick}
                                    variant="contained"
                                    loading={isLoading}
                                    fullWidth
                                    iconButton={<IconImage srcIcon={Send}/>}
                                />
                            </div>
                        </Grid>
                        <Grid className="layoutRight" item xs={12} sm={12} md={6}>
                            <img src={Analytics}  />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
export default ReportError;