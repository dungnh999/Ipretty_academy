import React, { createContext, useReducer, useContext } from "react"
import { FaqActionType } from './types'
import { FaqReducer } from './FaqReducer'


const { UPDATE_LIST_FAQS, SHOW_HIDE_FAQ, GET_DETAIL_QUESTION, UPDATE_LIKE_OR_DISLIKE, CHANGE_PAGE_FAQ, UPDATE_COMMENT, SEARCH_FAQ } = FaqActionType

const dataDefault = {
    listFaqs : [],
    pagination : {
        current_page: 1,
        total: 0,
        next_page_url: false,
        prev_page_url: false,
    },
    faqQuestion: {},
    loadingFaq: true,
    keyword: ''
}

export const FaqContext = createContext(null)

const FaqContextProvider = ({children}) => {
    const [dataFaqs, dispatch] = useReducer(FaqReducer, dataDefault)

    const updateListFaqs = (dataFaq) => dispatch({ type: UPDATE_LIST_FAQS, payload: dataFaq })

    const changePageFaq = (pageNumber) => dispatch({ type: CHANGE_PAGE_FAQ, payload: pageNumber })

    const searchFaq = (keyword) => dispatch({ type: SEARCH_FAQ, payload: keyword })

    const showHideFaq = (indexFaq) => dispatch({ type: SHOW_HIDE_FAQ, payload: indexFaq })
    
    const updateLikeOrDislike = (likeOrDislike) => dispatch({ type: UPDATE_LIKE_OR_DISLIKE, payload: likeOrDislike })

    const updateComment = (comment_data) => dispatch({ type: UPDATE_COMMENT, payload: comment_data })

    const getFaqQuestionByid = (question_id) => dispatch({ type: GET_DETAIL_QUESTION, payload: question_id })

    const contextData = {
        dataFaqs,
        updateListFaqs,
        showHideFaq,
        getFaqQuestionByid,
        updateLikeOrDislike,
        changePageFaq,
        updateComment,
        searchFaq,
        // updateFaqQuestion
    }
    
    return(
        <FaqContext.Provider value={contextData}>
            {children}
        </FaqContext.Provider>
    )
}

export const useFaq = () => useContext(FaqContext)

export default FaqContextProvider