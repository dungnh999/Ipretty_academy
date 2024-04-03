
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from "ipretty/context/AppProvider"
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPramsCourse, sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseService from 'ipretty/services/CourseService'
import Search from 'ipretty/components/Search'
import { useLocation } from "react-router-dom";
import AddButton from 'ipretty/components/AddButton'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect'
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService';
import UserService from 'ipretty/services/UserService';
import IconImage from "ipretty/components/IconImage";
import Filter from '../../../../public/icons_ipretty/Filter.png';

function ReportCourse(props) {
    const { classes , redirectDownload , setParams , params} = props
    const { getTranslation } = useAuth()
    let location = useLocation()
    const [loading, setLoading] = useState(false)
    const fieldsSearch = useMemo(() => [], [])
    const [isSearchData, setIsSearchData] = useState(false)
    // const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [teacher, setTeacher] = useState();
    const [category, setCategory] = useState();
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [defautSort, setDefaultSort] = useState(0);
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [isSort, setIsSort] = useState(false);
    const [dataDetail, setDataDetailCourse] = useState([])

    useEffect(() => {
        setLoadingFilter(true)
        Promise.all([
            CourseCategoriesService.list(),
            UserService.getUsersByRole({ role: 'teacher' })
        ]).then(([courseCategories, teacher]) => {
            const courseCategoriesFilter = courseCategories.data.data
            const listTeacher = teacher.data.data
            courseCategoriesFilter && courseCategoriesFilter.length > 0 && courseCategoriesFilter.map((item, index) => {
                item.name = item.category_name ? item.category_name : ''
                item.id = item.category_id ? item.category_id : ''
                return item
            })
            setTeacher(listTeacher)
            setCategory(courseCategoriesFilter)
        }).catch(err => {
            setLoadingFilter(false)
            console.log(err)
        }).finally(() => {
            setLoadingFilter(false)
        })
    }, [])

    const columns = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: "course_name", title: getTranslation("CourseName"), icon: true, sortData: handleSort },
        { name: "teacher", title: getTranslation("Teacher"), icon: true, sortData: handleSort },
        { name: "category", title: getTranslation("Category"), icon: true, sortData: handleSort },
        { name: "course_type", title: getTranslation("CourseType"), icon: true, align: 'center', sortData: handleSort },
        { name: "count_viewer", title: getTranslation("View"), icon: true, sortData: handleSort },
        { name: "student_results_count", title: getTranslation("FreeStudent"), icon: true, align: 'center', sortData: handleSort },
        { name: "students_finish_count", title: getTranslation("resultAchieved"), icon: true, align: 'center', sortData: handleSort },
        { name: "students_learning_count", title: getTranslation("resultFailed"), icon: true, align: 'center', sortData: handleSort },
        { name: "student_results_avg_rating", title: getTranslation("assess"), align: 'center', icon: true, sortData: handleSort },
    ], [dataDetail]);

    const courseTypes = useMemo(() => [
        { id: 'Group', name: 'Group' },
        { id: 'Business', name: 'Business' },
        { id: 'Local', name: 'Local' }
    ], [])

    const result = [
        { id: 1, name: '0 - 50', status: '1' },
        { id: 2, name: '50 - 100', status: '2' },
        { id: 3, name: '100 - 300', status: '3' },
        { id: 4, name: '>=300', status: '4' },
    ]
    const evaluate = [
        { id: 1, name: '0-1', status: '1' },
        { id: 2, name: '1-3', status: '2' },
        { id: 3, name: '3-5', status: '3' }
    ]
    const filtersStudent = [
        { id: 1, list: teacher, fieldFilter: 'teachers', placeholder: getTranslation('Teacher')+'---', widthItem: 160 },
        { id: 2, list: category, fieldFilter: 'categories', placeholder: getTranslation('Category')+'---', widthItem: 160 },
        { id: 3, list: courseTypes, fieldFilter: 'course_types', placeholder: getTranslation('CourseType')+'---', widthItem: 160 },
        { id: 4, list: result, fieldFilter: 'results', placeholder: getTranslation('Result'), widthItem: 160 },
        { id: 5, list: evaluate, fieldFilter: 'ratings', placeholder: getTranslation('assess'), widthItem: 160 }
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListReportDetailCourse(params);
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearchData) {
                        setLoading(true);
                        getListReportDetailCourse(params);
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
    }, [isSearchData]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getListReportDetailCourse(params, isSort, fieldName, defautSort)
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
    }, [isSort]);

    function getListReportDetailCourse(params, sort, fieldName, defautSort) {
        CourseService.getReportDetailCourse(
            { ...params },
            (res) => {
                const data = res.data.data.data;
                const total = res.data.data.total;
                const current_page = res.data.data.current_page;
                data.map((item, index) => {
                    item.stt = index + 1;
                    item.course_type = item.course_type ? getTranslation(item.course_type) : '';
                    item.teacher = item.teacher.name ? item.teacher.name  : '';
                    item.category = item.category.category_name ? item.category.category_name : '';
                    return item;
                });
                if (sort) {
                    data.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setDataDetailCourse(data)
                setLoading(false)
                setIsSort(false);
                setIsSearchData(false)
                const _params = {
                    ...params,
                    page: current_page,
                    total: total,
                };
                setParams(_params)
            },
            (err) => { }
        )
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

    function handleSearch(value) {
        setParams({ ...params, keyword: value })
        setIsSearchData(true)
    }

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsSearchData(true)
    }


    function handleActionFilter() {
        setIsSearchData(true)
    }

    function getListId(list, listChild) {
        let datas = list.filter(val => listChild.includes(val.name))
        return datas.map(item => item.id)
    }

    function handleData(nameField, value) {
        if (nameField == 'categories') {
            let ids = getListId(category, value)
            setParams({ ...params, [nameField]: ids })
        } else if (nameField == 'teachers') {
            let ids = getListId(teacher, value)
            setParams({ ...params, [nameField]: ids })
        } else if (nameField == 'course_types') {
            setParams({ ...params, [nameField]: value })
        } else if (nameField == 'results') {
            setParams({ ...params, [nameField]: value })
        } else if (nameField == 'ratings') {
            setParams({ ...params, [nameField]: value })
        }
    };

    return (
        <div>
            <div className="view__header">
                <div className="header__search">
                    <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={getTranslation('SearchForUnit') + '...'} />
                </div>
                <div className="view-action__filter">
                    {filtersStudent && filtersStudent.length > 0 && filtersStudent.map((filter, indexFilter) => {
                        return (    
                            <div className="view-action__filter--item" key={indexFilter} style={{ width: filter.widthItem ? filter.widthItem : '200px' }}>
                                <MultipleSelect
                                    nameField={filter.fieldFilter}
                                    listData={filter.list || []}
                                    placeholder={filter.placeholder}
                                    handleFilter={handleData}
                                    widthItem={filter.widthItem}
                                />
                            </div>
                        )
                    })}
                    <div className="view-action__filter--button">
                        <AddButton
                            label={getTranslation('Filter')}
                            id="update-button"
                            buttonClass="button button_filter"
                            onClick={handleActionFilter}
                            variant='contained'
                            disabled={false}
                            iconButton={<IconImage srcIcon={Filter} />}
                        />
                    </div>
                </div>
            </div>
            <DataTable
                rows={dataDetail}
                columns={columns}
                loading={loading}
                optPaging={params}
                getTranslation={getTranslation}
                fieldId={'course_id'}
                noSelection={true}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default ReportCourse