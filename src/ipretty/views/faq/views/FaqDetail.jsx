
import FaqService from 'ipretty/services/FaqService';
import React, { useEffect, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import FAQForm from '../components/FAQForm';

function FaqDetail(props) {
    const faqId = props.match.params.id
    const [loading, setLoading] = useState(false)
    const [dataFaq, setDataFaq] = useState({})
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('ManageFAQ'), path: '/faqs' }
    ]
    const titlePage = getTranslation('EditQuestion')

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailFaq(faqId)
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

    function getDetailFaq(id) {
        FaqService.detail(
            id,
            res => {
                console.log(res.data)
                setDataFaq(res.data.data)
            }, 
            err => {

            }
        )
    }

    return(
        <FAQForm 
            dataFaq={dataFaq}
            isEdit={true}
            faqId={faqId}
            links={links}
            titlePage={titlePage}
        />
    )
}

export default FaqDetail
