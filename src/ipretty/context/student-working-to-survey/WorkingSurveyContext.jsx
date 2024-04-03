import React, { createContext, useReducer, useContext, useState } from "react"
import { workingSurvey } from './types'
import { workingSurveyReducer } from "./WorkingSurveyReducer"

const { UPDATE_FULL_QUESTION, GET_QUESTION_FOLLOW_PAGE_NUMBER, CHANGE_ANSWER_QUESTION } = workingSurvey

const dataDefault = {
    fullQuestions: [],
    questionsFollowPage: []
}

export const WorkingSurveyContext = createContext(null)

const WorkingSurveyContextProvider = ({children}) => {
    const [dataSurvey, dispatch] = useReducer(workingSurveyReducer, dataDefault)

    const updateFullQuestion = (dataQuestions) => dispatch({ type: UPDATE_FULL_QUESTION, payload: dataQuestions })

    const getQuestionsFollowPage = (pageNumber) => dispatch({ type: GET_QUESTION_FOLLOW_PAGE_NUMBER, payload: pageNumber })

    const handleSelectAnswer = (indexSelect) => dispatch({ type: CHANGE_ANSWER_QUESTION, payload: indexSelect })

    const contextData = {
        dataSurvey,
        updateFullQuestion,
        getQuestionsFollowPage,
        handleSelectAnswer
    }
    
    return(
        <WorkingSurveyContext.Provider value={contextData}>
            {children}
        </WorkingSurveyContext.Provider>
    )
}

export const useWorkingSurvey = () => useContext(WorkingSurveyContext);

export default WorkingSurveyContextProvider