import React from "react";
import AddEventButton from "./AddEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { makeStyles } from "@material-ui/core";
import ButtonCalendar from "./ButtonCalendar";
const useStyles = makeStyles((theme) => ({
  sidebar: {
    borderWidth: 1,
    padding: "1.25rem",
    width: "380px",
    [theme.breakpoints.down('xs')]: {
      width: "auto",
  },//fix lịch 
  [theme.breakpoints.down("sm")]: {
    "@media screen and (max-height: 800px)": {
      width: "auto",
    },
  },
    background: "#DADFD9",
  },
}));

export default function Sidebar(props) {
  const {
    setDaySelected,
    setSmallCalendarMonth,
    monthIndex,
    eventId,
    setDataSelect,
    daySelected,
    getTranslation,
    dataApproved,
    isOpenPopup,
    setIsOpenPopup,
    courses,
    getListEventAction,
    handleDateSelect,
  } = props;
  const classes = useStyles();
  return (
    <aside className={classes.sidebar}>
      <AddEventButton
        getTranslation={getTranslation}
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        setDataSelect={setDataSelect}
        handleDateSelect={handleDateSelect}
      />

      <SmallCalendar
        setDaySelected={setDaySelected}
        setSmallCalendarMonth={setSmallCalendarMonth}
        monthIndex={monthIndex}
        daySelected={daySelected}
      />
      <Labels
        dataCourse={courses}
        eventId={eventId}
        dataApproved={dataApproved}
        getListEventAction={getListEventAction}
        getTranslation={getTranslation}
      />
    </aside>
  );
}
