import React, { useState, useEffect , useCallback , useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import { styled } from "@material-ui/core/styles";
import Avatar from './Avatar'
import {Button , TextField, Radio, RadioGroup , FormControlLabel, TextareaAutosize, Grid, Typography, Link, makeStyles, Box, Paper, FormControl ,  FormGroup,  Checkbox  } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import UserService from 'ipretty/services/UserService'
import Check from '../../../../public/icons_ipretty/Check.svg'
import IconImage from "ipretty/components/IconImage";
import Upload from '../../../../public/icons_ipretty/Upload.svg'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import DatePicker from 'ipretty/components/DatePicker/DatePicker';
import moment from 'moment'
const useStyles = makeStyles(theme => ({
    root : {
        width : '100vw',
        [theme.breakpoints.up("lg")]: {
            padding : '0 0 8rem',
        },
        [theme.breakpoints.up("xl")]: {
            padding : '0 0 8rem',
        },
        borderRadius : '8px',
        flexWrap: 'wrap',
        fontFamily: 'San Francisco Text',
        '& .contentInfo__title' : {
            marginBottom : '20px',
            fontWeight: 700,
            fontSize: '20px',
            color: theme.palette.primary.colorTextTitle
        },

        '& .userTitle' : {
            color: '#27384C',
            fontSize: '16px',
            marginLeft : '12px',
            marginBottom : '4px'
        },
        '& .userForm' : {
            marginBottom : '15px',
            '& .spanStyle' : {
                color: '#c32929'
            }
        },
        '& .errorInput' : {
            color: 'red',
           "& .MuiInputBase-formControl" :{
                border: '1.5px solid red',
           }
         },
        '& .textField' : {
            "& input" :{
                "&::placeholder" :{
                  fontStyle : 'normal'
                }
            },
            "& .MuiInput-root" : {
                background : '#F3F3F3',
                height : '36px',
                [theme.breakpoints.up("xs")]: {
                    padding : '2px 10px',//fix bug 95
                }
            },
        },
        '& .contentInfo__left' : {
            display: 'flex',
            padding : '32px',
            flexDirection: 'column',
            [theme.breakpoints.down("sm")]: {
                paddingBottom : 0
             },
            '& .userFormEmail' : {
                paddingTop : '10px',
                display: 'flex',
                alignItems: 'center',
            },
            '& .userCheckBox' : {
                paddingBottom : '25px'
            },
            '& .userInputEmail' : {
               padding : '3px 12px'
            },
            '& .userTitleEmail' : {
                color: '#DADFD9'
            },
            '& .userFormBirthday' : {
                '& .MuiTextField-root' : {
                    width : '100%',
                }, 
                '& .MuiFormHelperText-root' : {
                    color : '#f44336'
                },
                '& input' : {
                    padding : '10px 16px',
                    background : '#F3F3F3',
                    borderRadius : 4,
                },
                '& .showError' : {
                    fontWeight: 400,
                    fontSize: 11.5,
                    color: '#f44336',
                    paddingTop: 4,
                    paddingBottom : 15
                },
                '& .formBirthday' : {
                    paddingBottom : 20
                }
            },
            '& .button-check' : {
                marginLeft : '12px',
                '& img' : {
                    width: '17px'
                }
            },
            '& .MuiInputBase-adornedEnd' : {
                background : '#F3F3F3',
                height : '36px',
            },
           '& .radioGroup' : {
                marginLeft : '12px',
                color: '#395B65',
                '& .MuiTypography-body1' : {
                    fontSize : 14
                }
            },
            '& .contentInfo__left__button' : {
                marginTop : '30px',
                '& .button' : {
                    minWidth : '109px'
                }
            }
        },
        '& .contentInfo__right' : {
            display: 'flex',
            padding : '32px',
            flexDirection: 'column',
            '& .userFormTextarea' : {
                '& .MuiInput-formControl' : {
                    background : '#F3F3F3',
                },
                '& .textArea' : {
                    marginTop: '4px'
                }
            },
            '& .contentInfo__right__img' : {
                '& .MuiBox-root-53' : {
                    marginTop : '0',
                    padding : '0',
                    marginBottom : '0'
                },
                '& .contained-button-file' : {
                    display: 'flex',
                    marginBottom : '36px',
                    '& .contentInfo__img--avatar' : {
                        display: 'flex',
                        '& .MuiBox-root' : {
                            marginTop : '0',
                            padding : '0',
                            marginBottom : '0'
                        },
                        '& .update-file' : {
                            '& .MuiAvatar-circular' : {
                                width: '100px',
                                height: '100px',
                                borderRadius : '50px',
                            },
                        },
                        '& .MuiAvatar-colorDefault' : {
                            width: '100px',
                            height: '100px',
                            borderRadius : '50px',
                        },
                    },
                    '& .button__upload' : {
                        '& .MuiButton-outlined' :{
                            height: '36px',
                            marginTop: '32px',
                            marginLeft: '16px'
                        },
                        '& img' : {
                            width: '12px',
                            marginTop : '6px',
                        }
                    }
                }
            }
        }
    }
}))
const Input = styled('input')({
    display: 'none',
  });
function InformationAccount (props) {
    const {departments , user  ,setUser ,errors , isCreate} = props
    const classes = useStyles()
    const { getTranslation, logout  , updateProfileUser} = useAuth()
    const [avatar, setAvatar] = useState()
    const { makeShortMessage } = useNotiStackContext();
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [ roles , setRoles ] = useState([
        {id : 'user', name :getTranslation('Student')},
        {id : 'employee', name :getTranslation('Staff')},
        {id : 'admin', name :getTranslation('Admin')},
    ])
   
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
    
    useEffect(() => {
        if (avatar && avatar.name) {
            setUser({ ...user, avatar: avatar }); 
        }
    }, [avatar]);
   
    const onChange = nameField => (e) => {
        if(nameField === 'department_id' && e.target.value != 1){
            setUser({ ...user, [nameField]: e.target.value , isTeacher : 0 });  
        } else if (nameField === 'avatar'){
            setUser({ ...user, avatar: avatar }); 
        }  else {
            setUser({ ...user, [nameField]: e.target.value });  
        }
    }
    const handleChange = (e) => {
        setUser({
             ...user, 
             department_name: e.target.value
        }); 
    }
    
    function handleCheckBox (e) {
        setUser({ ...user, isTeacher : e.target.checked})
    }
    
    const onChangeDatetime = nameField => e => {
        setUser({
            ...user,
            [nameField] : moment(e).format('yyyy-MM-DD')
        })
    }

    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };
    // console.log(user, '-------user')
    return (
        <>
                <Grid container >
                    <Box className={classes.root}>
                        <Paper elevation={1} >
                            <Grid container>
                                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__left">
                                    <div className="contentInfo__title">
                                        {getTranslation('Personalinformation')}
                                    </div>
                                    <div className="userForm">                              
                                        <Typography className="userTitle" >{getTranslation('AccountType')}:<span className="spanStyle">*</span> </Typography>
                                            <div className="userInput">
                                                <TextInput
                                                    select
                                                    options={roles}
                                                    onChange={onChange('role')}
                                                    fullWidth
                                                    value={user.role || '' }
                                                    noMargin
                                                    helperText={(errors && errors.role) ? errors.role : ''}
                                                    error={errors && errors.role}
                                                    className="textField"
                                                /> 
                                            </div>
                                    </div>
                                    <div className="userForm">
                                        <Typography className="userTitle" >{getTranslation('Gender')}:<span className="spanStyle">*</span> </Typography>
                                        <div className="userCheckBox">
                                            <RadioGroup
                                                onChange={onChange('gender')}
                                                className="radioGroup"
                                                row aria-label="gender"
                                                name="row-radio-buttons-group"
                                                value={user.gender || ''}
                                            >
                                                <FormControlLabel value="Male" control={<Radio />} label={getTranslation('Male')} />
                                                <FormControlLabel value="Female" control={<Radio />} label={getTranslation('Female')} />
                                                <FormControlLabel value="Other" control={<Radio />} label={getTranslation('Other')} />
                                            </RadioGroup>
                                        </div>
                                        <div className="userFormBirthday">
                                            <Typography className="userTitle" >{getTranslation('Birthday')}:<span className="spanStyle">*</span></Typography>
                                            <div className="userInputBirthday">
                                                <DatePicker
                                                    type={'date-picker'}
                                                    value={user.birthday || null}
                                                    handleDateChange={onChangeDatetime('birthday')}
                                                    disablePast={false}
                                                    helperText={errors && Object.keys(errors).length > 0 && errors['birthday'] ? errors['birthday'] : ''}
                                                    className={errors && errors.birthday ? "errorInput" : ''}
                                                />
                                                {errors && Object.keys(errors).length > 0 && errors['birthday'] ? (
                                                    <div className="showError">{errors['birthday']}</div>
                                                ) : 
                                                    <div className="formBirthday"></div>
                                                }
                                            </div>
                                        </div>
                                        <div className="userForm">
                                            <Typography className="userTitle" >{getTranslation('Phone')}:<span className="spanStyle">*</span></Typography>
                                            <div className="userInput">
                                                <TextField
                                                    placeholder={getTranslation('Fillintheinformation')}
                                                    autoFocus
                                                    fullWidth
                                                    value={user.phone || ''}
                                                    onChange={onChange('phone')}
                                                    onKeyPress={validateKeyPress}
                                                    helperText={(errors && errors.phone) ? errors.phone : ''}
                                                    error={errors && errors.phone}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    className={`textField ${errors && errors.phone ? "errorInput" : ''} `}
                                                />
                                            </div>
                                        </div>
                                        <div className="userForm">
                                            <Typography className="userTitle" >{getTranslation('Address')}:<span className="spanStyle">*</span></Typography>
                                            <div className="userInput">
                                                <TextField
                                                    placeholder={getTranslation('Fillintheinformation')}
                                                    autoFocus
                                                    fullWidth
                                                    value={user.address || ''}
                                                    helperText={(errors && errors.address) ? errors.address : ''}
                                                    error={errors && errors.address}
                                                    onChange={onChange('address')}
                                                    onKeyPress={validateKeyPress}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    className={`textField ${errors && errors.address ? "errorInput" : ''} `}
                                                />
                                            </div>
                                        </div>
                                        <div className="userForm">
                                            <Typography className="userTitle" >{getTranslation('Code')}:<span className="spanStyle">*</span></Typography>
                                            <div className="userInput">
                                                <TextField
                                                    placeholder={getTranslation('Fillintheinformation')}
                                                    autoFocus
                                                    fullWidth
                                                    value={user.code || ''}
                                                    helperText={(errors && errors.code) ? errors.code : ''}
                                                    error={errors && errors.code}
                                                    onChange={onChange('code')}
                                                    onKeyPress={validateKeyPress}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    className={`textField ${errors && errors.code ? "errorInput" : ''} `}
                                                /> 
                                            </div>                
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__right">
                                    <div>
                                        <div className="contentInfo__right__img">
                                            <div className="contentInfo__title">
                                                    {getTranslation('Avatar')}
                                            </div>
                                            <div className="contained-button-file">
                                                <div className="contentInfo__img--avatar">
                                                    <Avatar
                                                        id="update-avatar"
                                                        classes={classes}
                                                        getTranslation={getTranslation}
                                                        avatar={user && user.avatar ? user.avatar : avatar}
                                                        onChange={onChange('avatar')}
                                                        // value={user.avatar}
                                                        setAvatar={setAvatar}
                                                    />
                                                </div>
                                                <div className="button__upload">
                                                    <label htmlFor="update-avatar">
                                                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                                        <Button variant="outlined" 
                                                                component="span"    
                                                        >
                                                            <IconImage srcIcon={Upload} />
                                                            {getTranslation('UpLoad')} 
                                                        </Button>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contentInfo__right__info">
                                            <div className="contentInfo__title">
                                                {getTranslation('MainInformation')}
                                            </div>
                                            <div className="userForm">
                                                <Typography className="userTitle" >{getTranslation('name')}:<span className="spanStyle">*</span></Typography>
                                                <div className="userInput">
                                                    <TextField
                                                        placeholder={getTranslation('Fillintheinformation')}
                                                        autoFocus
                                                        fullWidth
                                                        value={user.name}
                                                        helperText={(errors && errors.name) ? errors.name : ''}
                                                        error={errors && errors.name}
                                                        onChange={onChange('name')}
                                                        onKeyPress={validateKeyPress}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                        }}
                                                        className={`textField ${errors && errors.name ? "errorInput" : ''} `}
                                                    />
                                                </div>
                                            </div>
                                                <div className="userForm">
                                                    <Typography className="userTitle" >{getTranslation('Company')}:</Typography>
                                                    <div className="userInput">
                                                        <TextField
                                                            autoFocus
                                                            placeholder={getTranslation('Fillintheinformation')}
                                                            fullWidth
                                                            value={user.company || ''}
                                                            onChange={onChange('company')}
                                                            onKeyPress={validateKeyPress}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            className={`textField ${errors && errors.company ? "errorInput" : ''} `}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="userForm">
                                                    <Typography className="userTitle" >{getTranslation('Position')}:</Typography>
                                                    <div className="userInput">
                                                        <TextField
                                                            autoFocus
                                                            fullWidth
                                                            value={user.position || ''}
                                                            placeholder={getTranslation('Fillintheinformation')}
                                                            onChange={onChange('position')}
                                                            onKeyPress={validateKeyPress}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            className={`textField ${errors && errors.position ? "errorInput" : ''} `}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="userForm">                              
                                                    <Typography className="userTitle">{getTranslation('Department')}:
                                                        {
                                                            user && user.role != 'user' ?
                                                                <span className="spanStyle">*</span> 
                                                            : ''
                                                        }
                                                    </Typography>
                                                    <div className="userInput">
                                                        {
                                                            user && user.role === 'user'  ? 
                                                              <>
                                                                <div className="userInput">
                                                                    <TextField
                                                                        autoFocus
                                                                        fullWidth
                                                                        // helperText={(errors && errors.department) ? errors.department : ''}
                                                                        value={user.department_name || ''} 
                                                                        placeholder={getTranslation('Fillintheinformation')}
                                                                        onChange={handleChange}                                                                        onKeyPress={validateKeyPress}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        InputProps={{
                                                                            disableUnderline: true,
                                                                        }}
                                                                        className={`textField ${errors && errors.department ? "errorInput" : ''} `}
                                                                    />
                                                                </div>
                                                              </> :
                                                                (departments && departments.length && departments.length > 0) ? 
                                                                    <TextInput
                                                                        select
                                                                        options={departments}
                                                                        label="Tình trạng"
                                                                        onChange={onChange("department_id")}
                                                                        fullWidth
                                                                        value={user.department_id || ""}
                                                                        noMargin
                                                                        helperText={(errors && errors.department_id) ? errors.department_id : ''}
                                                                        error={errors && errors.department_id}
                                                                        className="textField"
                                                                    /> :''
                                                                    } 
                                                                {user.department_id == 1 && user.role !== 'user' ? 
                                                                    <>
                                                                        <div className="checkBox">
                                                                            <FormControl component="fieldset">
                                                                                <FormGroup>                 
                                                                                    <FormControlLabel
                                                                                        control={<Checkbox />}
                                                                                        label={getTranslation("Teacher")}
                                                                                        onChange={handleCheckBox}
                                                                                        checked={user.isTeacher}
                                                                                    />
                                                                                </FormGroup>
                                                                            </FormControl>
                                                                        </div>
                                                                    </>
                                                                : ''    
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="userFormTextarea">
                                                            <Typography className="userTitle" >{getTranslation('About')}:</Typography>
                                                            <div className="userInputTextarea">
                                                                <TextInput
                                                                    placeholder={getTranslation('Fillintheinformation')}
                                                                    rows={5}
                                                                    fullWidth
                                                                    onChange={onChange("about")}
                                                                    value={user.about || ''}
                                                                    InputProps={{
                                                                        disableUnderline: true,
                                                                    }}
                                                                    className='textArea'
                                                                />     
                                                            </div>
                                                        </div>
                                                        {/* <div className="userFormTextarea">
                                                            <Typography className="userTitle" >{getTranslation('About')}:</Typography>
                                                            <div className="userInputTextarea">
                                                                <TextareaAutosize
                                                                    minRows={3}
                                                                    value={user.about || ''}
                                                                    onChange={onChange("about")}
                                                                    className="textareaInput"
                                                                    aria-label="maximum height"
                                                                    placeholder={getTranslation('Fillintheinformation')}
                                                                />    
                                                            </div>
                                                        </div>  */}
                                                    </div>  
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
        </>
        
    )
}

export default InformationAccount;