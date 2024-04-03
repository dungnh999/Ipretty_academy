
import React, { useMemo } from 'react' 
import { useAuth } from 'ipretty/context/AppProvider'
import FAQForm from '../components/FAQForm'

function FAQCreate() {
    const { getTranslation } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('ManageFAQ'), path: '/faqs' }
    ], [])
    const titlePage = getTranslation('AddQuestion')

    return (
        <FAQForm
            isCreate={true}
            links={links}
            titlePage={titlePage}
        />
    )
}

export default FAQCreate