
import DataTable from 'ipretty/components/Table/DataTable';
import React, { useEffect, useMemo, useState } from 'react'
import { initialPrams, withQueryStr, sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import { useAuth } from "ipretty/context/AppProvider"
import { useLocation } from "react-router-dom";
import Search from 'ipretty/components/Search'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect'
import UserService from 'ipretty/services/UserService'
import AddButton from 'ipretty/components/AddButton'
import Skeleton from 'ipretty/components/Skeleton';
import { getTabId } from '@material-ui/lab';

const Student = ((props) => {
    const { dataImport, setDataImport, selected } = props
    // console.log(selected, 'selected')
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const { getTranslation } = useAuth()
    const fieldsSearch = useMemo(() => 'course_name', [])
    let location = useLocation()
    const columns = [
        { name: "name", title: getTranslation("Name"), icon: true, sortData: handleSort },
        { name: "email", title: getTranslation("Email"), icon: true, sortData: handleSort },
        { name: "code", title: getTranslation("Code"), icon: true, sortData: handleSort },
        { name: "menuroles", title: getTranslation("Menuroles"), icon: true, sortData: handleSort },
        { name: "position", title: getTranslation("Positions"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort }
    ];
    const [params, setParams] = useState(initialPrams(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])
    const typeAccounts = useMemo(() => [
        { id: 'user', name: 'user' },
        { id: 'employee ', name: 'employee' }
    ], [])
    const [postions, setPostions] = useState([])
    const filters = [
        { id: 1, list: typeAccounts, fieldFilter: 'type_account', placeholder: 'Loại tài khoản---', width: 180 },
        { id: 2, list: departments, fieldFilter: 'department_ids', placeholder: 'Bộ phận---', width: 180 },
        { id: 3, list: postions, fieldFilter: 'positions', placeholder: 'Vị trí---', width: 180 }
    ]
    const [loading, setLoading] = useState(false)
    const [loadingTable, setLoadingTable] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [paging, setPaging] = useState({
        limit: 10,
        total: 10,
        page: 1
    })
    const [dataSelects, setDataSelects] = useState([])

    useEffect(() => {
        setDataSelects(selected)
    }, selected)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getUsersByRole({ role: 'student' }),
            UserService.asyncDepartments(),
            UserService.getListPostions({ roles: 1}),
        ]).then(([students, departments, postions]) => {
            let listPostions = postions.data.data
            let newListPostion = []
            let listStudent = students.data.data
            let listDepartment = departments.data.data
            listStudent && listStudent.length > 0 && listStudent.map((item) => {
                item.menuroles = item.menuroles ? item.menuroles == 'user' ? 'Tự do' : 'Nội bộ' : ''
                item.position = item.meta && item.meta != null && JSON.parse(item.meta).position ? JSON.parse(item.meta).position == 'N/A' ? '' : JSON.parse(item.meta).position : ''
                item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
                return item
            })
            listDepartment && listDepartment.length > 0 && listDepartment.map((item) => {
                item.name = item.department_name ? item.department_name : ""
                item.id = item.department_id ? item.department_id : ""
                return item
            })
            listPostions && listPostions.length > 0 && listPostions.map((item) => {
                let obj = {
                    name: item,
                    id: item
                }
                newListPostion.push(obj)
            })
            setUsers(listStudent)
            setParams({ ...params })
            setDepartments(listDepartment)
            setPostions(newListPostion)
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
            {...paramsFilter, role: 'student'},
            res => {
                const response = res.data.data
                response && response.length > 0 && response.map((item) => {
                    item.menuroles = item.menuroles ? item.menuroles == 'user' ? 'Tự do' : 'Nội bộ' : ''
                    item.position = item.meta && item.meta != null && JSON.parse(item.meta).position ? JSON.parse(item.meta).position == 'N/A' ? '' : JSON.parse(item.meta).position : ''
                    item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
                    return item
                })
                if (sort) {
                    response.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setParams({ ...params })
                setUsers(response)
                setIsFilter(false)
                setIsSort(false)
                setLoadingTable(false)
            },
            err => {
                setLoadingTable(false)
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
                <div className="header__search">
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
                                    widthItem={filter.width}
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
                    columns={columns}
                    loading={loadingTable}
                    fieldId={'id'}
                    dataImport={dataImport}
                    setDataImport={setDataImport}
                    selected={dataSelects}
                    handlePageChange={handlePageChange}
                    noPaging={true}
                    paging={paging}
                />
            )}
        </div>
    )
})

export default Student