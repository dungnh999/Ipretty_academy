import React, { useState, useEffect } from 'react'
import { makeStyles, Box, Grid, Paper, Typography, FormHelperText } from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider';
import AddButton from 'ipretty/components/AddButton'
import BreadCrumbs from '../../../components/BreadCrumbs';
import Back from '../../../../public/icon_svg/back.svg'
import IconImage from "ipretty/components/IconImage";
import TextInput from '../../../components/TextInput';
import Skeleton from '../../../components/Skeleton';
import SelectNotify from 'ipretty/views/notification/components/SelectNotify';
import MultipleSelect from '../../../components/Autocomplete/MultipleSelect';

const useStyles = makeStyles(theme => ({
    viewContentPage: {
        [theme.breakpoints.up("md")]: {
            padding: "16px 4.2vw 34px 4.2vw",
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
                    fontFamily: 'San Francisco Text Bold',
                },
                '& .MuiBreadcrumbs-separator': {
                    [theme.breakpoints.down("xs")]: {
                        margin: '0px'
                    },
                }
            },
            "& .banners": {
                [theme.breakpoints.up("md")]: {
                    display: 'flex'
                },
                flexDirection: 'row',
                justifyContent: 'space-between',
                "& .banners__title": {
                    paddingLeft: 7,//fix mui ten back bi lech
                    "& .banners__title--back": {
                        "& .MuiButton-startIcon": {
                            marginRight: 17
                        },
                        "& button": {
                            background: '#E5E5E5',
                            color: '#395B65',
                            fontFamily: 'San Francisco Text Bold',
                            fontSize: '32px',
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
                        [theme.breakpoints.down("xs")]: {
                            marginRight: 10,//Khoang cach gia cac buton khong deu nhau tại màn tạo thong bao bug 58
                            marginTop: 10,//Khoang cach gia cac buton khong deu nhau tại màn tạo thong bao bug 58
                        },
                        [theme.breakpoints.up("sm")]: {
                            marginRight: 5,
                        },
                        color: '#147B65',
                        minWidth: 106,
                    },
                    '& .button__cancel': {
                        minWidth: 94,
                    },
                    "& .banners__button--save": {
                        background: '#147B65',
                        color: '#fff',
                    },
                    "& .banners__button--share": {
                        background: '#147B65',
                        color: '#fff'
                    },
                    '& .button__notPublic': {
                        padding: '6px 24px'
                    },
                    '& .button__public': {
                        padding: '6px 24px'
                    },
                    '& .skeleton__button': {
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
                }
            }
        },
    },
    view: {
        [theme.breakpoints.down("lg")]: {
            padding: "0 20px 100px",
        },
        [theme.breakpoints.up("xl")]: {
            padding: "0 20px 100px",
        },
        [theme.breakpoints.down("xs")]: {
            padding: "10px",
        },
         [theme.breakpoints.up("sm")]: {
            padding: "20px",
        },
        '& .paperStyle': {
            padding: "32px",
            fontFamily: 'San Francisco Text Bold',
            '& .title_content': {
                color: '#395B65',
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: '32px',
            },
        },
    },
    skeleton_text: {
        paddingTop: '62px'
    },
    label: {
        paddingTop: 32,
        fontFamily: 'San Francisco Text',
        fontSize: 18,
        fontWeight: '600',
        color: '#147B65',
        paddingBottom: 8
    },
    spanStyle: {
        color: '#c32929',
        paddingLeft: 5,
    },
    userInput: {
        "& input": {
            "&::placeholder": {
                fontStyle: 'normal'
            }
        },
        "& .MuiInput-root": {
            background: '#F3F3F3',
          ///  height: '36px',
        },
        '& .errorInput': {
            color: 'red',
            "& .MuiInputBase-formControl": {
                border: '1.5px solid red',
            }
        },
        "& .view-action__filter--item": {
            "& .MuiFormControl-root": {
                width: '100%',
                height: "36px",

            },
            "& .MuiOutlinedInput-input": {
                padding: '8.5px 14px'
            },
            "& .MuiInputBase-root": {
                backgroundColor: "#F3F3F3"
            }
        },
        "& .infomation__action": {
            '& .MuiInput-root':{
                height: '36px'
            }
        },
        '& .MuiFormControl-marginNormal': {
            marginTop: '0px',
            marginBottom: '0px'
        }
    },
    errorInput: {
        color: 'red',
        fontFamily: 'auto',
        paddingTop: '3px'
    },
}));

const ViewPageNotification = (props) => {
    const {
        links,
        isCreate,
        titlePage,
        redirectBack,
        actions,
        titleContent,
        lists_input,
        errors,
        loadingSkeleton,
        isDisable,
        data
    } = props

    const classes = useStyles();
    const { getTranslation } = useAuth();

    const renderAtions = list => {
        return list.map((item) => (
            <React.Fragment key={item.id}>
                {item.label == `${getTranslation('Public')}` && data.isPublished == 1 ?
                    '' : <AddButton
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
                    />}
            </React.Fragment>
        ))
    }

    const renderInput = listInput => {
        return listInput.map((item) => (
            <div key={item.id}>
                <Typography className={classes.label}>{item.label}{item.isTextField ? <span className={classes.spanStyle}>*</span> : ''}</Typography>
                <div className={classes.userInput}>
                    {loadingSkeleton ? (
                        <div className="skeleton__button">
                            {
                                <Skeleton type="contactCard" height={100} />
                            }
                        </div>

                    ) : (item.isSelect) ? (
                        <>
                            {item.isMultipleSelect ?
                                <div className="view-action__filter--item">
                                    <MultipleSelect
                                        nameField={item.fieldFilter}
                                        listData={item.list || []}
                                        placeholder={item.placeholder}
                                        handleFilter={item.handleData}
                                        valueSelect={item.valueSelect}
                                        value={item.value}
                                        isNotification={item.isNotification}
                                        disabled={item.valueSelect && item.valueSelect.length > 0 ? true :
                                            (isDisable && data.notification_cat != "" ? true : false)}
                                    />
                                    <FormHelperText id="my-helper-text" error={errors[item.fieldFilter] && errors[item.fieldFilter].length ? true : false}>{errors[item.fieldFilter]}</FormHelperText>
                                </div>
                                :
                                <div className="view-action__filter--item">
                                    <SelectNotify
                                        nameField={item.fieldFilter}
                                        listData={item.list || []}
                                        placeholder={item.placeholder}
                                        handleFilter={item.handleData}
                                        value={item.value}
                                    />
                                </div>
                            }
                        </>
                        ) : (
                                <div className={item.isPost ? '' : 'infomation__action'}>
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
                                        className={item.isPost ? 'textArea' : ""}
                                        rows={item.isPost ? 5 : 0}
                                    />
                                </div>
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
                    <BreadCrumbs classes={classes} links={links} titleCurrent={`${isCreate ? getTranslation('createNotifications') : getTranslation('editNotifications')}`} handleClose={redirectBack} />
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
                                    redireact={true}
                                />
                            </div>
                        </div>
                        <div className="banners__button">
                            {
                                !loadingSkeleton ? (
                                    actions && actions.length > 0 ? renderAtions(actions) : null)
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
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                            {
                                lists_input && lists_input.length ? renderInput(lists_input) : ""
                            }
                        </Grid>

                    }
                </Paper>
            </Box>
        </>
    )
}
export default ViewPageNotification;
