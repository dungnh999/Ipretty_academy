import React, { useState, useEffect, useMemo } from 'react' 
import { useAuth } from "ipretty/context/AppProvider"
import { Typography, makeStyles, Grid } from '@material-ui/core'
import ViewPage from 'ipretty/components/ViewPage/ViewPage'
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPrams } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import UserService from 'ipretty/services/UserService'
import Chat from '../../../../public/icons_ipretty/chat.png'
import Information from '../../../../public/icons_ipretty/User.png'
import Danger_Circle_Course from '../../../../public/icons_ipretty/Danger_Circle_Course.png'
const useStyles = makeStyles(
    theme => ({
        box: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E5E5E5',
            [theme.breakpoints.down("xs")]: {
                padding: 10,
            },
            [theme.breakpoints.up("sm")]: {
                padding: 20,
            },

        },
        flexDisplay: {
            display: 'flex',
            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
                padding: '10px',
                '& .MuiButton-root': {
                    marginTop: theme.spacing(1)
                }
            },
        },
    })
)

function UserView(props) {
    const {history} = props
    const classes = useStyles();
    const { user, getTranslation } = useAuth();
    const fieldsSearch = ['name']
    const ListACtionDataTable = useMemo(() => [
        { id: 1, icon: Information, action: handleDetail, title: getTranslation('Profile') },
        { id: 2, icon: Chat, action: handleMessage, title: getTranslation('chat') },
        { id: 3, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const columns = useMemo(() => [
        { name: 'stt', title: 'Stt', align: 'center' },
        { name: 'admin', title: getTranslation('Administrator'), icon: true },
        { name: 'code', title: getTranslation('Code'), icon: true  },
        { name: 'email', title: 'Email', icon: true  },
        { name: 'phone', title: getTranslation('Phone'), icon: true  },
        { name: 'courseStatus', title: getTranslation('CourseStatus'), icon: true  },
        { name: "", title: "", type: "more" , list: ListACtionDataTable}
    ], [])
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], [])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState(initialPrams(queryString.parse(props.location.search, { arrayFormat: 'comma' })))
    const [isSearchData, setIsSearchData] = useState(false)

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getListUser(params)
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
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearchData) {
                        setLoading(true)
                        getListUser(params)
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
    }, [isSearchData])

    function getListUser(params) {
        UserService.getListUser({...params, 'account_type': 'internal'},
            res => {
                const users = res.data.data.data
                users.map((user, index) => {
                    user.stt = index + 1
                    return user
                })
                setUsers(users)
                setLoading(false)
                setIsSearchData(false)
            },
            err => {

            }
        )
    }

    function handleSearch(value, fields) {
		const _params = { ...params, page: 1, keyword: value, fieldName: fields };
		setParams(_params)
        setIsSearchData(true)
	}

    function handlePageChange() {

    }

    function redirectBack() {
        history.push('/');
    }

    function handleDetail(row) {
        history.push(`/users/${row.id}/detail`)
    }

    function ActionError() {
        history.push('/report-errors')
    }

    function handleMessage(){

    }
    return (
        <>
        <Grid className={classes.box}>
            <ViewPage
                titlePage={getTranslation('MemberManagement')}
                titleButton={getTranslation('AddMember')}
                url={`/users/add`}
                redirectBack={redirectBack}
                handleSearch={handleSearch}
                fieldsSearch={fieldsSearch}
                placeholderSearch={getTranslation('SearchForUnit') + '...'}
                links={links}
            >
                <DataTable
                    rows={users}
                    columns={columns}
                    loading={loading}
                    optPaging={params}
                    getTranslation={getTranslation}
                    fieldId={'id'}
                    // handleClickRow={handleClickRow}
                    // handleDelete={handleDelete}
                    handlePageChange={handlePageChange}
                />
            </ViewPage>
        </Grid>
        </>
    )
}

export default UserView