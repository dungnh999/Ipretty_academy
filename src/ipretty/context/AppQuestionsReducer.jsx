export default (state, action) => {
    switch (action.type) {
        case 'ADD_ONE_CHOICE_QUESTION':
            const { indexCurrentQuestionAOCQ } = action
            let _stateInitAOCQ = [...state.questions]
            _stateInitAOCQ.push({
                question_title: '',
                question_description: '',
                question_type: 'SingleChoice',
                number_order: indexCurrentQuestionAOCQ,
                question_attachments: "",
                render_question_attachments: '',
                has_attachment: false,
                options: [
                    {
                        option_body: '',
                        right_answer: false,
                        option_attachments: "",
                        render_option_attachment: '',
                        option_attachmant_name: '',
                        is_image: false
                    }
                ]
            })
            return {
                ...state,
                questions: [..._stateInitAOCQ]
            }
        case 'ADD_MULTIPLE_CHOICE_QUESTION':
            const { indexCurrentQuestionAMCQ } = action
            let _stateInitAMCQ = [...state.questions]
            _stateInitAMCQ.push({
                question_title: '',
                question_description: '',
                question_type: 'MultipleChoice',
                number_order: indexCurrentQuestionAMCQ,
                question_attachments: "",
                render_question_attachments: '',
                has_attachment: false,
                options: [
                    {
                        option_body: '',
                        right_answer: false,
                        option_attachments: "",
                        render_option_attachment: '',
                        option_attachmant_name: '',
                        is_image: false
                    }
                ]
            })
            return {
                ...state,
                questions: [..._stateInitAMCQ]
            }
        case 'CHANGE_VALUE_QUESTION':
            const { indexCVQ } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexCVQ == indexQuestion) {
                        return {
                            ...question,
                            ...action.newValue
                        }
                    }
                    return question
                })
            }
        case 'REMOVE_QUESION':
            const { indexRQ } = action
            let newQuestions = [...state.questions]
            newQuestions.splice(indexRQ, 1)
            return {
                ...state,
                questions: newQuestions
            }
        case 'REMOVE_QUESTION_ATTACHMENT':
            const { indexQuestionRQA, indexQuestionAttachmentRQA } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionRQA == indexQuestion) {
                        let newRenderQuestionAttachment = question.render_question_attachments
                        newRenderQuestionAttachment.splice(indexQuestionAttachmentRQA, 1)
                        let newQuestionAttachment = question.question_attachments
                        newQuestionAttachment.splice(indexQuestionAttachmentRQA, 1)

                        return {
                            ...question,
                            question_attachments: [...newQuestionAttachment],
                            render_question_attachments: [...newRenderQuestionAttachment]
                        }
                    }
                    return question
                })
            }
        case 'ADD_OPTION':
            const { indexAO, indexOptionAO } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexAO == indexQuestion) {
                        // question.options.push({
                        //     option_body: '',
                        //     right_answer: false,
                        //     option_attachments: [],
                        //     render_option_attachment: [],
                        //     is_image: false
                        // })
                        let obj = {
                            option_body: '',
                            right_answer: false,
                            option_attachments: '',
                            render_option_attachment: '',
                            option_attachmant_name: '',
                            is_image: false
                        }
                        let indexPush = indexOptionAO + 1
                        question.options.splice(indexPush , 0 , obj)
                        return {
                            ...question,
                            options: [...question.options]
                        }
                    }
                    return question
                })
            }
        case 'CHANGE_VALUE_OPTION':
            const { indexQCVO, indexOCVO, newValueCVO } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQCVO == indexQuestion) {
                        return {
                            ...question,
                            options: question.options.map((option, indexOption) => {
                                if (indexOCVO == indexOption) {
                                    return {
                                        ...option,
                                        ...newValueCVO
                                    }
                                }
                                return option
                            })
                        }
                    }
                    return question
                })
            }
        case 'CHANGE_VALUE_MULTIPLE_CHOICE':
            const { indexQuestionCVMC, indexOptionCVMC, newValueCVMC } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionCVMC == indexQuestion) {
                        return {
                            ...question,
                            options: question.options.map((option, indexOption) => {
                                if (indexOptionCVMC == indexOption) {
                                    return {
                                        ...option,
                                        ...newValueCVMC
                                    }
                                }
                                return option
                            })
                        }
                    }
                    return question
                })
            }
        case 'CHANGE_VALUE_SINGLE_CHOICE':
            const { indexQuestionCVSC, indexOptionCVSC, newValueCVSC } = action

            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionCVSC == indexQuestion) {
                        return {
                            ...question,
                            options: question.options.map((option, indexOption) => {
                                if (indexOptionCVSC == indexOption) {
                                    return {
                                        ...option,
                                        ...newValueCVSC
                                    }
                                } else {
                                    return {
                                        ...option,
                                        right_answer: false
                                    }
                                }
                                return option
                            })
                        }
                    }
                    return question
                })
            }
        case 'CHANGE_VALUE_QUESTION_TYPE':
            const { indexQuestionCVQT, newValueCVQT } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionCVQT == indexQuestion) {
                        return {
                            ...question,
                            ...newValueCVQT,
                            options: question.options.map((option, indexOption) => {
                                return {
                                    ...option,
                                    right_answer: false
                                }
                            })
                        }
                    }
                    return question
                })
            }
        case 'REMOVE_OPTION_IN_QUESTION':
            const { indexQuestionROIQ, indexOptionROIQ } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionROIQ == indexQuestion) {
                        let newOptions = [...question.options]
                        newOptions.splice(indexOptionROIQ, 1)
                        return {
                            ...question,
                            options: [...newOptions]
                        }
                    }
                    return question
                })
            }
        case 'REMOVE_OPTION_ATTACHMENT':
            const { indexQuestionROA, indexOptionROA } = action
            return {
                ...state,
                questions: state.questions.map((question, indexQuestion) => {
                    if (indexQuestionROA == indexQuestion) {
                        return {
                            ...question,
                            options: question.options.map((option, indexOption) => {
                                if (indexOptionROA == indexOption) {
                                    return {
                                        ...option,
                                        option_attachments: '',
                                        render_option_attachment: '',
                                        option_attachmant_name: ''
                                    }
                                }
                                return option
                            })
                        }
                    }
                    return question
                })
            }
        case 'GET_VALUE_QUESTION':
            const questions = action.payload;
            questions.questions.map((question, indexQuestion) => {
                question.render_question_attachments = question.question_attachments ? question.question_attachments : ''
                // question.question_attachments = []
                return question
            })

            return {
                ...state,
                questions: questions.questions
            }
        case 'GET_VALUE_OPTION_QUESTION':
            const questionGVOQ = action.payload
            questionGVOQ.map((question, index) => {
                question.number_order = index
                return question
            })

            return {
                ...state,
                questions: questionGVOQ
            }
        default:
            break;
    }
}