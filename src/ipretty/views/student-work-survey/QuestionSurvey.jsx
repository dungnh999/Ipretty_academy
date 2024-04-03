import React, { useState  } from 'react';
import { Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import { useWorkingSurvey } from 'ipretty/context/student-working-to-survey/WorkingSurveyContext';
import { Image } from '@material-ui/icons';
import { useAuth } from 'ipretty/context/AppProvider';
import DialogView from 'ipretty/components/Dialog/DialogView';

function QuestionSurvey(props) {
    const { question, indexQuestion, pageNumber, questionPerPage } = props;
    const { handleSelectAnswer } = useWorkingSurvey();
    const { getTranslation } = useAuth();
    const [isShowPopupImage , setIsShowPopupImage] = useState(false)
    const [fileImage , setFileImage] = useState()
    const handleSelectChange = (events, indexOption) => {
        handleSelectAnswer({ indexQuestion: indexQuestion, indexOption: indexOption, number_page: pageNumber, count_question_page: questionPerPage });
    };

    function handleClickImage (file) {
        setIsShowPopupImage(true)
        setFileImage(file)
    }

    function handleClose () {
        setIsShowPopupImage(false)
    }

    function onClose () {
        setIsShowPopupImage(false)
    }
    
    const renderOptions = (question) => {
        switch(question.question_type) {
            case 'SingleChoice': {
                return question.options.map((option, indexOption) => (
                    <div key={indexOption} className="root__section__question__option__padding1__content">
                        <div>
                            <Radio
                                name="radio-buttons"
                                value={option.option_body}
                                onChange={(events) => handleSelectChange(events, indexOption)}
                                checked={option.checked}
                                color="primary"
                            />
                        </div>
                        <div className="root__section__question__option__padding1__content__attack">
                            <div className="root__section__question__option__padding1__content__attack__body">
                                {  option.option_body }
                            </div>
                            <div className="root__section__question__option__padding1__content__attack__file">
                                {  option.option_attachments ? 
                                        <Image onClick={() => handleClickImage(option.option_attachments ?  option.option_attachments : '')} style={{ marginTop: '5px' }} />
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                ));
            };
            case 'MultipleChoice': {
                return question.options.map((option, indexOption) => (
                    <div key={indexOption} className="root__section__question__option__padding1__content">
                        <div>
                            <Checkbox 
                                color="primary"
                                value={option.option_body}
                                onChange={(events) => handleSelectChange(events, indexOption)}
                                checked={option.checked}
                            />
                        </div>
                        <div className="root__section__question__option__padding1__content__attack">
                            <div className="root__section__question__option__padding1__content__attack__body">
                            {  option.option_body }
                            </div>
                            <div className="root__section__question__option__padding1__content__attack__file">
                                {  option.option_attachments ? 
                                        <Image onClick={() => handleClickImage(option.option_attachments ?  option.option_attachments : '')} style={{ marginTop: '5px' }} />
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                ));
            };
            default: return null;
        }
    };

    return(
        <>
            <div className="root__section__question__title">
                <Typography>
                    {`${getTranslation('TheSentence')} ${question.stt} : ${question.question_title}`}
                </Typography>
            </div>
            <div>
                {
                    question.question_attachments ?
                    <div className="root__section__question__option">
                        <div className="question_image">
                            <img className="root__section__question__option__image" alt="fail" src={question.question_attachments} />
                        </div>
                        <div className="root__section__question__option__padding0">
                            { renderOptions(question) }
                        </div>
                    </div>
                    :
                    <div className="root__section__question__option">
                        <div className="root__section__question__option__padding1">
                            { renderOptions(question) }
                        </div>
                    </div>
                }
            </div>
            { 
                isShowPopupImage && (
                    <DialogView
                        maxWidth={'lg'}
                        openDialog={isShowPopupImage}
                        handleClose={handleClose}
                        hiddenActions={true}
                        fileImage={fileImage}
                        onClose={onClose}
                    >
                    </DialogView>
                )
            }      
        </>
    )
}

export default QuestionSurvey;