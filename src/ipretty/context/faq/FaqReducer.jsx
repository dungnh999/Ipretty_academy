import { FaqActionType } from "./types"
const { UPDATE_LIST_FAQS, SHOW_HIDE_FAQ, GET_DETAIL_QUESTION, UPDATE_LIKE_OR_DISLIKE, CHANGE_PAGE_FAQ, UPDATE_COMMENT, SEARCH_FAQ } = FaqActionType

export const FaqReducer = (state,  action) => {
    switch(action.type) {
        case UPDATE_LIST_FAQS: {    
            const { dataFaq } = action.payload
            const listFaqs = dataFaq.faqs;
            const pagination = dataFaq.pagination;
            
            return {
                ...state,
                listFaqs: listFaqs,
                pagination: pagination,
                loadingFaq: false
            }
        }
        case SHOW_HIDE_FAQ: {
            state.listFaqs[action.payload].isCollapse = !state.listFaqs[action.payload].isCollapse
            return {
                ...state,
                listFaqs: state.listFaqs
            }
        }
        case GET_DETAIL_QUESTION: {
            const { question_id } = action.payload;
            const listFaqs = [...state.listFaqs];

            let faqQuestion = 
            listFaqs.map(faq => {
                faq.faq_questions.find(question => question.question_id == question_id)
            })

            return {
                ...state,
                faqQuestion: faqQuestion
            }
        }
        case UPDATE_LIKE_OR_DISLIKE: {
            const { likeOrDislike } = action.payload;
            const { question_id, like, dislike } = likeOrDislike;
            const listFaqs = [...state.listFaqs];

            listFaqs.map(faq => {
                faq.faq_questions.map(question => {
                    if (question.question_id == question_id) {
                        question.likes_count = like
                        question.dislikes_count = dislike
                        return question 
                    }
                })
            })

            return {
                ...state,
                listFaqs: listFaqs
            }
        }

        case CHANGE_PAGE_FAQ: {
            const { pageNumber } = action.payload
            const pagination = state.pagination
            pagination.current_page = pageNumber
            if (pageNumber == 1 && !pagination.next_page_url) {
                pagination.next_page_url = true
            }

            return {
                ...state,
                loadingFaq: true,
                pagination: pagination
            }
        }

        case UPDATE_COMMENT: {
            const { comment_data } = action.payload;
            const { question_id, comments } = comment_data;
            const listFaqs = [...state.listFaqs];

            listFaqs.map(faq => {
                faq.faq_questions.map(question => {
                    if (question.question_id == question_id) {
                        question.comments = comments
                        return question
                    }
                })
            })

            return {
                ...state,
                listFaqs: listFaqs
            }
        }

        case SEARCH_FAQ: {
            const { keyword } = action.payload

            return {
                ...state,
                loadingFaq: true,
                keyword: keyword
            }
        }
        
        default: return state
    }
}