import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useAuth } from 'ipretty/context/AppProvider';
import AddButton from '../AddButton';
import BreadCrumbs from '../BreadCrumbs'
import Arrrow_Right from '../../../public/icons_ipretty/Arrrow_Right.png'
import IconImage from "ipretty/components/IconImage";
import Skeleton from '../Skeleton';

const useStyles = makeStyles(theme => ({
    detailPage: {
        color: '#6F9396',
        "& .header": {
            "& .header__bread-crumd": {
                "& .MuiBreadcrumbs-ol": {
                    "& .MuiTypography-root": {
                        color: '#6F9396',
                        fontSize: 12,
                        fontFamily: 'San Francisco Text Bold'
                    },
                    '& svg' : {
                        color: '#6F9396',
                    }
                }
            },
            "& .header__button": {
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: 17,
                [theme.breakpoints.down('md')] :{
                    flexDirection: 'column', 
                        
                },
                [theme.breakpoints.down('sm')]: {
                   flexDirection: 'column',
                   marginLeft: 0,
                 },
                 [theme.breakpoints.down('xs')]: {
                    flexDirection: 'column',
                    marginLeft: 0,
                 },
                 '& .skeleton__button' :{
                    display: 'flex',
                    "& .MuiSkeleton-root": {
                        marginRight: 8
                    }
                },
                "& .header__button--back": {
                    paddingBottom : 15,
                    [theme.breakpoints.down('md')] :{
                        paddingBottom : 0,//fix khoang cach tren tren duoi deu nhau tren mobile
                     },
                    "& .header__button--back--style": {
                        fontSize: 32,
                        lineHeight: '32px',
                        fontWeight: 'bold',
                        background: '#E5E5E5',
                        color: '#395B65',
                        paddingLeft: 0,
                        [theme.breakpoints.down('xs')]: {
                            fontSize: 17,//fix bug 46 size chữ phải dòngd nhat
                            justifyContent: 'normal',//fix bug 79
                        },
                        "& .MuiButton-label": {
                            "& .makeStyles-icon16-26": {
                                width: 15,
                                [theme.breakpoints.up("lg")]: {
                                    fontSize: 25,
                                 },
                                [theme.breakpoints.down('xs')]: {
                                    width: 11,
                                    paddingBottom : 30
                                 },
                            }
                        },
                        "& .button__icon": {
                            width: 15,
                            height: 24
                        }
                    },
                    "& .header__button--back--style:hover": {
                        boxShadow: 'none'
                    }
                },
                "& .button-management": {
                    display: 'flex',
                    [theme.breakpoints.down('md')] :{
                       justifyContent : 'end'
                    },
                    [theme.breakpoints.down('sm')] :{
                        flexWrap: 'wrap',
                        marginTop: 18
                    },
                    [theme.breakpoints.down('xs')] :{
                        justifyContent : 'start',
                        marginTop: 5
                    },
                    // justifyContent: 'space-between',
                    "& .button": {
                        border: '1px solid #147B65',
                        marginRight: 7,
                        fontSize : 12,
                        [theme.breakpoints.down('xs')]: {
                            height:36,
                            fontSize : 10,
                            marginTop: 10,//fix khoang cach
                            paddingLeft: 10,//fixbug36
                        },
                        '& img' : {
                            width : 20,
                            paddingTop : 1,
                            [theme.breakpoints.down('xs')]: {
                                width:16,
                                fontSize : 10
                            },
                        },
                    },
                    '& .makeStyles-icon24-28' : {
                        [theme.breakpoints.down('xs')]: {
                            width:17,
                        },
                    },
                    "& .button:last-child": {
                        marginRight: 0,
                        [theme.breakpoints.down('xs')]: {
                            // marginTop: '18px',//fix bug button Quản lý thành viên 
                        },
                    },
                    "& .button--green:hover": {
                        background: '#147B65'
                    },
                    "& .button--white": {
                        background: '#fff',
                        color: '#147B65',
                        [theme.breakpoints.down('xs')]: {
                           minWidth : 80
                        },
                    },
                    '& .button__manage' : {
                        [theme.breakpoints.down('sm')]: {
                            marginTop : 18
                         },
                        [theme.breakpoints.down('xs')]: {
                            marginTop : 18
                         },
                    }
                }
            }
        }
    },
}));

const DetailPage = (props) => {
    const {
        children,
        redirectEdit,
        links,
        titleCurrent,
        redirectStudent,
        redirectCopy,
        isDisabled,
        redirectBack,
        labelCopy,
        labelStudent,
        redirectCreateStudent,
        handleExport,
        labelExport,
        labelAddStudent,
        redirectCreateManger,
        labelAddManager,
        actions,
        loading
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
                />
            </React.Fragment>
        ))
    }

    return (
        <div className={classes.detailPage}>
            <div className="header">
                <div className="header__bread-crumd">
                    <BreadCrumbs classes={classes} links={links} titleCurrent={titleCurrent} />
                </div>
                <div className="header__button">
                    <div className="header__button--back">
                        <AddButton
                            label={titleCurrent}
                            id="update-button"
                            buttonClass="button header__button--back--style"
                            onClick={redirectBack}
                            variant='contained'
                            iconButton={<IconImage srcIcon={Arrrow_Right} icon16 />}
                            disabled={isDisabled ? true : false}
                        />
                    </div>
                    {

                        !loading ? (
                            actions && actions.length ? 
                            <div className="button-management">
                                    {renderAtions(actions)}
                            </div> : null)
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
            {children}
        </div>
    )
}

export default DetailPage;