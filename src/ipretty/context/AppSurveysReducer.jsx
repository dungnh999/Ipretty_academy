
export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_SURVEY':
            const { indexSurveyCVS } = action
            return {
                ...state,
                surveys: state.surveys.map((survey, indexSurvey) => {
                    if (indexSurveyCVS == indexSurvey) {
                        return {
                            ...survey,
                            ...action.newValue
                        }
                    }
                    return survey
                })
            }
        case 'GET_VALUE_SURVEY':
            const surveyGVS = action.payload;

            return {
                ...state,
                surveys: state.surveys.map((survey, indexSurvey) => {
                    return {
                        ...survey,
                        survey_title: surveyGVS.survey_title ? surveyGVS.survey_title : '',
                        survey_description: surveyGVS.survey_description ? surveyGVS.survey_description : '',
                        percent_to_pass: surveyGVS.percent_to_pass ? surveyGVS.percent_to_pass : ''
                    }
                })
            }
        case 'GET_ERROR':
            const errorGE = action.payload

            return {
                ...state, 
                error: errorGE
            }
        default:
            break;
    }
}