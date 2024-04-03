import React, { useState } from 'react';
import { makeStyles, Grid, Box, Paper, Typography, Link } from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider';
import TextInput from 'ipretty/components/TextInput';
import AddButton from "ipretty/components/AddButton";
import { ArrowBackIos } from '@material-ui/icons'
import { useHistory } from "react-router-dom";
import { useNotiStackContext } from 'ipretty/context/Notistack';
import ContackWithUs from '../../../public/images/Contact-with-us.png';
import Send from '../../../public/icons_ipretty/Send.png';
import ConntactWithUsService from 'ipretty/services/ContactWithUsService';
import IconImage from "ipretty/components/IconImage";

const useStyles = makeStyles(
    theme => ({
        root: {
            [theme.breakpoints.up("1500")]: {
                padding: '160px 496px 0px 496px',
            },
            [theme.breakpoints.down("1500")]: {
                padding: '114px 253px 114px 253px',
            },
            [theme.breakpoints.down("1300")]: {
                padding: '60px 65px 70px 65px',
            },
            [theme.breakpoints.down("sm")]: {
                padding: '38px 10px 40px 10px'
            },
            '& .layout': {
                [theme.breakpoints.up("md")]: {
                    display: 'flex',
                },
                '& .layoutLeft': {
                    [theme.breakpoints.up("md")]: {
                        paddingLeft: '32px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        paddingLeft: '20vw',
                    },
                    [theme.breakpoints.down("xs")]: {
                        paddingLeft: '32px',
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
                    '& .label': {
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
                        paddingBottom: '8px',
                        '& .spanStyle': {
                            color: '#c32929',
                            paddingLeft: 5,
                        },
                    },
                    '& .userInput': {
                        '& .MuiFormControl-fullWidth': {
                            [theme.breakpoints.up("sm")]: {
                                width: '100%',
                            }, 
                            [theme.breakpoints.down("xs")]: {
                                width: '90%',
                            },
                        },
                        '& .MuiInput-formControl': {
                            background: '#F3F3F3',
                            maxWidth: '416px',
                            maxHeight: '36px'
                        },
                        '& .MuiTypography-alignLeft': {
                            fontFamily: 'San Francisco Text',
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#147B65',
                            paddingBottom: '8px',
                        },
                        '& .MuiFormControl-marginNormal': {
                            marginTop: '0px !important'
                        }
                    },
                },
                '& .layoutRight': {
                    [theme.breakpoints.up("md")]: {
                        paddingTop: '86px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        paddingTop: '26px',
                        paddingLeft: '15vw'
                    },    
                    [theme.breakpoints.down("xs")]: {
                        paddingTop: '26px',
                        paddingLeft: '0vw'
                    },  
                    '& img': {
                        [theme.breakpoints.up("md")]: {
                           width: '416px',
                           height: '416px',
                        },
                        [theme.breakpoints.down("sm")]: {
                            width: '416px',
                           height: '416px',
                        },
                        [theme.breakpoints.down("xs")]: {
                            width: '90vw',
                            height: '60vh'
                        },
                    }
                }

            }
        },
        sendStyle: {
            width: '106px',
            height: '40px',
            fontSize: '14px !important',
            borderRadius: '4px',
            minWidth: '0px',
            marginTop: '14px',
            marginBottom: '33px',
            '& img': {
                width: '18px',
                height: '18px',
                marginTop: '3px',
            }
        },
        goBack: {
            margin: '16px 0px 0px 32px',
            [theme.breakpoints.down("xs")]: {
                margin: '16px 0px 0px 12px', //fix mui ten back doi vs acc hoc sinh
            }, 
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
function ReportError(props) {
    const { getTranslation } = useAuth()
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const history = useHistory();
    const [errors, setErrors] = useState({
        reporter_name: '',
        reporter_phone: '',
        reporter_email: '',
        report_content: ''
    })
    const [dataContactWithUs, setDataContacWithUs] = useState({
        reporter_name: '',
        reporter_phone: '',
        reporter_email: '',
        report_content: ''
    });

    const listInput = [
        { id: 0, label: getTranslation('firstAndLastName'), onChange: onChangePath, placeholder: getTranslation('enterYourFirstAndLastName'), value: dataContactWithUs.reporter_name, isTextField: true, name: "reporter_name" },
        { id: 1, label: getTranslation('phone'), onChange: onChangePath, placeholder: getTranslation('enterYourPhoneNumber'), value: dataContactWithUs.reporter_phone, isTextField: false, name: "reporter_phone" },
        { id: 2, label: 'Email', onChange: onChangePath, placeholder: getTranslation('EnterEmail'), value: dataContactWithUs.reporter_email, isTextField: true, name: "reporter_email" },
        { id: 3, label: getTranslation('contactContent'), onChange: onChangePath, placeholder: getTranslation('enterContactContent'), value: dataContactWithUs.report_content, isTextField: true, name: "report_content" }
    ];
    const renderInput = listInput => {
        return listInput.map((item) => (
            <div key={item.id}>
                <Typography className="label">{item.label}{item.isTextField ? <span className="spanStyle">*</span> : ''}</Typography>
                <>
                    {
                        <div className="userInput">
                            <TextInput
                                placeholder={item.placeholder}
                                autoFocus
                                fullWidth
                                value={item.value}
                                name={item.name}
                                onChange={(e) => item.onChange(e, item.name)}
                                error={errors[item.name] && errors[item.name].length ? true : false}
                                helperText={errors[item.name]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        </div>
                    }
                </>
            </div>
        ))
    };


    function onChangePath(e, name) {
        setDataContacWithUs({
            ...dataContactWithUs,
            [name]: e.target.value
        })
    }

    function sendClick() {
        setIsLoading(true);
        let data = new FormData()
        for (let key in dataContactWithUs) {
            data.append(key, dataContactWithUs[key]);
        }
        ConntactWithUsService.createConntactWithUs(data,
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
                    reporter_name: err.response.data.errors.reporter_name ? err.response.data.errors.reporter_name : "",
                    reporter_phone: err.response.data.errors.reporter_phone ? err.response.data.errors.reporter_phone : "",
                    reporter_email: err.response.data.errors.reporter_email ? err.response.data.errors.reporter_email : "",
                    report_content: err.response.data.errors.report_content ? err.response.data.errors.report_content : ""
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
                            <Typography className="title">{getTranslation('contactComments')}</Typography>
                            {
                                listInput && listInput.length > 0 ? renderInput(listInput) : ""
                            }
                            <AddButton
                                id="btnSubmit"
                                buttonClass={classes.sendStyle}
                                label={getTranslation('Send')}
                                onClick={sendClick}
                                variant="contained"
                                loading={isLoading}
                                fullWidth
                                iconButton={<IconImage srcIcon={Send} />}
                            />
                        </Grid>
                        <Grid className="layoutRight" item xs={12} sm={12} md={6}>
                            <img src={ContackWithUs} width={416} height={416} />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
export default ReportError;