import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'

function TableRow(props) {
    const { children, row, handleClickRow } = props

    const onClick = (e) => {
        handleClickRow && handleClickRow(row)
    }

    return (
        <Table.Row onClick={onClick} >
            {children}
        </Table.Row>
    )
}

export default TableRow
