
import React, { useMemo, useState, useEffect} from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import AntTabs from 'ipretty/components/Tabs/AntTabs'
import AntTab from 'ipretty/components/Tabs/AntTab'
import DetailPage from 'ipretty/components/DetailPage/DetailPage';
import ReportCourse from './components/ReportCourse';
import ReportBusiness from './components/ReportBusiness'; 
import IconImage from "ipretty/components/IconImage";
import Down from '../../../public/icons_ipretty/download.png'
import CourseService from 'ipretty/services/CourseService'
import { initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"

const useStyles = makeStyles(theme => ({
    managementView: { 
        [theme.breakpoints.up("md")]: {
            padding: 32,
        },
        [theme.breakpoints.down("sx")]: {
            padding: 10,
        },
        [theme.breakpoints.up('sm')]: {
            padding: 20,
         },
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: 32,
            marginTop: 28,
            "& .tabs": {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                "& .tabs__ant-tabs": {
                    "& .MuiButtonBase-root": {
                       
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                    "& .MuiButtonBase-root:nth-child(1)": {
                        padding: 0
                    },
                    "& .MuiButtonBase-root:nth-child(2)": {
                        padding: '0 20px'
                    },
                    "& .text_color_normal": {
                        color: '#395B65',
                    },
                    "& .text_color_hightlight": {
                        color: '#44AD92'
                     },
                },
            },
            "& .view__header": {
                display: 'flex',
                margin: '20px 0 15px 0',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                '& .header__search': {
                    marginBottom: '15px',
                    '& svg': {
                        height: 24,
                        width: 24,
                    },
                    '& .MuiInput-root': {
                        [theme.breakpoints.up("sm")]: {
                            minWidth: '340px',
                        },
                        [theme.breakpoints.down("xs")]: {
                            minWidth: '240px',
                        },
                        height: '36px'
                    }
                },
                "& .view-action__filter": {
                    display: 'flex',
                    flexWrap: 'wrap',
                    "& .view-action__filter--item": {
                        width: 190,
                        marginRight: 10,
                        [theme.breakpoints.down("md")]: {
                            marginBottom: '10px',
                        },
                        "& .MuiFormControl-root": {
                            width: '100%',
                            "& .MuiSelect-root": {
                                padding: 10
                            },
                            "& .MuiInputBase-root": {
                                background: "#FFFFFF"
                            }
                        },
                        "& .MuiInput-underline": {
                            padding: '4px',
                            border: '1px solid #C4C4C4'
                        }
                    },
                    "& .view-action__filter--button":{
                        "& .button": {
                            justifyContent: "center !important",
                            minWidth: 78,
                            height: 39,
                            fontSize: '16px'
                        },
                        '& img': {
                            width: '12px',
                            height: '12px',
                            marginTop: '7px',
                        }
                    }
                }
            }
        },
        '& .button-management': {
            display: 'flex',
            justifyContent: 'space-between',
            "& .button": {
                border: '1px solid #147B65',
                marginRight: 10,
                fontSize : 16,
                borderRadius: '4px',
                width: '151px',
                height: '40px'
            }
        }
    },
}))

function ReportCourseAndSale(props) {
    const { location: {} } = props;
    const link_report_course_and_sale = location.hash.substring(26, location.hash.length);
    const classes = useStyles()
    let history = useHistory()
    const { getTranslation } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' }
    ], [])
    const [value, setValue] = useState('course');
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))

    useEffect(() => {
        if (link_report_course_and_sale == 'business=false') {
            setValue('course')
        } else
            setValue('business')
    }, []);

    function handleChange(e, newValue) {
        setValue(newValue)
    }

    const actions = [
        { id: 1, action: redirectDownload, icon: <IconImage srcIcon={Down} />, noIcon: false, label: getTranslation('Download'), buttonClass: 'button button__mangage-student button--green' }
    ]

    function redirectBack() {
        history.goBack()
    }

    function redirectDownload() {
        if (value == 'course') {
            CourseService.getFileCourse( { ...params, paging : 0 , export: 1 },
                res => {
                    handleAfterExport(res.data, 'Báo cáo khóa học')
                },
                err => {
                    console.log(err)
                }
            )
        } else {
            CourseService.getFileBusinessCourse( { ...params, paging: 0 , export: 1 },
                res => {
                    handleAfterExport(res.data, 'Báo cáo doanh thu')
                },
                err => {
                     console.log(err)
                }
            )
        }
    }

    const handleAfterExport = (data, nameFile) => {
        var blob = new Blob([data]);
        var downloadUrl = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.setAttribute('download', nameFile + '.xlsx');
        document.body.appendChild(a);
        a.click();
        makeShortMessage(getTranslation('Fileexportsuccessful'), "success")
    }
    return (
        <div className={classes.managementView}>
            <DetailPage
                links={links}
                actions={actions}
                titleCurrent={getTranslation('courseReport')}
                redirectBack={redirectBack}
            >
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className="view">
                        <div className="tabs">
                            <div  className="tabs__ant-tabs">
                                    <AntTabs  value={value} onChange={handleChange}>
                                        <AntTab className={value === 'course' ? "text_color_hightlight" : "text_color_normal"} value={'course'} label={getTranslation('detailedCourseReport')} />
                                        <AntTab className={value === 'business' ? "text_color_hightlight" : "text_color_normal"} value={'business'} label={getTranslation('salesReport')} />
                                    </AntTabs>
                            </div>
                        </div>
                        {value === 'course' && (
                            <ReportCourse type='course' classes={classes} setParams={setParams} params={params} />
                        )}
                        {value === 'business' && (
                            <ReportBusiness type='business' classes={classes} setParams={setParams} params={params} />
                        )}
                    </div>
                )}
            </DetailPage>
        </div>
    )
}

export default ReportCourseAndSale