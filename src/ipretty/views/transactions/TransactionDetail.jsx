import React, { useState, useEffect , useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import Skeleton from 'ipretty/components/Skeleton'
import { useHistory } from "react-router-dom";
import {makeStyles, Box, Paper  } from '@material-ui/core';
import BreadCrumbs from 'ipretty/components/BreadCrumbs'
import AddButton from "ipretty/components/AddButton";
import Back from '../../../public/icon_svg/back.svg'
import IconImage from "ipretty/components/IconImage";
import TransactionService from 'ipretty/services/TransactionService'

const useStyles = makeStyles(theme => ({
    bannerDetail: {
        '& .bannerDetail__banner': {
            '& .bannerDetail__banner__urlRedirect': {
                padding: '16px 0px 0px 80px',
                [theme.breakpoints.down('xs')]: {
                    padding: '16px 0px 0px 19px',
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
            },
        },
    },
    root :{
       display :  'flex', 
       padding : '26px 256px 0',
       [theme.breakpoints.down("lg")]: {
        padding : '26px calc((100% - 1100px)/2) 0',
        },
        [theme.breakpoints.down('md')]: {
            padding : "26px calc((100% - 840px)/2) 0",
           flexDirection : 'column'
        },
        [theme.breakpoints.down('sm')]: {
            padding : "26px calc((100% - 700px)/2) 0",
        },
        [theme.breakpoints.down('xs')]: {
            padding : "26px calc((100% - 365px)/2) 0",
        },
       width : '100%',
       '& .courseDetail' : {
            width : '66%',
            [theme.breakpoints.down('md')]: {
               width : '100%',
               paddingBottom : '32px'
            },
            [theme.breakpoints.down('sm')]: {
                width : '100%',
                paddingBottom : '32px'
            },
            [theme.breakpoints.down('xs')]: {
                width : '100%',
                paddingBottom : '32px'
            },
            '& .courseDetail__content' : {
               paddingTop : '18px',
               paddingBottom : '24px',
               '& .courseDetail__header' : {
                   display : 'flex',
                    paddingLeft : '24px',
                   justifyContent : "space-between",
                   paddingRight : '40px',
                   borderBottom : '1px solid #DADFD9',
                   paddingBottom : 18,
                   [theme.breakpoints.down('md')]: {
                    paddingRight : '50px',
                 },
                 [theme.breakpoints.down('sm')]: {
                    paddingRight : '50px',
                 },
                 [theme.breakpoints.down('xs')]: {
                    paddingRight : '50px',
                 },
               },
               '& .courseDetail__content__detail' : {
                   '& .courseDetail_content__course' : {
                       display : 'flex',
                       justifyContent : "space-between",
                       borderBottom : '1px solid #DADFD9',
                       '& .courseDetail__course--title' : {
                           paddingLeft : 25,
                           paddingBottom : 24,
                           paddingTop : '24px',
                           fontSize : '18px',
                           color: '#3D423C',
                           fontFamily : 'San Francisco Text Bold',
                       },
                       '& .courseDetail__course--money' : {
                            paddingRight : 40,
                            paddingBottom : 24,
                            paddingTop : '24px',
                            fontSize : '18px',
                            color: '#3D423C',
                            fontFamily : 'San Francisco Text',
                            [theme.breakpoints.down('md')]: {
                                paddingRight : '50px',
                             },
                             [theme.breakpoints.down('sm')]: {
                                paddingRight : '50px',
                             },
                             [theme.breakpoints.down('xs')]: {
                                paddingRight : '50px',
                             },
                       }
                   }
               }
            }
       },
       '& .totalTransaction' : {
            paddingLeft : '32px',
            width : '34%',
            [theme.breakpoints.down('md')]: {
                width : '100%',
                paddingLeft : 0,
                paddingBottom : '32px'
             },
             [theme.breakpoints.down('sm')]: {
                 width : '100%',
                 paddingBottom : '32px',
                 paddingLeft : 0,
             },
             [theme.breakpoints.down('xs')]: {
                 width : '100%',
                 paddingBottom : '32px',
                 paddingLeft : 0,
             },
            '& .totalTransaction__header' : {
                paddingLeft : '50px',
                paddingTop : '18px',
                paddingBottom : '24px',
                paddingRight : '50px',
                '& .totalTransaction__content' : {
                    borderBottom : '1px solid #DADFD9',
                    '& .totalTransaction__content__money' :{
                        display: 'flex',
                        justifyContent : "space-between",
                        '& .totalTransaction__content__money--title' :{
                            fontSize : '18px',
                            color: '#3D423C',
                            fontFamily : 'San Francisco Text Bold',
                            paddingBottom : 16
                        },
                        '& totalTransaction__content__money--money' :{
                            fontSize : '18px',
                            color: '#3D423C',
                            fontFamily : 'San Francisco Text',
                        }
                    }
                },
                '& .totalTransaction__total' : {
                    paddingTop : '18px',
                    display: 'flex',
                    justifyContent : "space-between",
                    '& .totalTransaction__content__money--title' :{
                        fontSize : '18px',
                        color: '#3D423C',
                        fontFamily : 'San Francisco Text Bold',
                        paddingBottom : 16
                    }
                }
            }

       }
    }
}))

function TransactionDetail (props) {
    const { } = props
    const classes = useStyles()
    const { getTranslation} = useAuth()
    const id = props.match.params.id
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('transactionManagement'), path: '/transactions' },
    ], [])
    const titlePage = getTranslation('detailsTransaction')
    const [dataCourses, setDataCourses] = useState([])
    const [dataOrder , setDataOrder] = useState({})
    let history = useHistory()
    function redirectBack() {
        history.push('/transactions')
    }
    console.log(dataCourses)
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getDetailTransaction(id)
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

    const getDetailTransaction = (id) => {
        TransactionService.getDetailTransaction(
            id,
            res => {
                setDataCourses(res.data.data.order.courses)
                setDataOrder(res.data.data.order)
            }),
            err => {
                console.log(err)
            }
    }
    return (
        <>
            <div className={classes.bannerDetail}>
                <div className="bannerDetail__banner">
                    <div className="bannerDetail__banner__urlRedirect">
                        <div className="header__bread-crumd">
                            <BreadCrumbs classes={classes} links={links} titleCurrent={titlePage} />
                        </div>
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
                    </div>
                   
                </div>
            </div>
            <div className={classes.root}>
                <div className="courseDetail">
                    <Box>
                        <Paper className="courseDetail__content">
                            <div className="courseDetail__header">
                                <div className="courseDetail__header--title">
                                    {getTranslation('Course')}
                                </div>
                                <div className="courseDetail__header--money">
                                    {getTranslation('Amountofmoney')}
                                </div>
                            </div>
                            <div className="courseDetail__content__detail">
                                {
                                    dataCourses && dataCourses.length && dataCourses.map((data , index) => {
                                        return (
                                            <>  
                                                <div className="courseDetail_content__course" key={index}>
                                                    <div className="courseDetail__course--title">
                                                        {data.course_name}
                                                    </div>
                                                    <div className="courseDetail__course--money">
                                                        {(data.course_price).toLocaleString('vi-VN', {currency : 'VND'})}
                                                    </div> 
                                                </div>   
                                            </>    
                                    )})
                                }
                            </div>
                        </Paper>
                    </Box>
                </div>
                <div className="totalTransaction">
                    <Box>
                        <Paper className="totalTransaction__header">
                            <div className="totalTransaction__content">
                                <div className="totalTransaction__content__money">
                                    <div className="totalTransaction__content__money--title">
                                        {getTranslation('intomoney')}
                                    </div>
                                    <div className="totalTransaction__content__money--money">
                                        {
                                            dataOrder && dataOrder.total && (
                                                (dataOrder.total).toLocaleString('vi-VN', {currency : 'VND'}) 
                                            )
                                        } VND
                                    </div>
                                </div>
                                <div className="totalTransaction__content__money">
                                    <div className="totalTransaction__content__money--title">
                                       VAT
                                    </div>
                                    <div className="totalTransaction__content__money--money">
                                       {((dataOrder.total * 10 ) / 100 ).toLocaleString('vi-VN', {currency : 'VND'})} VND
                                    </div>
                                </div>
                                <div className="totalTransaction__content__money">
                                    <div className="totalTransaction__content__money--title">
                                        Giảm giá
                                    </div>
                                    <div className="totalTransaction__content__money--money">
                                        {
                                            dataOrder && dataOrder.salePrice && (
                                                (dataOrder.salePrice).toLocaleString('vi-VN', {currency : 'VND'}) 
                                            )
                                        } VND
                                    </div>
                                </div>
                            </div>
                            <div className="totalTransaction__total">
                                <div className="totalTransaction__content__money--title">
                                       {getTranslation('Total')}
                                </div>
                                <div className="totalTransaction__content__money--money">
                                        {
                                            dataOrder && dataOrder.grandTotal && (
                                                (dataOrder.grandTotal).toLocaleString('vi-VN', {currency : 'VND'}) 
                                            )
                                        } VND
                                </div>
                            </div>
                        </Paper>
                    </Box>
                </div>
            </div>
        </>
        
    )
}

export default TransactionDetail;
