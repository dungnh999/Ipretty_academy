import React, { useState, useEffect , useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { styled } from "@material-ui/core/styles";
import { ArrowBackIos, Visibility, VisibilityOff } from '@material-ui/icons'
import {Button , TextField, IconButton, InputAdornment, Container, Grid, Typography, Link, makeStyles, Box, Paper  } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import UserService from 'ipretty/services/UserService'
import AddButton from 'ipretty/components/AddButton';
import { useHistory } from "react-router-dom";
import BreadCrumbs from 'ipretty/components/BreadCrumbs'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import IconImage from "ipretty/components/IconImage";
import Password from "../../../../public/icons_ipretty/bro.svg"
import Save from "../../../../public/icons_ipretty/Save.png"
const useStyles = makeStyles(theme => ({
    bannerDetail: {
        '& .bannerDetail__banner': {
            '& .bannerDetail__banner__urlRedirect': {
                padding: '16px 0px 0px 80px',
                [theme.breakpoints.down("xs")]: {
                    padding: '7px 0px 0px 15px', 
                },
                "& .header__bread-crumd": {
                    "& .MuiBreadcrumbs-ol": {
                        "& .MuiTypography-root": {
                            color: '#6F9396',
                            fontSize: 14,
                            fontFamily : 'San Francisco Text Bold',
                        }
                    },
                    "& svg " : {
                        color: '#6F9396'
                    }
                },
            },
            '& .bannerDetail__banner__buttonGoback': {
                padding: '20px 0px 0px 93.74px', 
                [theme.breakpoints.down("xs")]: {
                    padding: '0px 0px 0px 32px', 
                },
                display: 'flex', 
                fontWeight: 600,
                fontFamily: 'San Francisco Text',
                color: '#395B65',
            },
        },
    },
    
    root : {
        width : '100vw',
        [theme.breakpoints.down("xl")]: {
            padding : "32px calc((100% - 928px)/2) 20.75rem",
        },
        [theme.breakpoints.down("lg")]: {
            padding : '32px calc((100% - 928px)/2) 50px',
        },
        [theme.breakpoints.down("xs")]: {
            padding : '14px',
         },
        // [theme.breakpoints.down('md')]: {
        //     padding : "32px calc((100% - 928px)/2) 84px",
        // },
        borderRadius : '8px',
        flexWrap: 'wrap',
        '& .contentInfo__title' : {
            marginBottom : '23px',
            fontWeight: 700,
            fontSize: '20px',
            fontFamily: 'San Francisco Text',
            color: theme.palette.primary.colorTextTitle
        },
        '& .paperStyle' : {
            padding: '32px',
        },
        '& .contentInfo__left' : {
            paddingRight : '16px',
            "& .errorText ": {
                fontSize : 12,
                color : '#f44336',
            },
            "& .centerInput": {
                color: '#27384C',
                fontWeight: '400',
                fontSize: '16px',   
                marginLeft : '12px',
            },
            "& .textField" : {
                paddingBottom : 15
            },
            '& .MuiInput-formControl' : {
                background : '#F3F3F3',
                border : '1px solid #DADFD9',
                '& .input' : {
                    fontStyle : 'normal'
                }
            },
            '& .errorInput' : {
                color: 'red',
               "& .MuiInputBase-formControl" :{
               border: '1.5px solid red',
               }
             },
            '& .button__change' : {
                '& button' : {
                    height : '40px',
                    minWidth : '109px',
                    fontSize : '16px'
                },
                '& img' : {
                    width: 20
                }
            },
        },
        '& .contentInfo__right' : {
            [theme.breakpoints.up("lg")]: {
                padding : '45px 80px 0px',
            },
            [theme.breakpoints.up("xl")]: {
                padding : '50px 80px 0px',
            },
            [theme.breakpoints.down("xs")]: {
               display : 'none',
            },
        }
    }
}))

function FormPassword (props) {
    const { } = props
    const classes = useStyles()
    const { getTranslation, user, logout  } = useAuth()
    const userRole = user.menuroles
    let history = useHistory()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Profile'), path: '/profile' },
    ], [])
    const titlePage = getTranslation('Password')
    const [ errors ,setErrors ] = useState();
    const [dataPasswords, setDataPasswords]  = useState({
        current_password :'',
        new_password : '',
        confirm_password : ''
    })
    
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

    const handleChange = (event, nameField) => {
        setDataPasswords({
            ...dataPasswords,
            [nameField] : event.target.value
        });
    }
    function handleChangePassword () {
        setErrors(false)
        setLoadingButtonAction(false);
        const data = new FormData()
        for (let key in dataPasswords){
            data.append(key, dataPasswords[key]);
        }
        UserService.change_password(
            data,
            res => {
                makeShortMessage(getTranslation('Changepasswordsuccessfully'), "success");
                setTimeout(() => {
                    history.push('/profile')
                }, 2000)
            },
            err => {
                // setLoadingButtonAction(false)
                console.log(err)
                _handleError(err)
                
            }
        ) 
    }

    function _handleError(err) {
        if(err.response.data){
            if(err.response.data.errors){
              setErrors(err.response.data.errors)
            } else {
              setErrors(err.response.data)
            } 
          }
          return;
        
    }
    function handleChangePage (item) {
         history.push(item.path)
    }
    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword)
    };
    
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    };
    
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    };

    return (
        <>
            <div className={classes.bannerDetail}>
                <div className="bannerDetail__banner">
                    <div className="bannerDetail__banner__urlRedirect">
                        <div className="header__bread-crumd">
                            <BreadCrumbs classes={classes} links={links} titleCurrent={titlePage} />
                        </div>
                    </div>
                    <div className="bannerDetail__banner__buttonGoback">
                        <Goback
                            path="/profile"
                        />
                    </div> 
                </div>
            </div> 
            <Grid container >
                    <Box className={classes.root}>
                        <Paper elevation={1} className="paperStyle" >
                            <Grid container>
                                <Grid  item xs={12} md={6} sm={6} lg={6} xl={6} className="contentInfo__left">
                                    <div>
                                        <div className="contentInfo__title">
                                                {getTranslation('ChangePassword')}
                                         </div>
                                         <div>
                                            <label className='centerInput'>{getTranslation('Currentpassword')}</label>
                                            <TextField
                                                id="textFieldNewPassword"
                                                fullWidth
                                                placeholder={'********'}
                                                type={showOldPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                // value={dataPasswords}
                                                helperText={errors && (errors.current_password || errors.message) ? errors.current_password || errors.message : ' ' }
                                                error={errors && (errors.current_password || errors.message) ? true : false}
                                                onChange={(e) => handleChange(e, 'current_password')}
                                                onKeyPress={validateKeyPress}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowOldPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            >
                                                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    className={`textField ${errors && (errors.current_password || errors.message) ? "errorInput" : ''} `}
                                                />
                                            <label className='centerInput' >{getTranslation('Newpassword')}</label>
                                            <TextField
                                                id="textFieldNewPassword"
                                                fullWidth
                                                placeholder={'********'}
                                                type={showNewPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                // value={password}
                                                helperText={(errors && errors.new_password) ? errors.new_password : ' ' }
                                                error={errors && errors.new_password ? true : false}
                                                onChange={(e) => handleChange(e, 'new_password')}
                                                onKeyPress={validateKeyPress}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowNewPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            >
                                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    className={`textField ${errors && errors.new_password ? "errorInput" : ''} `}
                                                />
                                                <label className='centerInput' >{getTranslation('Retypenewpassword')}</label>
                                                <TextField
                                                    id="textFieldReNewPassword"
                                                    fullWidth
                                                    placeholder={'********'}
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    autoComplete="confirm-password"
                                                    helperText={errors && errors.confirm_password ? errors.confirm_password : ' '}
                                                    error={errors && errors.confirm_password ? true : false}
                                                    onChange={(e) => handleChange(e, 'confirm_password')}
                                                    onKeyPress={validateKeyPress}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        endAdornment: <InputAdornment position="end">
                                                            <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            >
                                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    className={`textField ${errors && errors.confirm_password ? "errorInput" : ''} `}
                                                />
                                        </div>
                                        
                                        <div className="button__change">
                                            <AddButton 
                                                label={getTranslation('Save')} 
                                                id="change-button" 
                                                onClick={handleChangePassword}
                                                buttonClass="button banners__button" 
                                                variant='contained' 
                                                iconButton={<IconImage srcIcon={Save} />}
                                                // disabled={isDisabled ? true : false} 
                                                // loading={loadingButtonActionCreate}  
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container item md={6} sm={6} lg={6} xl={6} className="contentInfo__right">
                                    <div className="img__password">
                                        <img src={Password}></img>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
            </Grid>                        
        </>
        
    )
}

export default FormPassword;