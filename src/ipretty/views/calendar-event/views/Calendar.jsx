
import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { useAuth } from 'ipretty/context/AppProvider'
import { Box, makeStyles } from '@material-ui/core'
import Sidebar from "../components/Sidebar"
import dayjs from "dayjs"
import { calendarProps } from '../components/constant'
import PopupEvent from '../components/PopupEvent'
import { getPosition, initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseService from 'ipretty/services/CourseService'
import CalendarEventService from 'ipretty/services/CalendarEventService'
import Skeleton from 'ipretty/components/Skeleton'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import contextHelper from 'ipretty/helpers/contextHelper';

const useStyles = makeStyles(theme => ({
    calendarAndEvent: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },//fix lịch   
        '& .calendar': {
            width: '100%',
            '& .fc' : {
                '& .fc-more-popover' : {
                    '& .fc-popover-body' : {
                        height: '250px',
                        overflow: 'auto',
                        '& .fc-daygrid-event-harness' : {
                            cursor: 'pointer'
                        }
                    }
                },
                '& .fc-view-harness'  :{
                    '& .fc-scrollgrid' : {
                        '& tbody' : {
                            '& tr' : {
                                '& .fc-daygrid-day-frame' : {
                                    // color : 'red',
                                    '& .fc-daygrid-day-events' : {
                                        '& a' : {
                                            '& .fc-event-title' : {
                                                whiteSpace: 'nowrap',
                                                width: '250px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '& .fc-scroller-harness': {
                '& .fc-col-header': {
                    width: '100%',
                },
            },
            '& .fc-license-message': {
                display: 'none'
            },
            '& .fc-toolbar-chunk' : {
                '& button' : {
                    backgroundColor: '#147B65',
                    border : '1px solid #147B65'
                },
                '& .fc-button:not(:last-child)' : {
                    marginRight : 12,
                    [theme.breakpoints.down('xs')]: {
                        marginRight : 0
                    },//fix bug 85 caleda 
                }
            },
            '& .fc-daygrid-day-events' : {
                cursor: 'pointer'
            },
            '& .fc-toolbar > * > :not(:first-child)': {
                [theme.breakpoints.down('xs')]: {
                    marginLeft: '0.75em',
                    fontSize: '11px',
                    marginTop: '2px'
                },//fix kích thuoc button caleda theo file excel                    
            },
            '& .fc .fc-toolbar-title': {
                [theme.breakpoints.down('xs')]: {
                    fontSize: '14px',
                    margin: '0',
                    marginRight: '3px',
                },//fix button caleda and size chữ theo file excel              
            },
            '& .fc .fc-col-header-cell-cushion ': {
                [theme.breakpoints.down('xs')]: {
                    padding: '2px 0px',
                    fontSize: '9px',
                },//fix size caleda and size chữ theo file excel              
            }
        },
        '& .popup-add-event': {
            position: 'absolute',
            background: 'white',
            // padding: 10,
            width: '600px !important',
            left: '600px !important',
            height: 'auto !important',
            "@media screen and (max-height: 1200px)": {
                    left: '350px !important',
                    width: '355px !important',
                    },
            [theme.breakpoints.down("xs")]: {
                left: '2px !important',
                width: '355px !important',
            },
            // [theme.breakpoints.down("lg")]: {
            //     "@media screen and (max-height: 1200px)": {
            //     left: '350px !important',
            //     }
            // },
            [theme.breakpoints.down("xs")]: {
                "@media screen and (max-height: 1000px)": {
                    left: '18px !important',//fix caleda
                    width: '355px !important',
                },
                "@media screen and (max-height: 750px)": {
                    left: '3px !important',//fix caleda
                    width: '355px !important',
                },
              },
            // borderRadius: 10,
            zIndex: '100',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            transform: 'translate(-50%, -50%)',
            '& .detail-event': {
                margin: '12px 30px',
                '& .detail-event__title': {
                    fontWeight: 700,
                    lineHeight: '28px',
                    fontSize: '20px',
                },
                '& .detail-event__item': {
                    marginTop: '19px',
                    display: 'flex',
                    '& .detail-event__title--icon': {
                        margin: '0 10px 0 0'
                    }, 
                    "& .detail-event__edit--icon" : {
                        '& img' : {
                            width: '19px',
                            height: '20px',
                            marginLeft : 3
                        }
                    },
                    "& .detail-event__title--value" : {
                        '& .item-value--description' : {
                            paddingLeft : '10px'
                        }
                    }
                }
            },
            '& .popup-add-event__button-add' : {
                display: 'flex',
                justifyContent: 'end',
            },
            '& .popup-add-event__button-detail': {
                display: 'flex',
                justifyContent: 'end',
                '& div': {
                    marginLeft: 10
                }
            },
            '& .popup-icon-close': {
                padding: 0
            },
            '& .popup-list-input': {
                margin: 8,
                display: 'flex',
                flexDirection: 'column',
                '& .infomation': {
                    display: 'flex',
                    marginTop: 18,
                    alignItems: 'center',
                    '& .infomation-item__title': {
                        flex: 1
                    },
                    '& .infomation-item__edit' :{
                        flex: 1,
                        '& img' : {
                            width: 19,
                            height: 20,
                            marginLeft : '4px',
                        }
                    },
                    '& .infomation-item__input': {
                        flex: 6
                    },
                    '& .infomation-item__datetime': {
                        display: 'flex',
                        flex: 6,
                        '& .infomation-item__datetime--start': {
                            marginRight: 10
                        }
                    },
                    '& .infomation-item__notification': {
                        display: 'flex',
                        flex: 6,
                        '& .infomation-item__notification--before': {
                            marginRight: 10
                        }
                    },
                    '& .MuiFormHelperText-root' : {
                        color: 'red'
                    },
                    "& .infomation-item__input--select" :{

                    }
                },
                '& .button__save-event': {
                    display: 'flex',
                    justifyContent: 'end',
                    margin: '18px 0',
                    "& .button" : {
                        border: 'none',
                        outline: 'none',
                        backgroundColor: '#fff',
                    }
                },
            }
        },
    }
}))

const Calendar = (props) => {
    const classes = useStyles()
    const { compactText } = contextHelper;
    // const { match: { params } } = props
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const { getTranslation, user } = useAuth()
    const [loadingDataEvent, setLoadingDataEvent] = useState(false)
    const [loading, setLoading] = useState(false)
    const elCalendar = useRef(null)
    const [initialEvents, setInitialEvents] = useState([])
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [courses, setCourses] = useState([])
    const [dataApproved, setDataApproved] = useState([])
    const [dataEventById, setDataEventById] = useState()
    const [daySelected, setDaySelected] = useState(dayjs())
    const [isOpenPopup, setIsOpenPopup] = useState({ isOpen: false, isDetail: false })
    const [positionCalendar, setPositionCalendar] = useState({})
    const [dataSelect, setDataSelect] = useState({})
    const [errors, setErrors] = useState({})
    const { makeShortMessage } = useNotiStackContext();
    const [ createdBy , setCreatedBy] = useState('')
    const eventId = props.match.params.eid;
    const [loadingSave, setLoadingSave] = useState(false)
    useEffect(() => {
        handleSetPositionCalendar()
    }, [])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getAllCourse();
                    getListEventInvited()
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

    useEffect(() => {
        getListEvent()
    }, [])

    useEffect(() => {
        if (eventId) {
            getDataEventById(eventId)
        }
    }, [eventId])

    useEffect(() => {
        if (dataEventById && Object.keys(dataEventById).length > 0 && loadingDataEvent ) {
          setIsOpenPopup({ isOpen: true, isDetail: true })
        }
      }, [dataEventById, loadingDataEvent])

      const getDataEventById = (eid) => {
        CalendarEventService.eventById(eid)
          .then(res => {
            const event = res.data.data
            // console.log(event, '----------')
            const _data = {
                id : event.id,
                // course : {
                //     course_id : event.course_id.course_id,
                //     course_name : event.course_id.course_name
                // },
                created_at : event.created_at,
                description : event.description, 
                title : event.title,
                time_end : event.time_end,
                time_start : event.time_start,
            }
            setDataEventById(_data)
          })
          .catch(err => console.log(err))
      }
    function getListEvent() {
        setLoading(true)
        CalendarEventService.list()
            .then(res => handleDataInit(res.data.data))
            .then(events => setInitialEvents(
                events
                ))
            .catch(err => console.log(err))
            .finally(() => {
                setLoadingDataEvent(true)
                setLoading(false)
            })
    }

    function getListEventInvited () {
        CalendarEventService.getListEventInvited(
          res => {
              setDataApproved(res.data.data)
          },
          err => {
    
          }
        )
     }
    //  console.log(dataApproved,'------A')
    const handleDataInit = (data = []) => {
        data.forEach((item, i) => {
            const start = new Date(item.time_start)
            const end = new Date(item.time_end)
            const isPersonal = item.created_by ? item.created_by.id === context.info.id : ''
            item.isPersonal = isPersonal
            item.allDay = checkIsAllDay(start, end)
            item.start = start
            item.end = checkIsAllDay(start, end) ? new Date(end.getTime() + 1000) : end
            item.editable = isPersonal
        })
        return data
    }

    const checkIsAllDay = (startDate, endDate) => {
        if (startDate.getHours() === 0 && ((endDate.getHours() === 23 && endDate.getMinutes() === 59) || endDate.getHours() === 0)) return true
        return false
    }


    function getAllCourse() {
        CourseService.list({'status': 1},
            res => {
                const courses = res.data.data
                const coursePublished = []
                // console.log(courses)
                courses.forEach(item => {
                    if(item.is_published == 1 && item.isDraft == 0){
                        const course ={
                            name : item.course_name ? item.course_name : '',
                            id : item.course_id ? item.course_id : ''
                        }
                        coursePublished.push(course)
                    }
                })
                setCourses(coursePublished)
            err => {
                console.log(err)
            }
        }
        )
    }
    const handleSetPositionCalendar = () => {
        const elCalendar = document.querySelector('.calendar')
        const position = getPosition(elCalendar)
        setPositionCalendar(position)
    }

    const handleDateSelect = (selectInfo) => {
        setErrors({})
        const check = selectInfo.endStr === dataSelect.endStr && selectInfo.startStr === dataSelect.startStr
        const checkMultiple = selectInfo.end.getDate() - selectInfo.start.getDate() === 1
        if (isOpenPopup.isOpen && !check) {
            setIsOpenPopup({ isOpen: false, isDetail: false })
            if (checkMultiple) return
        }
        if (selectInfo.view.type !== 'year') {
            if (Object.keys(dataSelect).length === 0 || !check || !isOpenPopup.isOpen) {
                setDataSelect(selectInfo)
                setIsOpenPopup({ isOpen: true, isDetail: false })
            }
        }
    }

    const handleEventClick = (clickInfo) => {
        // console.log(clickInfo, 'clickInfo ------------')
        setErrors({})
        setCreatedBy(clickInfo.event._def.extendedProps.create_by)
        setDataSelect(clickInfo)
        setIsOpenPopup({ isOpen: true, isDetail: true })
    }

    const handleEventChange = ({ event }) => {

    }

    const handleDeleteEvent = (dataSelect) => {
        const id = dataSelect.id
        const data = new FormData()
        data.append('event_id' , id)
        CalendarEventService.deleteEvent(
            data,
            res => {
              makeShortMessage(getTranslation('DeleteEventsuccessfully') ,"success")
              setIsOpenPopup({ isOpen: false, isDetail: false })
              getListEvent()
              getListEventInvited()
            },
            err => {
      
            }
          )

    }

    const handleUpdateEvent = (dataReq) => {
       
        let calendarApi = dataSelect.view.calendar
        let formData = new FormData()
        for (let key in dataReq) {
            formData.append(key, dataReq[key] || dataReq[key] == 0 ? dataReq[key] : '')
        }
        setLoadingSave(true)
        CalendarEventService.updateEvent(
            dataReq.id,
            formData,
            res => {  
                setTimeout(() => {
                    setLoadingSave(false)
                    let response = res.data.data
                    const start = new Date(response.time_start)
                    const end = new Date(response.time_end)
                    const dataEvent = {
                        ...response,
                        isPersonal: true,
                        start: response.time_start,
                        end: checkIsAllDay(start, end) ? new Date(end.getTime() + 1000) : end,
                        allDay: checkIsAllDay(start, end),
                        editable: true
                    }  
                    calendarApi.addEvent(dataEvent, true)
                    makeShortMessage(getTranslation('Updateeventsuccessfully'), "success")
                    getListEvent()
                    getListEventInvited()
                    setIsOpenPopup({ isOpen: false, isDetail: false })
                    
                }, 1000);  
            },
            err => {
                setTimeout(() => {
                    setLoadingSave(false)
                    _handleError(err)
                    console.log(err)
                }, 1000);
               
            }
        )
    }

    const handleSaveEvent = (dataReq) => {
        let calendarApi = dataSelect.view.calendar
        let formData = new FormData()
        for (let key in dataReq) {
            formData.append(key, dataReq[key] || dataReq[key] == 0 ? dataReq[key] : '')
        }
        setLoadingSave(true)
        CalendarEventService.createEvent(
            formData,
            res => {
                setTimeout(() => {
                    setLoadingSave(false)
                    let response = res.data.data
                    const start = new Date(response.time_start)
                    const end = new Date(response.time_end)
                    const dataEvent = {
                        ...response,
                        isPersonal: true,
                        start: response.time_start,
                        end: checkIsAllDay(start, end) ? new Date(end.getTime() + 1000) : end,
                        allDay: checkIsAllDay(start, end),
                        editable: true
                    }
                    calendarApi.addEvent(dataEvent, true)
                    makeShortMessage(getTranslation('CreateeventSuccessfully'), "success")
                    getListEvent()
                    getListEventInvited()
                    setIsOpenPopup({ isOpen: false, isDetail: false })
                }, 1000); 
            },
            err => {
                setTimeout(() => {
                    setLoadingSave(false)
                    _handleError(err)
                    console.log(err)
                }, 1000);
            }
        )
    }

    function _handleError(err) {
        if (err.response) {
            setErrors(err.response.data.errors)
        }
    }

    const onViewChangeCallBack = (value) => {
        // setIsShowStatisticBtn(value)
    }

    const handleViewChange = (type, cb) => {
        // elCalendar.current.getApi().changeView(type)
        // return cb
    }
    const getListEventAction = () => {
        getListEventInvited()
        getListEvent()
    }
    return (
        <div className={classes.calendarAndEvent}>
            <Sidebar
                setDaySelected={setDaySelected}
                setSmallCalendarMonth={setSmallCalendarMonth}
                monthIndex={monthIndex}
                setMonthIndex={setMonthIndex}
                daySelected={daySelected}
                courses={courses}
                dataApproved={dataApproved}
                setIsOpenPopup={setIsOpenPopup}
                isOpenPopup={isOpenPopup}
                eventId={eventId}
                getListEventAction={getListEventAction}
                getTranslation={getTranslation}
                setDataSelect={setDataSelect}
                handleDateSelect={handleDateSelect}
            />
            <div className="calendar">
                <Box style={{ backgroundColor: '#fff', borderRadius: 8 }} elevation={5} width={1} my={2} px={3} py={2} >
                    {!loading ?
                        <>
                            <FullCalendar
                                {...calendarProps}
                                ref={elCalendar}
                                events={initialEvents}
                                select={handleDateSelect}
                                eventClick={handleEventClick}
                                eventChange={handleEventChange}
                                locale={user.lang}

                                eventClassNames={(arg) => {
                                    const classNames = ['event']
                                    if (arg.event.extendedProps.isPersonal) {
                                        classNames.push('personal')
                                    }
                                    return classNames
                                }}
                            />
                        </>
                        : <Skeleton type='table' />
                    }
                </Box>
            </div>
            {isOpenPopup.isOpen &&
                <PopupEvent
                    loading={loadingSave}
                    dataSelect={dataSelect}
                    isDetail={isOpenPopup.isDetail}
                    setIsOpenPopup={setIsOpenPopup}
                    handleSaveEvent={handleSaveEvent}
                    positionCalendar={positionCalendar}
                    handleDeleteEvent={handleDeleteEvent}
                    handleUpdateEvent={handleUpdateEvent}
                    dataEventById={dataEventById}
                    courses={courses}
                    errors={errors}
                    createdBy={createdBy}
                />}
        </div>
    )
}

export default Calendar