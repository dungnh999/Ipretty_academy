import React, { useState, useEffect } from 'react'
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import { useAuth } from 'ipretty/context/AppProvider';
import TitleRequired from 'ipretty/components/TitleRequired'
import { makeStyles, Typography } from '@material-ui/core';
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService';
import Skeleton from 'ipretty/components/Skeleton';

const useStyles = makeStyles(theme => ({
    root: {

    },
    userDetail: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },
    userTitle: {
        flex: 1
    },
    valueUserTitle: {
        flex: 3
    },
}))

function CourseCategoriesDetail(props) {
    const classes = useStyles()
    const { getTranslation } = useAuth()
    const id = props.match.params.id
    const links = [{ title: getTranslation('UserManagement'), path: '/users' }]
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState()

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailCourseCategories(id)
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

    const getDetailCourseCategories = (id) => {
        CourseCategoriesService.detail(
            id,
            res => {
                setCourseCategories(res.data.data)
                setLoading(false)
            },
            err => {
                
            }
        )
    }


    function redirectEdit() {
        props.history.push(`/course-categories/edit/${id}`)
    }

    return (
        <DetailPage
            isDetail={true}
            titleCurrent={getTranslation('CourseCategoriesDetail')}
            links={links}
            redirectEdit={redirectEdit}
        >
            <React.Fragment>
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className={classes.user}>
                        <div className={classes.userDetail}>
                            <div className={classes.userTitle}>
                                <TitleRequired title={getTranslation('CategoryName')} required={false} />
                            </div>
                            <div className={classes.valueUserTitle}>
                                <Typography>{courseCategories && courseCategories.category_name ? courseCategories.category_name : ''}</Typography>
                            </div>
                        </div>
                        <div className={classes.userDetail}>
                            <div className={classes.userTitle}>
                                <TitleRequired title={getTranslation('Email')} required={false} />
                            </div>
                            <div className={classes.valueUserTitle}>
                                <Typography>{courseCategories && courseCategories.category_description ? courseCategories.category_description : ''}</Typography>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        </DetailPage>
    )
}

export default CourseCategoriesDetail