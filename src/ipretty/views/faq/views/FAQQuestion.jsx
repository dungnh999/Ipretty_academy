
import React from 'react' 
import { useFaq } from "ipretty/context/faq/FaqContext"

function FAQQuestion(props) {
    const { dataFaqs, getFaqQuestionByid } = useFaq();
    console.log(getFaqQuestionByid, 'getFaqQuestionByid')
    console.log(dataFaqs, 'dataFaqs')

    return(
        <>{'FAQQuestion'}</>
    )
}

export default FAQQuestion