import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { makeStyles, Grid, Card } from '@material-ui/core';
import HeaderProfile from '../components/profile-admin/HeaderProfile';
import TransactionService from 'ipretty/services/TransactionService';
import DataTable from 'ipretty/components/Table/DataTable';
import Detail from '../../../../public/icons_ipretty/More_Course.png';
import IconImage from 'ipretty/components/IconImage';
import { useHistory } from "react-router-dom";
import { initialPramsCourse } from 'ipretty/helpers/contextHelper';
import queryString from "query-string";

const useStyles = makeStyles(theme => ({
    transactionHistory: {   
        [theme.breakpoints.up("md")]: {
            padding: '32px 80px 85px 80px',
        }, 
        [theme.breakpoints.down("sm")]: {
            padding: '32px 20px 45px 20px',
        }, 
        [theme.breakpoints.down("xs")]: {
            padding: '32px 16px 45px 16px',//pading doi voi man mobile
        }, 
        '& .MuiPaper-rounded': {
            borderRadius: '8px',
        },
        '& .title': {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '36px',
            lineHeight: '44px',
            letterSpacing: '-0.011em',
            color: '#395B65',
            paddingBottom: '26px'
        },
        '& table': {
            '& .MuiTableCell-head': {
                backgroundColor: "#FFFF !important",
                color: '#3D423C',
                fontFamily: 'San Francisco Text',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight: '16px',
                padding: '11px',
                textAlign: 'center',
                justifyContent: 'center',
            },
            '& .MuiTableCell-root': {
                borderBottom: '1px solid #DADFD9',
                background: '#FFFF',
                justifyContent: 'center !important'
            },
            '& .MuiTableCell-root div': {
                justifyContent: 'center'
            },
            '& .MuiTableCell-root .icon': {
                display: 'none'
            },
            '& .MuiTableRow-root .MuiTableCell-body': {
                padding: '36px 0px',
                color: '#3D4230C',
                fontFamily: 'San Francisco Text',
                justifyContent: 'center',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                letterSpacing: '-0.011em'
            },
            '& .MuiTableBody-root .MuiTableRow-root:nth-child(even) .MuiTableCell-root': {
                background: '#FFFF',
            }
        },
    },

}))

const TransactionDetail = (props) => {
    const classes = useStyles()
   const { isTransactionHistory } = props
    const { getTranslation, user } = useAuth()
    const titlePage = getTranslation('payment');
    const [payMent, setPayMent] = useState([]);
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    const [isSearchData, setIsSearchData] = useState(false)
   

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsSearchData(true)
    }
    function redirectDetail(value, row) {
        history.push(`/transaction-history/${row.transaction_id}/detail`)
    };

    const columns = useMemo(() => [
        { name: "transaction_code", title: getTranslation("Codeorders"), align: "center" },
        { name: "amount_money", title: getTranslation("Amountofmoney"), icon: true },
        { name: "payment_method", title: getTranslation("Paymentmethods"), icon: true },
        { name: "confirmed_at", title: getTranslation("dateOfPayment") + '/' + getTranslation('orderCancellationDate'), icon: true },
        { name: "status", title: getTranslation("paymentStatus"), icon: true },
        { name: "detail", title: getTranslation("Details"), type: "detail", iconEdit: <IconImage srcIcon={Detail} /> }
    ], []);
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })));
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListTransactionOfAUser(params);
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
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearchData) {
                        setLoading(true);
                        getListTransactionOfAUser(params);
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
    }, [isSearchData]);

    function getListTransactionOfAUser(params) {
        TransactionService.getTransactionHistoryOfAUser(
            { ...params },
            (res) => {
                const data = res.data.data.data;
                const total = res.data.data.total;
                const current_page = res.data.data.current_page;
                data.map((item, index) => {
                    item.amount_money = item.order.grandTotal ? item.order.grandTotal : '';
                    item.payment_method = item.payment_method == 'banking' ? getTranslation('Bankingtransfer') : getTranslation('direct');
                    item.status = item.status == 'approved' ? getTranslation('approved') : (item.status == 'rejected' ? getTranslation('rejected') : getTranslation('processing'));
                    return item;
                });
                setPayMent(data)
                setIsSearchData(false)
                setLoading(false)
                const _params = {
                    ...params,
                    page: current_page,
                    total: total,
                };
                setParams(_params)
            },
            (err) => { }
        );
    }

    return (
        <>
            <HeaderProfile
                getTranslation={getTranslation}
                dataUser={user}
                titlePage={titlePage}
                isTransactionHistory={isTransactionHistory}
            />
            <Grid className={classes.transactionHistory}>
                <div className="title">{getTranslation('paymentHistory')}</div>
                <Card className="table">
                    <DataTable
                        rows={payMent}
                        columns={columns}
                        loading={loading}
                        optPaging={params}
                        getTranslation={getTranslation}
                        fieldId={'transaction_id'}
                        handlePageChange={handlePageChange}
                        noSelection={true}
                        redirectDetail={redirectDetail}
                    />
                </Card>
            </Grid>
        </>
    )
}

export default TransactionDetail