import React, { useMemo, useState } from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountCircle, CheckBoxOutlineBlank } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import contextHelper from 'ipretty/helpers/contextHelper'
import moment from 'moment'
import More_Course from '../../../public/icons_ipretty/Com.svg'
import IconImage from "ipretty/components/IconImage"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '../../../public/icon_svg/Edit.svg'
import { useStyles } from './DataTable.style'
import { useAuth } from "ipretty/context/AppProvider";
import BANNER_DEFAULT from '../../../public/icons_ipretty/Default.png'
import Start from '../../../public/icon_svg/Star.svg';


export const CellDetail = (props) => {
    const { redirectDetail, value, row, iconEdit, classes, pathname, getTranslation } = props
    const handleClick = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        redirectDetail(value, row)
    }

    const handleClickMyUser = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        redirectDetail(row)
    }

    if (iconEdit) {
        return (
            <Table.Cell>
                <div className={classes.editColl}>
                    <IconButton onClick={(e) => handleClick(e, value)}>
                        {iconEdit}
                        {/* <IconImage  srcIcon={Edit} /> */}
                    </IconButton>
                    {/* <IconImage onClick={(e) => handleClick(e, value)} srcIcon={Edit} /> */}
                </div>
            </Table.Cell>
        )
    } else {
        return pathname && pathname.includes("myUser") ? (
            <div>
                {(row.is_mark == 0 && row.is_view) ||
                    (row.is_mark == 1 && row.is_view_teacher) ? (
                    <Table.Cell onClick={(e) => handleClickMyUser(e, value)}>
                        <a
                            href="!#"
                            className={classes.detailCell}
                        //   style={{
                        //     color: "#006fe5",
                        //     fontFamily: "Montserrat, sans-serif",
                        //   }}
                        >
                            {getTranslation("Details")}
                        </a>
                    </Table.Cell>
                ) : null}
            </div>
        ) : (
            <Table.Cell onClick={(e) => handleClick(e, value)}>
                <a
                    href="!#"
                    className={classes.detailCell}
                //   style={{ color: "#006fe5", fontFamily: "Montserrat, sans-serif" }}
                >
                    {getTranslation("Details")}
                </a>
            </Table.Cell>
        );
    }
}

export const Cellmore = (props) => {
    const { value, row, classes, listChild, getTranslation, list, is_course, ListActionDatatableBTeacher } = props
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    let checkShare = row && (row.is_published == 1 && row.isDraft == 1 ||
        row.is_published == 0 && row.isDraft == 1 ||
        row.is_published == 0 && row.isDraft == 0) ? true : false
    let listCheck = is_course ? ( row.endTime && moment(row.endTime).valueOf() < moment(new Date()).valueOf() ? checkShare ? list : listChild : checkShare ? list : listChild ) : list
    let listData = user.menuroles != 'admin' ? user && row.teacher && row.teacher.id && user.id == row.teacher.id ? listCheck : ListActionDatatableBTeacher : listCheck

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (row, action) => {
        setAnchorEl(null);
        action(row)
    }

    const renderMenu = (list, row) => {
        return list.map((item, index) => (
            <ListItem button onClick={() => handleAction(row, item.action)} disabled={row[item.name]} key={index}>
                <ListItemIcon>
                    <IconImage  srcIcon={item.icon} />
                </ListItemIcon>
                <ListItemText
                    className={classes.viewMore}
                    primary={getTranslation(`${item.title}`)}
                />
            </ListItem>
        ))
    }

    return (
        <Table.Cell>
            <div className={classes.databaseMenu}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <IconImage srcIcon={More_Course} />
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <List className={classes.root} disablePadding>
                        {listData && listData.length > 0 && renderMenu(listData, row)}
                    </List>
                </Menu>
            </div>
        </Table.Cell>
    )
}

export const CellDelete = (props) => {
    const { handleDeleteById, value, row, classes } = props

    const handleClickDelete = (e, value) => {
        e.preventDefault()
        e.stopPropagation()
        handleDeleteById(value, row)
    }

    return (
        <Table.Cell>
            <div className={classes.deleteCol}>
                <IconButton onClick={(e) => handleClickDelete(e, value)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Table.Cell>
    )
}

export const CellFirst = (props) => {
    const { row, column, classes } = props

    return (
        <Table.Cell>
            <div className={classes.firstCol}>
                <CheckBoxOutlineBlank className={classes.mRight8} color="secondary" />
                {row[column.name] ? row[column.name] : '--'}
            </div>
        </Table.Cell>
    )
}

export const CellAvatar = (props) => {
    const { row, column, classes, armorial } = props
    const [isDefaultAvatar, changeIsDefaultAvatar] = useState(false)

    return (
        <Table.Cell>
            <div className={classes.cellIdName}>
                {column.avatarCol && (
                    <React.Fragment>
                        {isDefaultAvatar ? (
                            <Avatar alt='photo'>
                                <AccountCircle />
                            </Avatar>
                        ) : (
                            <Avatar
                                variant={column.bannerCol ? "square" : 'circle'}
                                alt='photo'
                                src={contextHelper.renderAvatar(row.avatar)}
                                onError={() => changeIsDefaultAvatar(true)}
                            />
                        )}
                        &nbsp;
                        {row.name}
                    </React.Fragment>
                )}

                {row[column.avatar]}

            </div>
        </Table.Cell>
    )
}

export const CellStatus = (props) => {
    const { classes, row } = props

    return (
        <Table.Cell align="left">
            <div className={classes.tableCellStatus}>
                {row.status}
            </div>
        </Table.Cell>
    )
}

export const CellResultImage = (props) => {
    const { classes, row } = props

    return (
        <Table.Cell align="left">
            <div className={classes.tableCellResult}>
                <span >< img className="img" src={Start}/></span> <b>{row.student_results_avg_rating ? parseFloat(row.student_results_avg_rating).toFixed(1) : '0.0'} </b>
            </div>
        </Table.Cell>
    )
}
export const CellCurrency = (props) => {
    const { row, columnName } = props
    return (
        <Table.Cell align="left">
            <span> { row[columnName] ? row[columnName].toLocaleString('vi-VN', { currency: 'VND' }) : ''} </span>
        </Table.Cell>
    )
}

export const CellTime = (props) => {
    const { row, columnName, lang, classes } = props
    moment.locale(lang)
    const time = columnName === 'start_time' ? moment(row[columnName]) : moment.utc(row[columnName]).local()

    return (
        <Table.Cell>
            <div className={classes.tableCell}>
                {   columnName === 'created_time' || columnName === 'updated_at'?
                        row[columnName] ? time.local().format('DD-MM-YYYY HH:mm') : "--"
                    : 
                        row[columnName] ? time.local().format('DD-MM-YYYY') : "--"
                }
            </div>
        </Table.Cell>
    )
}

export const CellIsEmpty = (props) => {
    const { row, classes, field } = props

    return (
        <Table.Cell>
            <div className={classes.tableCell}>
                {row[field] ? row[field] : '--'}
            </div>
        </Table.Cell>
    )
}

export const CellImage = (props) => {
    const { row, classes, columnName } = props
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(false)

    function useDefault(event) {
        event.target.src = BANNER_DEFAULT
        setUseDefaultAvatar(true);
    }
    return (
        <Table.Cell>
            <div className={classes.tableCellImage}>
                <div className="imageCell__wrapper">
                    <React.Fragment>
                        {useDefaultAvatar ? (
                            <Avatar
                                variant="square"
                                src={BANNER_DEFAULT}
                                onError={useDefault}
                            />
                        ) : (
                            <Avatar
                                variant="square"
                                alt='photo'
                                src={contextHelper.renderAvatar(row[columnName])}
                                onError={useDefault}
                            />
                        )}
                    </React.Fragment>
                </div>
            </div>
        </Table.Cell>
    )
}

export const CellDefault = (props) => {
    return (
        <Table.Cell {...props}/>
    )
}