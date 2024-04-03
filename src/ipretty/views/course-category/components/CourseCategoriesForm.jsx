import { Box, makeStyles, Typography } from '@material-ui/core'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import React, { useEffect, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import Skeleton from 'ipretty/components/Skeleton'
import SnackBar from 'ipretty/components/SnackBar'
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService'
import contextHelper from 'ipretty/helpers/contextHelper'
import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import queryString from "query-string"
import Save from '../../../../public/icons_ipretty/Save.png'
import Close from '../../../../public/icons_ipretty/Close.png'
import IconImage from "ipretty/components/IconImage"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    courseCategoriesForm: {
        display: 'flex',
        "& .MuiBox-root:nth-child(1)": {
            flex: 3,
            "& >div": {
                display: 'flex',
                marginBottom: 10,
                "& >div:nth-child(1)": {
                    flex: 1
                },
                "& >div:nth-child(2)": {
                    flex: 2
                }
            }
        },
        "& .MuiBox-root:nth-child(2)": {
            flex: 2,
            marginLeft: 10
        },
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        [theme.breakpoints.down("xs")]: {
            padding: 10,
        },
        [theme.breakpoints.up("sm")]: {
            padding: 20,
        },

    },
    title: {
        paddingBottom: '16px',
        fontWeight: '600',
        fontSize: '17px',
        textTransform: 'uppercase',
        color: '#000',
    },
    boxForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
    },
}))

function CourseCategoriesForm(props) {
    const { isCreate, links, isEdit, courseCategoriesId, loading, data, titlePage } = props
    const { getTranslation, logout } = useAuth()
    const classes = useStyles()
    const { handleError } = contextHelper
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const [courseCategories, setCourseCategories] = useState({
        category_name: '',
        category_description: ''
    })
    let history = useHistory()
    const actions = [
        { id: 1, action: handleConShowPopupCancel, icon: <IconImage srcIcon={Close} />, noIcon: false, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loading: loadingButtonAction }
    ]
    const [isShowPopup, setIsShowPopup] = useState(false)

    useEffect(() => {
        if (isEdit && data && Object.keys(data).length > 0) {
            setCourseCategories({
                category_name: data.category_name,
                category_description: data.category_description
            })
        }
    }, [data])

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const onChange = nameField => (e) => {
        setCourseCategories({ ...courseCategories, [nameField]: e.target.value })
    }

    function handleAction() {
        setLoadingButtonAction(true)
        const data = new FormData()
        for (let key in courseCategories) {
            data.append(key, courseCategories[key])
        }
        if (isCreate) {
            CourseCategoriesService.create(
                data,
                res => {
                    onSuccess('Đăng ký thành công.', '/course-categories')
                },
                err => {
                    setLoadingButtonAction(false)
                    _handleError(err)
                }
            )
        } else {
            CourseCategoriesService.edit(
                courseCategoriesId,
                queryString.stringify(courseCategories),
                res => {
                    onSuccess('Cập nhật thông tin thành công.', `/course-categories/detail/${courseCategoriesId}`)
                },
                err => {
                    setLoadingButtonAction(false)
                    _handleError(err)
                }
            )
        }
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

    function onSuccess(message, url) {
        setSnackbar({
            openSnackbar: true,
            message: message,
            variant: 'success',
        })
        setTimeout(() => {
            history.push(url)
        }, 1000)
    }

    function handleConShowPopupCancel() {
        setIsShowPopup(true)
    }

    function handleConfirmCancel() {
        history.push('/course-categories')
        setIsShowPopup(false)
    }

    function handleClosePopp() {
        setIsShowPopup(false)
    }

    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            titleUrl={getTranslation('courseCategories')}
            multipleBlock={true}
            handleClosePopp={handleClosePopp}
            handleConfirmCancel={handleConfirmCancel}
            actions={actions}
            titlePage={titlePage}
            isShowPopup={isShowPopup}
        >
            {isEdit && loading ? (
                <Skeleton type='table' />
            ) : (
                <div className={classes.courseCategoriesForm}>
                    <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
                        <div className={classes.title}>{getTranslation('generalInformation')}</div>
                        <div className={classes.lessonItem}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('CategoryName')} required={true} />
                            </div>
                            <div className={classes.textInput}>
                                <TextInput
                                    placeholder={getTranslation('PlaceholderCategoryName')}
                                    onChange={onChange('category_name')}
                                    fullWidth
                                    value={courseCategories.category_name || ''}
                                    noMargin
                                />
                            </div>
                        </div>

                        <div className={classes.lessonItem}>
                            <div className={classes.lessonTitle}>
                                <TitleRequired title={getTranslation('CategoryDescription')} required={true} />
                            </div>
                            <div className={classes.textInput}>
                                <TextInput
                                    placeholder={getTranslation('PlaceholderCategoryDescription')}
                                    onChange={onChange('category_description')}
                                    fullWidth
                                    value={courseCategories.category_description || ''}
                                    noMargin
                                />
                            </div>
                        </div>
                    </Box>
                </div>
            )}
            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
            )}
        </CreatePage>
    )
}

export default CourseCategoriesForm