import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "ipretty/helpers/utils";
import { makeStyles } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const useStyles = makeStyles((theme) => ({
  smallCalendar: {
    marginTop: 32,
    "& .smallCalendar__header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 16,
      "& .smallCalendar__title": {
        fontSize: "14px",
        fontFamily: "San Francisco Text",
        color: "#075740",
        [theme.breakpoints.down("xs")]: {
          fontSize: '12px',//fix size chữ caleda nho lai
      },
      },
      "& .chevronIcon": {
        background: "transparent",
        border: "none",
      },
    },
    "& .smallCalendar__day": {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      gridTemplateRow: "repeat(6, minmax(0, 1fr))",
      "& .smallCalendar__day--day": {
      //   [theme.breakpoints.down('xs')]: {
      //     minWidth: "152%",
      //  },//fix khoang cach button
        paddingTop: "12px",
        paddingBottom: "0.25rem",
        background: "transparent",
        border: "none",
        fontSize: "12px",
        color: "#395B65",
        "& .text-sm": {
          textAlign: "center",
        },
      },
      "& .smallCalendar__day--currDay": {
        backgroundColor: "#147B65",
        color: "#fff",
        borderRadius: "9999px",
        paddingBottom: 8,
        paddingTop: 10,
      },
      "& .smallCalendar__day--slcDay": {
        backgroundColor: "#549f8f",
        color: "#fff",
        // width : '1.25rem',
        paddingBottom: 8,
        borderRadius: "9999px",
        paddingTop: 10,
      },
      "& .smallCalendar__title": {
        textAlign: "center",
        fontSize: "12px",
        color: "#395B65",
      },
    },
  },
}));

export default function SmallCalendar(props) {
  const classes = useStyles();
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const { setDaySelected, setSmallCalendarMonth, monthIndex, daySelected } =
    props;
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  // console.log(daySelected)
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "smallCalendar__day--currDay";
    } else if (currDay === slcDay) {
      return "smallCalendar__day--slcDay";
    } else {
      return "";
    }
  }
  return (
    <div className={classes.smallCalendar}>
      <header className="smallCalendar__header">
        <p className="smallCalendar__title">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth} className="chevronIcon">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <button onClick={handleNextMonth} className="chevronIcon">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </header>
      <div className="smallCalendar__day">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="smallCalendar__title">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                  console.log(day);
                }}
                className={`smallCalendar__day--day ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
