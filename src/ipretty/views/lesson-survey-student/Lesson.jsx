import React, { useState } from 'react';
import { TextField, Box, Paper, Avatar, makeStyles, Typography, Collapse ,Tooltip ,InputAdornment ,IconButton } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { useHistory } from "react-router-dom"
import {Visibility } from '@material-ui/icons'
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReactPlayer from "react-player";
import LessonService from 'ipretty/services/LessonService';
import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';
import Chat from 'public/icon_svg/chat.svg'
import File from 'public/icon_svg/file.svg'
import Share from 'public/icon_svg/share.svg'
import Download from 'public/icon_svg/download.svg'
import Dialog from 'ipretty/components/Dialog/Dialog'
import IconImage from "ipretty/components/IconImage"
import Copy from '../../../public/icon_svg/Copy.svg'
import MyCoursesService from 'ipretty/services/MyCoursesService';
import useNavigator from "ipretty/hook/useNavigator";
import Skeleton from 'ipretty/components/Skeleton';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '28px 50px 0px 32px',
        [theme.breakpoints.down('lg')]: {
                
        },
        [theme.breakpoints.down('sm')]: {
            
        },
        [theme.breakpoints.down('xs')]: {
            padding: '10px 10px 0px 10px',
        },
        '& .root__lessonFail': {
            width: '100%', 
            backgroundColor: '#DADFD9', 
            height: '400px'
        }
    },
    content: {
        padding: '29px 50px 36px 32px',
        [theme.breakpoints.down('xs')]: {
            padding: '10px 10px'
        },
        "& .content__paper": {
            padding: '32px 56px 32px 56px',
            [theme.breakpoints.down('lg')]: {
                padding: '32px 32px 32px 32px',

            },
            [theme.breakpoints.down('sm')]: {
                padding: '32px 20px 32px 20px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '32px 16px 32px 16px',
            },
            "& .skeleton_wrapper": {
                // padding: '10px 0',
                flex: 1,
                "&.button_skeleton": {
                    display: 'flex',
                    justifyContent: 'center',
                }
            },
        },
        '& .content_sub_title': {
            fontSize: '16px',
            color: theme.palette.primary.colorNameLesson
        },
        '& .content__title': {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 28,
            '& .content__title__text': {
                fontFamily: 'San Francisco Text Bold',
                fontSize: '32px', 
                lineHeight: '38px',
                fontWeight: 'bold', 
                color: theme.palette.primary.colorOvewViewTitle
            },
            '& .content__title__teacher': {
                // width: '108px', 
                height: '56px', 
                backgroundColor: '#C4C4C4', 
                borderRadius: '36px', 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center',
                padding: '8px 8px 8px 16px',
                '& .content__title__teacher__hover': {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    "&:first-child": {
                        marginRight: 20,
                    }
                }
            }
        },
        '& .content__overView': {
            '& content__overView__title.': {
                fontSize: '16px', 
                color: '#1A1A1A'
            },
            '&. content__overView__txt': {
                fontSize: '14px', 
                color: theme.palette.primary.colorNameLesson
            }
        },
        '& .content__attackment': {
            '& .content__attackment__title': {
                fontSize: '16px', 
                color: theme.palette.primary.colorNameLesson
            },
            '& .content__attackment__mainContent': {
                display: 'flex', 
                justifyContent: 'space-between',
                backgroundColor: 'rgb(218 223 217 / 20%)',
                borderRadius: '8px',
                padding: '8px 27px',
                marginBottom: 8,
                "&:last-child": {
                    marginBottom: 0,
                },
                '& .content__attackment__mainContent__flex': {
                    display: 'flex',
                    alignItems: 'center',
                    '& .content__attackment__mainContent__flex__hover': {
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    },
                    '& .content__attackment__mainContent__flex__icon': {
                        paddingLeft: '14px',
                        // cursor: 'pointer',
                        color: theme.palette.primary.main,
                        fontSize: 12, 
                        lineHeight: '16px',
                        textDecoration: 'underline',
                        display: 'flex',
                        alignItems: 'center',
                        "& img": {
                            cursor: 'pointer',
                        }
                    }
                }
            }
        },
        '& .content__section': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginBottom: 30,
            [theme.breakpoints.down('md')]: {
                flexDirection: 'row'
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            },
            '& .content__sub-title': {
                flex: 1,
                paddingRight: 20,
                [theme.breakpoints.down('lg')]: {
                    flex: 2,
                },
                [theme.breakpoints.down('sm')]: {
                    flex: 'auto',
                },
                "& .MuiTypography-root": {
                    fontSize: '16px',
                    color: theme.palette.primary.colorNameLesson
                }
            },
            '& .content__footer__content': {
                flex: 6,
                [theme.breakpoints.down('lg')]: {
                    flex: 7,
                },
                [theme.breakpoints.down('sm')]: {
                    flex: 'auto',
                },
            },
        },
        "& .content__section_footer": {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            '& .content__footer__title': {
                marginBottom: 24,
                display: 'flex',
                "& .MuiTypography-root": {
                    fontSize: '16px',
                    color: theme.palette.primary.colorOvewViewTitle,
                    fontWeight: 600,
                    marginRight: 12
                },
                "& .content__section_footer--action .MuiSvgIcon-root": {
                    color: theme.palette.primary.colorOvewViewTitle,
                }
            },
        }
    },
    buttonCopy :{
        backgroundColor: "transparent",
        border : "none",
        cursor: 'pointer'
    },
    styleDialogContentLesson : {
        overflowY : 'revert',
        '& .copyLink' : {
            paddingTop : 32,
            '& .textField' : {
                // paddingTop : 5,
                '& .MuiInput-formControl' : {
                    background : '#F3F3F3',
                }
            }
        }
    }
}));

function Lesson(props) {
    const { dataLessonById, teacherInfo, getTranslation, course_id, lesson_id, chapterIndex, chapterItemIndex, finishLesson } = props;
    const { updateLessonLearned } = useLessonSurvey();
    const classes = useStyles();
    const [isPlay, setIsPlay] = useState(false);
    const [controls, setControls] = useState(true);
    const history = useHistory()
    const { makeShortMessage } = useNotiStackContext();
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const [ urlDocument , setUrlDocument] = useState()
    // const { updateDataDetailCourse } = useLessonSurvey();
    const navigate = useNavigator();

    const onPlay = () => {
        setIsPlay(true);
    };
    const onPause = () => {
        setIsPlay(false);
    };
    const onEnded = () => {
        if(!dataLessonById.isPassed) {
            updateProcessLesson();
        }
    };

    const updateProcessLesson = () => {
        const data = new FormData()
        data.append('course_id', course_id)
        data.append('lesson_id', lesson_id)
        data.append('view_duration', dataLessonById.lesson_duration)
        LessonService.updateProcessLesson(data,
            (res) => {
                if(res.data && res.data.data && res.data.data.lesson_id) {
                    const dataCheckLesson = res.data.data
                    updateLessonLearned({ chapterIndex, chapterItemIndex, dataCheckLesson })
                    if (dataCheckLesson.isCompletedCourse && !dataCheckLesson.isConfirmNotice) {
                        finishLesson(dataCheckLesson.course_name);
                    }
                }
            },
            (err) => {  }
        )
    };

    const  handleShare = (checkLink) => {
        setIsShowUploadFile(true);
        setUrlDocument(checkLink);
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    function handleCloseUploadFile () {
        setIsShowUploadFile(false)
    }

    const  handleDownload = ( data , nameFile ) => {
        var name = nameFile.split(".")
        var a = document.createElement("a");
        a.href = data;
        a.target= '_blank'
        a.setAttribute('download', name[0] + `.${name[1]}`);
        document.body.appendChild(a);
        a.click();
        makeShortMessage(getTranslation('Fileexportsuccessful'), "success")
    }

    const handleInfoTeacher = (id) => {
        let numberData = {
            course_id: course_id,
            lesson_id: lesson_id,
            chapter_index: chapterIndex,
            chapter_item_index: chapterItemIndex,
        }
        localStorage.setItem('numberData', JSON.stringify(numberData));
        history.push(`/teacher/${id}/detail?type=TeacherInformation`)
    }
    const handleShowMore = () => {
        setChecked((prev) => !prev);
    };
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
          onClick(event)
        }
    };
    
    function handleChangeCopy (e) {
        setUrlDocument(
            {
                value: e.target.value,
                copied : false,
            }
        )
    }
    function handleCopy (urlDocument) {
        if(urlDocument) {
            setUrlDocument(urlDocument)
            makeShortMessage(getTranslation('CopySuccessfuly') , 'success')
        }
    }
    function handleClickChat(id) {
        // console.log("idđ" , id)
        history.push(`/chat/${id}`)
    }
    function handleLimitMessage(str, limit) {
        if (str.length > limit) {
            return str.substring(0, limit) + '...'
        } else
            return str;
    }
    return(
        <>
            <div className={classes.root}>
                {
                    dataLessonById && dataLessonById.main_attachment ?
                    <div style={{ width: '100%' }}>
                        <ReactPlayer
                            url={dataLessonById.main_attachment}
                            width="100%"
                            height="100%"
                            playing={isPlay}
                            controls={controls}
                            onContextMenu={e => e.preventDefault()}
                            onPlay={onPlay}
                            onPause={onPause}
                            onEnded={onEnded}
                            playsinline
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                        />
                    </div> : 
                    <div className="root__lessonFail"></div>
                }
            </div>
            <div className={classes.content}>
                <Box style={{ 
                    width: '100%',
                }}>
                    <Paper elevation={1} className="content__paper">
                        {
                            dataLessonById ?
                            <div>
                                <div>
                                    <div className="content__title">
                                    {
                                        dataLessonById.chapter_item_name ? (
                                            <>   
                                                        <Tooltip title={dataLessonById.chapter_item_name}>
                                                            <div className="content__title__text">
                                                                {handleLimitMessage(dataLessonById.chapter_item_name, 50)}
                                                            </div>
                                                        </Tooltip>                                     
                                                <div className="content__title__teacher">
                                                    <div className="content__title__teacher__hover" onClick={(id) => handleClickChat(teacherInfo.teacher_id)}>
                                                        <img src={Chat} width="24" height="24" />
                                                    </div>
                                                    <div  className="content__title__teacher__hover">
                                                        <Avatar
                                                            onClick={(id) => handleInfoTeacher(teacherInfo.teacher_id)}
                                                            alt="Remy Sharp"
                                                            src={teacherInfo && teacherInfo.avatar}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : 
                                            <div className = "skeleton_wrapper">
                                                <Skeleton type = "text" />
                                            </div>
                                    }

                                    </div>
                                </div>
                                <div className="content__overView content__section">
                                    <div className="content__sub-title">
                                        <Typography>
                                                {getTranslation('overView')}
                                        </Typography>
                                    </div>
                                    <div className="content__footer__content">
                                        {
                                            dataLessonById.lesson_description ? (
                                                <Typography className="content__overView__txt"
                                                    dangerouslySetInnerHTML={{ __html: dataLessonById.lesson_description }}
                                                />
                                            ) : (
                                                <div className = "skeleton_wrapper">
                                                    <Skeleton type = "text" />
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="content__attackment content__section">
                                    <div className="content__sub-title">
                                        <Typography>
                                            {getTranslation('attachmentFile')}
                                        </Typography>
                                    </div>
                                    
                                    <div className="content__footer__content"> 
                                        {
                                            dataLessonById && dataLessonById.lesson_attachments ? 
                                            dataLessonById.lesson_attachments.length ?
                                                (dataLessonById.lesson_attachments.map((attackFile, indexFile) => {
                                                return(
                                                    <div key={indexFile} className="content__attackment__mainContent">
                                                        <div className="content__attackment__mainContent__flex">
                                                            <div className="content__attackment__mainContent__flex__hover">
                                                                <img src={File} width="24" height="24" />
                                                            </div>
                                                            <div className="content__attackment__mainContent__flex__icon">
                                                                {attackFile.file_name }
                                                            </div>
                                                        </div>
                                                        <div className="content__attackment__mainContent__flex">
                                                            <div className="content__attackment__mainContent__flex__hover">
                                                                <Tooltip title="Share">
                                                                    <img  onClick={(checkLink) => handleShare(attackFile.url)} src={Share} width="24" height="24"/>
                                                                </Tooltip>
                                                            </div>
                                                            <div className="content__attackment__mainContent__flex__icon">
                                                                <Tooltip title="Download">
                                                                    <img onClick={(checkLink) => handleDownload(attackFile.url ,attackFile.file_name )} src={Download} width="24" height="24" />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                )
                                            }) ):"": 
                                                <div className="skeleton_wrapper">
                                                    <Skeleton type="multiline" />
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="content__section_footer">
                                    <div className="content__footer__title">
                                        <Typography>
                                            {getTranslation('contentLesson')}
                                        </Typography>
                                        <div className="content__section_footer--action">
                                            {checked ? <ExpandLess onClick={handleShowMore} /> : <ExpandMore onClick={handleShowMore}/>}
                                        </div>
                                    </div>
                                    <div className="content__footer__content">
                                        <Collapse in={checked}>
                                        {
                                            dataLessonById.lesson_content ?
                                                <Typography className="content__footer__txt"
                                                    dangerouslySetInnerHTML={{ __html: dataLessonById.lesson_content }}
                                                />
                                            : 
                                            <div className="skeleton_wrapper">
                                                <Skeleton type="multiline" />
                                            </div>
                                        }
                                        </Collapse>
                                    </div>
                                </div>
                            </div> : ""

                        }
                            {isShowUploadFile && (
                                <Dialog
                                    maxWidth="xs"
                                    open={isShowUploadFile}
                                    onClose={handleCloseUploadFile}
                                    noButton={true}
                                    noIcon={false}
                                    title={getTranslation("Downloaddocuments")}
                                    getTranslation={getTranslation}
                                    rootDialogContentStyle={classes.styleDialogContentLesson}
                                >
                                    {getTranslation("Wanttoshare")}
                                    <div className="copyLink">
                                        <TextField
                                            id="textFieldCopyLink"
                                            fullWidth
                                            autoComplete=""
                                            value={urlDocument}
                                            onChange={(e) => handleChangeCopy}
                                            onKeyPress={validateKeyPress}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                endAdornment: <InputAdornment position="end">
                                                    <CopyToClipboard text={urlDocument}
                                                        onCopy={() => handleCopy(urlDocument)} 
                                                    >
                                                        <button className={classes.buttonCopy}><IconImage srcIcon={Copy}/></button>
                                                    </CopyToClipboard>
                                                </InputAdornment>
                                            }}
                                                className="textField"
                                            />
                                    </div>
                                </Dialog>
                            )}
                    </Paper>
                </Box>
            </div>
        </>
    )
}

export default Lesson