import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import IconImage from "ipretty/components/IconImage"
import { useNotiStackContext } from 'ipretty/context/Notistack';
import { makeStyles, Typography , TextField , Button , RadioGroup ,Radio ,FormControlLabel} from '@material-ui/core'
import DatePicker from 'ipretty/components/DatePicker/DatePicker'
import DiscountService from 'ipretty/services/DiscountService'
import moment from 'moment';
import AddButton from 'ipretty/components/AddButton'
import Save_white from '../../../../../public/icon_svg/Save_white.svg'
import Close from '../../../../../public/icon_svg/Close1.svg'//thay doi icon close 
const useStyles = makeStyles(theme => ({ 
    formData :{
        '& .discountForm' : {
            // marginBottom : '24px',
            '& .spanStyle' : {
                color: '#c32929'
            },
            '& .discountTitle' : {
                color: '#147B65',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'San Francisco Text Bold',
                // marginLeft : '8px',
                marginBottom : '4px'
            },
            '& .discountInput' :{
                height: '53px'
            },
            '& .MuiTextField-root' : {
                width : '100%',
            },
            '& .starTime' : {
                height : 59,
                '& .errorInput' : {
                    color: 'red',
                    "& .MuiTextField-root" : { 
                        border: '1.5px solid red',
                   }
                 },
                '& .MuiInputBase-input' : {
                    background : '#F3F3F3',
                    padding : '2px 16px',
                    height : '36px'
                }
            },
            '& .endTime' : {
                height : '59px',
                '& .errorInput' : {
                   "& .MuiTextField-root" :{
                        border: '1.5px solid red',
                   }
                 },
                '& .MuiInputBase-input' : {
                    background : '#F3F3F3',
                    padding : '2px 16px',
                    height : '36px'
                }
            },
            '& .userCheckBox' : {
                '& .MuiFormGroup-row' : {
                    flexDirection: 'column',
                },
                '& .MuiTypography-body1' : {
                    fontSize: 18,
                    color: '#147B65',
                    fontFamily: 'San Francisco Text',
                    [theme.breakpoints.down("xs")]: {
                        fontSize: 14,//fix font size loại giảm giá quá to
                    },
                }
            },
            '& .radioGroup__textField' : {
                display: 'flex',
                paddingBottom : 24,
                '& .radio__textField--percent' : {
                    // height: 56,
                    paddingLeft : 60,
                    // paddingTop : 5,
                    // // marginLeft : 66
                    [theme.breakpoints.down("xs")]: {
                        paddingLeft : 20,//fix loại giảm giá bị lệch
                    },
                    [theme.breakpoints.down("sm")]: {
                        paddingLeft : 15,//fix loại giảm gía bị lệch
                    },
                }
            },
        
        },
        "& .header-dialog__action": {
            display : "flex",
            justifyContent : 'flex-end',
            paddingBottom : 32,
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
                marginRight : 24,
                 [theme.breakpoints.down('sm')]: {
                        marginRight : 0,/// bug 
                    },
                    [theme.breakpoints.down('xs')]: {
                        marginRight : 0,
                    },//fix bug 41 buton mui ten bi lech
            },
            "& .marginLeft12": {
                marginLeft: 12
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
        '& .titleRandom' :{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems: 'center',
        }
    },
    buttonRandom : {
        fontSize: 16,
        color: '#44AD92',
        fontFamily: 'San Francisco Text',
        backgroundColor: 'transparent',
        border : 'none !important',//Tạo mã tự động ̣, chỉ bị trên thiết bị di dong
        height : 10,
        textAlign: 'left',//text Tạo mã tự động đang căn giữ
    },
    showError: {
        fontWeight: 400,
        fontSize: 10,//fix bug 32  thời gian trước thời gian hiện tại size to
        marginTop: 5,
        color: '#f44336',
    }
}))

function DiscountForm (props) {
    const { getTranslation  ,  setIsShowPopupAddDiscount , setIsShowPopupListDiscount , discount_id , getDataAfterSave , setIsShowPopupEditDiscount} = props
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const [dataDiscountCode , setDataDiscountCode] = useState({ 
        title : '',
        type : 'percent',
        discount_code : '',
        time_start : '',
        expired_at : '',
        sale_price : '',
    })
    const [ loadingSave , setLoadingSave ] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (discount_id) {
                        handleGetDetailDiscount(discount_id)
                    }
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    function handleClickRandom () {
        DiscountService.getRandomCode(
            res => {
                setDataDiscountCode({...dataDiscountCode , discount_code:res.data.data })
            },
            err => {

            }
        )
    }

    function handleGetDetailDiscount(discount_id) {
        DiscountService.detailDiscount(
            discount_id,
            res => {
                setDataDiscountCode(res.data.data)
            },
            err => {

            }
        )
    }

    function handleSave () {
        setErrors(false)
        setLoadingSave(true)
        const data = new FormData()
        for (let key in dataDiscountCode) {
            data.append(key, dataDiscountCode[key]);
        }
        if(!discount_id) {
            DiscountService.createDiscount( data,
                res => {
                    setLoadingSave(false)
                    makeShortMessage(getTranslation('Createasuccessfuldiscountcode') , 'success')
                    setIsShowPopupAddDiscount(false)
                    setIsShowPopupListDiscount(true)
    
                },
                err => {
                    _handleError(err)
                }
            )
        } else {
            DiscountService.updateDiscount( 
                discount_id,  
                data,
                res => {
                    setLoadingSave(false)
                    makeShortMessage(getTranslation('Editsuccessfuldiscountcode') , 'success')
                    getDataAfterSave()
                    setIsShowPopupEditDiscount(false)
                    setIsShowPopupListDiscount(true)
    
                },
                err => {
                    _handleError(err)
                }
            )
        }
        
    }

    function _handleError(err) {
        setLoadingSave(false)
        if(err.response.data) {
            if(err.response.data.errors) {
                setErrors(err.response.data.errors)
            }else{
                setErrors(err.response.data)
            }
        }
    }

    function handleClose () {
        if(!discount_id){
            setIsShowPopupAddDiscount(false)
        }else{
            setIsShowPopupEditDiscount(false)
        }
    }

    const onChange = nameField => (e) => {
        if (nameField === "time_start" ||  nameField === "expired_at") {
            setDataDiscountCode({
                ...dataDiscountCode,
                    [nameField] : moment(e).format('yyyy-MM-DD HH:mm')
            })
        }else if (nameField === 'type' && (dataDiscountCode.type === "money" || dataDiscountCode.type === "percent")){ 
            setErrors(false)
            setDataDiscountCode({...dataDiscountCode, type: e.target.value, sale_price : ''});
        }else {
            setDataDiscountCode({ ...dataDiscountCode, [nameField]: e.target.value }); 
        }
    }

    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };

    const changeValueInputPrice = (event) => {
        setDataDiscountCode({ ...dataDiscountCode, sale_price: event.target.value });
    }

    return (

        <div className={classes.formData}>
            <div className="discountForm">                              
                <Typography className="discountTitle" >{getTranslation('Programname')}:<span className="spanStyle">*</span> </Typography>
                <div className="discountInput">
                    <TextField
                        placeholder={getTranslation('Fillintheinformation')}
                        autoFocus
                        fullWidth
                        value={dataDiscountCode.title}
                        onChange={onChange('title')}
                        helperText={(errors && errors.title) ? errors.title : ''}
                        error={errors && errors.title}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className={`textField ${errors && errors.title ? "errorInput" : ''} `}
                    />
                </div>
            </div>
            <div className="discountForm">
                <div className="titleRandom">
                <Typography className="discountTitle" >{getTranslation('Discountcode')}:<span className="spanStyle">*</span> </Typography>
                <Button size='large'  
                    disabled={discount_id && !(moment(dataDiscountCode.time_start).valueOf() > moment(new Date()).valueOf()) ? true : false}  
                    className={classes.buttonRandom} 
                    onClick={handleClickRandom}  
                    variant='outlined' 
                    color='secondary' 
                >
                    Tạo mã tự động
                </Button>
                </div>                              
                <div className="discountInput">
                    <TextField
                        placeholder={getTranslation('Fillintheinformation')}
                        autoFocus
                        fullWidth
                        disabled={discount_id && !(moment(dataDiscountCode.time_start).valueOf() > moment(new Date()).valueOf()) ? true : false}  
                        value={dataDiscountCode.discount_code || ''}
                        onChange={onChange('discount_code')}
                        onKeyPress={validateKeyPress}
                        helperText={(errors && errors.discount_code) ? errors.discount_code : ''}
                        error={errors && errors.discount_code}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className={`textField ${errors && errors.discount_code ? "errorInput" : ''} `}
                    />
                </div>
            </div>
            <div className="discountForm">
                <Typography className="discountTitle" >{getTranslation('Starttime')}:<span className="spanStyle">*</span></Typography>
                <div className="starTime">
                    <DatePicker
                        type={'datetime-picker'}
                        value={dataDiscountCode.time_start || null}
                        handleDateChange={onChange('time_start')}
                        disablePast={false}
                        // helperText={errors && Object.keys(errors).length > 0 && errors['time_start'] ? errors['time_start'] : ''}
                        className={errors && errors.time_start ? "errorInput" : ''}
                    />
                    {errors && Object.keys(errors).length > 0 && errors['time_start'] ? (
                        <div className={classes.showError}>{errors['time_start']}</div>
                    ) : 
                        <div className="formBirthday"></div>
                    }
                </div>
            </div>
            <div className="discountForm">
                <Typography className="discountTitle" >{getTranslation('Endtime')}:<span className="spanStyle">*</span></Typography>
                <div className="endTime">
                    <DatePicker
                        type={'datetime-picker'}
                        value={dataDiscountCode.expired_at || null}
                        handleDateChange={onChange('expired_at')}
                        disablePast={false}
                        // helperText={errors && Object.keys(errors).length > 0 && errors['expired_at'] ? errors['expired_at'] : ''}
                        // className={errors && errors.birthday ? "errorInput" : ''}
                    />
                    {errors && Object.keys(errors).length > 0 && errors['expired_at'] ? (
                        <div className={classes.showError}>{errors['expired_at']}</div>
                    ) : 
                        <div className="formBirthday"></div>
                    }
                </div>
            </div>
            <div className="discountForm">
                <Typography className="discountTitle" >{getTranslation('kindofdiscount')}:<span className="spanStyle">*</span> </Typography>
                <div className="userCheckBox">
                    <RadioGroup
                        onChange={onChange('type')}
                        className="radioGroup"
                        row aria-label="gender"
                        name="row-radio-buttons-group"
                        value={dataDiscountCode.type || ''}
                    >
                        <div className="radioGroup__textField">
                            <FormControlLabel value="percent" control={<Radio />} label={getTranslation('percent') +' '+'(%)'} />
                                { 
                                    dataDiscountCode.type === 'percent' && (
                                        <div className="radio__textField--percent">
                                            <TextField
                                                placeholder={getTranslation('Fillintheinformation')}
                                                autoFocus
                                                fullWidth
                                                value={dataDiscountCode.sale_price || ''}
                                                onChange={changeValueInputPrice}
                                                onKeyPress={validateKeyPress}
                                                helperText={(errors && errors.sale_price) ? errors.sale_price : ''}
                                                error={errors && errors.sale_price}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                className={`textField ${errors && (errors.sale_price || errors.message) ? "errorInput" : ''} `}
                                            />
                                                {
                                                    errors && errors.message && (
                                                        <div className={classes.showError}>{errors ? errors.message : ''}</div>
                                                    )
                                                }
                                        </div>
                                    )
                                }
                                
                        </div>
                        <div className="radioGroup__textField">
                            <FormControlLabel value="money" control={<Radio />} label={getTranslation('money') + ' ' +'(VND)'} />
                                {
                                    dataDiscountCode.type === 'money' && (
                                        <div className="radio__textField">
                                            <TextField
                                                placeholder={getTranslation('Fillintheinformation')}
                                                autoFocus
                                                fullWidth
                                                value={dataDiscountCode.sale_price || ''}
                                                onChange={changeValueInputPrice}
                                                onKeyPress={validateKeyPress}
                                                helperText={(errors && errors.sale_price) ? errors.sale_price : ''}
                                                error={errors && errors.sale_price}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                className={`textField ${errors && (errors.sale_price || errors.message) ? "errorInput" : ''} `}
                                            />
                                                {
                                                    errors && errors.message && (
                                                        <div className={classes.showError}>{errors ? errors.message : ''}</div>
                                                    )
                                                }
                                        </div>   
                                    )
                                }
                            </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="header-dialog__action">
                <AddButton
                    label={getTranslation('Cancel')}
                    id="cancel-button"
                    buttonClass="button button--close"
                    onClick={handleClose}
                    variant='outlined'
                    iconButton={<IconImage srcIcon={Close} icon20 />}
                    disabled={false}
                />
                <AddButton
                    label={getTranslation('Save')}
                    id="create-button"
                    buttonClass="button--white marginLeft12"
                    onClick={handleSave}
                    variant="contained"
                    loading={loadingSave}
                    iconButton={<IconImage srcIcon={Save_white} />}
                />
            </div>
        </div>
    );
}

export default DiscountForm