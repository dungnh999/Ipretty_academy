import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from "ipretty/context/AppProvider"
import { makeStyles, Grid } from '@material-ui/core'
import ViewPage from 'ipretty/components/ViewPage/ViewPage'
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPrams } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService'
import SnackBar from 'ipretty/components/SnackBar'
import contextHelper from 'ipretty/helpers/contextHelper'
import CustomDialog from 'ipretty/components/Dialog/Dialog'

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

function CourseCategoryView(props) {
    const { history } = props
    const classes = useStyles();
    const { getTranslation } = useAuth();
    const { handleError } = contextHelper
    const fieldsSearch = ['name']
    const [openConfirm, setOpenConfirm] = useState(false)
    const [loadingButtonRemove, setLoadingButtonRemove] = useState(false)
    const columns = useMemo(() => [
        { name: 'stt', title: 'Stt', align: 'center' },
        { name: 'category_name', title: getTranslation('CategoryName') },
        { name: 'category_description', title: getTranslation('LessonDescription') },
        { name: 'created_by', title: getTranslation('CreatedBy') },
        { name: 'category_id', title: ' ', type: 'detail' },
        { name: '', title: ' ', type: 'delete' },
    ], [])
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const [coureCategories, setCoureCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState(initialPrams(queryString.parse(props.location.search, { arrayFormat: 'comma' })))
    const [isSearchData, setIsSearchData] = useState(false)
    const [id, setId] = useState()

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getListCourseCategories(params)
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
                        getListCourseCategories(params)
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

    function getListCourseCategories() {
        CourseCategoriesService.getListCourseCategories({ ...params },
            res => {
                const courseCategories = res.data.data
                courseCategories.map((course, index) => {
                    course.stt = index + 1
                    course.created_by = course.created_by && Object.keys(course.created_by).length > 0 && course.created_by.name ? course.created_by.name : ''
                    course.category_description = course.category_description ? course.category_description : ''
                    return course
                })
                setCoureCategories(courseCategories)
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

    function redirectDetail(id, row) {
        history.push(`course-categories/detail/${id}`)
    }

    function handleDeleteById(id, row) {
        setId(row.category_id)
        setOpenConfirm(true)
    }

    function handleDel() {
        setLoadingButtonRemove(true)
        CourseCategoriesService.remove(
            id,
            res => {
                setOpenConfirm(false)
                setSnackbar({
                    openSnackbar: true,
                    message: getTranslation('deleteSuccessfully'),
                    variant: 'success',
                })
                setTimeout(() => {
                    setIsSearchData(true)
                }, 1000)
            },
            err => {
                _handleError(err)
                setLoadingButtonRemove(false)
            }
        )
    }

    const handleOnClose = () => {
        setOpenConfirm(false)
    }

    function _handleError(err) {
        handleError(err, logout, history,
            (message) => {
                setSnackbar({
                    message: message,
                    variant: 'error',
                    openSnackbar: true
                })
                return false;

            })
    }

    return (
        <Grid className={classes.box}>
            <ViewPage
                titlePage={getTranslation('CourseCategories')}
                titleButton={getTranslation('CreateNewCourseCategories')}
                url={`/course-categories/add`}
                handleSearch={handleSearch}
                fieldsSearch={fieldsSearch}
                placeholderSearch={getTranslation('SearchForUnit') + '...'}
            >
                <DataTable
                    rows={coureCategories}
                    columns={columns}
                    loading={loading}
                    optPaging={params}
                    getTranslation={getTranslation}
                    fieldId={'category_id'}
                    handlePageChange={handlePageChange}
                    redirectDetail={redirectDetail}
                    handleDeleteById={handleDeleteById}
                    noSelection={true}
                />
            </ViewPage>
            {openConfirm && (
                <CustomDialog
                    maxWidth='sm'
                    open={openConfirm}
                    onClose={handleOnClose}
                    actionLabel={'Xóa'}
                    action={handleDel}
                    loadingButton={loadingButtonRemove}
                    getTranslation={getTranslation}
                    noIcon={true}
                >
                    {'Bạn có chắc chắn muốn xóa không?'}
                </CustomDialog>
            )}
            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
            )}
        </Grid>
    )
}

export default CourseCategoryView