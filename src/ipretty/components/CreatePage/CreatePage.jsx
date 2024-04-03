import React from 'react'
import { makeStyles, Box } from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider';
import AddButton from '../AddButton';
import BreadCrumbs from '../BreadCrumbs';
import Back from '../../../public/icon_svg/back.svg'
import IconImage from "ipretty/components/IconImage";
import Dialog from '../Dialog/Dialog';
import Skeleton from '../Skeleton';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'red',
        '& .MuiInputBase-root': {
            padding: '0px !important',
        }
    },
    createPage: {
        padding: '16px 32px 36px 32px',
        [theme.breakpoints.down("lg")]: {
            padding: "16px 20px 36px 20px",
        },
        [theme.breakpoints.up("xl")]: {
            padding: "16px 20px 36px 20px",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "10px",
        },
        [theme.breakpoints.up("sm")]: {
            padding: "20px",
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                },
                [theme.breakpoints.down('xs')]: {
                    flexDirection: 'column',
                },
                "& .banners__title": {
                    paddingLeft : 7,//fix mui ten back bi lech
                    "& .banners__title--back": {
                        "& .MuiButton-startIcon": {
                            marginRight: 17,
                            [theme.breakpoints.down("xs")]: {
                                marginRight: 10,
                                // paddingBottom : 10,fix bug 41 tao thanh vien , mui ten back bi lech
                            },
                        },
                        "& button": {
                            background: '#E5E5E5',
                            color: '#395B65',
                            fontFamily: 'San Francisco Text Bold',
                            fontSize: '32px',
                            [theme.breakpoints.down("xs")]: {
                                fontSize: '25px',
                            },
                            paddingLeft: 0,
                            "& span": {
                                "& span": {
                                    "& div": {
                                        width: 12,
                                        [theme.breakpoints.down("xs")]: {
                                            width: 10,
                                        },
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
                    display: 'flex',
                    flexDirection: 'row',
                    [theme.breakpoints.down('md')]: {
                        display: 'none'
                    },
                    [theme.breakpoints.down('sm')]: {
                        display: 'none'
                    },
                    [theme.breakpoints.down('xs')]: {
                        display: 'none'
                    },
                    "& .button": {
                        background: '#E5E5E5',
                        border: '1px solid #147B65 !important',
                        marginRight: 5,
                        color: '#147B65',
                        minWidth : 106 ,
                    },
                    '& .button__cancel' : {
                        minWidth: 100,
                        [theme.breakpoints.down("xs")]: {
                            minWidth: 90,
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
                    '& .skeleton__button' :{
                        display: 'flex',
                        "& .MuiSkeleton-root": {
                            marginRight: 8
                        }
                    },
                    "& .button--white": {
                        background: '#FFFFFF',
                        color: '#147B65',
                        padding: '7px 0',
                        [theme.breakpoints.down('xs')]: {
                            minWidth: 67,
                            height: 36
                        },
                    },
                    "& .button--green": {
                        background: '#147B65',
                        color: '#FFFFFF',
                        [theme.breakpoints.down('xs')]: {
                            minWidth: 80,
                            height: 36
                        },
                    },
                    "& .loading--white": {
                        color: '#FFFFFF'
                    },
                    "& .button--release": {
                        minWidth: 140,
                        [theme.breakpoints.down('sm')]: {
                            padding: '0px 10px'
                        },
                        [theme.breakpoints.down('xs')]: {
                            minWidth: 100,
                            height: 36
                        },
                    },
                    '& img': {
                        width : 18,
                        paddingTop : 3,
                        [theme.breakpoints.down('xs')]: {
                            paddingTop : 0,
                        },
                    }
                }
            }
        },
    },
    flexDisplay: {
        display: 'flex',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'column',
            padding: '10px',
            '& .MuiButton-root': {
                marginTop: theme.spacing(1)
            }
        },
    },
    link: {
        textDecoration: 'underline',
        '&:hover': {
            color: '#1976d2'
        }
    },
    mg0: {
        margin: '0 !important'
    },
    font: {
        fontSize: 12,
        fontWeight: 400,
        color: '#6F9396',
    },
    boxForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
    },
    title: {
        paddingBottom: '16px',
        fontWeight: '600',
        fontSize: '17px',
        // textTransform: 'uppercase',
        color: '#000',
    },
    textDecoration: {
        "&:hover": {
            textDecoration: 'underline',
            color: '#6F9396'
        }
    },
    buttonIpad : {
        [theme.breakpoints.down("xl")]: {
            display: 'none',
            justifyContent: 'end'
        },
        [theme.breakpoints.down("lg")]: {
            display: 'none',
            justifyContent: 'end'
        },
        [theme.breakpoints.down("md")]: {
            display : 'flex',
            justifyContent: 'end',
            paddingTop: '18px'
        },
        "& .button": {
            background: '#E5E5E5',
            border: '1px solid #147B65 !important',
            marginRight: 5,
            color: '#147B65',
            minWidth : 106 ,
        },
        '& .button__cancel' : {
            minWidth: 100,
            [theme.breakpoints.down("xs")]: {
                minWidth: 90,
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
        '& .skeleton__button' :{
            display: 'flex',
            "& .MuiSkeleton-root": {
                marginRight: 8
            }
        },
        "& .button--white": {
            background: '#FFFFFF',
            color: '#147B65',
            padding: '7px 0',
            [theme.breakpoints.down('xs')]: {
                minWidth: 67,
                height: 36
            },
        },
        "& .button--green": {
            background: '#147B65',
            color: '#FFFFFF',
            [theme.breakpoints.down('xs')]: {
                minWidth: 80,
                height: 36
            },
        },
        "& .loading--white": {
            color: '#FFFFFF'
        },
        "& .button--release": {
            minWidth: 140,
            [theme.breakpoints.down('sm')]: {
                padding: '0px 10px'
            },
            [theme.breakpoints.down('xs')]: {
                minWidth: 100,
                height: 36
            },
        },
        '& img': {
            width : 18,
            paddingTop : 3,
            [theme.breakpoints.down('xs')]: {
                paddingTop : 0,
            },
        }
    }
}));


const CreatePage = (props) => {
    const {
        children,
        isDisabled,
        links,
        isCreate,
        titleUrl,
        loading,
        multipleBlock,
        titlePage,
        redirectBack,
        actions,
        isShowPopup,
        handleClosePopp,
        handleClose,
        handleConfirmCancel,
        faqs
    } = props
    const classes = useStyles();
    const { getTranslation } = useAuth()

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
                    disabled={false}
                    noIcon={item.noIcon}
                    loading={item.loading}
                    loadingClass={item.loadingClass}
                />
            </React.Fragment>
        ))
    }

    return (
        <div className={classes.createPage}>
            <div className="header">
                <BreadCrumbs classes={classes} links={links} titleCurrent={`${faqs}` ? `${titlePage}` : `${isCreate ? getTranslation('Create') : getTranslation('Edit')} ${titleUrl}`} handleClose={redirectBack} />

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
                                !loading ? (
                                    actions && actions.length ? renderAtions(actions) : null)
                                :
                                (  
                                    <div className="skeleton__button">
                                        <Skeleton type="button" />
                                        <Skeleton type="button" />
                                    </div>
                                )
                            }
                        {/* {actions && actions.length ? renderAtions(actions) : null} */}
                    </div>
                </div>
            </div>
            <div>
                {multipleBlock ? (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                ) : (
                    <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
                        <div className={classes.title}>{getTranslation('generalInformation')}
                            {children}
                        </div>
                    </Box>
                )}
            </div>
            <div className={classes.buttonIpad}>
                {   
                    !loading ? (
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
            {isShowPopup && (
                <Dialog
                    maxWidth="sm"
                    open={isShowPopup}
                    onClose={handleClosePopp}
                    actionLabel={getTranslation("Confirm")}
                    action={handleConfirmCancel}
                    noIcon={true}
                    title={getTranslation("Notificartion")}
                    getTranslation={getTranslation}
                >
                    {getTranslation("DoYouSureYouWantToExit")}
                </Dialog>
            )}
        </div>

    )
}
export default CreatePage;
