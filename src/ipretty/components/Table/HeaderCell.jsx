import React from 'react'
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { CheckBoxOutlineBlank } from '@material-ui/icons'
import Sort from '../../../public/icons_ipretty/Sort.png'
import IconImage from "ipretty/components/IconImage"
import { useStyles } from './DataTable.style'
import Tooltip from '@material-ui/core/Tooltip';

function HeaderCell(props) {
    const classes = useStyles();
    // console.log(props.column, 'props.column')
    const { firstCol, align, title, titleHover, icon, sortData, name } = props.column
    if (firstCol) {
        return (
            <TableHeaderRow.Cell {...props} className={classes.tableHead}>
                <CheckBoxOutlineBlank className={classes.mRight8} color="secondary" />
                {title}
            </TableHeaderRow.Cell>
        );
    }

    function handleClick() {
        sortData && sortData(name)
    }

    return (
        <Tooltip title={titleHover ? titleHover : ''}>
            <TableHeaderRow.Cell
                {...props}
                className={
                    align && align === 'center'
                        ? classes.alignCenter + ' ' + classes.tableHead
                        : classes.tableHeaderRow + ' ' + classes.tableHead
                }
            >
                <span className={icon ? "icon" : ''} onClick={handleClick}>{icon && <IconImage srcIcon={Sort} />}</span>{title ? title : ''}
            </TableHeaderRow.Cell>
        </Tooltip>
    );
};

export default HeaderCell

