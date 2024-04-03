import React, { useState, useMemo, useEffect } from 'react'
import { useAuth } from "ipretty/context/AppProvider";
import { makeStyles, Grid } from '@material-ui/core';
import ViewPage from 'ipretty/components/ViewPage/ViewPage'
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPramsCourse, sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseService from 'ipretty/services/CourseService';
import { useHistory } from "react-router-dom"
import Danger_Circle_Course from '../../../../public/icons_ipretty/Danger_Circle_Course.png'
import Detail_Course from '../../../../public/icons_ipretty/Detail_Course.png'
import Edit_Course from '../../../../public/icons_ipretty/Edit_Course.png'
import Share_Course from '../../../../public/icons_ipretty/Share_Course.png'
import Copy_Course from '../../../../public/icons_ipretty/Copy_Course.png'
import Copy_White from '../../../../public/icons_ipretty/Copy_White.png'
import Dialog from 'ipretty/components/Dialog/Dialog'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import IconImage from "ipretty/components/IconImage"
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService';
import UserService from 'ipretty/services/UserService';
import moment from 'moment';
import Skeleton from 'ipretty/components/Skeleton';
import List from '../../../../public/icon_svg/list.svg'
import Plus_Sparse from '../../../../public/icon_svg/plus-square.svg'
import DialogView from 'ipretty/components/Dialog/DialogView'
import DiscountView from '../components/discount-code/DiscountView'
import DiscountAdd from '../components/discount-code/DiscountAdd'

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
        CustomWidth: {
            maxWidth: 370
        },
        rootDialogContentStyle: {
            fontSize: 16
        },
        rootDialogContentStyleDiscount : {
            padding: 0,
            marginLeft: '-8px'
        },
        CustomWidthListDiscount : {
            [theme.breakpoints.down('md')]: {
                maxWidth: 1000,
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: 1000,
            },
            [theme.breakpoints.down('xs')]: {
                maxWidth: 1000,
            },
            maxWidth: 1300,
        },
        CustomWidthAddDiscount : {
            maxWidth: 1300,
            [theme.breakpoints.down('md')]: {
                maxWidth: 670,
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: 670,
            },
            [theme.breakpoints.down('xs')]: {
                maxWidth: 1000,
            },
        }
    })
)

const CourseView = (props) => {
    const classes = useStyles();
    const { user, getTranslation } = useAuth();
    let history = useHistory()
    const fieldsSearch = useMemo(() => 'course_name', [])
    const [isSearchData, setIsSearchData] = useState(false)
    const { makeShortMessage } = useNotiStackContext();
    const ListActionDatatableBTeacher = useMemo(() => [
        { id: 1, icon: Detail_Course, action: handleDetail, title: getTranslation('examDetails') },
        { id: 4, icon: Copy_Course, action: ActionCopy, title: getTranslation('MakeCopy') },
        { id: 5, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const ListActionDatatableIsPublich = useMemo(() => [
        { id: 1, icon: Detail_Course, action: handleDetail, title: getTranslation('examDetails') },
        { id: 2, icon: Edit_Course, action: handleEdit, title: getTranslation('Edit') },
        { id: 4, icon: Copy_Course, action: ActionCopy, title:  getTranslation('MakeCopy')  },
        { id: 5, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const ListActionDatatable = useMemo(() => [
        { id: 1, icon: Detail_Course, action: handleDetail, title: getTranslation('examDetails') },
        { id: 2, icon: Edit_Course, action: handleEdit, title:  getTranslation('Edit') },
        { id: 3, icon: Share_Course, action: ActionDontShare, title: getTranslation('unpublic') },
        { id: 4, icon: Copy_Course, action: ActionCopy, title:  getTranslation('MakeCopy') },
        { id: 5, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const [loadingCopy , setLoadingCopy] = useState(false)
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [createdAt, setCreatedAt] = useState('')
    const times = [
        { id: 1, placeholder: getTranslation('CreatedAt') + '---', widthItem: 160, type: 'date-picker-filter', field: 'created_at', value: createdAt, format: 'dd-MM-yyyy' }
    ]
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], [])
    const [courses, setCourses] = useState([])
    const columns = useMemo(() => [
        { name: "stt", title: getTranslation("Stt"), align: "center" },
        { name: "course_name", title: getTranslation("CourseName"), icon: true, sortData: handleSort },
        { name: "teacher_name", title: getTranslation("Teacher"), icon: true, sortData: handleSort },
        { name: "created_at", title: getTranslation("CreatedAt"), icon: true, sortData: handleSort },
        { name: "course_type", title: getTranslation("Type"), icon: true, sortData: handleSort },
        { name: "category_name", title: getTranslation("Category"), icon: true, sortData: handleSort },
        { name: "status", title: getTranslation("status"), icon: true, sortData: handleSort },
        { name: "", title: "", type: "more", list: ListActionDatatableIsPublich, listChild: ListActionDatatable, is_course: true, ListActionDatatableBTeacher: ListActionDatatableBTeacher }
    ], [courses])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(props.location.search, { arrayFormat: 'comma' })))
    const [isShowPopupCopy, setIsShowPopupCopy] = useState(false)
    const [isShowPopupShared, setIsShowPopupShared] = useState(false)
    const [courseId, setCourseId] = useState('')
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const status = useMemo(() => [
        { id: 1, name: getTranslation('published'), status: 1 },
        { id: 0, name: getTranslation('unpublished'), status: 0 }
    ], [])
    const courseTypes = useMemo(() => [
        { id: 'Group', name: 'Group' },
        { id: 'Business', name: 'Business' },
        { id: 'Local', name: 'Local' }
    ], [])
    const [isSort, setIsSort] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [courseCategories, setCourseCategories] = useState([])
    const filters = [
        { id: 1, list: teachers, fieldFilter: 'teachers', placeholder: getTranslation('Teacher') + '---', widthItem: 160 },
        { id: 2, list: courseTypes, fieldFilter: 'course_types', placeholder: getTranslation('CourseType') + '---', widthItem: 160 },
        { id: 3, list: courseCategories, fieldFilter: 'course_categories', placeholder: getTranslation('Category') + '---', widthItem: 160 },
      { id: 4, list: status, fieldFilter: 'status', placeholder: getTranslation('status')+('---'), widthItem: 160 }
    ]
    const listDiscount = useMemo(() => [
        { id: 1, icon: Plus_Sparse, action: handleAddDiscount, title: getTranslation('Creatediscountcode')},
        { id: 2, icon: List, action: handleListDiscount, title: getTranslation('Discountcode') },
    ] ,[])
    const [isShowPopupAddDiscount, setIsShowPopupAddDiscount] = useState(false)
    const [isShowPopupListDiscount, setIsShowPopupListDiscount] = useState(false)
    // console.log(user)
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    localStorage.removeItem('course')
                    if (localStorage.getItem('authToken')) {
                        getListCourse(params);
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
    }, [localStorage.getItem('authToken')]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearchData) {
                        setLoading(true);
                        getListCourse(params);
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
                        getListCourse(params, isSort, fieldName, defautSort)
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

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
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
                setTeachers(listTeacher)
                setCourseCategories(courseCategoriesFilter)
            }).catch(err => {
                setLoadingFilter(false)
                console.log(err)
            }).finally(() => {
                setLoadingFilter(false)
            })
        }
    }, [localStorage.getItem('authToken')])

    function getListCourse(params, sort, fieldName, defautSort) {
        CourseService.list(
            { ...params },
            (res) => {
                const courses = res.data.data.data;
                const total = res.data.data.total;
                const current_page = res.data.data.current_page;

                courses.map((course, index) => {
                    course.stt = index + 1;
                    // tinh trang: 1 1 ngung phat hanh, 1 0 dang hoat dong ( ispublicj isdrafd )
                    // is_published: 1 && isDraft: 1 && is_published: 0 && isDraft: 0 && is_published: 0 && isDraft: 1 ==> phát hành 
                    let checkShare = course && (course.is_published == 1 && course.isDraft == 1 ||
                        course.is_published == 0 && course.isDraft == 1 ||
                        course.is_published == 0 && course.isDraft == 0) ? true : false
                    // course.status = course.endTime && moment(course.endTime).valueOf() < moment(new Date()).valueOf() ? checkShare ? 'Không phát hành' : 'Phát hành' : checkShare ? 'Không phát hành' : 'Phát hành';
                    course.status = course.endTime ? (moment(course.endTime).valueOf() > moment(new Date()).valueOf() ? checkShare ? getTranslation('unpublished') : getTranslation('published') : getTranslation('unpublished')) : (checkShare ? getTranslation('unpublished') : getTranslation('published'))
                    course.category_name = course.category && course.category.category_name ? course.category.category_name : "";
                    course.course_type = getTranslation(course.course_type)
                    course.teacher_name = course.teacher && Object.keys(course.teacher) && course.teacher.name ? course.teacher.name : ''
                    return course;
                });
                if (sort) {
                    courses.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setCourses(courses);
                setLoading(false);
                setIsSort(false);
                setIsSearchData(false);

                const _params = {
                    ...params,
                    page: current_page,
                    total: total,
                };

                setParams(_params)
            },
            (err) => { }
        );
    }

    function handleDetail(row) {
        history.push(`/courses/${row.course_id}/detail`)
    }

    function handleEdit(row) {
        history.push(`/courses/${row.course_id}/edit`)
    }
    function handleAddDiscount() {
        setIsShowPopupAddDiscount(true)
    }

    function handleCloseAddDiscount() {
        setIsShowPopupAddDiscount(false)
    }

    function handleListDiscount () {
        setIsShowPopupListDiscount(true)
    }

    function handleCloseListDiscount() {
        setIsShowPopupListDiscount(false)
    }
    function ActionShare() {

    }

    function ActionDontShare(row) {
        setCourseId(row.course_id)
        setIsShowPopupShared(true)
    }

    function ActionCopy(row) {
        setCourseId(row.course_id)
        setIsShowPopupCopy(true)
    }

    function ActionError() {
        history.push('/report-errors')
    }

    function handleConfirmDontShare() {
        let data = new FormData()
        data.append('isDraft', 1)
        CourseService.changePublicCourse(
            courseId,
            data,
            res => {
                makeShortMessage(getTranslation('DontSharedSuccessfulCourse'), "success");
                setTimeout(() => {
                    setIsShowPopupShared(false)
                    setIsSearchData(true)
                }, 2000)
            },
            err => {
                console.log(err)
                makeShortMessage(getTranslation('Error'), "error");
            }
        )
    }

    function handleConfirmPopupCopy() {
        setLoadingCopy(true)
        CourseService.cloneCourse(
            courseId,
            res => {
                let id = res.data.data.course_id
                makeShortMessage(getTranslation('CloneSuccessfulCourse'), "success");
                setTimeout(() => {
                    setLoadingCopy(false)
                    history.push(`/courses/${id}/detail`)
                }, 2000)
            },
            err => {
                setLoadingCopy(false)
                console.log(err)
            }
        )
    }

    function handleClosePoppCopy() {
        setIsShowPopupCopy(false)
    }

    function handleClosePopupShard() {
        setIsShowPopupShared(false)
    }

    function handleSearch(value, fields) {
        const _params = { ...params, page: 1, keyword: value, fieldName: fields };
        setParams(_params)
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
        if (nameField == 'teachers') {
            let ids = getListId(teachers, value)
            setParams({ ...params, [nameField]: ids })
        } else if (nameField == 'course_categories') {
            let ids = getListId(courseCategories, value)
            setParams({ ...params, [nameField]: ids })
        } else {
            setParams({ ...params, [nameField]: value })
        }
    }

    const onChangeDatetime = nameField => e => {
        setParams({ ...params, [nameField]: moment(e).format('YYYY-MM-DD') })
        setCreatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
    }

    function redirectCreate() {
        localStorage.removeItem('course')
        history.push(`/courses/add`)
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

    function redirectBack () {
        history.push('/')
    }
    return (
        <Grid className={classes.box}>
            {loadingFilter ? (
                <Skeleton type="table" />
            ) : (
                <ViewPage
                    titlePage={getTranslation('CourseManagement')}
                    titleButton={getTranslation('CreateNewCourse')}
                    handleSearch={handleSearch}
                    fieldsSearch={fieldsSearch}
                    placeholderSearch={getTranslation('SearchForUnit') + '...'}
                    links={user.role === 'admin' ? links : ''}
                    filters={filters}
                    redirectBack={redirectBack}
                    handleData={handleData}
                    handleActionFilter={handleActionFilter}
                    redirectCreate={redirectCreate}
                    times={times}
                    onChangeDatetime={onChangeDatetime}
                    listMenu={user.menuroles === 'admin' ?  listDiscount : ''}
                    titleMenuButton={getTranslation('Discountcode')}
                >
                    <DataTable
                        rows={courses}
                        columns={columns}
                        loading={loading}
                        optPaging={params}
                        getTranslation={getTranslation}
                        fieldId={'course_id'}
                        handlePageChange={handlePageChange}
                        noSelection={true}
                    />
                    {isShowPopupCopy && (
                    <Dialog
                            // maxWidth="sm"
                            CustomWidth={classes.CustomWidth}
                            open={isShowPopupCopy}
                            onClose={handleClosePoppCopy}
                            actionLabel={getTranslation("MakeCopy")}
                            action={handleConfirmPopupCopy}
                            noIcon={false}
                            loadingButton={loadingCopy}
                            title={getTranslation("ContentCopyCourse")}
                            iconButton={<IconImage srcIcon={Copy_White} icon20 />}
                            getTranslation={getTranslation}
                            classButton="button--white"
                            rootDialogContentStyle={classes.rootDialogContentStyle}
                        >
                            {getTranslation("WarningCopyCourse")}
                        </Dialog>
                    )}
                    {isShowPopupShared && (
                        <Dialog
                            CustomWidth={classes.CustomWidth}
                            open={isShowPopupShared}
                            onClose={handleClosePopupShard}
                            actionLabel={getTranslation("Confirm")}
                            action={handleConfirmDontShare}
                            noIcon={false}
                            noIcon
                            getTranslation={getTranslation}
                            classButton="button--green"
                        >
                            {getTranslation("WarningDontShare")}
                        </Dialog>
                    )}
                    {isShowPopupListDiscount && (
                        <Dialog 
                            CustomWidth={classes.CustomWidthListDiscount}
                            open={isShowPopupListDiscount}
                            onClose={handleCloseListDiscount}
                            title={getTranslation('Discountcode')}
                            noIcon
                            hiddenActions={true}
                            getTranslation={getTranslation}
                            classButton="button--green"
                            rootDialogContentStyle={classes.rootDialogContentStyleDiscount}
                        >
                            <DiscountView 
                                isShowPopupAddDiscount = {isShowPopupAddDiscount}
                                setIsShowPopupAddDiscount={setIsShowPopupAddDiscount}
                                setIsShowPopupListDiscount={setIsShowPopupListDiscount}
                            />
                        </Dialog>
                    )}
                    {isShowPopupAddDiscount && (
                        <Dialog 
                            CustomWidth={classes.CustomWidthAddDiscount}
                            open={isShowPopupAddDiscount}
                            onClose={handleCloseAddDiscount}
                            title={getTranslation('Discountcodeinformation')}
                            noIcon
                            hiddenActions={true}
                            getTranslation={getTranslation}
                            classButton="button--green"
                        >
                            <DiscountAdd
                                 setIsShowPopupAddDiscount={setIsShowPopupAddDiscount}
                                 setIsShowPopupListDiscount={setIsShowPopupListDiscount}
                            />
                        </Dialog>
                    )}
                </ViewPage>
            )}
        </Grid>
    )
}

export default CourseView