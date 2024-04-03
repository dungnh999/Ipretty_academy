
import React, { useEffect, useMemo, useState } from 'react' 
import { useAuth } from 'ipretty/context/AppProvider'
import FAQForm from '../components/FAQForm'
import FaqService from 'ipretty/services/FaqService'

function FAQEdit(props) {
    const { match: { params } } = props
    const { id } = params
    const { getTranslation } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('ManageFAQ'), path: '/faqs' }
    ], [])
    const titlePage = getTranslation('EditQuestion')
    const [loading, setLoading] = useState(false)
    const [faqsData, setFaqsData] = useState([])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetail(id)
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

    function getDetail(faqId) {
        FaqService.detail(
            faqId,
            res => {
                setFaqsData(res.data.data)
            },
            err => {}
        )
    }

    return(
        <FAQForm
            isEdit={true}
            links={links}
            titlePage={titlePage}
            dataFaq={faqsData}
            faqId={id}
        />
    )
}

export default FAQEdit