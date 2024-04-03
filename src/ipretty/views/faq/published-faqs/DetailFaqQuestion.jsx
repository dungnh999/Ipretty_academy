import React, { useEffect, useRef, useState } from 'react';
import { Typography, makeStyles, Box, Paper, Divider, FormControl, InputLabel, FilledInput, IconButton, InputAdornment, Avatar, TextField, FormHelperText } from '@material-ui/core';
import Goback from 'ipretty/components/Goback';
import FooterStudent from 'ipretty/components/Footer-student/FooterStudent'
import { useFaq } from "ipretty/context/faq/FaqContext"
import FaqService from 'ipretty/services/FaqService';
import LikeIcon from 'public/icon_svg/Like.svg';
import DisLikeIcon from 'public/icon_svg/DisLike.svg';
import SmileyIcon from 'public/icon_svg/Smiley.svg';
import SendIcon from 'public/icon_svg/SendBlue.svg';
import ReplyIcon from 'public/icon_svg/Reply.svg';
import queryString from "query-string"
import useRouter from "use-react-router";
import Skeleton from 'ipretty/components/Skeleton'
import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';
import IconImage from 'ipretty/components/IconImage'
import AddButton from 'ipretty/components/AddButton'
import TextInput from 'ipretty/components/TextInput';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import classNames from "classnames"
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import BreadCrumbs from 'ipretty/components/BreadCrumbs'

const useStyles = makeStyles(theme => ({
    root: {
        '& .root__redirect': {
            [theme.breakpoints.up('md')]: {
                padding: '15px 0px 0px 93px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '15px 0px 0px 25px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '15px 0px 0px 15px',
            },
            "& .MuiBreadcrumbs-ol": {
                "& .MuiTypography-root": {
                    color: '#6F9396',
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily : 'San Francisco Text',
                }
            },
        },
        '& .root__goBack': {
            display: 'flex', 
            [theme.breakpoints.up('md')]: {
                padding: '3px 22px 2px 20px',
                display:'flex',//bug 57 loi pading button
            },
            [theme.breakpoints.down('sm')]: {
                padding: '3px 22px 2px 20px',
                display:'flex',//bug 57 loi pading button
            },
            [theme.breakpoints.down('xs')]: {
                padding: '3px 22px 2px 20px',//bug 57 loi pading button
                display:'flex',
            },
            justifyContent: 'space-between',
        },
        '& .root__main': {
            padding: '1.563rem 208px 3.75rem 208px',
            [theme.breakpoints.up('md')]: {
                padding: '1.563rem 100px 3.75rem 100px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '1.563rem 20px 3.75rem 20px',
            },
            '& .root__main__no__data': {
                fontWeight: 600,
                textAlign: 'center',
                padding: '50px 0'
            },
            '& .question_section': {
                [theme.breakpoints.up('md')]: {
                    padding: '3rem 72px 3.5rem 72px',
                },
                [theme.breakpoints.down('sm')]: {
                    padding: '3rem 40px 3.5rem 40px',
                },
                [theme.breakpoints.down('xs')]: {
                    padding: '3rem 20px 3.5rem 20px',
                },
                borderBottom: '1px solid #DADFD9'
            },
            '& .root__main__title': {
                marginBottom: '2rem',
                '& .MuiTypography-root': {
                    fontFamily: 'San Francisco Display',
                    fontSize: '32px',
                    color: theme.palette.primary.colorOvewViewTitle,
                    fontWeight: '700',
                    lineHeight: '38px',
                    wordBreak: 'break-work'
                }
            },
            '& .root__main__body': {
                '& .MuiTypography-root': {
                    fontFamily: 'San Francisco Display',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: theme.palette.primary.colorTextHeader,
                    wordBreak: 'break-work'
                }
            },
            '& .like_and_share': {
                [theme.breakpoints.up('md')]: {
                    padding: '1.375rem 72px 1.375rem 72px',
                    display: 'flex',
                },
                [theme.breakpoints.down('sm')]: {
                    padding: '1.375rem 15px 1.375rem 15px',
                },
                [theme.breakpoints.down('xs')]: {
                    padding: '1.375rem 15px 1.375rem 15px',
                },
                borderBottom: '1px solid #DADFD9',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiTypography-root': {
                    fontSize: 18,
                    lineHeight: '24px',
                    fontWeight: 600,
                    color: theme.palette.primary.colorTextHeader,
                    marginRight: 20
                },
                '& .root__main__action__like': {
                    height: '44px',
                    borderRadius: '892px',
                    backgroundColor: '#F3F3F3',
                    width: '190px',
                    justifyContent: 'center',
                    marginLeft: '15px'
                },
                '& .root__main__action__disLike': {
                    height: '44px',
                    borderRadius: '892px',
                    backgroundColor: '#F3F3F3',
                    width: '127px',
                    justifyContent: 'center',
                    marginLeft: '15px'
                },
                '& .MuiButton-contained': {
                    background: theme.palette.primary.backgroundBtnLike,
                    color: theme.palette.primary.colorTextHeader,
                    fontSize: 18,
                    borderRadius: '892px',
                    padding: '10px 20px',
                    marginRight: 8,
                    [theme.breakpoints.down('xs')]: {
                        marginTop: '10px'//fix bug 67 tăng margin
                    },
                }
            },
            '& .root__main__line': {
                padding: '22px 0px 0px 0px'
            },
            '& .comment_section': {
                [theme.breakpoints.up('md')]: {
                    padding: '2rem 72px 3.313rem 72px',
                },
                [theme.breakpoints.down('sm')]: {
                    padding: '2rem 40px 3.313rem 40px',
                },
                [theme.breakpoints.down('xs')]: {
                    padding: '2rem 15px 3.313rem 15px',
                },
            },
            '& .root__main_txtComment': {
                marginBottom: '2rem',
                '& .MuiTypography-root': {
                    fontFamily: 'San Francisco Text',
                    fontWeight: '700',
                    color: theme.palette.primary.colorOvewViewTitle,
                    fontSize: '20px',
                    'line-height': '28px'
                }
            },
            '& .root__main__comment': {
                // paddingBottom: '40px',
                '& .root__main__comment__layout': {
                    padding: '1.5rem 32px 1.5rem 32px',
                    background: theme.palette.primary.backgroundBtnLike,
                    borderRadius: '8px',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& .MuiTypography-root': {
                        fontFamily: 'San Francisco Text',
                        color: theme.palette.primary.colorOvewViewTitle,
                        fontSize: '14px',
                        lineHeight: '16px',
                        marginLeft: 9,
                        workBreak: 'break-work',                     
                        [theme.breakpoints.down("xs")]: {
                            marginTop: '13px',      //fix bug 65   
                            overflow: 'hidden',
                            wordBreak: 'break-all',
                            webkitLineClamp: '3',    
                            width: '220px',               
                        },
                    },
                    '& .root__main__comment__layout__reply': {
                        display: 'flex',
                        "& > div": {
                            width: 16,
                            height: 16,
                            [theme.breakpoints.down("xs")]: {
                                marginTop: '12px', //fix bug 65              
                            },
                        },
                        "& .MuiTypography-root": {
                            color: theme.palette.primary.colorReply,
                            fontSize: '14px',
                            lineHeight: '16px',
                            fontWeight: 600,
                            [theme.breakpoints.down("md")]: {
                                width: '40px',               
                            },//fix bug 66 Link text Trả lời nên trên 1 hàng 
                        }
                    }
                },
                '& .root__main__comment__children': {
                    [theme.breakpoints.up('md')]: {
                        marginLeft: '86px',
                    },
                    justifyContent: 'flex-start',
                    '& .MuiTypography-root': {
                        // paddingRight: '10px', 
                        // fontFamily: 'San Francisco Text', 
                        // color: theme.palette.primary.colorOvewViewTitle, 
                        // fontSize: '14px'
                    }
                }
            }
        },
        '& .root__centerItem': {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                // width: '89%'
            },
            [theme.breakpoints.down('xs')]: {
                alignItems: 'normal',//fix responsive bug 83
            },
            alignItems: 'center'
        },
        '& .root__sizeIcon': {
            width: '18px',
            height: '18px'
        },
        '& .root__pd7': {
            paddingLeft: '7px'
        },
        '& .root__center': {
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end'
        },
        '& .root__pd25': {
            paddingRight: '25px'
        },
        '& .root__main__input': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '2rem',
            "& .comment_input--imoji": {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%'
            },
            "&.comment-reply": {
                marginBottom: 8,
                marginTop: 8,
            },
            '& .comment_comment--input': {
                width: '100%',
                "& .MuiTextField-root": {
                    border: '1px solid #A1AFAF',
                    background: theme.palette.primary.backgroundBtnLike,
                    margin: 0,
                    borderRadius: '8px',
                    "& .MuiInput-root": {
                        background: theme.palette.primary.backgroundBtnLike,
                        padding: '0 34px 0 0',
                        borderRadius: '8px',
                    },
                    "& .MuiInputBase-input": {
                        padding: '20px 28px',
                        fontSize: '1.25rem',
                        'line-height': '28px'
                    }
                }
            },
            '& .root__main__input__emoji': {
                paddingLeft: '28px',
                position: 'relative',
                "& .emoji-mart": {
                    position: 'absolute',
                    top: -446,              
                    [theme.breakpoints.up('md')]: {
                        right: -71,
                    },
                    [theme.breakpoints.down('sm')]: {
                        right: -25,
                    },
                },
                "& > div": {
                    width: 32,
                    height: 32,
                },
                "&:hover": {
                    cursor: 'pointer'
                }
            }
        },
        '& .root_color': {
            color: theme.palette.primary.colorReply
        },
        '& .root__justyCenter': {
            // justifyContent: 'space-between',
            width: '76%'//fix bug 66 Link text Trả lời nên trên 1 hàng 
        }
    },
    fieldComment: {
        '& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiFilledInput-adornedEnd': {
            fontSize: '15px',
            borderRadius: '10px'
        }
    },
}));

function DetailFaqQuestion(props) {
    const { match: { params } } = props;
    const classes = useStyles();
    const { location: { search } } = useRouter();
    const { faq_id, question_id, isRedirect } = params;
    const { dataFaqs, updateLikeOrDislike, updateComment } = useFaq();
    const { getTranslation, user } = useAuth();
    const navigate = useNavigator();
    const { listFaqs } = dataFaqs;
    const [faqQuestion, setFaqQuestion] = useState('');
    const [loadingData, setLoadingData] = useState(false)
    const [comment, setComment] = useState({
        comment: '',
        subComment: '',
    });
    // const [subComment, setSubComment] = useState('');
    const [error, setError] = useState({
        comment: '',
        subComment: ''
    });
    const [commentId, setCommentId] = useState('');
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingDislike, setLoadingDislike] = useState(false);
    const { makeShortMessage } = useNotiStackContext();
    const [showEmoji, setShowEmoji] = useState(false)
    const wrapperRef = useRef(null);
    const urlRedirectAdmin = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('ManageFAQ'), path: '/faqs' },
        { title: getTranslation('Answerstofrequentlyaskedquestions'), path: isRedirect == 'true' ? `/published-faqs/${faq_id}` : '/published-faqs' }
    ]
    const urlRedirectEmployee = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Answerstofrequentlyaskedquestions'), path: isRedirect == 'true' ? `/published-faqs/${faq_id}` : '/published-faqs' }
    ]

    useEffect(() => {
        if (isRedirect == 'true') {
            getDetailFaq(faq_id, question_id)
        } else {
            if (listFaqs && listFaqs.length) {
                const currentFaq = listFaqs.find(faq => faq.id == faq_id)
                if (currentFaq && currentFaq.faq_questions && currentFaq.faq_questions.length) {
                    const _faqQuestion = currentFaq.faq_questions.find(question => question.question_id == question_id)
                    setFaqQuestion(_faqQuestion)
                }
            }
        } 

    }, [listFaqs]); 

    function getDetailFaq(faqId, questionId) {
        FaqService.getDetailQuestionById(
            faqId, 
            questionId,
            res => {
                let response = res.data.data[0]
                setFaqQuestion(response)
            },
            err => {
                console.log(err)
            }
        )
    }

    // const urlRedirect = [
    //     {
    //         name: getTranslation('Giải đáp các câu hỏi thường gặp'),
    //         path: isRedirect == 'true' ? `/published-faqs/${faq_id}` : '/published-faqs'
    //     }
    // ];

    function handleOnLikeOrDislike(e, status) {
        e.preventDefault()
        const data = new FormData()
        data.append('question_id', question_id)
        data.append('status', status)

        if (status === 'Like') {
            setLoadingLike(true)
        } else {
            setLoadingDislike(true)
        }
        FaqService.likeOrDislikeFaqQuestion(data,
            (response) => {
                const newQuestion = response.data.data
                if (status === 'Like') {
                    setLoadingLike(false)
                } else {
                    setLoadingDislike(false)
                }
                const likeOrDislike = {
                    question_id: question_id,
                    like: newQuestion.likes_count,
                    dislike: newQuestion.dislikes_count,
                }
                if (status === 'Like') {
                    makeShortMessage(getTranslation('like'), "success");
                } else {
                    makeShortMessage(getTranslation('dislike'), "success");
                }
                updateLikeOrDislike({ likeOrDislike })
            },
            (errors) => {
                if (status === 'Like') {
                    setLoadingLike(false);
                } else {
                    setLoadingDislike(false)
                }
                if (status === 'Like') {
                    makeShortMessage(getTranslation('unlike'), "error");
                } else {
                    makeShortMessage(getTranslation('undislike'), "error");
                }
            })
    }

    function handleSendComment(e, parent_id = "") {
        e.preventDefault();
        if (parent_id) {
            setError({
                ...error,
                subComment: ""
            })
        } else {
            setError({
                ...error,
                comment: ""
            })
        }
        const data = new FormData();
        data.append('comment', parent_id ? comment.subComment : comment.comment)
        data.append('question_id', question_id)
        if (parent_id) {
            data.append('parent_id', parent_id)
        }
        FaqService.commentFaqQuestion(data,
            (response) => {
                const comment_data = {
                    question_id: question_id,
                    comments: response.data.data.comments
                }
                updateComment({ comment_data })
                if (parent_id) {
                    setComment({
                        ...comment,
                        subComment: ''
                    })
                    setCommentId("")
                } else {
                    setComment({
                        ...comment,
                        comment: ''
                    })
                }

                makeShortMessage(response.data.message, "success");
            },
            (errors) => {
                if (parent_id) {
                    setError({
                        ...error,
                        subComment: errors.response.data.errors.comment ? errors.response.data.errors.comment : ""
                    })
                } else {
                    setError({
                        ...error,
                        comment: errors.response.data.errors.comment ? errors.response.data.errors.comment : ""
                    })
                }
            })

    }

    function showReplyInput(e, parent_id) {
        setCommentId(parent_id)
        setComment({
            ...comment,
            subComment: ''
        })
    }

    function closeReplyInput(e, parent_id) {
        setCommentId("")
        setComment({
            ...comment,
            subComment: ''
        })
    }

    function onChangeComment(e, parent_id) {
        setCommentId(parent_id)
        if (parent_id) {
            setComment({
                ...comment,
                subComment: e.target.value
            })
        } else {
            setComment({
                ...comment,
                comment: e.target.value
            })
        }
    }

    function validateKeyPress(event, parent_id) {
        if (event.key === 'Enter') {
            handleSendComment(event, parent_id)
        }
    };

    function sendEmoji(e) {
        e.preventDefault();
        setShowEmoji(!showEmoji)
    }

    function addEmoji(emoji, parent_id) {
        if (parent_id) {
            setComment({
                ...comment,
                subComment: comment.subComment.concat(emoji.native)
            })
        } else {
            setComment({
                ...comment,
                comment: comment.comment.concat(emoji.native)
            })
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowEmoji(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const renderCommentInput = (parent_id = null) => {
        if (commentId == parent_id || !parent_id) {
            return (
                <div
                    className={classNames("root__centerItem root__main__input", {
                        ["comment-reply"]: parent_id,
                    })}>
                    <div className="comment_input--imoji">
                        <div className="comment_comment--input">
                            <TextInput
                                placeholder={getTranslation('Enteryourcomment')}
                                fullWidth
                                autoFocus
                                value={parent_id ? comment.subComment : comment.comment}
                                name={!parent_id ? 'comment' : 'subComment'}
                                onChange={(e) => onChangeComment(e, parent_id)}
                                onKeyPress={(e) => validateKeyPress(e, parent_id)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end" onClick={(e) => handleSendComment(e, parent_id)} style={{ cursor: 'pointer' }}>
                                        <IconImage srcIcon={SendIcon} />
                                    </InputAdornment>
                                }}
                                className={'comment_input-comment'}
                            />
                        </div>
                        <div className="root__main__input__emoji" onClick={(e) => sendEmoji(e)} ref={wrapperRef}>
                            {showEmoji && (
                                <Picker
                                    set='apple'
                                    showPreview={false}
                                    onSelect={(emoji) => addEmoji(emoji, parent_id)}
                                />
                            )}
                            <IconImage srcIcon={SmileyIcon} />
                        </div>

                    </div>
                    {
                        parent_id ? (
                            <FormHelperText error={error.subComment && error.subComment.length ? true : false}>{error.subComment}</FormHelperText>
                        ) : (
                            <FormHelperText error={error.comment && error.comment.length ? true : false}>{error.comment}</FormHelperText>
                        )
                    }
                </div>
            )
        }
    }

    function redirectEdit() {
        navigate(`/faqs/${faq_id}/edit`)
    }

    function redirectBack() {
        // let path = isRedirect == 'true' ? `/published-faqs/${faq_id}` : '/published-faqs'
        // navigate(path)
    }

    return (
        <>
            <div className={classes.root}>
                <div className="root__redirect">
                    {/* {
                        urlRedirect.map((item, index) => {
                            return (
                                <span key={index} onClick={() => navigate(item.path)}>{item.name}</span>
                            )
                        })
                    } */}
                    <BreadCrumbs classes={classes} links={user.role == 'admin' ? urlRedirectAdmin : urlRedirectEmployee} titleCurrent={getTranslation('QuestionDetails')} handleClose={redirectBack} />
                </div>
                <div className="root__goBack">
                    <Goback
                        path={isRedirect == 'true' ? `/published-faqs/${faq_id}` : "/published-faqs"} title={getTranslation('QuestionDetails')}
                    />
                    {isRedirect == 'true' ? (
                        <AddButton
                            label={getTranslation('EditQuestion')}
                            id="update-button"
                            buttonClass={"root__goBack--edit"}
                            onClick={redirectEdit}
                            noIcon={true}
                            variant='contained'
                            disabled={false}
                        />
                    ) : ''}
                </div>
                <div className="root__main">
                    <Box
                        style={{
                            width: '100%'
                        }}
                    >
                        <Paper elevation={1} >
                            {
                                !faqQuestion ?
                                    <Skeleton type="contactCard" height={500} /> :
                                    // <div className="root__main__no__data">{getTranslation('Không có dữ liệu')}</div> :
                                    <>
                                        <div className="question_section">
                                            <div className="root__main__title">
                                                <Typography>
                                                    {faqQuestion.question_name}
                                                </Typography>
                                            </div>
                                            <div className="root__main__body">
                                                <Typography>
                                                    {faqQuestion.answer_name}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="like_and_share">
                                            <div className="root__centerItem">
                                                <Typography>
                                                    {getTranslation('Didtheanswerhelpyou')} ?
                                                </Typography>
                                                <AddButton
                                                    label={getTranslation('Yes')}
                                                    onClick={(e) => handleOnLikeOrDislike(e, 'Like')}
                                                    variant='contained'
                                                    iconButton={<IconImage srcIcon={LikeIcon} />}
                                                    loading={loadingLike}
                                                />
                                                <AddButton
                                                    label={getTranslation('No')}
                                                    onClick={(e) => handleOnLikeOrDislike(e, 'Dislike')}
                                                    variant='contained'
                                                    iconButton={<IconImage srcIcon={DisLikeIcon} />}
                                                    loading={loadingDislike}
                                                />
                                                {/* <div className="root__centerItem root__main__action__like">
                                                <IconImage srcIcon={LikeIcon} className="root__sizeIcon" />
                                                <span className="root__pd7">
                                                    {getTranslation('Có, rất hữu ích')}
                                                </span>
                                            </div>
                                            <div className="root__centerItem root__main__action__disLike">
                                                <IconImage srcIcon={LikeIcon} className="root__sizeIcon" />
                                                <span className="root__pd7">
                                                    {getTranslation('Không')}
                                                </span>
                                            </div> */}
                                            </div>
                                            <div className="root__center">
                                                <div className="root__center root__pd25">
                                                    <IconImage srcIcon={LikeIcon} className="root__sizeIcon" />
                                                    <span className="root__pd7">
                                                        {faqQuestion.likes_count}
                                                    </span>
                                                </div>
                                                <div className="root__center">
                                                    <IconImage srcIcon={DisLikeIcon} className="root__sizeIcon" />
                                                    <span className="root__pd7">
                                                        {faqQuestion.dislikes_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment_section">
                                            <div className="root__main_txtComment">
                                                <Typography>
                                                    {getTranslation('Memberscomments')}
                                                </Typography>
                                            </div>
                                            {/* <div className="root__centerItem root__main__input">
                                            <div className="comment_comment--input">
                                                <TextInput
                                                    placeholder={getTranslation('Nhập bình luận của bạn')}
                                                    fullWidth
                                                    autoFocus
                                                    fullWidth
                                                    value={comment}
                                                    name='comment'
                                                    onChange={(e) => setComment(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        endAdornment: <InputAdornment position="end" onClick={handleSendComment} style={{cursor: 'pointer'}}>
                                                            <IconImage srcIcon={SendIcon}/>
                                                        </InputAdornment>
                                                    }}
                                                    className={'comment_input-comment'}
                                                />
                                                    <FormHelperText id="my-helper-text" error={errorComment && errorComment.length ? true : false}>{errorComment}</FormHelperText>
                                            </div>
                                            <div className="root__main__input__emoji">
                                                <IconImage srcIcon={SmileyIcon} />
                                            </div>
                                        </div> */}
                                            {renderCommentInput()}
                                            <div className="root__main__comment">
                                                {
                                                    faqQuestion.comments && faqQuestion.comments.length ?
                                                        faqQuestion.comments.map((parentComment, indexParent) => {
                                                            return (
                                                                <div key={indexParent}>
                                                                    <div className="root__centerItem root__main__comment__layout">
                                                                        <div className="root__centerItem root__justyCenter">
                                                                            <Avatar alt="Remy Sharp" src={parentComment.comment_by.avatar} />
                                                                            <Typography>
                                                                                {parentComment.comment}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className="root__main__comment__layout__reply">
                                                                            <IconImage srcIcon={ReplyIcon} />
                                                                            {
                                                                                commentId != parentComment.id ?
                                                                                    <Typography onClick={(e) => showReplyInput(e, parentComment.id)} style={{ cursor: 'pointer' }}>
                                                                                        {getTranslation('answer')}
                                                                                    </Typography>
                                                                                    :
                                                                                    <Typography onClick={(e) => closeReplyInput(e, parentComment.id)} style={{ cursor: 'pointer' }}>
                                                                                        {getTranslation('Cancel')}
                                                                                    </Typography>
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    {renderCommentInput(parentComment.id)}

                                                                    {
                                                                        parentComment.child_comments && parentComment.child_comments.length ?
                                                                            parentComment.child_comments.map((child_comment, indexChildren) => {
                                                                                return (
                                                                                    <div key={indexChildren} className="root__centerItem root__main__comment__children root__main__comment__layout">
                                                                                        <div className="root__centerItem">
                                                                                            <Avatar alt="Remy Sharp" src={child_comment.comment_by.avatar} />
                                                                                        </div>
                                                                                        <Typography>
                                                                                            {child_comment.comment}
                                                                                        </Typography>
                                                                                    </div>
                                                                                )
                                                                            }) : ''
                                                                    }
                                                                </div>
                                                            )
                                                        }) : ''
                                                }
                                            </div>
                                        </div>
                                    </>
                            }
                        </Paper>
                    </Box>
                </div>
            </div>
            <FooterStudent />
        </>
    )
}

export default DetailFaqQuestion