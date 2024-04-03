
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from "ipretty/context/AppProvider";
import { Avatar, Button, makeStyles, Typography , Menu, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { useHistory } from "react-router-dom"
import ViewPage from 'ipretty/components/ViewPage/ViewPage'
import BANNER_DEFAULT from '../../../../public/icons_ipretty/Icon_Default_User.svg'
import contextHelper from 'ipretty/helpers/contextHelper'
import CourseService from 'ipretty/services/CourseService';
import UserService from 'ipretty/services/UserService';
import IconImage from "ipretty/components/IconImage"
import More from '../../../../public/icon_svg/More.svg'
import Skeleton from 'ipretty/components/Skeleton';
import Detail_Exam from '../../../../public/icons_ipretty/Detail_Course.png';
import Danger_Circle_Exam from '../../../../public/icons_ipretty/Danger_Circle_Course.png';
import AddButton from 'ipretty/components/AddButton';
import ExamDetail from './ExamDetail';



const useStyles = makeStyles(
    theme => ({
        resultView: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E5E5E5',
            padding: '16px 32px 36px 32px',
            [theme.breakpoints.down("lg")]: {
                padding: "16px 20px 36px 20px",
            },
            [theme.breakpoints.up("xl")]: {
                padding: "16px 20px 36px 20px",
            },
            [theme.breakpoints.up("sm")]: {
                padding: "20px",
            },
            [theme.breakpoints.down("xs")]: {
                padding: "10px",
            },
            "& .view": {
                backgroundColor: '#E5E5E5',
                padding: 0
            },
            "& .result-page": {
                [theme.breakpoints.up("md")]: {
                    display: 'flex',
                },
                "& .title": {
                    fontSize: 24,
                    lineHeight: '32px',
                    color: '#395B65',
                    fontWeight: 'bold'
                },
                "& .box": {
                    backgroundColor: '#FFFFFF',
                    flex: 1,
                    padding: 32,
                },
                "& .result-page__infomation": {
                    [theme.breakpoints.up("md")]: {
                        marginRight: '16px',
                    },
                    "& .result-page__infomation--header": {
                        display: 'flex',
                        marginTop: 30,
                        "& .name": {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 32,
                            color: '#44AD92',
                            "& .name__student": {
                                "& .name__student--title": {
                                    fontSize: 32,
                                    lineHeight: '32px',
                                    color: '#395B65',
                                    fontWeight: '700'
                                }
                            },
                            "& .button": {
                                marginTop: 17,
                                "& button": {
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #147B65',
                                    boxSizing: 'border-box',
                                    borderRadius: 4,
                                    color: '#44AD92',
                                    "&:hover": {
                                        backgroundColor: '#FFFFFF',
                                    },
                                    "&:active": {
                                        backgroundColor: '#FFFFFF',
                                    },
                                    "&:focus": {
                                        backgroundColor: '#FFFFFF',
                                    }
                                }
                            }
                        }
                    },
                    "& .result-page__infomation--content": {
                        marginTop: 40,
                        "& .content__title": {
                            fontSize: 20,
                            lineHeight: '28px',
                            color: '#395B65',
                            fontWeight: 'bold',
                            marginBottom: 22,
                        },
                        "& .content__student": {
                            marginTop: 15,
                            display: 'flex',
                            "& .content__student--title": {
                                flex: 1
                            },
                            "& .content__student--value": {
                                flex: 3
                            }
                        }
                    }
                },
                "& .result-page__result": {
                    [theme.breakpoints.up("md")]: {
                        marginLeft: 16,
                    },
                    "& .chapter": {
                        marginTop: 22,
                        "& .chapter__title": {
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#27384C',
                            "& .MuiTypography-root": {
                                wordBreak: 'break-word'
                            }
                        },
                        "& .chapter__lesson": {
                            marginTop: 14,
                            backgroundColor: '#F3F3F3',
                            display: 'flex',
                            padding: 9,
                            borderRadius: '4px',
                            "& .chapter__lesson--title": {
                                flex: 4
                            },
                            "& .chapter__lesson--process": {
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'end'
                            },
                            "& .chapter__lesson--icon": {
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'end',
                                '& img': {
                                    opacity: 0.5
                                }
                            }
                        },
                        "& .chapter__survey": {
                            marginTop: 14,
                            backgroundColor: '#F3F3F3',
                            display: 'flex',
                            padding: 9,
                            borderRadius: '4px',
                            "& .chapter__survey--title": {
                                flex: 4
                            },
                            "& .chapter__survey--process": {
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'end'
                            },
                            "& .chapter__survey--icon": {
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'end',
                                '& .MuiButton-outlined': {
                                    color: 'none',
                                    border: 'none',
                                    padding: '0px',
                                    "& .MuiButton-label": {
                                        justifyContent: 'end',
                                        "& span": {
                                            marginLeft: '0px !important'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        backGround: {
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            "& .MuiAvatar-img": {
                width: '100%',
                maxWidth: '100%'
            }
        },
    })
)

function ResultView(props) {
    const classes = useStyles()
    const { getTranslation , user} = useAuth()
    const courseId = props.match.params.courseId
    const userId = props.match.params.userId
    const { renderAvatar } = contextHelper;
    let history = useHistory()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` },
        { title: getTranslation('ManageParticipants'), path: `/courses/${courseId}/students?course_type=Group` }
    ], [])
    const linkFlowTeacher = useMemo(() => [
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` },
        { title: getTranslation('ManageParticipants'), path: `/courses/${courseId}/students?course_type=Group` }
    ], [])
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(false)
    const [student, setStudent] = useState({})
    const [learningProcesses, setLearningProcesses] = useState([])
    const [loading, setLoading] = useState(false);
    const [isShowPopupDetail, setIsShowPopupDetail] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [survey_id, setSurvey_id] = useState(null);

    const open = Boolean(anchorEl);
    function handleClick(event, item) {
        setAnchorEl(event.currentTarget);
        setSurvey_id(item);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getLearingProcess(courseId, userId)
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    function getLearingProcess(courseId, userId) {
        CourseService.getLearingProcess(
            courseId,
            userId,
            res => {
                const response = res.data.data
                let student = res.data.data.student
                student.company = student.company ? student.company == 'N/A' ? '' : student.company : ''
                student.position = student.position ? student.position == 'N/A' ? '' : student.position : ''
                student.gender = student.gender ? getTranslation(student.gender) : ''
                student.company = student.company ? student.company : ''
                student.company = student.company ? student.company : ''
                student.status = student.isLocked ? 'Đã khoá' : student.isActive ? 'Đang hoạt động' : 'Không hoạt động'
                setStudent(student)
                setLearningProcesses(response.learningProcesses)
                setLoading(false)
            },
            err => {
                setLoading(false)
                console.log(err)
            }
        )
    }

    function redirectBack() {
        history.push(`/courses/${courseId}/students?course_type=Group`)
    }

    function useDefault() {
        setUseDefaultAvatar(true);
    }

    function redirectProfile() {
        history.push(`/users/${userId}/detail?type=Studentinformation`)
    }
    function seeDetail(){
        setIsShowPopupDetail(true);
        setAnchorEl(null);
    }
    function errorReport(){
        history.push('/report-errors')
    }
    
    return (
        <div className={classes.resultView}>
            <ViewPage
                titlePage={getTranslation('ViewResults')}
                links={user.role === 'admin' ? links : linkFlowTeacher}
                noAction
                redirectBack={redirectBack}
            >
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className="result-page">
                        <div className="box result-page__infomation">
                            <div className="title">{getTranslation('StudentInformation')}</div>
                            <div className="result-page__infomation--header">
                                <div className="avatar">
                                    {student && student.avatar ? (
                                        <Avatar
                                            variant="square"
                                            className={classes.backGround}
                                            src={renderAvatar(student.avatar)}
                                        />
                                    ) : (
                                        <Avatar
                                            variant="square"
                                            className={classes.backGround}
                                            src={BANNER_DEFAULT}
                                        />
                                    )}
                                </div>
                                <div className="name">
                                    <div className="name__student">
                                        <div className="name__student--title">{student.name}</div>
                                    </div>
                                    <div className="button">
                                        <Button onClick={redirectProfile}>{getTranslation('ViewProfile')}</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="result-page__infomation--content">
                                <div className="content__title">{getTranslation('StudentInformation')}</div>
                                <div className="content__student">
                                    <div className="content__student--title">Công ty:</div>
                                    <div className="content__student--value">{student.company || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Chức danh:</div>
                                    <div className="content__student--value">{student.position || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Bộ phận:</div>
                                    <div className="content__student--value">{student.department_name || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Giới tính:</div>
                                    <div className="content__student--value">{student.gender || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Ngày sinh:</div>
                                    <div className="content__student--value">{student.birthday || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Mã thành viên:</div>
                                    <div className="content__student--value">{student.code || ''}</div>
                                </div>
                                <div className="content__student">
                                    <div className="content__student--title">Tình trạng:</div>
                                    <div className="content__student--value">{student.status || ''}</div>
                                </div>
                            </div>
                        </div>
                        <div className="box result-page__result">
                            <div className="title">{getTranslation('Result')}</div>
                            {learningProcesses && Object.keys(learningProcesses).length > 0 && learningProcesses.chapters_for_exam_view && learningProcesses.chapters_for_exam_view.length > 0 && learningProcesses.chapters_for_exam_view.map((item, index) => (
                                <div className="chapter" key={index}>
                                    <div className="chapter__title">{`${getTranslation('Chapter')} ${index + 1}: `}<span>{item.chapter_name}</span></div>
                                    {item.lessons_exam_view && item.lessons_exam_view.length > 0 && item.lessons_exam_view.map((lesson, indexLesson) => (
                                        <div className="chapter__lesson" key={indexLesson}>
                                            <div className="chapter__lesson--title">
                                                <Typography>{lesson.lesson_name}</Typography>
                                            </div>
                                            {lesson.learning_process_for_course && Object.keys(lesson.learning_process_for_course).length > 0 && (
                                                <div className="chapter__lesson--process">
                                                    <Typography>{lesson.learning_process_for_course.process || 0} %</Typography>
                                                </div>
                                            )}
                                            <div className="chapter__lesson--icon">
                                                <IconImage srcIcon={More} />
                                            </div>
                                        </div>
                                    ))}
                                    {item.survey_exam_view && Object.keys(item.survey_exam_view).length > 0 && (
                                        <div className="chapter__survey">
                                            <div className="chapter__survey--title">
                                                <Typography>{item.survey_exam_view.survey_title}</Typography>
                                            </div>
                                            {item.survey_exam_view.learning_process_for_course && Object.keys(item.survey_exam_view.learning_process_for_course).length > 0 && (
                                                <div className="chapter__survey--process">
                                                    <Typography>{item.survey_exam_view.learning_process_for_course.process || 0} %</Typography>
                                                </div>
                                            )}
                                            <div className="chapter__survey--icon">
                                                <AddButton
                                                    onClick={(e) => handleClick(e, item.survey_exam_view.survey_id)}
                                                    iconButton={<IconImage srcIcon={More} />}
                                                />
                                            </div>
                                            <div>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    getContentAnchorEl={null}
                                                    keepMounted
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <List disablePadding>
                                                        <ListItem button onClick={() => seeDetail()}>
                                                            <ListItemIcon>
                                                                <img src={Detail_Exam} width={32} height={32} />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={getTranslation("examDetails")}
                                                            />
                                                        </ListItem>
                                                        <ListItem button onClick={() => errorReport()}>
                                                            <ListItemIcon>
                                                                <img src={Danger_Circle_Exam} width={32} height={32} />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={getTranslation("ReportError")}
                                                            />
                                                        </ListItem>
                                                    </List>
                                                </Menu>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))} 
                        </div>
                    </div>
                )}
                {isShowPopupDetail && <ExamDetail
                    open={isShowPopupDetail}
                    setOpen={setIsShowPopupDetail}
                    surveyId={survey_id}
                    userId={userId}
                    getTranslation={getTranslation}
                />}
            </ViewPage>
        </div>
    )
}

export default ResultView