
export default (state, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            let _stateInit = [...state.questions]
            _stateInit.push({
                question_name: '',
                answer_name: '',
                number_order: ''
            })
            _stateInit.map((item, index) => {
                item.number_order = index
                return item  
            })

            return {
                ...state,
                questions: [..._stateInit]
            }
        case 'CHANGE_VALUE_CONTENT': 
            const { indexContentCVC, newValueCVC } = action

            return {
                ...state,
                faqs: state.faqs.map((item, index) => {
                    if ( indexContentCVC == index ) {
                        return {
                            ...item,
                            ...newValueCVC
                        }
                    }
                    return item
                })
            }
        case 'CHANGE_VALUE_QUESTION': 
            const { indexQuestionCVQ, newValueCVQ } = action 

            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if ( indexQuestionCVQ == indexQuestion ) {
                        return {
                            ...question,
                            ...newValueCVQ
                        }
                    }
                    return question
                })
            }
        case 'GET_QUESTION_WHEN_DRAP_DROP': 
            const questions = action.payload
            questions.map((question, index) => {
                question.number_order = index
                return question
            })

            return {
                ...state,
                questions: questions
            }
        case 'GET_VALUE_CONTENT': {
            const data = action.payload

            return {
                ...state,
                faqs: state.faqs.map((faq, index) => {
                    return {
                        ...faq,
                        title: data.title,
                        // isPublished: data.isPublished
                    } 
                })
            }
        }
        case 'GET_VALUE_QUESTION': {
            const dataGVQ = action.payload

            return {
                ...state,
                questions: dataGVQ.questions
            //     faqs: state.faqs.map((faq, index) => {
            //         return {
            //             ...faq,
            //             title: data.title
            //         } 
            //     })
            }
        }
        case 'REMOVE_QUESTION':
            const { indexQuestionRQ } = action
            let _questions = [...state.questions]
            _questions.splice(indexQuestionRQ, 1)
            _questions.map((item, index) => {
                item.number_order = index
                return item
            })

            return {
                ...state,
                questions: _questions,
            }
        case 'GET_QUESTION_ID': 
            const questionIdRQ = action.payload

            return {
                ...state,
                faqs: state.faqs.map((faq, index) => {
                    let _deleteQuestions = [...faq.delete_question]
                    _deleteQuestions.push(questionIdRQ)
                    return {
                        ...faq,
                        delete_question: _deleteQuestions
                    } 
                })
            }

        default:
            break;
    }
}