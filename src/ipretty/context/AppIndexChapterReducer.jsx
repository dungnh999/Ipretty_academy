
export default (state, action) => {
    switch (action.type) {
        case 'GET_INDEX_CHAPTER':
            const indexChapter = action.payload

            return {
                ...state,
                indexChapter: indexChapter
            }
        case 'GET_LESSON_ID':
            const lessonId = action.payload
            return {
                ...state,
                lessonId: lessonId
            }
        case 'GET_SURVEY_ID':
            const surveyId = action.payload
            return {
                ...state,
                surveyId: surveyId
            }
        default:
            state;
    }
}