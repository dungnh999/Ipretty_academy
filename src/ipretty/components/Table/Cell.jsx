import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { useStyles } from './DataTable.style'
import { CellFirst, CellIsEmpty, CellTime, Cellmore,
    CellStatus, CellAvatar, CellDefault, CellDelete, CellDetail, CellImage , CellResultImage, CellCurrency
} from './Cells'

function Cell(props) {
    const { 
        lang, 
        redirectDetail, 
        handleDeleteById, 
        pathname, 
        getTranslation, 
    } = props

    const { row, column, value } = props.row
    const classes = useStyles()
    useEffect(() => {
    
    }, [])

    if (column.firstCol) {
        return (
            <CellFirst classes={classes} row={row} column={column} />
        )
    } else if (column.avatarCol) {
        return (
            <CellAvatar classes={classes} row={row} column={column} />
        )
    }
    switch (column.type) {
        case 'delete':
            return <CellDelete classes={classes} value={value} row={row} handleDeleteById={handleDeleteById} />
        case 'detail': 
            return <CellDetail classes={classes} value={value} row={row} redirectDetail={redirectDetail} iconEdit={column.iconEdit} pathname={pathname} getTranslation={getTranslation} />
        case 'more':
            return <Cellmore 
                        classes={classes} 
                        value={value} 
                        row={row} 
                        pathname={pathname} 
                        getTranslation={getTranslation} 
                        list={column.list}
                        listChild={column.listChild}
                        is_course={column.is_course}
                        ListActionDatatableBTeacher={column.ListActionDatatableBTeacher}
                    />
    }

    switch (column.name) {
        case 'email':
            return (
                <CellIsEmpty classes={classes} row={row} field={'email'} />
            )
        case 'email_verified_at':
        case 'updated_at':
        case 'order_':
        case 'expired_at':
        case 'created_at':
        case 'created_time':
        case 'start_time':
            return (
                <CellTime classes={classes} row={row} columnName={column.name} lang={lang} />
            )
        case 'status':
            return (
                <CellStatus classes={classes} row={row} />
            )
        case 'bannerUrl':
            return (
                <CellImage classes={classes} row={row} columnName={column.name}/>
            )
        case 'student_results_avg_rating': 
            return (
                <CellResultImage classes={classes} row={row} columnName={column.name} />
            )
        case 'grandTotalBFee':
        case 'grandTotalAFee':
        case  'course_price': 
            return (
                <CellCurrency row={row} columnName={column.name} />
            )
        default: return (<CellDefault {...props.row} className={classes.cell} />)
    }
}

export default Cell

Cell.propTypes = {
    row: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    getLogoPath: PropTypes.func,
    addressWithActions: PropTypes.bool,
    openClick: PropTypes.func,
    editClick: PropTypes.func,
    deleteClick: PropTypes.func,
    downloadClick: PropTypes.func,
    addClick: PropTypes.func,
}