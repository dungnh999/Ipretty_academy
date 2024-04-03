import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from "ipretty/context/AppProvider"
import { makeStyles, Grid } from '@material-ui/core'
import ViewPage from 'ipretty/components/ViewPage/ViewPage'
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPrams } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import LessonService from 'ipretty/services/LessonService'
import SnackBar from 'ipretty/components/SnackBar'
import contextHelper from 'ipretty/helpers/contextHelper'

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

function LessonView(props) {
    const { history } = props
    const classes = useStyles();
    const { getTranslation } = useAuth();
    const { handleError } = contextHelper
    const fieldsSearch = ['name']
    const columns = useMemo(() => [
        { name: 'stt', title: 'Stt', align: 'center' },
        { name: 'lesson_name', title: getTranslation('LessonName') },
        { name: 'lesson_description', title: getTranslation('LessonDescription') },
        { name: 'lesson_author', title: getTranslation('LessonAuthor') },
        { name: 'created_at', title: getTranslation('CreatedAt') },
        { name: 'lesson_id', title: ' ', type: 'detail' },
    ], [])
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState(initialPrams(queryString.parse(props.location.search, { arrayFormat: 'comma' })))
    const [isSearchData, setIsSearchData] = useState(false)

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getListLesson(params)
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
                        getListLesson(params)
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

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    function getListLesson(params) {
        LessonService.getListLesson({ ...params },
            res => {
                const lessons = res.data.data.data
                lessons.map((lesson, index) => {
                    lesson.stt = index + 1
                    lesson.lesson_author = lesson.user && Object.keys(lesson.user).length > 0 && lesson.user.name ? lesson.user.name : ''
                    return lesson
                })
                setLessons(lessons)
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
        history.push(`lessons/${id}/detail`);
    }

    function handleDelete(ids) {
        let data = new FormData()
        data.append('lesson_ids', ids.toString())
        return LessonService.deleteLessons(data)
            .then(() => {
                setSnackbar({
                    openSnackbar: true,
                    message: getTranslation('deleteSuccessfully'),
                    variant: 'success',
                })
            })
            .then(() => {
                setIsSearchData(true)
            })
            .catch((err) => _handleError(err))
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
                titlePage={getTranslation('Lesson')}
                titleButton={getTranslation('CreateNewLesson')}
                url={`/lessons/add`}
                handleSearch={handleSearch}
                fieldsSearch={fieldsSearch}
                placeholderSearch={getTranslation('SearchForUnit') + '...'}
            >
                <DataTable
                    rows={lessons}
                    columns={columns}
                    loading={loading}
                    optPaging={params}
                    getTranslation={getTranslation}
                    fieldId={'lesson_id'}
                    // handleClickRow={handleClickRow}
                    handleDelete={handleDelete}
                    handlePageChange={handlePageChange}
                    redirectDetail={redirectDetail}
                />
            </ViewPage>
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

export default LessonView