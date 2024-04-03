import React, { useState, useRef ,useContext, useEffect } from "react";
import { getMonth } from "ipretty/helpers/utils";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import GlobalContext from "ipretty/context/calendar-event/GlobalContext";
import EventModal from "../components/EventModal";
import { makeStyles } from '@material-ui/core'
import CourseService from "ipretty/services/CourseService";
import { initialPramsCourse , sortFieldName} from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import dayjs from "dayjs";
import CalendarEventService from "ipretty/services/CalendarEventService"

const useStyles = makeStyles(theme => ({
    root : {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        '& .calendarContent' : {
          display: 'flex',
          flex : '1 1 0%;'
        }
    }
}))
function CalendarEventView() {
  const classes = useStyles()
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const {  } = useContext(GlobalContext);
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState({ isOpen: false})
  const [isShowStatisticBtn, setIsShowStatisticBtn] = useState(false)
  const [ dataCourse , setDataCourse] = useState([])
  const [dataEvent, setDataEvent] = useState({
    title: '',
    time_start : '',
    time_end : '',
    color : 'Green',
    status_reminder : 'option',
    distance_time_reminder : '',
    distance_time_reminder_2 : '',
    course_id : ''
  })
  const [dataApproved , setDataApproved] = useState([])


  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
        try {
            if (mounted) {
              getAllCourse(params);
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


  function getAllCourse (params) {
    CourseService.list({ ...params},
       res => {
            const courses= res.data.data.data
            courses && courses.map((item) => {
                item.name = item.course_name ? item.course_name : ""
                item.id = item.course_id ? item.course_id : ""
                return item
            })
            setDataCourse(courses)
       },
       err => {
            console.log(err)
       } 
    )
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
  return (
    <React.Fragment>
      { isOpenPopup.isOpen == true && 
        <EventModal 
          setIsOpenPopup={setIsOpenPopup}
          dataCourse={dataCourse}
          isOpenPopup={isOpenPopup}
          dataEvent={dataEvent}
          setDataEvent={setDataEvent}
          setDaySelected={setDaySelected} 
          daySelected={daySelected} 
        />
      }
      <div className={classes.root}>
        <CalendarHeader />
        <div className="calendarContent">
          <Sidebar 
            setDaySelected={setDaySelected}
            setSmallCalendarMonth={setSmallCalendarMonth}
            monthIndex={monthIndex}
            setMonthIndex={setMonthIndex}
            daySelected={daySelected} 
            dataCourse={dataCourse}
            dataApproved={dataApproved}
          />
          <Month
            setDaySelected={setDaySelected} 
            daySelected={daySelected} 
            month={currenMonth}
            setIsOpenPopup={setIsOpenPopup}

          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CalendarEventView;