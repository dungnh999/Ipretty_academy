import React, { useEffect, useState } from 'react';
import { makeStyles, List, Collapse, Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ImageBanner from 'public/icon_svg/BG.svg';
import LikeIcon from 'public/icon_svg/Like.svg';
import FooterStudent from 'ipretty/components/Footer-student/FooterStudent'
import { useFaq } from "ipretty/context/faq/FaqContext"
import useNavigator from 'ipretty/hook/useNavigator';
import Skeleton from 'ipretty/components/Skeleton';
import Search from 'ipretty/components/Search';
import { useAuth } from 'ipretty/context/AppProvider';
import { initialPrams } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import File from 'public/icon_svg/File-blue.svg'
import IconImage from 'ipretty/components/IconImage'
import PaginationBar from 'ipretty/components/PaginationBar';
import Goback from 'ipretty/components/Goback';
import FaqService from 'ipretty/services/FaqService';
const useStyles = makeStyles(theme => ({
    root: {
        '& .root__background': {
            backgroundImage: `url(${ImageBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            // width: '100%',
            // height: '253px',
            padding: '3rem 208px 5.813rem 208px',
            [theme.breakpoints.down('lg')]: {
                padding: '3rem 100px 5.813rem 100px',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '3rem 15px 5.813rem 15px',
            },
            '& .root__background__banner__text': {
                display: 'flex',
                paddingLeft: '128px',
                [theme.breakpoints.down('lg')]: {
                    paddingLeft: '60px',
                },
                [theme.breakpoints.down('md')]: {
                    paddingLeft: '143px',
                },
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '90px',
                },
                [theme.breakpoints.down('xs')]: {
                    paddingLeft: '35px',
                },
                paddingBottom: '3rem',
                "& .MuiTypography-root": {
                    fontFamily: 'Montserrat',
                    fontSize: '2.25rem',
                    fontWeight: '700',
                    color: theme.palette.primary.colorText,
                }
            },
            "& .root__goBack": {
                display: 'flex',
                justifyContent: 'flex-start',
                color: '#FFF',
                marginBottom: 10
            },
            '& .root__background__banner__search': {
                display: 'flex',
                justifyContent: 'center',
                padding: '0 256px',
                [theme.breakpoints.down('lg')]: {
                    padding: '0 100px',
                },
                [theme.breakpoints.down('sm')]: {
                    padding: '0 70px',
                },
                [theme.breakpoints.down('xs')]: {
                    padding: '0 20px',
                },
                '& .MuiInputBase-fullWidth': {
                    padding: '10px 42px',
                    width: '100%',
                    maxWidth: 'none',
                    borderRadius: '25px',
                    backgroundColor: '#6F9396',
                    color: theme.palette.primary.colorText,
                    fontSize: '1.125rem'
                },
                "& .MuiInputAdornment-root": {
                    marginRight: 0
                },
                "& .MuiSvgIcon-root": {
                    color: theme.palette.primary.colorText
                }
            }
        },
        '& .root__mainLayout': {
            padding: '0px 208px 0px 208px',
            [theme.breakpoints.down('lg')]: {
                padding: '0px 100px 0px 100px',
            },
            [theme.breakpoints.down('xs')]: {
                padding: '0px 15px 0px 15px',
            },
            position: 'relative',
            top: '-30px',
            // '& nav.MuiList-root.MuiList-padding': {
            //     padding: 0,
            //     marginBottom: 17
            // },
            '& .root__mainLayout__list': {
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                padding: 0,
                marginBottom: 17,
                boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)',
                '& .root__mainLayout__list__title': {
                    padding: '24px 48px',
                    cursor: 'pointer',
                    // borderBottom: '1px solid #E5E5E5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)',
                    borderRadius: 8,
                    '& .MuiTypography-root': {
                        fontSize: '20px',
                        lineHeight: '28px',
                        fontFamily: 'San Francisco Text',
                        fontWeight: '700',
                        color: theme.palette.primary.colorOvewViewTitle,
                        wordBreak: 'break-word '
                    },
                    "&:hover": {
                        opacity: '0.8'
                    },
                },
                '& .root__mainLayout__list__items': {
                    padding: '32px 48px 0 48px',
                    cursor: 'pointer',
                    "&:hover": {
                        opacity: '0.8'
                    },
                    '& .root__mainLayout__list__items__layout': {
                        // paddingBottom: '20px',
                        '& .root__mainLayout__list__items__layout__content': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '32px',
                            borderBottom: '1px solid #DADFD9',
                            '& .root__mainLayout__list__items__layout__content__flex': {
                                display: 'flex',
                                alignItems: 'flex-start',
                                '& > div': {
                                    marginRight: 8,
                                    minWidth: 24
                                },
                                '& .MuiTypography-root': {
                                    fontSize: '16px',
                                    fontFamily: 'San Francisco Text',
                                    color: theme.palette.primary.colorTextHeader,
                                    wordBreak: 'break-word'
                                },
                                '& .root__mainLayout__list__items__layout__content__flex__count': {
                                    fontSize: '14px',
                                    fontFamily: 'San Francisco Text',
                                    color: theme.palette.primary.backgroundTableHead,
                                },
                                "&.count-like > div": {
                                    marginRight: 2
                                }
                            }
                        },
                    },
                    '&:last-child .root__mainLayout__list__items__layout .root__mainLayout__list__items__layout__content': {
                        borderBottom: 'none'
                    },
                },
                "& .list_item--icon": {
                    cursor: 'pointer'
                }
            },
            "& .skeleton_wrapper": {
                display: 'flex',
                justifyContent: 'center'
            },
            "& .no_data_section": {
                padding: '100px 0',
                textAlign: 'center',
                background: theme.palette.background.paper,
                boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)',
                borderRadius: 8,
                '& .MuiTypography-root': {
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'San Francisco Text',
                    fontWeight: '700',
                    color: theme.palette.primary.colorOvewViewTitle,
                    wordBreak: 'break-word '
                },
            }
        }
    },
    styleBackground: {
        backgroundImage: `url(${ImageBanner})`,
        width: '100%',
        height: '253px'
    },
    mainLayout: {

    },
    textField: {

    }
}));

function OverviewFaq(props) {
    const { dataFaqs, showHideFaq, changePageFaq, searchFaq } = useFaq();
    const { listFaqs, pagination, loadingFaq } = dataFaqs;
    const faqId = props.match.params.faq_id
    const navigate = useNavigator();
    const [faqs, setFaqs] = useState([])
    const classes = useStyles();
    const { getTranslation } = useAuth()
    const [params, setParams] = useState(initialPrams(queryString.parse(props.location.search, { arrayFormat: 'comma' })));

    useEffect(() => {
        if (faqId) {
            getListFaq(faqId)
        } else {
            
            setFaqs(listFaqs)
        }
    }, [listFaqs, faqId]);

    function getListFaq(faqId) {
        FaqService.detail(
            faqId,
            res => {
                const response = res.data.data
                response.faq_questions = response.questions.questions
                response.isCollapse = false
                let _faqs = []
                _faqs.push(response)
                setFaqs(_faqs)
            },
            err => {}
        )
    }

    const redirectDetail = (faq, question) => {
        if (faqId) {
            navigate(`/published-faqs/${faq.id}/faq_question/${question.question_id}/true`)
        } else {
            navigate(`/published-faqs/${faq.id}/faq_question/${question.question_id}/false`)
        }

    };

    const onSearch = (keyword) => {
        searchFaq({ keyword })
    };

    const handlePageChange = (pageNumber) => {
        changePageFaq({ pageNumber })
    };

    const handleshowHideFaq = (indexFaq) => {
        let _faqs = faqs[indexFaq]
        let newFaqs = [];
        _faqs.isCollapse = !_faqs.isCollapse
        newFaqs.push(_faqs)
        setFaqs(newFaqs)
    }

    return (
        <div className={classes.root}>
            <div className="root__background">
                {faqId ? (
                    <div className="root__goBack">
                        <Goback
                            path={"/faqs"}
                        />
                    </div>
                ) : ''}
                <div className="root__background__banner__text">
                    <Typography>
                        {getTranslation('Answerstofrequentlyaskedquestions')}
                    </Typography>
                </div>
                {!faqId ? (
                    <div className="root__background__banner__search">
                        <Search fullWidth onSearch={onSearch} placeholder={getTranslation('SearchForUnit')} />
                    </div>
                ) : ''}
            </div>
            <div className="root__mainLayout">
                {
                    !loadingFaq ? (
                        faqs && faqs.length ?
                            faqs.map((faq, indexFaq) => {
                                return (
                                    <List
                                        className="root__mainLayout__list"
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        key={indexFaq}
                                    >
                                        <div className="root__mainLayout__list__title" onClick={() => faqId ?handleshowHideFaq(indexFaq) : showHideFaq(indexFaq)}>
                                            <Typography>
                                                {faq.title}
                                            </Typography>
                                            {
                                                faq.faq_questions && faq.faq_questions.length ?
                                                    (
                                                        <div className="list_item--icon">
                                                            {faq.isCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </div>
                                                    ) : ''
                                            }
                                        </div>
                                        <Collapse in={faq.isCollapse} timeout="auto" unmountOnExit>
                                            {
                                                faq.faq_questions && faq.faq_questions.length ?
                                                    faq.faq_questions.map((question, indexQuestion) => {
                                                        return (
                                                            <div key={indexQuestion} className="root__mainLayout__list__items" onClick={() => redirectDetail(faq, question)}>
                                                                <List component="div" disablePadding className="root__mainLayout__list__items__layout">
                                                                    <div className="root__mainLayout__list__items__layout__content">
                                                                        <div className="root__mainLayout__list__items__layout__content__flex">
                                                                            <IconImage srcIcon={File} />
                                                                            <Typography>
                                                                                {question.question_name}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className="root__mainLayout__list__items__layout__content__flex count-like">
                                                                            <IconImage srcIcon={LikeIcon} />
                                                                            <span className="root__mainLayout__list__items__layout__content__flex__count">
                                                                                {`${question.likes_count}+`}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </List>
                                                            </div>
                                                        )
                                                    }) : ''
                                            }
                                        </Collapse>
                                    </List>
                                )
                            }) :
                            <div className="no_data_section">
                                <Typography>
                                    {getTranslation('Hiện tại không có dữ liệu về giải đáp các câu hỏi thường gặp')}!
                                </Typography>
                            </div>
                    ) : (
                        <>
                            <Skeleton type="text" height={78} />
                            <Skeleton type="text" height={78} />
                            <Skeleton type="text" height={78} />
                            <Skeleton type="text" height={78} />
                            <Skeleton type="text" height={78} />
                        </>
                    )
                }
                {
                    !loadingFaq ? (
                        !faqId && pagination.total > 10 && (
                            <PaginationBar
                                currentPage={pagination && pagination.current_page ? pagination.current_page : 0}
                                totalItemsCount={pagination && pagination.total ? pagination.total : 0}
                                handlePageChange={handlePageChange}
                            />
                        )
                    ) : (
                        <div className="skeleton_wrapper">
                            <Skeleton type="text" width={200} />
                        </div>
                    )
                }
            </div>
            <FooterStudent />
        </div>
    )
}

export default OverviewFaq;