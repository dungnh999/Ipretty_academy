import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core'
import CalendarEventService from "ipretty/services/CalendarEventService"
import moment from 'moment';

const useStyles = makeStyles(theme => ({
   day : {
      borderWidth : '1px',
      display : 'flex',
      flexDirection : 'column',
      border : '1px solid #DADFD9',
      '& .day__header' :{
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        '& .day__content' : {
          fontSize : '14px',
          padding : '8px',
          textAlign : 'center',
        },
        '& .day__today' : {
          backgroundColor : '#A1AFAF',
          color : '#fff',
          borderRadius : '999px',
          paddingLeft : '10px',
          paddingRight : '10px'
        }
      },
      '& .day__showEvent' : {
        flex : 1,
        cursor : 'pointer',
        '& .day__showEvent--event' : {
          height : '24px',
          color : '#fff',
          marginBottom : '3px',
          padding : '3px 15px 3px',
          borderRadius : '8px',
          alignItems : 'center',
          fontSize : '14px',
        }
      }
    },
    day__first : {
      fontSize : '16px',
      color : '#395B65',
      borderRadius: '50px'
    }
}))

export default function Day({ day, rowIdx , setIsOpenPopup , daySelected , setDaySelected  }) {
  const classes = useStyles() 
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
     getListAllEvent()
  }, []);
 

  function getListAllEvent () {
    CalendarEventService.getListAllEvents(
      res => {
        // console.log(res)
        setDayEvents(res.data.data)
      } 
     , err=>{

     }
    )
  }
  function handleDetailCalendar() {
    setIsOpenPopup({ isOpen: true})
  }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "day__today"
      : "";
  }
  console.log(daySelected, '-----a')
  return (
    <div className={classes.day}>
      <header className="day__header">
        {rowIdx === 0 && (
          <p className={classes.day__first}>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`day__content ${getCurrentDayClass()}`}
          onClick={handleDetailCalendar}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="day__showEvent"
        onClick={() => {
          setDaySelected(day);
          setIsOpenPopup({ isOpen: true});
        }}
      >
          {
              dayEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedEvent(evt)}
                    className='day__showEvent--event'
                    style={{backgroundColor: evt.color}}
                  >
                    {moment(evt.time_start).format('h:mm')}
                      {' '}
                    {evt.title}
                  </div>
                )
              )
          }
      </div>
    </div>
  );
}