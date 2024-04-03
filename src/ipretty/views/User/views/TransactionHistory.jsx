import React, { useState } from 'react';
import TransactionDetail from '../views/TransactionDetail';


const TransactionHistory = (props) => {
    return (
        <React.Fragment>
            <TransactionDetail
                isTransactionHistory={true}
            />
        </React.Fragment>
    )
}

export default TransactionHistory