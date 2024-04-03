import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { styled } from "@material-ui/core/styles";
import { ArrowBackIos, Visibility, VisibilityOff } from '@material-ui/icons'
import {Button , TextField, IconButton, InputAdornment, Container, Grid, Typography, Link, makeStyles, Box, Paper  } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import UserService from 'ipretty/services/UserService'
import AddButton from 'ipretty/components/AddButton';
import contextHelper from 'ipretty/helpers/contextHelper'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import IconImage from "ipretty/components/IconImage";
import Password from "../../../../public/icons_ipretty/bro.svg"
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
            '& .contentInfo__title' : {
                marginBottom : '20px',
                fontWeight: 700,
                fontSize: '20px',
                fontFamily: 'San Francisco Text',
                color: theme.palette.primary.colorTextTitle
            },
            '& .paperStyle' : {
                padding: '32px',
            },
            '& .contentInfo__left' : {
                paddingRight : '77px',
                [theme.breakpoints.down("sm")]: {
                    paddingRight : '0'
                 },
                [theme.breakpoints.down("xs")]: {
                   paddingRight : '0'
                },
                '& .spanStyle' : {
                    color: '#c32929'
                },
                "& .centerInput": {
                    color: '#27384C',
                    fontWeight: '400',
                    fontSize: '16px',   
                    marginLeft : '12px',
                },
                '& .MuiInput-formControl' : {
                    background : '#F3F3F3',
                    border : '1px solid #DADFD9',
                    '& input' : {
                        fontStyle : 'normal'
                    }
                },
                '& .textField' : {
                    "& input" :{
                        "&::placeholder" :{
                        fontStyle : 'normal'
                        }
                    },
                },
                '& .errorInput' : {
                    color: 'red',
                "& .MuiInputBase-formControl" :{
                    border: '1.5px solid red',
                }
                },
                '& .button__change' : {
                    marginTop : '14px',
                    '& button' : {
                        height : '36px',
                        width : '95px'
                    }
                },
            },
            '& .contentInfo__right' : {
                [theme.breakpoints.up("lg")]: {
                    padding: '50px 50px 0',
                  },
                  [theme.breakpoints.up("xl")]: {
                    padding : '35px 50px 0px',
                  },
                  [theme.breakpoints.down("md")]: {
                    padding : '35px 50px 0px',
                 },
                  [theme.breakpoints.down("sm")]: {
                    display : 'none'
                 },
                  [theme.breakpoints.down("xs")]: {
                    display : 'none'
                 },
            '& img' : {
                width: '15vw',
                height : '14.063vw',
                [theme.breakpoints.down("md")]: {
                    width: '23vw',
                    height : '24.063vw',
                 },
                }
            },

        }
    }))

function RegisterAccount (props) {
    const classes = useStyles()
    const {user , setUser , errors} = props
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const { getTranslation, logout  , updateProfileUser} = useAuth()
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

        if (nameField === 'role') {
            let userRole = e.target.value;
            let role = [...user.role];
            
            if (role.indexOf(userRole) == -1) {
                role.push(userRole);

            } else {
                role.splice(role.indexOf(userRole), 1);

            }
                setUser({ ...user, role: role });

        }else {
            setUser({ ...user, [nameField]: e.target.value });
        }
    }
  
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    };
    
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    };

    return (
        <>
            <Grid container >
                    <Box className={classes.root}>
                        <Paper elevation={1} className="paperStyle" >
                            <Grid container>
                                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__left">
                                    <div>
                                        <div className="contentInfo__title">
                                                {getTranslation('InformationLogin')}
                                         </div>
                                         <div>
                                            <label className='centerInput'>E-mail:<span className="spanStyle">*</span></label>
                                            <TextField
                                                id="textFieldUsername"
                                                placeholder={getTranslation('EnterEmail')}
                                                fullWidth
                                                autoComplete="username"
                                                autoFocus
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
                                            <label className='centerInput'>{getTranslation('Password')}: </label>
                                            <TextField
                                                id="textFieldNewPassword"
                                                fullWidth
                                                placeholder={'********'}
                                                type={showNewPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                // value={password}
                                                helperText={(errors && errors.password) ? errors.password : ' ' }
                                                error={errors && errors.password}
                                                onChange={onChange('password')}
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
                                                    className={`textField ${errors && errors.password ? "errorInput" : ''} `}
                                                />
                                                <label className='centerInput' >{getTranslation('Confirmpassword')}:</label>
                                                <TextField
                                                    id="textFieldReNewPassword"
                                                    fullWidth
                                                    placeholder={'********'}
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    autoComplete="confirm-password"
                                                    helperText={errors && errors.confirmpassword ? errors.confirmpassword : ' '}
                                                    error={errors && errors.confirmpassword}
                                                    onChange={onChange('confirmpassword')}
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
                                                    className={`textField ${errors && errors.confirmpassword ? "errorInput" : ''} `}
                                                />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__right">
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

export default RegisterAccount;