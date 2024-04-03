
import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Dialog from 'ipretty/components/Dialog/Dialog';
import SurveyService from 'ipretty/services/SurveyService';
import CheckBox from '../../../../public/icon_svg/check_box_btn.svg';
import CheckBoxCheck from '../../../../public/icon_svg/checkbox_check_btn.svg';
import CheckBoxTrue from '../../../../public/icon_svg/checkbox_true_btn.svg';
import CheckBoxFalse from '../../../../public/icon_svg/checkbox_false_btn.svg';
import Radio from '../../../../public/icon_svg/radio_btn.svg';
import RadioTrue from '../../../../public/icon_svg/radio_true_btn.svg';
import RadioFalse from '../../../../public/icon_svg/radio_false_btn.svg';
import ImageStyle from './../components/images/ImageStyle';
import DialogView from 'ipretty/components/Dialog/DialogView';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .question': {
      [theme.breakpoints.up("sm")]: {
        padding: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "15px",
      },
      border: '1px solid #C4C4C4',
      borderRadius: '8px',
      marginBottom: '20px',
      '& .MuiTypography-root': {
        fontFamily: 'San Francisco Text',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '24px',
        color: '#147B65'
      },
      '& .sentence': {
        [theme.breakpoints.up("sm")]: {
          display: 'flex',
        },
        justifyContent: 'space-between',
        paddingTop: '8px',
        '& img': {
          minWidth: '200px',
          height: '104px',
          objectFit: 'contain'
        },
        "& .title": {
          fontFamily: 'San Francisco Text',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '16px',
          letterSpacing: '-0.011em',
          color: '#3D423C'
        },
        "& .resultQuestion": {
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column'
        }
      },
      '& .answer': {
        fontFamily: 'San Francisco Text',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '-0.011em',
        color: '#147B65',
        paddingTop: '34px',
      },
      '& .answerQuestion': {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '18px',
        '& .optionTitle': {
          display: 'flex',
          '&  .option': {
            fontFamily: 'San Francisco Text',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '-0.011em',
            color: '#3D423C',
            marginLeft: '10px',
            alignSelf: 'baseline'
          }
        },
        '& .imgOption': {
          backgroundColor: '#F3F3F3',
          padding: '8px 8px 0px 8px',
          [theme.breakpoints.up("sm")]: {
            width: '204px',
          },
          [theme.breakpoints.down("xs")]: {
            width: '125px',
          },
          height: 'auto',
          wordBreak: 'break-word',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        '& .imgOptionMultiple': {
          backgroundColor: '#F3F3F3',
          padding: '8px 8px 0px 8px',
          [theme.breakpoints.up("sm")]: {
            width: '204px',
          },
          [theme.breakpoints.down("xs")]: {
            width: '125px',
          },
          height: 'auto',
          wordBreak: 'break-word',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          marginTop: '-4px'
        }
      }
    }
  },

}));
function ExamDetail(props) {
  const { open, setOpen, surveyId, userId, getTranslation } = props;
  const classes = useStyles();
  const [dataExamDetail, setDataExamDetail] = useState([]);
  const [isShowPopupImage , setIsShowPopupImage] = useState(false)
  const [fileImage , setFileImage] = useState()

  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
      try {
        if (mounted) {
          seeExamDetail();
        }
      } catch (e) {
        if (mounted) {
          throw e;
        }
      }
    };
    runAsync();
    return () => (mounted = false);
  }, []);

  function seeExamDetail() {
    const data = new FormData()
    data.append('user_id', userId)
    data.append('survey_id', surveyId)
    SurveyService.seeExamDetail(data, seeExamDetailSuccess, seeExamDetailError);
  }
  function seeExamDetailSuccess(res) {
    let data = res.data.data.questions_data.questions;
    setDataExamDetail(data);
  }
  function seeExamDetailError(err) {
    console.log("err: ", err)
  }
  function handleClickImage(file){
    setIsShowPopupImage(true)
        setFileImage(file)
  }
  function handleClose() {
    setIsShowPopupImage(false)
  }

  function question() {
    return dataExamDetail.length > 0 && dataExamDetail.map((item, index) => (
      <Grid key={index}>
        {item.question_type == "SingleChoice" ? (
          <Grid className="question">
            <Typography>{`${getTranslation('TheSentence')} ${index + 1}`}</Typography>
            <Grid className="sentence" item xs={12}>
              <Grid className="title">{item.question_title}</Grid>
              {item.question_attachments ? <ImageStyle src={item.question_attachments} isQuestionImg={true} /> : ''}
            </Grid>
            <div className="answer">{getTranslation('answer')}</div>
            <Grid>
              {
                item.options && item.options.length > 0 ? item.options.map((value, index) => (
                  <Grid key={index}>
                    {value.right_answer ?
                      <div className="answerQuestion">
                        <div className="optionTitle">
                          <ImageStyle src={RadioTrue} isQuestionImg={false} />
                          <div className="option">{value.option_body}</div>
                        </div>
                        {value.option_attachmant_name ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOption">{value.option_attachmant_name}</div> : ""}
                      </div> : (item.answer != null) && (item.answer.option_id == value.option_id) ?
                        <div className="answerQuestion">
                          <div className="optionTitle">
                            <ImageStyle src={RadioFalse} isQuestionImg={false} />
                            <div className="option">{value.option_body}</div>
                          </div>
                          {value.option_attachmant_name ? <div onClick={() => handleClickImage(value.option_attachments ?  value.option_attachments : '')} className="imgOption">{value.option_attachmant_name}</div> : ""}
                        </div> : <div className="answerQuestion">
                          <div className="optionTitle">
                            <ImageStyle src={Radio} isQuestionImg={false} />
                            <div className="option">{value.option_body}</div>
                          </div>
                          {value.option_attachmant_name ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOption">{value.option_attachmant_name}</div> : ""}
                        </div>
                    }
                  </Grid>
                )) : ''
              }
            </Grid>
          </Grid>
        ) : (
          <Grid className="question">
            <Typography>{`${getTranslation('TheSentence')} ${index + 1}`}</Typography>
            <Grid className="sentence" item xs={12}>
                <Grid className="title">{item.question_title}</Grid>
                {item.question_attachments ? <ImageStyle src={item.question_attachments} isQuestionImg={true} /> : ''}
            </Grid>
            <div className="answer">{getTranslation('answer')}</div>
            {
              item.options && item.options.length > 0 ? item.options.map((value, index) => (
                <Grid key={index}>
                  {
                    (item.answer != null) && item.answer.option_id.includes(value.option_id.toString()) ?
                      (
                        value.right_answer ?
                          <div className="answerQuestion">
                            <div className="optionTitle">
                              <ImageStyle src={CheckBoxCheck} isQuestionImg={false} />
                              <span className="option">{value.option_body}</span>
                            </div>
                            <div style={{ display: 'flex'}}>
                              {value.option_attachments ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOptionMultiple">{value.option_attachmant_name ? value.option_attachmant_name : "NA"}</div> : ""}
                              <ImageStyle src={CheckBoxTrue} isQuestionImg={false} />
                            </div>
                          </div> : <div className="answerQuestion">
                            <div className="optionTitle">
                              <ImageStyle src={CheckBoxCheck} isQuestionImg={false} />
                              <span className="option">{value.option_body}</span>
                            </div>
                            <div style={{ display: 'flex' }}>
                              {value.option_attachments ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOptionMultiple">{value.option_attachmant_name ? value.option_attachmant_name : "NA"}</div> : ""}
                              <ImageStyle src={CheckBoxFalse} isQuestionImg={false} /></div>
                            </div>
                      )
                      :
                      (
                        value.right_answer ?
                          <div className="answerQuestion">
                            <div className="optionTitle">
                              <ImageStyle src={CheckBox} isQuestionImg={false} />
                              <span className="option">{value.option_body}</span>
                            </div>
                            <div style={{ display: 'flex'}}>
                              {value.option_attachments ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOptionMultiple">{value.option_attachmant_name ? value.option_attachmant_name : "NA"}</div> : ""}
                              <ImageStyle src={CheckBoxTrue} isQuestionImg={false} />
                            </div>
                          </div> : <div className="answerQuestion">
                            <div className="optionTitle">
                              <ImageStyle src={CheckBox} isQuestionImg={false} />
                              <span className="option">{value.option_body}</span>
                            </div>
                            <div style={{ display: 'flex'}}>
                              {value.option_attachments ? <div onClick={() => handleClickImage(value.option_attachments ? value.option_attachments : '')} className="imgOptionMultiple">{value.option_attachmant_name ? value.option_attachmant_name : "NA"}</div> : ""}
                              <ImageStyle src={CheckBoxFalse} isQuestionImg={false} /></div>
                          </div>
                      )
                  }
                </Grid>
              )) : ''
            }
          </Grid>
        )}
        {
        isShowPopupImage && (
          <DialogView
            maxWidth='400px'
            openDialog={isShowPopupImage}
            handleClose={handleClose}
            hiddenActions={true}
            fileImage={fileImage}
            onClose={handleClose}
          >
          </DialogView>
        )
      }     
      </Grid>
    ));
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='lg'
        title={getTranslation('examDetails')}
        getTranslation={getTranslation}
      >
        <Grid className={classes.root}>
          <div>{question()}</div>
        </Grid>
      </Dialog>
       
    </>
  )
}

export default ExamDetail;
