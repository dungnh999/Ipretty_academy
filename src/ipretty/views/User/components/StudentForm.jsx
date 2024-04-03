import React, { useState, useEffect , useCallback , useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import Skeleton from 'ipretty/components/Skeleton'
import SnackBar from 'ipretty/components/SnackBar'
import General from './General'
import { styled } from "@material-ui/core/styles";
import Avatar from './Avatar'
import TextInput from 'ipretty/components/TextInput'
import { useHistory } from "react-router-dom";
import {Button , TextField, Radio, RadioGroup , TextareaAutosize ,FormControlLabel, Container, Grid, Typography, Link, makeStyles, Box, Paper  } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import UserService from 'ipretty/services/UserService'
import AddButton from 'ipretty/components/AddButton';
import contextHelper from 'ipretty/helpers/contextHelper'
import Save from '../../../../public/icons_ipretty/Save.png'
import IconImage from "ipretty/components/IconImage";
import Logo from "ipretty/components/Logo"
import Check from '../../../../public/icons_ipretty/Check.svg'
import Upload from '../../../../public/icons_ipretty/Upload.svg'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import DatePicker from 'ipretty/components/DatePicker/DatePicker';
import BreadCrumbs from 'ipretty/components/BreadCrumbs'
import moment from 'moment'

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
                padding: '7px 0px 0px 93.74px', 
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
    errorInput : {
        color: 'red',
       "& .MuiInputBase-formControl" :{
       border: '1.5px solid red',
       }
     },
    root : {
        width : '100vw',
        [theme.breakpoints.up("lg")]: {
            padding : '27px 22.878vw 64px',
        },
        [theme.breakpoints.up("xl")]: {
            padding : '27px 25.833vw 20.75rem',
        },
        [theme.breakpoints.down("md")]: {
            padding : '32px',
        },
        [theme.breakpoints.down("xs")]: {
            padding : '6px',
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
            marginBottom : '20px',
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
            },
        },
        '& .contentInfo__left' : {
            display: 'flex',
            padding : '32px',
            flexDirection: 'column',
            paddingRight: '48px',
            [theme.breakpoints.down("xs")]: {
                order :  2, 
                padding :'32px 32px 0',
            },
            '& .userFormEmail' : {
                display: 'flex',
                alignItems: 'center',
            },
            '& .userInputEmail' : {
                marginLeft : '12px',
                marginTop : '-4px'
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
           '& .radioGroup' : {
                marginLeft : '12px',
                color: '#395B65',
                '& .MuiTypography-body1' : {
                    fontSize : 14
                }
            },
            '& .contentInfo__left__button' : {
                marginTop : '214px',
                [theme.breakpoints.down("xs")]: {
                    marginTop : '32px',
                    display: 'flex',
                    justifyContent: 'end'
                },
                '& .button' : {
                    minWidth : '109px'
                }
            }
        },
        '& .contentInfo__right' : {
            display: 'flex',
            padding : '32px',
            flexDirection: 'column',
            paddingRight: '48px',
            [theme.breakpoints.down("xs")]: {
                order : 1, 
                padding :'32px 32px 0',
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
                            width: '12px',
                            marginTop : '6px',
                        }
                    }
                }
            },
            '& .userFormTextarea' : {
                '& .MuiInput-formControl' : {
                    background : '#F3F3F3',
                },
                '& .textArea' : {
                    marginTop: '4px'
                }
            }
        },
        '& .aboutInput' : {
            display: 'flex'
        }   
    }
}))
const Input = styled('input')({
    display: 'none',
  });
function StudentForm (props) {
    const { } = props
    const classes = useStyles()
    const { getTranslation, user, logout  , updateProfileUser} = useAuth()
    const [avatar, setAvatar] = useState()
    let history = useHistory()
    const { convertLocalDateToDateFormat } = contextHelper;
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
    const titlePage = getTranslation('EditInformation')
    const [department, setDepartment] = useState([])
    const [ errors ,setErrors ] = useState();
    const [dataUser, setDataUser] = useState({
        name: '',
        about: '',
        departments : '',
        email: '',
        avatar: '',
        birth_day: '',
        phone : '',
        address : '', // địa chỉ
        code : '', //mã thành viên
        company : '', // công ty
        position : '', // chức vụ
        gender : '' , // giới tính
        department : '' , // bộ phận
    })
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getMe()
                    getDepartments()
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
            setDataUser({ ...dataUser, avatar: avatar }); 
        }
    }, [avatar]);

    const handleChange = (event, nameField) => {
        setDataUser({ ...dataUser, [nameField]: event.target.value }); 
    };

    const handleChangeGender = (event, nameField) => {
        setDataUser({
            ...dataUser,
                [nameField] : event.target.value
        })
    }
    
    function getDepartments() {
        UserService.getDepartments(
            res => {
                const response = res.data.data
                response && response.map((item) => {
                    item.name = item.department_name ? item.department_name : ""
                    item.id = item.department_id ? item.department_id : ""
                    return item
                })
                setDepartment(response)
            },
            err => {
                onErrr('Không thể tải dữ liệu', '/users')
            }
        )
    }
    // console.log(department, '---')
    const getMe = () => {
        UserService.profile (
            res => {
                if(res.data && res.data.user) {
                    setDataUser(res.data.user)
                    setAvatar(res.data.user.avatar)
                }
            },
            err => {
                console.log(err)
            }
        )
    }
    
    function handleUploadProfile() {
        setErrors(false)
        setLoadingButtonAction(false)
        const data = new FormData()
        for (let key in dataUser){
            data.append(key, dataUser[key]);
        }
        UserService.updateProfileUser(
            data,
            res => {
                setLoadingButtonAction(true)
                setDataUser(res.data.data)
                updateProfileUser(res.data.data)
                makeShortMessage(getTranslation('SuccessfullyUpdated'), "success");
                setTimeout(() => {
                    history.push('/profile')
                }, 2000)
            },
            err => {
                setLoadingButtonAction(false)
                console.log(err)
                _handleError(err)
            }
        )
    }

    function handleUploadImage () {
        const data = new FormData()
        data.append('avatar', avatar)
        UserService.uploadAvatar(
            data,
            res => {
                setAvatar(res.data.data)
                updateProfileUser(res.data.data)
                makeShortMessage(getTranslation('Imageupdatesuccessfully'), "success");
            },
            err => {
                console.log(err)
                _handleError(err)
            }
        )
        
    }
    
    function _handleError(err) {
        setErrors(err.response.data.errors) 
    }

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const onChangeDatetime = nameField => e => {
        setErrors(false)
        setDataUser({
            ...dataUser,
                [nameField] : moment(e).format('YYYY-MM-DD')
        })
    }
    
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
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
                        <Paper elevation={1} >
                            <Grid container>
                                <Grid item xs={12} md={6} sm={6} lg={6} xl={6} className="contentInfo__left">
                                    <div className="contentInfo__title">
                                        {getTranslation('Personalinformation')}
                                    </div>
                                    <div className="userFormEmail">
                                        <Typography className="userTitle" >Email:</Typography>
                                        <div className="userInputEmail">
                                            <Typography className="userTitleEmail" >{dataUser.email}</Typography>
                                        </div>
                                        <div className="button-check">
                                            <Logo logoSrc={Check} /> 
                                        </div>
                                    </div>
                                    <div className="userForm">
                                        <Typography className="userTitle" >{getTranslation('Gender')}:<span className="spanStyle">*</span> </Typography>
                                        <div className="userInput">
                                            <RadioGroup
                                                value={dataUser.gender}
                                                onChange={(e) => handleChangeGender(e, 'gender')}
                                                className="radioGroup"
                                                row aria-label="gender"
                                                name="row-radio-buttons-group"
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
                                                    value={dataUser.birthday || null}
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
                                                    value={dataUser.phone || ''}
                                                    onChange={(e) => handleChange(e, 'phone')}
                                                    onKeyPress={validateKeyPress}
                                                    helperText={(errors && errors.phone) ? errors.phone : ''}
                                                    error={errors}
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
                                                    helperText={(errors && errors.address) ? errors.address : ''}
                                                    error={errors}
                                                    value={dataUser.address}
                                                    onChange={(e) => handleChange(e, 'address')}
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
                                        <div className="userFormEmail">
                                            <Typography className="userTitle" >{getTranslation('Code')}:</Typography>
                                            <div className="userInputEmail">
                                                <Typography className="userTitleEmail" >{dataUser.code} <span className="spanStyle">*</span></Typography>
                                            </div>
                                        </div>
                                        <div className="contentInfo__left__button">
                                            <AddButton 
                                                label={getTranslation('Save')} 
                                                id="update-button" 
                                                onClick={handleUploadProfile}
                                                buttonClass="button banners__button--save" 
                                                variant='contained' 
                                                iconButton={<IconImage srcIcon={Save} />} 
                                                // disabled={isDisabled ? true : false} 
                                                loading={loadingButtonAction}  
                                            />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} sm={6} lg={6} xl={6} className="contentInfo__right">
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
                                                        avatar={avatar}
                                                        setAvatar={setAvatar}
                                                        value={dataUser.avatar ||''}
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
                                                        helperText={(errors && errors.name) ? errors.name : ''}
                                                        error={errors}
                                                        value={dataUser.name || ''}
                                                        onChange={(e) => handleChange(e, 'name')}
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
                                                            fullWidth
                                                            placeholder={getTranslation('Fillintheinformation')}
                                                            helperText={(errors && errors.company) ? errors.company : ''}
                                                            error={errors}  
                                                            value={dataUser.company || ''}
                                                            onChange={(e) => handleChange(e, 'company')}
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
                                                            placeholder={getTranslation('Fillintheinformation')}
                                                            helperText={(errors && errors.position) ? errors.position : ''}
                                                            error={errors}
                                                            value={dataUser.position || ''}
                                                            onChange={(e) => handleChange(e, 'position')}
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
                                                {
                                                    dataUser.department !== null ?
                                                        (dataUser && dataUser.role === 'admin') ?
                                                            <>
                                                            <div className="userForm">                              
                                                                <Typography className="userTitle">{getTranslation('Department')}:<span className="spanStyle">*</span> </Typography>
                                                                <div className="userInput">
                                                                    <TextInput
                                                                        select
                                                                        placeholder="Chọn --"
                                                                        options={department}
                                                                        onChange={(e) => handleChange(e, 'department_id')}
                                                                        fullWidth
                                                                        value={dataUser.department_id|| ""}
                                                                        noMargin
                                                                        helperText={(errors && errors.department_id) ? errors.department_id : ''}
                                                                        error={errors && errors.department_id ? true : false}
                                                                        className="textField"
                                                                    /> 
                                                                </div>
                                                            </div> 
                                                        </>
                                                        :
                                                        <>
                                                            <div className="userForm">                              
                                                                <Typography className="userTitle">{getTranslation('Department')}:</Typography>
                                                                <div className="userInput">
                                                                    <TextField
                                                                        autoFocus
                                                                        fullWidth
                                                                        disabled
                                                                        value={dataUser.department.department_name || ''}
                                                                        onKeyPress={validateKeyPress}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        InputProps={{
                                                                            disableUnderline: true,
                                                                        }}
                                                                        className={`textField ${errors && errors.department ? "errorInput" : ''} `}
                                                                    />
                                                                </div>
                                                            </div>  
                                                        </> 
                                                    : '' 
                                                }
                                                <div className="userFormTextarea">
                                                    <Typography className="userTitle" >{getTranslation('About')}:</Typography>
                                                    <div className="userInputTextarea">
                                                        <TextInput
                                                            placeholder={getTranslation('Fillintheinformation')}
                                                            rows={5}
                                                            fullWidth
                                                            onChange={(e) => handleChange(e, 'about')}
                                                            value={dataUser.about || ''}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            className='textArea'
                                                        />     
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
        )}
        </>
        
    )
}

export default StudentForm;
