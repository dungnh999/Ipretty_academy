import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import ReactVirtualizedTable from './DataTableHome'


const useStyles = makeStyles(theme => ({
    managementView: {
        // marginRight: 32,
        width: '100%',
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: '10px 0px 72px',
            marginTop: 28,
            '& .title' :{
                fontSize: 20,
                fontFamily : 'San Francisco Text bold',
                fontWeight: 'bold',
                color: '#27384C',
                padding : 32
            }
        },
        [theme.breakpoints.down("xs")]: {
            '& .MuiTableCell' : {
                fontSize: 12, //fix  Danh mục nổi bật: Table list size chữ lớn
            }
        },
    },
}))

function CategoryDashboard(props) {
    const classes = useStyles()
    const {dataFeatureMembers } = props
    const { getTranslation } = useAuth()
    const columns = useMemo(() => [
        { dataKey: 'name', width: 320 , height: 100 ,label: getTranslation('NameMenber')   },
        { dataKey: 'register', width: 200,label: getTranslation('Subscription') },
        { dataKey: 'certificate', width: 200 , label: getTranslation('Certificate') },
        { dataKey: "account", width: 200 , label: getTranslation("accounttype") },
    ], [])
   
    return (
        <div className={classes.managementView}>
            <div className="view">
                <div className="title">
                   {getTranslation('Featuredmember')}
                </div>
                <ReactVirtualizedTable
                    rows={dataFeatureMembers}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default CategoryDashboard