import React  from 'react'
import { makeStyles, Box ,Grid ,Paper ,Typography ,TextField ,Button, FormHelperText , Tooltip} from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider';
import AddButton from '../AddButton';
import { styled } from "@material-ui/core/styles";
import BreadCrumbs from '../BreadCrumbs';
import Back from '../../../public/icon_svg/back.svg'
import IconImage from "ipretty/components/IconImage";
import Dialog from '../Dialog/Dialog';
import TextInput from '../TextInput';
import Skeleton from '../Skeleton';
import Upload from '../../../public/icon_svg/Upload.svg';
import Editor from '../Editor';
import { ChromePicker } from 'react-color'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'red',
        '& .MuiInputBase-root': {
            padding: '0px !important',
        }
    },
    viewContentPage: {
        padding: "16px 1.1vw 34px 22px",
        [theme.breakpoints.down("lg")]: {
            padding: "16px 1.1vw 34px 22px",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "16px 0px 34px 4.2vw",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "16px 0px 34px 2.2vw",//can chinh pading 
        },
        "& .header": {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            "& .MuiBreadcrumbs-ol": {
                "& .MuiTypography-root": {
                    color: '#6F9396',
                    fontSize: 12,
                    fontFamily : 'San Francisco Text Bold',
                }
            },
            "& svg " : {
                color: '#6F9396'
            },
            "& .banners": {
                [theme.breakpoints.up("md")]: {
                    display: 'flex',
                },
                flexDirection: 'row',
                justifyContent: 'space-between',
                "& .banners__title": {
                    paddingLeft : 7,//fix mui ten back bi lech
                    "& .banners__title--back": {
                        "& .MuiButton-startIcon": {
                            marginRight: 17
                        },
                        "& button": {
                            background: '#E5E5E5',
                            color: '#395B65',
                            fontFamily: 'San Francisco Text Bold',
                            fontSize: '32px',
                            [theme.breakpoints.down("xs")]: {
                                fontSize: '17px !important',//fix bug 53 Quản lý thương hiệu , size chữ quá to trên mobile
                            },
                            paddingLeft: 0,
                            "& span": {
                                "& span": {
                                    "& div": {
                                        width: 12
                                    }
                                }
                            }
                        },
                        "& button:hover": {
                            boxShadow: 'none',
                        },
                        "& button:focus": {
                            boxShadow: 'none'
                        }
                    },
                },
                "& .banners__button": {
                    alignSelf: 'center',
                    "& .button": {
                        background: '#E5E5E5',
                        border: '1px solid #147B65 !important',
                        [theme.breakpoints.up("sm")]: {
                            marginRight: 5,
                        },
                        [theme.breakpoints.down("xs")]: {
                            marginRight: 7,//fix bug 47 & 44 margin giã cac butoon qua lon
                            marginTop: 10,//fix bug53  Quản lý thương hiệu  lỗi căn giữa các nút 
                        },
                        color: '#147B65',
                        minWidth : 96 ,// loi buton qua lon ten ca 2 man laptop va mobile
                    },
                    '& .button__cancel' : {
                        [theme.breakpoints.down("xs")]: {
                            minWidth: 72,
                        },
                        [theme.breakpoints.up("sm")]: {
                            minWidth: 94,
                        },
                    },
                    "& .banners__button--cancel": {
                        
                    },
                    "& .banners__button--remove": {

                    },
                    "& .banners__button--save": {
                        background: '#147B65',
                        color: '#fff', 
                    },
                    "& .banners__button--share": {
                        background: '#147B65',
                        color: '#fff'
                    },
                    '& .button__notPublic' :{
                       padding: '6px 24px' ,
                       [theme.breakpoints.down("xs")]: {
                        padding: '6px 17px' ,
                      },
                    },
                    '& .button__public' : {
                        padding: '6px 24px'
                    }, 
                    '& .skeleton__button' :{
                        display: 'flex',
                        "& .MuiSkeleton-root": {
                            marginRight: 8
                        }
                    },
                    "& .button--white": {
                        background: '#FFFFFF',
                        color: '#147B65',
                      
                    },
                    "& .button--green": {
                        background: '#147B65',
                        color: '#FFFFFF'
                    },
                    "& .loading--white": {
                        color: '#FFFFFF'
                    },
                    "& .button--release": {
                        minWidth: 140,
                    },
                    '& img': {
                        width : 24,
                        height : 24,
                    }
                }
            }
        },
    },
    view : {
        [theme.breakpoints.down("lg")]: {
            padding: "20px",
        },
        [theme.breakpoints.up("xl")]: {
            padding: "20px",
        },
        [theme.breakpoints.up("sm")]: {
            padding: "20px",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "10px",
        },
        '& .paperStyle' : {
            [theme.breakpoints.up("sm")]: {
                padding: "32px 86px 32px 32px",
            },
            [theme.breakpoints.down("xs")]: {
                padding: "20px 15px 55px 15px",
            },
            fontFamily : 'San Francisco Text Bold',  
            '& .title_content' : {
                color: '#395B65',
                fontWeight : 'bold',
                fontSize : '24px',
                lineHeight : '32px',
            },   
            '& .contentInfo__left' : {
                paddingRight: "3px",
            },
            '& .contentInfo__right' : {
                [theme.breakpoints.up("sm")]: {
                    paddingLeft : '93px',
                },
                [theme.breakpoints.down("xs")]: {
                    paddingLeft : '0px',
                },
               
                '& .size__image' : {
                    display: "flex",
                    fontSize : 14,
                    fontFamily : 'San Francisco Text',
                    fontWeight : '400',
                    paddingTop : '12px',
                    color : '#27384C'                   
                },
                '& .button__upload' : {
                    paddingTop : 10,
                    '& img' : {
                        width : 16,
                        height : 16,
                    },
                    '& .MuiButton-outlined' : {
                        padding : '1px 5px'
                    },
                    '& .MuiButton-startIcon' : {
                        marginRight : 1,
                    }

                }
            }
        },
        '& .userFormTextarea' : {
            '& .MuiInput-formControl' : {
                background : '#F3F3F3',
                height: '119px'
            },
            '& .MuiTypography-alignLeft': {
                paddingTop: 32,
                fontFamily: 'San Francisco Text',
                fontSize: 18,
                fontWeight: '600',
                color: '#147B65',
                paddingBottom: 8
            }  
        }
    },
    skeleton_text: {
        paddingTop : '62px'
    },
    labelColor : {
        paddingTop : 5,
        fontFamily: 'San Francisco Text',
        fontSize: 18,
        fontWeight: '600',
        color: '#147B65',
        paddingBottom : 8
    },
    label: {
        paddingTop : 32,
        fontFamily: 'San Francisco Text',
        fontSize: 18,
        fontWeight: '600',
        color: '#147B65',
        paddingBottom : 8
    },
    spanStyle : {
        color: '#c32929',
        paddingLeft : 5,
    },
    userInput : {
        "& input" :{
            "&::placeholder" :{
              fontStyle : 'normal'
            }
        },
        "& .MuiInput-root" : {
            background : '#F3F3F3',
            height : '36px',
        },
        '& .errorInput' : {
            color: 'red',
           "& .MuiInputBase-formControl" :{
                border: '1.5px solid red',
           }
         },
    },
    information :{
        width : '100%',
        "& .infomation__action" : {
            '& .jodit-wysiwyg' : {
                color : '#787878',
                fontFamily: 'San Francisco Text'
            }
        }
    },
    errorInput: {
        color: 'red',
        fontFamily: 'auto',
        paddingTop: '3px'
    },
    contentTowRows : {
        display: 'flex',
        justifyContent : 'space-between',
        '& .list-input' : {
            width : '48%'
        }
    },
    popover : {
        position: 'absolute',
      zIndex: '2',
      [theme.breakpoints.up('md')]: {
        marginLeft: '-20vh',//fix bug 52 color banner
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '-20vh',//fix bug 52 color banner
    },
    [theme.breakpoints.down('xs')]: {
        marginLeft: '-183px',//fix bug 52 color banner
    },
    }, 
    cover : {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    listColor :{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .list_color' : {
            cursor: 'pointer',
            paddingTop: '10px',
            paddingLeft: '15px',
        }
    }
}));
const Input = styled('input')({
    display: 'none',
  });

const ViewContentPage = (props) => {
    const {
        children,
        isDisabled,
        links,
        isCreate,
        titleUrl,
        titlePage,
        titleImage,
        redirectBack,
        actions,
        isPost,
        areTowRows,
        titleContent,
        lists_input,
        nameImage,
        size,
        errors,
        content,
        setContent,
        nameContent,
        loadingSkeleton,
        slugCategory
    } = props

    const classes = useStyles();
    const { getTranslation } = useAuth();
    const handleAction = (action) => {
        action()
    };

    const handleActionClose =(actionClose) => {
        actionClose()
    }
    const renderAtions = list => {
        return list.map((item) => (
            <React.Fragment key={item.id}>
                <AddButton
                    label={item.label}
                    id="update-button"
                    buttonClass={item.buttonClass}
                    onClick={item.action}
                    variant='contained'
                    iconButton={item.icon}
                    disabled={item.disabled}
                    noIcon={item.noIcon}
                    loading={item.loading}
                    loadingClass={item.loadingClass}
                />
            </React.Fragment>
        ))
    }

    const renderInput = listInput => {
        return listInput.map((item) =>(
            <div className="list-input" key={item.id}>
                {
                    ! item.isColor ?  <Typography className={classes.label}>{item.label}{item.isTextField && !item.isPostCategory || item.isContent ? <span className={classes.spanStyle}>*</span> : ''}</Typography> : ''
                }
                <div className={item.isTextField ? classes.userInput : 'userFormTextarea'}>
                {loadingSkeleton ? (
                    <div className="skeleton__button">
                    {
                        item.isTextField ? (
                            <Skeleton type="button" />
                        ) : (
                            <>
                                <Skeleton type="contactCard" height={100}/>
                            </>
                        )
                    }
                    </div>
                   
                ) : (item.isSelect) ? (
                    <>
                        {   
                            item.options && item.options.length && item.options.length > 0?
                                <div className={classes.userInput}>
                                    <TextInput
                                        autoFocus
                                        fullWidth
                                        select
                                        placeholder={item.placeholder}
                                        options={item.options}
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
                            : ''
                        }
                    </>
                    ) 
                    : (item.isColor) ? (
                        <div className={classes.listColor}>
                                <Typography className={classes.labelColor}>{item.labelColor}</Typography>
                                <div className="list_color">
                                <Tooltip title={item.labelColor}>
                                    <FiberManualRecordIcon style={{ color: item.valueColor }} fontSize="large"  onClick={() => handleAction(item.action)} name={item.nameColor}/> 
                                </Tooltip>
                                    {
                                    item.isShowColorPicker ? (
                                        <div className={classes.popover} >
                                            <div className={classes.cover} onClick={() => handleActionClose(item.actionClose)}/>
                                                <ChromePicker 
                                                    color={item.color}
                                                    onChange={(e) => item.handleChangeColor(e , item.nameColor)  }
                                                    value={item.valueColor}
                                                    name = {item.nameColor}
                                                />
                                        </div>
                                    ) : ""
                                    }
                                </div>
                             </div>
                    ) : (
                        <TextInput
                            placeholder = {item.placeholder}
                            autoFocus
                            fullWidth
                            disabled={item.disabled}
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
                            className={!item.isTextField ? 'textArea' : ""}
                            rows={!item.isTextField ? 5 : 0}
                        />
                    )                    
                }
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className={classes.viewContentPage}>
                <div className="header">
                <BreadCrumbs classes={classes} links={links} titleCurrent={`${isCreate ? getTranslation('Create') : getTranslation('Edit')} ${titleUrl}`} handleClose={redirectBack} />
                    <div className="banners">
                        <div className="banners__title">
                            <div className="banners__title--back">
                                <AddButton
                                    label={titlePage}
                                    id="update-button"
                                    buttonClass="button header__button--back--style"
                                    onClick={redirectBack}
                                    variant='contained'
                                    iconButton={<IconImage srcIcon={Back} />}
                                    disabled={isDisabled ? true : false}
                                    redireact={true}
                                />
                            </div>
                        </div>
                        <div className="banners__button">
                            {   
                                !loadingSkeleton ? (
                                    actions && actions.length ? renderAtions(actions) : null)
                                :
                                (  
                                    <div className="skeleton__button">
                                        <Skeleton type="button" />
                                        <Skeleton type="button" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Box className={classes.view}>
                <Paper elevation={1} className="paperStyle" >
                <div className="title_content">
                    {titleContent}
                </div>
                    {
                        areTowRows ? 
                            <>
                                <div className={classes.contentTowRows}>
                                    {   
                                        lists_input && lists_input.length ? renderInput(lists_input) : ""
                                    }
                                </div>
                            </>
                        : 
                            <Grid container>
                                <Grid  item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__left">
                                        {   
                                            lists_input && lists_input.length ? renderInput(lists_input) : ""
                                        }
                                </Grid>
                                <Grid  item xs={12} sm={12} md={6} lg={6} xl={6} className="contentInfo__right">
                                    {
                                        !loadingSkeleton ? (
                                            <>
                                                <div className="infomation-item__image">
                                                    <Typography className={classes.label} >{titleImage}{!isPost ? <span className={classes.spanStyle}>*</span> : '' }</Typography>
                                                    <div className="content__image">
                                                        {children}
                                                        {
                                                            <FormHelperText id="my-helper-text" error={errors[nameImage] && errors[nameImage].length ? true : false}>{errors[nameImage]}</FormHelperText>
                                                        }
                                                    </div>
                                                    <div className="size__image">
                                                        <div className="content__size">
                                                            {getTranslation('Requiredsize')} :
                                                        </div>
                                                        <div className="size">{size}</div>      
                                                    </div>
                                                    <div className="button__upload">
                                                        <label htmlFor="update-avatar">
                                                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                                            <Button variant="outlined" 
                                                                    component="span"    
                                                            >
                                                                <IconImage srcIcon={Upload} />
                                                                    {getTranslation('UploadNewPhotos')} 
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                            
                                        ) : (
                                            <div className={classes.skeleton_text}>
                                                <Skeleton type="text" height={200}  />
                                            </div>
                                        )
                                    }
                                </Grid>
                                {
                                    !loadingSkeleton ? (
                                        isPost && !slugCategory ? 
                                            <div className={classes.information}>
                                                <div className="infomation__title">
                                                <Typography className={classes.label} >{getTranslation('contentpost')}<span className={classes.spanStyle}>*</span></Typography>
                                                </div>
                                                <div className="infomation__action">
                                                    <Editor
                                                        content={content}
                                                        setContent={setContent}
                                                        placeholder={getTranslation('Enterthearticlecontent')}
                                                    />
                                                    <FormHelperText id="my-helper-text" error={errors[nameContent] && errors[nameContent].length ? true : false}>{errors[nameContent]}</FormHelperText>
                                                </div>
                                            </div>
                                        : '' ) : (
                                            <div className={classes.skeleton_text}>
                                                <Skeleton type="text" height={200}  />
                                            </div>
                                        )
                                }
                    </Grid>
                    }
                </Paper>
            </Box>
        </>
    )
}
export default ViewContentPage;
