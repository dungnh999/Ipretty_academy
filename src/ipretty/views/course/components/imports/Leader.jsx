
import DataTable from 'ipretty/components/Table/DataTable';
import React, { useEffect, useMemo, useState } from 'react'
import { initialPrams, sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import { useAuth } from "ipretty/context/AppProvider"
import { useLocation } from "react-router-dom";
import Search from 'ipretty/components/Search'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect'
import UserService from 'ipretty/services/UserService'
import Skeleton from 'ipretty/components/Skeleton';
import AddButton from 'ipretty/components/AddButton'

const Leader = React.memo((props) => {
    const { dataImport, setDataImport, selected } = props
    const { getTranslation } = useAuth()
    const fieldsSearch = useMemo(() => 'course_name', [])
    let location = useLocation()
    const columns = [
        { name: "name", title: getTranslation("Name"), icon: true, sortData: handleSort },
        { name: "email", title: getTranslation("Email"), icon: true, sortData: handleSort },
        { name: "code", title: getTranslation("Code"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort },
        { name: "position", title: getTranslation("Positions"), icon: true, sortData: handleSort },
    ];
    const [params, setParams] = useState(initialPrams(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])
    const [postions, setPostions] = useState([])
    const filters = [
        { id: 1, list: departments, fieldFilter: 'department_ids', placeholder: 'Bộ phận---' },
        { id: 2, list: postions, fieldFilter: 'positions', placeholder: 'Vị trí---' }
    ]
    const [loading, setLoading] = useState(false)
    const [loadingTable, setLoadingTable] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [paging, setPaging] = useState({
        limit: 10,
        total: 10,
        page: 1
    })

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getUsersByRole({ role: 'leader' }),
            UserService.getListPostions({ roles: 1}),
            UserService.asyncDepartments(),
        ]).then(([leaders, postions, departments]) => {
            let listPostions = postions.data.data
            let newListPostion = []
            listPostions && listPostions.length > 0 && listPostions.map((item) => {
                let obj = {
                    name: item,
                    id: item
                }
                newListPostion.push(obj)
            })
            let listLeader = leaders.data.data
            listLeader && listLeader.length > 0 && listLeader.map((item) => {
                item.position = item.meta && item.meta != null && JSON.parse(item.meta).position ? JSON.parse(item.meta).position == 'N/A' ? '' : JSON.parse(item.meta).position : ''
                item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
                return item
            })
            let listDepartment = departments.data.data
            listDepartment && listDepartment.length > 0 && listDepartment.map((item) => {
                item.name = item.department_name ? item.department_name : ""
                item.id = item.department_id ? item.department_id : ""
                return item
            })
            setUsers(listLeader)
            setParams({ ...params })
            setPostions(newListPostion)
            setDepartments(listDepartment)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isFilter) {
                        setLoadingTable(true)
                        getUserFilter(params)
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
    }, [isFilter])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoadingTable(true)
                        getUserFilter(params, isSort, fieldName, defautSort)
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
    }, [isSort])

    function getUserFilter(paramsFilter, sort, fieldName, defautSort) {
        UserService.getListUserFollowRole(
            {...paramsFilter, role: 'leader'},
            res => {
                const response = res.data.data
                response && response.length > 0 && response.map((item) => {
                    item.position = item.meta && item.meta != null && JSON.parse(item.meta).position ? JSON.parse(item.meta).position == 'N/A' ? '' : JSON.parse(item.meta).position : ''
                    item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
                    return item
                })
                if (sort) {
                    response.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setUsers(response)
                setIsSort(false)
                setParams({ ...params })
                setIsFilter(false)
                setLoadingTable(false)
            },
            err => {
                setLoading(false)
                console.log(err)
            }
        )
    }

    function handleSearch(value) {
        setParams({ ...params, keyword: value })
        setIsFilter(true)
    }

    function handleData(nameField, value) {
        if (nameField == 'department_ids') {
            let datas = departments.filter(val => value.includes(val.name))
            let ids = datas.map(item => item.id)
            setParams({ ...params, [nameField]: ids })
        } else {
            setParams({ ...params, [nameField]: value })
        }
    }

    function handleFilter() {
        setParams({ ...params })
        setIsFilter(true)
    }

    const handlePageChange = (limit) => {
        setPaging({ paging, total: limit})
        setParams({ ...params })
        setIsFilter(true)
    }

    function handleSort(fieldNameSort) {
        if (currentFieldName == fieldNameSort) {
            setDefaultSort(defautSort + 1)
        } else {
            setDefaultSort(0)
        }
        setCurrenFieldName(fieldNameSort)
        setFieldName(fieldNameSort)
        setIsSort(true)
    }

    return (
        <div className="component-import-dialog">
            <div className="header">
                <div className="header__search header__search--leader">
                    <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={getTranslation('SearchForUnit') + '...'} />
                </div>
                <div className="header__filter">
                    {filters.map((filter, indexFilter) => {
                        return (
                            <div className="header__filter--item" key={indexFilter}>
                                <MultipleSelect
                                    nameField={filter.fieldFilter}
                                    listData={filter.list || []}
                                    placeholder={filter.placeholder}
                                    handleFilter={handleData}
                                />
                            </div>
                        )
                    })}
                     <div className="header__filter--button">
                        <AddButton
                            label={getTranslation('Filter')}
                            id="update-button"
                            buttonClass="button button_filter"
                            onClick={handleFilter}
                            variant='contained'
                            disabled={false}
                            noIcon={true}
                        />
                    </div>
                </div>
            </div>
            {loading ? (
                <Skeleton type="table" />
            ) : (
                <DataTable
                    rows={users}
                    loading={loadingTable}
                    columns={columns}
                    paging={paging}
                    fieldId={'id'}
                    dataImport={dataImport}
                    setDataImport={setDataImport}
                    selected={selected}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    )
})

export default Leader