import React, { useEffect, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService'
import CourseCategoriesForm from '../components/CourseCategoriesForm'

function CourseCategoriesEdit(props) {
    const { getTranslation } = useAuth()
    const id = props.match.params.id
    const links = [{ title: getTranslation('CourseCategoriesDetail'), path: `/course-categories/detail/${id}` }]
    const [courseCategories, setCourseCategories] = useState()
    const [loading, setLoading] = useState(false)

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



    return (
        <CourseCategoriesForm
            isEdit={true}
            links={links}
            data={courseCategories}
            loading={loading}
            history={props.history}
            courseCategoriesId={id}
        />
    )
}

export default CourseCategoriesEdit