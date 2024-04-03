import { workingSurvey } from "./types"
const { UPDATE_FULL_QUESTION, GET_QUESTION_FOLLOW_PAGE_NUMBER, CHANGE_ANSWER_QUESTION } = workingSurvey

export const workingSurveyReducer = (state,  action) => {
    switch(action.type) {
        case UPDATE_FULL_QUESTION: {
            const { questions, count_question_page, number_page, checkStorage } = action.payload
            const indexStart = number_page * count_question_page - count_question_page
            const indexEnd = indexStart + count_question_page
            if(!checkStorage) {
                questions.forEach((elementQuestion, index) => {
                    elementQuestion.stt = index + 1
                    elementQuestion.options.forEach(elementOption => {
                        if (elementQuestion.question_type == "SingleChoice") {
                            if (elementQuestion.answer && elementQuestion.answer.option_id == elementOption.option_id) {
                                elementOption['checked'] = true
                            } else {
                                elementOption['checked'] = false
                            }
                        }else {

                            if (elementQuestion.answer && elementQuestion.answer.option_id) {
                                let answer_option_ids = elementQuestion.answer.option_id.split(',').map(Number);
             
                                if (answer_option_ids.indexOf(elementOption.option_id) != -1) {
                                    
                                    elementOption['checked'] = true
                                }else {
                                    elementOption['checked'] = false
                                }                               
                            }else {
                                elementOption['checked'] = false
                            }
                        }

                    })
                })
            }
            let questionsRender = questions.slice(indexStart, indexEnd)
            return {
                ...state,
                fullQuestions: questions,
                questionsFollowPage: questionsRender
            }
        }
        case GET_QUESTION_FOLLOW_PAGE_NUMBER: {
            const { count_question_page, number_page } = action.payload
            const indexStart = number_page * count_question_page - count_question_page
            const indexEnd = indexStart + count_question_page
            let questionsRender = state.fullQuestions.slice(indexStart, indexEnd)
            return {
                ...state,
                questionsFollowPage: questionsRender
            }
        }
        case CHANGE_ANSWER_QUESTION: {
            const { indexQuestion, indexOption, number_page, count_question_page } = action.payload
            const indexStart = number_page * count_question_page - count_question_page
            const indexEnd = indexStart + count_question_page
            let questionsFollowPage = state.fullQuestions.slice(indexStart, indexEnd)
            if(questionsFollowPage[indexQuestion].question_type === 'SingleChoice') {
                for(let i = 0; i < questionsFollowPage[indexQuestion].options.length; i++) {
                    if(i == indexOption) {
                        questionsFollowPage[indexQuestion].options[i].checked = true
                    } else {
                        questionsFollowPage[indexQuestion].options[i].checked = false
                    }
                }
            } else {
                questionsFollowPage[indexQuestion].options[indexOption].checked = !questionsFollowPage[indexQuestion].options[indexOption].checked
            }
            // localStorage.setItem('fullQuestionsSaveLocalStorage', JSON.stringify(state.fullQuestions))
            return {
                ...state,
                questionsFollowPage: questionsFollowPage,
                fullQuestions: state.fullQuestions
            }
        }
        default: return state
    }
}