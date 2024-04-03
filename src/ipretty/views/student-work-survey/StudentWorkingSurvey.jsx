import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import AddButton from 'ipretty/components/AddButton';
import Goback from 'ipretty/components/Goback';
import SectionSurvey from './SectionSurvey';

import { useWorkingSurvey } from 'ipretty/context/student-working-to-survey/WorkingSurveyContext'
import { useAuth } from 'ipretty/context/AppProvider'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import SurveyService from 'ipretty/services/SurveyService'

import useNavigator from "ipretty/hook/useNavigator";
import AnswerService from 'ipretty/services/AnswerService';
import IconImage from "ipretty/components/IconImage";
import Delete from '../../../public/icon_svg/Delete.svg';
import Send from '../../../public/icon_svg/Send.svg';
import Save from '../../../public/icon_svg/Save.svg';
import Left from '../../../public/icon_svg/Left.svg'
import Right from '../../../public/icon_svg/Right.svg'
import { useHistory } from 'react-router';
import Skeleton from 'ipretty/components/Skeleton';
import Dialog from 'ipretty/components/Dialog/Dialog';

const useStyles = makeStyles(theme => ({
    root: {
        '& .root__buttonGoBack': {
            padding: '28px 0px 0px 93px',
            display: 'flex',
            [theme.breakpoints.down('lg')]: {
                padding: '28px 0px 0px 63px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '20px 0px 0px 20px'
            }
        },
        "& .quesions__wrapper": {
            padding: '23px 208px 170px 208px',
            [theme.breakpoints.down('lg')]: {
                padding: '23px 14.444vw 170px 14.444vw',
            },
            [theme.breakpoints.down('md')]: {
                padding: '23px 208px 170px 208px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '35px 20px 20px 20px'
            },
            [theme.breakpoints.down('xs')]: {
                padding: '20px 20px 20px 20px'
            }
        },
        '& .root__title': {
            "& .MuiTypography-root": {
                fontFamily: 'San Francisco Display',
                fontSize: '32px',
                color: theme.palette.primary.colorOvewViewTitle,
                wordBreak: 'break-word',
                marginBottom: 24,
            },
            [theme.breakpoints.down('md')]: {
            },
            [theme.breakpoints.down('sm')]: {

            },
            [theme.breakpoints.down('xs')]: {

            }
        },
        '& .root_description': {
            "& .MuiTypography-root": {
                fontFamily: 'San Francisco Text',
                fontSize: '14px',
                wordBreak: 'break-word',
                color: theme.palette.primary.colorNameLesson,
                marginBottom: 42,
            },
            [theme.breakpoints.down('md')]: {
            },
            [theme.breakpoints.down('sm')]: {

            },
            [theme.breakpoints.down('xs')]: {
            }
        },
        '& .root__section': {
            // padding: '30px 180px 0px 180px',
            [theme.breakpoints.down('md')]: {
                // padding: '20px 80px 0px 80px'
            },
            [theme.breakpoints.down('sm')]: {

            },
            [theme.breakpoints.down('xs')]: {
                // padding: '10px 25px 0px 25px'
            },
            '& .root__section__question': {
                marginBottom: '24px',
                "& .MuiPaper-root": {
                    padding: '34px 52px'
                },
                '& .root__section__question__title': {
                    marginBottom: 30,
                    "& .MuiTypography-root": {
                        fontSize: '24px',
                        fontFamily: 'San Francisco Text Bold',
                        color: theme.palette.primary.colorOvewViewTitle,
                    },
                    [theme.breakpoints.down('sm')]: {
                    },
                    [theme.breakpoints.down('xs')]: {
                        // fontSize: '15px', 
                    },
                },
                '& .root__section__question__option': {
                    display: 'flex',
                    flexDirection: 'row',
                    [theme.breakpoints.down('xs')]: {
                        flexDirection: 'column',
                    },
                    '& .root__section__question__option__image': {
                        height: '195px',
                        width: '396px',
                        objectFit: 'contain',
                        [theme.breakpoints.down('lg')]: {
                            height: '190px',
                            width: '365px'
                        },
                        [theme.breakpoints.down('md')]: {
                            height: '180px',
                            width: '295px'
                        },
                        [theme.breakpoints.down('sm')]: {
                            height: '130px',
                            width: '215px'
                        },
                        [theme.breakpoints.down('xs')]: {
                            height: '160px',
                            width: '285px'
                        },
                    },
                    '& .root__section__question__option__padding0': {
                        flex: 6,
                        marginLeft: 34,
                        [theme.breakpoints.down('lg')]: {
                            marginLeft: 20,
                        },
                        [theme.breakpoints.down('sm')]: {
                            flex: 'auto',
                            marginLeft: 0,
                        },
                        '& .root__section__question__option__padding1__content': {
                            display: 'flex',
                            alignItems: 'center',
                            '& .root__section__question__option__padding1__content__attack': {
                                display: 'flex',
                                alignItems: 'center',
                                '& .root__section__question__option__padding1__content__attack__body': {
                                    fontSize: '16px',
                                    color: '#1A1A1A',
                                    lineHeight: '24px',
                                    [theme.breakpoints.down('sm')]: {
                                    },
                                    [theme.breakpoints.down('xs')]: {
                                    },
                                },
                                '& .root__section__question__option__padding1__content__attack__file': {
                                    cursor: 'pointer',
                                    paddingLeft: '5px'
                                }
                            }
                        }
                    },
                    '& .root__section__question__option__padding1': {
                        paddingLeft: '45px',
                        [theme.breakpoints.down('xs')]: {
                            paddingLeft: '10px'
                        },
                        '& .root__section__question__option__padding1__content': {
                            display: 'flex',
                            alignItems: 'baseline',
                            '& .root__section__question__option__padding1__content__attack': {
                                display: 'flex',
                                alignItems: 'center',
                                '& .root__section__question__option__padding1__content__attack__body': {
                                    fontFamily: 'San Francisco Text',
                                    fontSize: '16px',
                                    color: '#1A1A1A',
                                    [theme.breakpoints.down('sm')]: {
                                        paddingLeft: '8px'
                                    },
                                },
                                '& .root__section__question__option__padding1__content__attack__file': {
                                    paddingLeft: '5px'
                                }
                            }
                        }
                    }
                }
            }
        },
        '& .root__action': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                justifyContent: 'flex-start',
            },
            [theme.breakpoints.down('sm')]: {
            },
            [theme.breakpoints.down('xs')]: {
            },
            '& .left_right_button': {
                display: 'flex',
                paddingTop: '6px',
                "& .MuiButton-root": {
                    color: theme.palette.primary.colorOvewViewTitle,
                    borderColor: theme.palette.primary.colorOvewViewTitle,
                    fontSize: 16,
                    padding: '10px 16px 10px 17px',
                    minWidth: 149,
                    cursor: 'pointer',
                    [theme.breakpoints.down('lg')]: {
                        padding: '10px 10px 10px 10px',
                        fontSize: 14,
                        minWidth: 100,
                    },
                }
            },
            '& .root__action__back': {
                marginLeft: '20px',
                [theme.breakpoints.down('lg')]: {
                    marginLeft: '10px',
                },
                // [theme.breakpoints.down('xs')]: {
                //     padding: '0px 0px 0px 18px'
                // },
            },
            '& .root__action__threeBtn': {
                //padding: '0px 0px 0px 180px', 
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop : 18,
                [theme.breakpoints.down('xs')]: {
                    justifyContent: 'space-evenly',
                    paddingTop: '10px'
                },
                [theme.breakpoints.down('xs')]: {
                    '& span' : {
                        '& div' :{
                            display: 'none'
                        },
                        '& span' : {
                            fontSize: 12
                        }
                    }
                 },
                '& .root__action__threeBtn__pading': {
                    marginLeft: '20px',
                    [theme.breakpoints.down('lg')]: {
                        marginLeft: '10px',
                    },
                    [theme.breakpoints.down('xs')]: {
                       '& .makeStyles-icon-24' : {
                           display: 'none'
                       }
                    },
                },
                "& .MuiButton-root": {
                    minWidth: 190,
                    padding: '15px 32px 15px 19px',
                    fontSize: 20,
                    lineHeight: '28px',
                    fontFamily: 'San Francisco Text Bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down('lg')]: {
                        padding: '15px 16px 15px 16px',
                        fontSize: 18,
                        minWidth: 120,

                    },
                    [theme.breakpoints.down('xs')]: {
                        padding: '6px 15px 6px 22px',
                     },
                }
            }
        },
        "& .skeleton_wrapper": {
            padding: '10px 0',
            "&.button_skeleton": {
                display: 'flex',
                justifyContent: 'flex-end',
                "& .MuiSkeleton-root": {
                    marginLeft: 10
                },
                "& .MuiSkeleton-root:first-child": {
                    marginLeft: 0
                }
            }
        }
    },
    actionDialog: {
        "& .MuiButton-root": {
            padding: '12px 32px',
            fontSize: 16,
            lineHeight: '16px',
        }
    }
}));

function StudentWorkingSurvey(props) {
    const { match } = props;
    const classes = useStyles();
    const navigate = useNavigator();
    const { survey_id, course_id } = match.params;
    const { getTranslation } = useAuth()
    const { updateFullQuestion, dataSurvey, getQuestionsFollowPage } = useWorkingSurvey();
    const { questionsFollowPage, fullQuestions } = dataSurvey;
    const [pageNumber, setPageNumber] = useState(localStorage.getItem('page_number') ? +localStorage.getItem('page_number') : 1);
    const [questionPerPage, setQuestionPerPage] = useState(100);
    const [infoSurvey, setInfoSurvey] = useState({});
    const [loadingButtonSubmit, setLoadingButtonSubmit] = useState(false);
    const [loadingButtonDraft, setLoadingButtonDraft] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const [isShowPopupCancel, setIsShowPopupCancel] = useState(false)
    const history = useHistory();
    let chapterIndex = undefined;
    let chapterItemIndex = undefined;
    if (localStorage.getItem('chapterIndex') && localStorage.getItem('chapterItemIndex')) {
        chapterIndex = localStorage.getItem('chapterIndex');
        chapterItemIndex = localStorage.getItem('chapterItemIndex');
    }

    const changePage = (check) => {
        if (check === 'up') {
            setPageNumber(pageNumber + 1);
            localStorage.setItem('page_number', pageNumber + 1);
            getQuestionsFollowPage({ number_page: pageNumber + 1, count_question_page: questionPerPage })
        } else {
            setPageNumber(pageNumber - 1);
            localStorage.setItem('page_number', pageNumber - 1);
            getQuestionsFollowPage({ number_page: pageNumber - 1, count_question_page: questionPerPage })
        }
    };

    useEffect(() => {
        SurveyService.detailForUser(survey_id, (responses) => successSurvey(responses.data.data), (errors) => errorSurvey(errors))
    }, []);

    const successSurvey = (survey) => {
        if (survey) {
            const countQuestionPage = survey.question_per_page ? survey.question_per_page : 3
            // if (countQuestionPage && countQuestionPage != 3) {
            //     setQuestionPerPage(countQuestionPage)
            // }
            setQuestionPerPage(countQuestionPage)
            setInfoSurvey({
                survey_title: survey.survey_title,
                survey_description: survey.survey_description
            });
            // if(localStorage.getItem('fullQuestionsSaveLocalStorage')) {
            //     const questions_answers_storage = JSON.parse(localStorage.getItem('fullQuestionsSaveLocalStorage'));
            //     if(questions_answers_storage && questions_answers_storage.length && questions_answers_storage.length > 0) {
            //         updateFullQuestion({ questions: questions_answers_storage, count_question_page: +countQuestionPage, number_page: pageNumber, checkStorage: true });
            //     }
            // } else {
            updateFullQuestion({ questions: survey.questions_data.questions, count_question_page: +countQuestionPage, number_page: pageNumber, checkStorage: false });
            // }
        }
    };

    const errorSurvey = (error) => {

    };

    const submitSurvey = (type) => {
        if (type) {
            setLoadingButtonDraft(true)
        } else {
            setLoadingButtonSubmit(true);
            // return 0
        }
        let dataSubmit = new FormData();
        let answer_data = {
            answers: []
        };
        // console.log(fullQuestions);
        // return 0;
        fullQuestions.forEach(question => {
            let answer_id = ""
            if (question.answer && question.answer.answer_id) {
                answer_id = question.answer.answer_id
            }
            let answerItem = {
                answer_id: answer_id,
                question_id: question.question_id,
                option_id: []
            };
            question.options.forEach(option => {
                if (option.checked) {
                    answerItem.option_id.push(option.option_id);
                }
            });
            answer_data.answers.push(answerItem);
        });
        dataSubmit.append('course_id', course_id);
        dataSubmit.append('survey_id', survey_id);
        dataSubmit.append('isDraft', type);
        dataSubmit.append('answer_data', JSON.stringify(answer_data))
        callApiSubmitSurvey(dataSubmit, type);
    };

    const callApiSubmitSurvey = (data, type) => {
        AnswerService.submitSurvey(data, (responses) => submitSuccess(responses, type), (errors) => submitError(errors));
    };

    const submitSuccess = (responses, type) => {
        if (responses && responses.data && responses.data.success) {
            // setLoadingButtonSubmit(false);
            if (type) {
                makeShortMessage(`${getTranslation('SaveDraftSuccess')} !`, "success");
            } else {
                makeShortMessage(`${getTranslation('SubmitSurveySuccess')} !`, "success");
            }
            setTimeout(() => {
                handleConfirmCancel();
                if (type) {
                    setLoadingButtonDraft(false)
                } else {
                    setLoadingButtonSubmit(false);
                }
            }, 1500);
        }
    };

    const submitError = (errors) => {
        setLoadingButtonDraft(false)
        setLoadingButtonSubmit(false);
    };

    function handleClosePoppCancel() {
        setIsShowPopupCancel(false)
    }

    function handleConfirmCancel() {
        navigate(`/detail-course/${course_id}/survey/${survey_id}?chapterIndex=${chapterIndex}&chapterItemIndex=${chapterItemIndex}`);
        localStorage.removeItem('page_number');
        localStorage.removeItem('chapterIndex');
        localStorage.removeItem('chapterItemIndex');
    }

    const cancelWorkingSurvey = () => {
        setIsShowPopupCancel(true)
    };

    const saveDraft = () => {
        submitSurvey(1);
    };
   
    return (
        <div className={classes.root}>
            <div className="root__buttonGoBack">
                <Goback
                    path={`/detail-course/${course_id}/survey/${survey_id}?chapterIndex=${chapterIndex}&chapterItemIndex=${chapterItemIndex}`}
                    clearStorage={['page_number', 'chapterIndex', 'chapterItemIndex']}
                />
            </div>
            <div className="quesions__wrapper">
                {infoSurvey.survey_title ? (
                    <>
                        <div className="root__title">
                            <Typography>
                                {infoSurvey && infoSurvey.survey_title ? infoSurvey.survey_title : ''}
                            </Typography>
                        </div>
                        <div className="root_description">
                            <Typography>
                                {infoSurvey && infoSurvey.survey_description ? infoSurvey.survey_description : ''}
                            </Typography>
                        </div>
                        <div className="root__section">
                            {
                                questionsFollowPage && questionsFollowPage.length && questionsFollowPage.length > 0 ?
                                    <SectionSurvey
                                        questionsFollowPage={questionsFollowPage}
                                        pageNumber={pageNumber}
                                        questionPerPage={questionPerPage}
                                    /> : ''
                            }

                        </div>
                        <div className="root__action">
                            <div>
                                {
                                    fullQuestions && fullQuestions.length && fullQuestions.length > questionPerPage ?
                                        <div className="left_right_button">
                                            <div>
                                                <AddButton
                                                    label={getTranslation('PreviousPart').toUpperCase()}
                                                    id="pre-button"
                                                    variant='outlined'
                                                    onClick={() => changePage('down')}
                                                    disabled={pageNumber == 1}
                                                    iconButton={<IconImage srcIcon={Left} />}
                                                />
                                            </div>
                                            <div className="root__action__back">
                                                <AddButton
                                                    label={getTranslation('Nextpart').toUpperCase()}
                                                    id="next-button"
                                                    variant='outlined'
                                                    onClick={() => changePage('up')}
                                                    disabled={questionsFollowPage && fullQuestions && questionsFollowPage.length && fullQuestions.length && questionsFollowPage[questionsFollowPage.length - 1].question_id == fullQuestions[fullQuestions.length - 1].question_id}
                                                    iconButton={<IconImage srcIcon={Right} />}
                                                    endIcon
                                                />
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                            <div>
                                <div className="root__action__threeBtn">
                                    <div>
                                        <AddButton
                                            label={getTranslation('CancelSurvey')}
                                            id="pre-button"
                                            variant='outlined'
                                            onClick={cancelWorkingSurvey}
                                            iconButton={<IconImage srcIcon={Delete} />}
                                        />
                                    </div>
                                    <div className="root__action__threeBtn__pading">
                                        <AddButton
                                            label={getTranslation('SaveDraft')}
                                            id="next-button"
                                            variant='outlined'
                                            onClick={saveDraft}
                                            iconButton={<IconImage srcIcon={Save} />}
                                            loading={loadingButtonDraft}
                                        />
                                    </div>
                                    <div className="root__action__threeBtn__pading">
                                        <AddButton
                                            label={getTranslation('SubmitSurvey')}
                                            id="next-button"
                                            variant="contained"
                                            onClick={() => submitSurvey(0)}
                                            iconButton={<IconImage srcIcon={Send} />}
                                            loading={loadingButtonSubmit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="skeleton_wrapper">
                            <Skeleton type="text" />
                        </div>
                        <div className="skeleton_wrapper">
                            <Skeleton type="text" />
                        </div>
                        <div className="skeleton_wrapper">
                            <Skeleton type="contactCard" height={212} />
                        </div>
                        <div className="skeleton_wrapper">
                            <Skeleton type="contactCard" height={212} />
                        </div>
                        <div className="skeleton_wrapper button_skeleton">
                            <Skeleton type="button" />
                            <Skeleton type="button" />
                            <Skeleton type="button" />
                        </div>
                    </>

                )}

            </div>

            {isShowPopupCancel && (
                <Dialog
                    maxWidth="xs"
                    CustomWidth={classes.CustomWidth}
                    open={isShowPopupCancel}
                    onClose={handleClosePoppCancel}
                    actionLabel={getTranslation('ok')}
                    action={handleConfirmCancel}
                    noIcon={true}
                    getTranslation={getTranslation}
                    className={classes.actionDialog}
                >
                    <Typography>
                        {getTranslation("WarningCancelExam")}
                    </Typography>
                </Dialog>
            )}
        </div>
    )
}

export default StudentWorkingSurvey;