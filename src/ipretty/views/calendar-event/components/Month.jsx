import React from "react";
import Day from "./Day";
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
   month : {
      flex : 1,
      display : 'grid',
      gridTemplateColumns : 'repeat(7, minmax(0, 1fr))',
      gridTemplateRows : 'repeat(5, minmax(0, 1fr))',
      background : '#FFFFFF'
    }
}))
export default function Month( props ) {
  const {month , setDaySelected , daySelected , setIsOpenPopup , filteredEvents }  = props
  const classes = useStyles()
  return (
    <div className={classes.month}>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day 
              day={day} 
              key={idx} 
              rowIdx={i} 
              setIsOpenPopup={setIsOpenPopup} 
              setDaySelected ={setDaySelected} 
              filteredEvents={filteredEvents}/>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}