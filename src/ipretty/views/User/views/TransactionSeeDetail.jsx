import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { makeStyles, Grid, Card, Link } from '@material-ui/core';
import TransactionService from 'ipretty/services/TransactionService';
import DataTable from 'ipretty/components/Table/DataTable';
import { useHistory } from "react-router-dom";
import { ArrowBackIos } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    backLink: {
        display: "flex",
        fontWeight: '600',
        fontSize: '16px',
        color: '#395B65',
        "& .MuiSvgIcon-fontSizeSmall": {
            marginTop: '2px',
            fontSize: '1.1rem'
        },
    },
    detailsTransaction: {
        [theme.breakpoints.up("md")]: {
            padding: '24px 80px 85px 80px',
        },
        [theme.breakpoints.down("sm")]: {
            padding: '24px 0px 85px 30px',
        },
       
        '& .title': {
            paddingTop: '24px',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '36px',
            lineHeight: '44px',
            letterSpacing: '-0.011em',
            color: '#395B65',
            paddingBottom: '26px'
        },
        '& .root': {
            [theme.breakpoints.up("md")]: {
                display: 'flex',
            },
            '& .course': {
                marginRight: '32px',
                height: '334px',
                overflowY: 'scroll',
                '& table': {
                    width: '100%'
                },
                '& tr': {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: '25px !important',
                    paddingRight: '67px !important'
                },
                '& th': {
                    fontFamily: 'San Francisco Text',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#3D423C'
                },
                '& .title': {
                    padding: '18px 0px 12px 0px ',
                },
                '& .content': {
                    padding: '24px 0px',
                    borderTop: '1px solid #DADFD9',
                    '& .name_course':{
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '18px',
                        lineHeight: '24px',
                        letterSpacing: '-0.011em',
                        color: '#3D423C',
                        width:'80%'
                    },
                    '& .amount':{
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '18px',
                        lineHeight: '24px',
                        textAlign: 'right',
                        color: '#3D423C'
                    }
                } , 
                '& .noData': {
                    textAlign: 'center',
                    padding: '30px 0px'
                }       
            },
            '& .result': {
                [theme.breakpoints.down("sm")]: {
                    padding: '24px 220px 85px 0px',
                }, 
                [theme.breakpoints.down("xs")]: {
                    padding: '24px 30px 85px 0px',
                }, 
                '& .total': {
                    padding: '8px 31px 24px 31px',
                    '& .amount': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '16px'
                    },
                },
                '& .amountTotal': {
                    padding: '8px 31px 24px 31px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #DADFD9'
                }
            }
            
        }
    }
}))

const TransactionSeeDetail = (props) => {
    const classes = useStyles();
    const order_id = props.match.params.order_id;
    const { getTranslation } = useAuth();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    const [amount, setAmount] = useState({
        grandTotal: '',
        vat: '',
        discount_code: '',
        total: ''
    });
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListTransactionOfAUser();
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

    function getListTransactionOfAUser(paging) {
        TransactionService.getDetailTransaction(
            order_id,
            (res) => {
                const data = res.data.data.order;
                setAmount({
                    ...amount,
                    grandTotal: data.total ? handleValue(data.total) : 0,
                    vat: data.total ? handleValue(data.total / 10) : 0,
                    discount_code: data.salePrice ? handleValue(data.salePrice) : 0,
                    total: data.grandTotal ? handleValue(data.grandTotal) : 0
                })
                setCourse(data.courses)
                setLoading(false)
            },
            (err) => { }
        );
    }
    function handleValue(value) {
        
        let str = [...value.toString()].reverse().join('');
        let count = 0;
        let reverse = ''
        for (let i = 0; i < str.length; i++) {
            reverse += str.charAt(i);
            count += 1;
            if (count == 3 && i !== str.length-1) {
                reverse += '.';
                count = 0;
            }
        }
        return [...reverse].reverse().join('');
    }

    function dataTableCourse() {
        return (< >
            <table>
                <thead>
                    <tr className="title">
                        <th>{getTranslation("course")}</th>
                        <th>{getTranslation("Amountofmoney")}</th>
                    </tr>
                </thead>

                <tbody> 
                    {course && course.length > 0 ? course.map((value, index) => (
                        <tr className="content" key={index}>
                            <td className="name_course"><b>{value.course_name}</b></td>
                            <td className="amount">{handleValue(value.course_price)}</td>
                        </tr>
                    )) : 
                    <div className="noData">
                       <b>{getTranslation('noData')}</b> 
                    </div>
                    }
                </tbody>
            </table>
        </>)
      };

    return (
        <Grid className={classes.detailsTransaction}>
            <div>
                <Link
                    id="linkBack2"
                    component="button"
                    variant="body2"
                    classes={{
                        root: classes.backLink
                    }}
                    onClick={() => {
                        history.push('/transaction-history')
                    }}
                >
                    <ArrowBackIos fontSize="small" />
                    {getTranslation("Back")}
                </Link>
            </div>
            <div className="title">{getTranslation('detailsTransaction')}</div>
            <Grid item xs={12} className="root">
                <Grid item xs={12} md={8} className="course">
                    <Card style={{width: '100% important'}}>
                    {dataTableCourse()}
                    </Card>
                </Grid>
                <Grid className="result" item xs={12} md={4} >
                    <Card  >
                        <div className="total">
                            <div className="amount">
                                <b>{getTranslation("intomoney")}</b>
                                <div>{amount.grandTotal} <span>VND</span></div>
                            </div>
                            <div className="amount">
                                <b>VAT</b>
                                <div>{amount.vat} <span>VND</span></div>
                            </div>
                            <div className="amount">
                                <b>{getTranslation("Discountcode")}</b>
                                <div>{amount.discount_code}</div>
                            </div>
                        </div>
                        <div className="amountTotal">
                            <b>{getTranslation("Total")}</b>
                            <div>{amount.total} <span>VND</span></div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TransactionSeeDetail