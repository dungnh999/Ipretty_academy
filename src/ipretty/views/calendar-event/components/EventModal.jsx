import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "ipretty/context/calendar-event/GlobalContext";
import {
  makeStyles,
  TextField,
  IconButton,
  Button,
  Popper,
  Paper,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DatePicker from "ipretty/components/DatePicker/DatePicker";
import TextInput from "ipretty/components/TextInput";
import IconImage from "ipretty/components/IconImage";
import Description from "../../../../public/icon_svg/Description.svg";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Close } from "@material-ui/icons";
import { useNotiStackContext } from "ipretty/context/Notistack";
import { useAuth } from "ipretty/context/AppProvider";
import AddButton from "ipretty/components/AddButton";
import CalendarEventService from "ipretty/services/CalendarEventService";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  eventModal: {
    "& .eventModal__form": {
      backgroundColor: "#fff",
      // boxShadow : 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
      width: "379px",
      border: "1px solid",
      boxShadow: "4px 0px 5px 1px #888888",
      position: "absolute",
      top: "250px",
      left: "700px",
      "& .eventModal__header": {
        backgroundColor: "#fff",
        borderBottom: "1px solid #DADFD9",
        display: "flex",
        justifyContent: "end",
        padding: "11px",
      },
      "& .eventModal__content": {
        "& .eventModal__contentInput--title": {
          padding: "18px 15px",
          paddingLeft: "50px",
          "& input": {
            "&::placeholder": {
              fontStyle: "normal",
            },
          },
          "& .MuiInput-root": {
            background: "#F3F3F3",
            height: "36px",
          },
        },
        "& .eventModal__contentDatePiker": {
          display: "flex",
          //    paddingBottom : '18px',
          paddingLeft: "10px",
          "& .eventModal__contentDatePiker--starTime": {
            paddingLeft: "17px",
          },
          "& .styleTo": {
            padding: "0px 10px",
            paddingTop: "5px",
          },
          "& .eventModal__contentDatePiker--endTime": {
            paddingRight: 15,
          },
        },
        "& .eventModal__contentInput--description": {
          paddingLeft: "10px",
          display: "flex",
          paddingBottom: "18px",
          "& .description__textInput": {
            paddingLeft: "18px",
            width: "100%",
            paddingRight: "15px",
            "& .MuiInput-formControl": {
              background: "#F3F3F3",
            },
            "& .MuiFormControl-marginNormal": {
              marginTop: "0 !important",
            },
            "& .MuiTypography-alignLeft": {
              fontFamily: "San Francisco Text",
              fontSize: 18,
              fontWeight: "600",
              color: "#147B65",
              paddingBottom: 8,
            },
          },
        },
        "& .eventModal__contentInput--notification": {
          paddingLeft: "10px",
          display: "flex",
          paddingBottom: "18px",
          "& .eventModal__contentInput--day": {
            paddingLeft: "17px",
            paddingRight: "10px",
            "& input": {
              "&::placeholder": {
                fontStyle: "normal",
              },
            },
            "& .MuiInput-root": {
              background: "#F3F3F3",
              height: "36px",
            },
          },
          "& .eventModal__contentInput--hour": {
            paddingRight: "15px",
            paddingLeft: "10px",
            "& input": {
              "&::placeholder": {
                fontStyle: "normal",
              },
            },
            "& .MuiInput-root": {
              background: "#F3F3F3",
              height: "36px",
            },
          },
        },
      },
      "& .button__action": {
        display: "flex",
        justifyContent: "end",
        paddingRight: "15px",
        paddingBottom: "18px",
        "& .button__cancel": {
          border: "none",
          color: "#395B65",
        },
        "& .MuiButton-contained": {
          minWidth: "78px",
        },
      },
    },
  },
  errorInput: {
    color: "red",
    "& .MuiInputBase-formControl": {
      border: "1.5px solid red",
    },
    paddingBottom: "3px",
  },
}));

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal(props) {
  const classes = useStyles();
  const { makeShortMessage } = useNotiStackContext();
  const [errors, setErrors] = useState();
  const {
    dataCourse,
    setIsOpenPopup,
    isOpenPopup,
    setDataEvent,
    dataEvent,
    daySelected,
  } = props;
  const [loadingSave, setLoadingSave] = useState(false);

  const { getTranslation } = useAuth();

  function onClose() {
    setErrors(false);
    setIsOpenPopup({ isOpen: false });
  }

  function actionCancel() {
    setErrors(false);
    setIsOpenPopup({ isOpen: false });
  }

  function _handleError(err) {
    setLoadingSave(false);
    setErrors(err.response.data.errors);
  }
  const onChange = (nameField) => (e) => {
    if (nameField === "time_start" || nameField === "time_end") {
      setDataEvent({
        ...dataEvent,
        [nameField]: moment(e).format("yyyy-MM-DD HH:mm:ss"),
      });
    } else {
      setDataEvent({ ...dataEvent, [nameField]: e.target.value });
    }
  };

  function handleSave() {
    setLoadingSave(true);
    let data = new FormData();
    for (let key in dataEvent) {
      data.append(key, dataEvent[key]);
    }
    CalendarEventService.createEvent(
      data,
      (res) => {
        setLoadingSave(false);
        makeShortMessage("Tạo event thành công", "success");
      },
      (err) => {
        _handleError(err);
      }
    );
  }

  return (
    <Popper open={isOpenPopup} transition className={classes.eventModal}>
      <Paper className="eventModal__form">
        <header className="eventModal__header">
          <div>
            <IconButton onClick={onClose} color={"secondary"}>
              <Close />
            </IconButton>
          </div>
        </header>
        <div className="eventModal__content">
          <div className="eventModal__contentInput--title">
            <TextField
              placeholder={"điền tiêu đề"}
              autoFocus
              fullWidth
              value={dataEvent.title || ""}
              onChange={onChange("title")}
              helperText={errors && errors.title ? errors.title : ""}
              error={errors && errors.title}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              className={`textField ${
                errors && errors.title ? "errorInput" : ""
              } `}
            />
          </div>
          <div className="eventModal__contentDatePiker">
            <ScheduleIcon />
            <div className="eventModal__contentDatePiker--starTime">
              <DatePicker
                type={"datetime-picker"}
                value={
                  dataEvent.time_start ||
                  daySelected.format("yyyy-MM-DD HH:mm:ss")
                }
                handleDateChange={onChange("time_start")}
                disablePast={false}
                helperText={
                  errors &&
                  Object.keys(errors).length > 0 &&
                  errors["time_start"]
                    ? errors["time_start"]
                    : ""
                }
                className="datetimePicker"
              />
            </div>
            <div className="styleTo">đến</div>
            <div className="eventModal__contentDatePiker--endTime">
              <DatePicker
                type={"datetime-picker"}
                value={dataEvent.time_end || null}
                handleDateChange={onChange("time_end")}
                disablePast={false}
                helperText={
                  errors && Object.keys(errors).length > 0 && errors["time_end"]
                    ? errors["time_end"]
                    : ""
                }
                className={errors && errors.time_end ? classes.errorInput : ""}
              />
            </div>
          </div>
          <div className="eventModal__contentInput--title">
            {dataCourse && dataCourse.length > 0 && (
              <TextInput
                select
                options={dataCourse}
                onChange={onChange("course_id")}
                fullWidth
                value={dataEvent.course_id || ""}
                noMargin
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                helperText={errors && errors.course_id ? errors.course_id : ""}
                error={errors && errors.course_id}
                className="textField"
              />
            )}
          </div>
          <div className="eventModal__contentInput--description">
            <IconImage srcIcon={Description} />
            <div className="description__textInput">
              <TextInput
                placeholder={"Điền mô tả"}
                autoFocus
                fullWidth
                value={dataEvent.description || ""}
                onChange={onChange("description")}
                // error={errors[item.name] && errors[item.name].length ? true : false}
                // helperText={errors[item.name]}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                className="textArea"
                rows={3}
              />
            </div>
          </div>
          <div className="eventModal__contentInput--notification">
            <NotificationsNoneIcon />
            <div className="eventModal__contentInput--day">
              <TextInput
                onChange={onChange("distance_time_reminder")}
                fullWidth
                placeholder={"30 phút trước"}
                value={dataEvent.distance_time_reminder || ""}
                noMargin
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                // helperText={(errors && errors.role) ? errors.role : ''}
                // error={errors && errors.role}
                className="textField"
              />
            </div>
            <div className="eventModal__contentInput--hour">
              <TextInput
                onChange={onChange("distance_time_reminder_2")}
                fullWidth
                placeholder={"1 ngày trước"}
                value={dataEvent.distance_time_reminder_2 || ""}
                noMargin
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                // helperText={(errors && errors.role) ? errors.role : ''}
                // error={errors && errors.role}
                className="textField"
              />
            </div>
          </div>
        </div>
        <footer className="button__action">
          <Button
            size="large"
            onClick={actionCancel}
            className="button__cancel"
            variant="outlined"
            color="secondary"
          >
            Hủy
          </Button>
          <AddButton
            label={"Lưu"}
            id="update-button"
            buttonClass="button button_save"
            onClick={handleSave}
            variant="contained"
            disabled={false}
            noIcon
            loading={loadingSave}
          />
        </footer>
      </Paper>
    </Popper>
  );
}
