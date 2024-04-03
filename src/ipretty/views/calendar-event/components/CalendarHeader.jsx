import dayjs from "dayjs";
import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    calendarHeader : {
        padding: '0.5 rem 1 rem',
        alignItems: 'center',
        '& .title' :  {
            margin : '2.5rem',
            fontSize : '20px',
            fontFamily : 'San Francisco Text Bold',
            color : '#395B65',
        },
        '& .button' : {
            borderRadius: '8px',

        }
    }
}))

export default function CalendarHeader(rowId) {
  const classes = useStyles()

  return (
    <header className={classes.calendarHeader}>
     
    </header>
  );
}