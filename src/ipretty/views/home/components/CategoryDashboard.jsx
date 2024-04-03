import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import ReactVirtualizedTable from './DataTableHome'


const useStyles = makeStyles(theme => ({
    managementView: {
        marginRight: 32,
        width: '100%',
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: '10px 0px 72px',
            marginTop: 28,
            '& .title' :{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily : 'San Francisco Text bold',
                color: '#27384C',
                padding : 32
            },
            [theme.breakpoints.down("xs")]: {
                '& .MuiTableCell' : {
                    fontSize: 12, //fix  Danh mục nổi bật: Table list size chữ lớn
                }
              },

            // '& .MuiVirtualizedTable-headerStyle-166' : {
            //     fontSize: 12, //fix  Danh mục nổi bật: Table list size chữ lớn
            // }
        },
    },
}))

function CategoryDashboard(props) {
    const classes = useStyles()
    const { dataCourseCategories } = props
    const { getTranslation } = useAuth()
    const columns = useMemo(() => [
        { dataKey: 'name', width: 320 ,label: getTranslation('CategoryName')   },
        { dataKey: 'view', width: 200,label: getTranslation('View') },
        { dataKey: 'register', width: 200 , label: getTranslation('Subscription') },
        { dataKey: "ratio", width: 200 , label: getTranslation("ratio") },
    ], [])

    return (
        <div className={classes.managementView}>
            <div className="view">
                <div className="title">
                   {getTranslation('Featuredcategories')}
                </div>
                {/*<ReactVirtualizedTable*/}
                {/*    rows={dataCourseCategories}*/}
                {/*    columns={columns}*/}
                {/*/>*/}
            </div>
        </div>
    )
}

export default CategoryDashboard