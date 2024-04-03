import React, {  } from 'react';
import { Grid, Box, Paper } from '@material-ui/core';
import QuestionSurvey from './QuestionSurvey';

function SectionSurvey(props) {
    const { questionsFollowPage, pageNumber, questionPerPage } = props;
    //  console.log(questionPerPage, '------2')
    return(
        <div>
            {
                questionsFollowPage.map((question, indexQuestion) => {
                    return(
                        <div key={indexQuestion} className="root__section__question">
                            <Box 
                                style={{ 
                                    width: '100%'
                                }}
                                key={indexQuestion}
                            >
                                <Paper elevation={1} >
                                    <QuestionSurvey
                                        question={question}
                                        indexQuestion={indexQuestion}
                                        pageNumber={pageNumber}
                                        questionPerPage={questionPerPage}
                                    />
                                </Paper>
                            </Box>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SectionSurvey;