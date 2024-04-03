import React from 'react' 
import CourseCategoriesForm from '../components/CourseCategoriesForm'
import { useAuth } from 'ipretty/context/AppProvider'

function CourseCategoriesAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseCategoriesManagement'), path: '/course-categories' }
    ];
    const titlePage = getTranslation('CourseCategories')

    return(
        <CourseCategoriesForm 
            isCreate={true}
            links={links}
            titlePage={titlePage}
        />
    )
}

export default CourseCategoriesAdd