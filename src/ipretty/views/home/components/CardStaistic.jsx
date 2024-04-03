import React, { } from 'react';
import { Grid, makeStyles, Card } from '@material-ui/core';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import IconImage from "ipretty/components/IconImage"
import Up from '../../../../public/icon_svg/Arrow - Up.svg'
import GroupBlu from '../../../../public/icon_svg/GroupBlu.svg'
import Medal from '../../../../public/icon_svg/MedalBlu.svg'
import Cap from '../../../../public/icon_svg/graduationBlu.svg'
import Down from '../../../../public/icon_svg/Arrow - Down.svg'
import LinkImg from './LinkImg'
import { useAuth } from 'ipretty/context/AppProvider'

const useStyles = makeStyles(theme => ({
    mainCardCourse: {
        display: 'flex',
        padding: '0px 23px 30px 15px',
        [theme.breakpoints.down('md')]: {
            marginRight: '5px'
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '0'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px'
        },
        marginRight: '15px', 
        borderRadius: '8px'
    },
    mainCardSurvey :{
        display: 'flex',
        padding: '30px 23px 35px 15px',
        [theme.breakpoints.down('md')]: {
            marginRight: '5px'
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '0'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px'
        },
        marginRight: '15px', 
        borderRadius: '8px'
    },
    mainLayout: {
        [theme.breakpoints.between('md', 'lg')]: {
            maxWidth: '31%',
            minWidth: '49%',
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '50%',
            minWidth: '94%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            minWidth: '45%',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            minWidth: '100%',
        },
        flex: 1,
        borderRadius: '8px',
        marginRight: '12px', 
        maxWidth: '25%',
        minWidth: '23%',
        marginBottom: 32,
        '& .button__action' : {
            '& .button__action--link' : {
                display: 'flex',
                justifyContent: 'end',
                padding: '14px 14px 0'
            }
        }
    },

    flexContent: {
        display: 'flex',
        width: '22.222vw',
        // height: '13.194vw',
        [theme.breakpoints.down('md')]: {
            width: '30.222vw',
            height: '17.194vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '33.222vw',
            height: '19.194vw'
        },
        [theme.breakpoints.down('xs')]: {
            width: '77.222vw',
            height: '44.194vw'
        }
    },
    card: {
        flex: 1, 
        // padding: '28px',
        alignItems: 'center',
        display: 'flex',
        marginRight: 28,
        justifyContent : 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.down('xs')]: {
           
        },
        "& .chart-wrapper": {
            width: 120,
        },
        "& .makeStyles-icon-87" : {
            width: 38,
            marginBottom : 19
        }
    },
    textCard: {
        // width: '45%', 
        // padding: '28px 23px 28px 0',
        flex: 1
    },
    titleCard: {
        fontSize: '14px', 
        lineHeight: '17px',
        fontWeight: '600',
        color: theme.palette.primary.colorOvewViewTitle
    },
    fontSize14: {
        fontSize: '14px',
        lineHeight: '17px'
    },
    fontSize24: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: theme.palette.primary.colorOvewViewTitle,
        marginBottom: 17,
        lineHeight: '29px'
    },
    centerLayout: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        "&:last-child": {
            marginBottom: 0
        }
    },
    noLearnOrNotPass: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#EEEEEE', 
        marginRight: '5px'
    },
    passOrLearning: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#44AD92', 
        marginRight: '5px'
    },
    isCompleted: {
        borderRadius: '4px',
        height: '13px', 
        width: '13px', 
        backgroundColor: '#27384C', 
        marginRight: '5px'
    },
    contentBorder : {
        padding: '0 25px'
    },
    border : {
        borderTop : "1px solid #395B65"
    },
    mainCard : {
        display : "flex",
        padding: '30px 23px 30px 28px',
    },
    titleBorder : {
        display: "flex",
        padding : '12px 0',
        justifyContent : "center",
        fontFamily: 'San Francisco Text',
        '& img' : {
            width: 16,
            paddingTop: '1px',
            height: 16
        },
        '& .difference__up' : {
            fontSize : 14,
            color : '#147B65',
            fontWeight : 'bold',
        },
        '& .difference__down' : {
            fontSize : 14,
            color : '#DC4F68',
            fontWeight : 'bold',
        },
        '& .title' : {
            fontSize : 14,
            color : '#576F84',
            paddingLeft : 8
        }
    }
}));

function CardStatistic(props) {
    const { dataOverView } = props;
    const classes = useStyles();
    const { getTranslation } = useAuth()

    return(
        <> 
            {
               dataOverView &&  dataOverView.overview_course  && (
                    <Card className={classes.mainLayout}>
                        <div className="button__action">
                             <div className="button__action--link">
                                <LinkImg  link='/courses'/>
                             </div>
                        </div>
                        <div className={classes.mainCardCourse} >
                            <div className={classes.card}>
                                <CircularProgressbarWithChildren
                                    className="chart-wrapper"
                                    value={(((dataOverView.overview_course.group_courses) / ((dataOverView.overview_course.group_courses) + (dataOverView.overview_course.free_courses)))*100)}
                                    styles={buildStyles({
                                        pathColor: "#44AD92",
                                        trailColor: "#eee"
                                    })}
                                    strokeWidth={20}
                                >
                                    {/* <IconImage srcIcon={Cap} /> */}
                                    <CircularProgressbarWithChildren
                                    className="chart-wrapper"
                                    // value={(((dataOverView.overview_course.free_courses) / ((dataOverView.overview_course.group_courses) + (dataOverView.overview_course.free_courses)))*100)}
                                    value={(((dataOverView.overview_course.free_courses) / (dataOverView.overview_course.total_courses))*100)}
                                    styles={buildStyles({
                                        trailColor: "transparent",
                                        pathColor: "#27384C"
                                    })}
                                    strokeWidth={20}
                                    >
                                        <IconImage srcIcon={Cap} />
                                    </CircularProgressbarWithChildren>
                                    
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={classes.textCard}>
                                <div className={classes.titleCard}>{getTranslation('TotalCourses')}</div>
                                <div className={classes.fontSize24}>{dataOverView.overview_course.total_courses}</div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.passOrLearning}></div>
                                    <div className={classes.fontSize14}>{getTranslation('Group')} : {dataOverView.overview_course.group_courses}</div>
                                </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.isCompleted}></div>
                                    <div className={classes.fontSize14}>{getTranslation('Business')}: {dataOverView.overview_course.free_courses}</div>
                                </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.noLearnOrNotPass}></div>
                                    <div className={classes.fontSize14}>{getTranslation('Local')}: {dataOverView.overview_course.local_courses}</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.contentBorder}>
                            <div className={classes.border}></div>
                            <div className={classes.titleBorder}>
                                { 
                                    dataOverView.overview_course.fluctuating == '-1' ? 
                                        <IconImage srcIcon={Down} /> 
                                    : dataOverView.overview_course.fluctuating == '1' ?  
                                        <IconImage srcIcon={Up} /> 
                                    : ''
                                }
                                 { 
                                    dataOverView.overview_course.fluctuating == '-1' ? 
                                      <span className="difference__down">{dataOverView.overview_course.rate} %</span>
                                    : dataOverView.overview_course.fluctuating == '1' ?  
                                    <span className="difference__up">{dataOverView.overview_course.rate} %</span>
                                    : ' 0 %'
                                }
                                <span className='title'>{getTranslation('comparedwiththepreviousmonth')}</span>
                            </div>
                        </div>
                    </Card>
                )
            } 
            {
                 dataOverView &&  dataOverView.overview_member  && (
                        <Card className={classes.mainLayout}>
                            <div className="button__action">
                                <div className="button__action--link">
                                    <LinkImg  link='/users'/>
                                </div>
                            </div>
                            <div className={classes.mainCardCourse}>
                                <div className={classes.card}>
                                <CircularProgressbarWithChildren
                                    className="chart-wrapper"
                                    value={(((dataOverView.overview_member.members.employee) / (dataOverView.overview_member.total_members))*100)}
                                    styles={buildStyles({
                                        pathColor: "#44AD92",
                                    })}
                                    strokeWidth={20}
                                >
                                    <IconImage srcIcon={GroupBlu} />
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={classes.textCard}>
                                <div className={classes.titleCard}>{getTranslation('Member')}</div>
                                <div className={classes.fontSize24}>{dataOverView.overview_member.total_members}</div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.passOrLearning}></div>
                                    <div className={classes.fontSize14}>{getTranslation('internal')} : {dataOverView.overview_member.members.employee}</div>
                                </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.noLearnOrNotPass}></div>
                                    <div className={classes.fontSize14}>{getTranslation('Student')} : {dataOverView.overview_member.members.user}</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.contentBorder}>
                            <div className={classes.border}></div>
                            <div className={classes.titleBorder}>
                                { 
                                    dataOverView.overview_member.fluctuating == '-1' ? 
                                        <IconImage srcIcon={Down} /> 
                                    : dataOverView.overview_member.fluctuating == '1' ?  
                                        <IconImage srcIcon={Up} /> 
                                    : ''
                                }
                                 { 
                                    dataOverView.overview_member.fluctuating == '-1' ? 
                                      <span className="difference__down">{dataOverView.overview_member.rate} {getTranslation('member')}</span>
                                    : dataOverView.overview_member.fluctuating == '1' ?  
                                    <span className="difference__up">{dataOverView.overview_member.rate} {getTranslation('member')}</span>
                                    : ' 0 %'
                                }
                                <span className='title'>{getTranslation('comparedwiththepreviousmonth')}</span>
                            </div>
                        </div>
               </Card>
            )
        }
        {
                 dataOverView &&  dataOverView.overview_certificates  && (
                        <Card className={classes.mainLayout}>
                            <div className={classes.mainCardSurvey}>
                                <div className={classes.card}>
                                <CircularProgressbarWithChildren
                                    className="chart-wrapper"
                                    value={(((dataOverView.overview_certificates.members.employee) / (dataOverView.overview_certificates.total_certificates))*100)}
                                    styles={buildStyles({
                                        pathColor: "#44AD92",
                                    })}
                                    strokeWidth={20}
                                >
                                    <IconImage srcIcon={Medal} />
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={classes.textCard}>
                                <div className={classes.titleCard}>{getTranslation('Certificateissued')}</div>
                                <div className={classes.fontSize24}>{dataOverView.overview_certificates.total_certificates}</div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.passOrLearning}></div>
                                    <div className={classes.fontSize14}>{getTranslation('internal')} : {dataOverView.overview_certificates.members.employee}</div>
                                </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.noLearnOrNotPass}></div>
                                    <div className={classes.fontSize14}>{getTranslation('Student')} : {dataOverView.overview_certificates.members.user}</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.contentBorder}>
                            <div className={classes.border}></div>
                            <div className={classes.titleBorder}>
                                { 
                                    dataOverView.overview_certificates.fluctuating == '-1' ? 
                                        <IconImage srcIcon={Down} /> 
                                    : dataOverView.overview_certificates.fluctuating == '1' ?  
                                        <IconImage srcIcon={Up} /> 
                                    : ''
                                }
                                 { 
                                    dataOverView.overview_certificates.fluctuating == '-1' ? 
                                      <span className="difference__down">{dataOverView.overview_certificates.rate} {getTranslation('member')}</span>
                                    : dataOverView.overview_certificates.fluctuating == '1' ?  
                                    <span className="difference__up">{dataOverView.overview_certificates.rate} {getTranslation('member')}</span>
                                    : ' 0 %'
                                }
                                <span className='title'>{getTranslation('comparedwiththepreviousmonth')}</span>
                            </div>
                        </div>
               </Card>
            )
        }
        {
                 dataOverView &&  dataOverView.overviewTransactions  && (
                        <Card className={classes.mainLayout}>
                            <div className={classes.mainCardSurvey}>
                                <div className={classes.card}>
                                <CircularProgressbarWithChildren
                                    className="chart-wrapper"
                                    value={(((dataOverView.overviewTransactions.total_transaction_banking) / (dataOverView.overviewTransactions.total_transactions))*100)}
                                    styles={buildStyles({
                                        pathColor: "#44AD92",
                                    })}
                                    strokeWidth={20}
                                >
                                    <IconImage srcIcon={Medal} />
                                </CircularProgressbarWithChildren>
                            </div>
                            <div className={classes.textCard}>
                                <div className={classes.titleCard}>{getTranslation('payment')}</div>
                                <div className={classes.fontSize24}>
                                    { 
                                       Number((dataOverView.overviewTransactions.total_transactions)).toLocaleString('vi-VN', {currency : 'VND'})
                                    }
                                    </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.passOrLearning}></div>
                                    <div className={classes.fontSize14}>CK : 
                                        { Number((dataOverView.overviewTransactions.total_transaction_banking)).toLocaleString('vi-VN', {currency : 'VND'}) || 0}
                                    </div>
                                </div>
                                <div className={classes.centerLayout}>
                                    <div className={classes.noLearnOrNotPass}></div>
                                    <div className={classes.fontSize14}> {getTranslation('direct')} : 
                                        {Number((dataOverView.overviewTransactions.total_transaction_company)).toLocaleString('vi-VN', {currency : 'VND'}) || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.contentBorder}>
                            <div className={classes.border}></div>
                            <div className={classes.titleBorder}>
                                { 
                                    dataOverView.overviewTransactions.fluctuating == '-1' ? 
                                        <IconImage srcIcon={Down} /> 
                                    : dataOverView.overviewTransactions.fluctuating == '1' ?  
                                        <IconImage srcIcon={Up} /> 
                                    : ''
                                }
                                 { 
                                    dataOverView.overviewTransactions.fluctuating == '-1' ? 
                                      <span className="difference__down">{dataOverView.overviewTransactions.rate} %</span>
                                    : dataOverView.overviewTransactions.fluctuating == '1' ?  
                                    <span className="difference__up">{dataOverView.overviewTransactions.rate} %</span>
                                    : ' 0 %'
                                }
                                <span className='title'>{getTranslation('comparedwiththepreviousmonth')}</span>
                            </div>
                        </div>
               </Card>
            )
        }
        </>
    )
}
export default CardStatistic;