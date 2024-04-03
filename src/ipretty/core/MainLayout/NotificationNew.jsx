import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { useAuth } from "ipretty/context/AppProvider";
import { withRouter } from "react-router-dom";
import SnackBar from "ipretty/components/SnackBar";
import {
  makeStyles,
  IconButton,
  Badge,
  Grid,
  Popper,
  Paper,
  ClickAwayListener,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import NotificationIcon from "public/icon_svg/notification.svg";
import IconImage from "../../components/IconImage";
import NotificationHoverIcon from "public/icon_svg/NotificationHover.svg";
import NotificationService from "ipretty/services/NotificationService";
import { useHistory } from "react-router-dom";
import Default_User from "../../../public/icons_ipretty/account.svg";
import IconStatus from "../../../public/icons_ipretty/IconStatus.png";
// import Echo from "laravel-echo"
// import { io } from "socket.io-client";
import AD from "../../../public/icon_svg/AD.svg";
import DOC from "../../../public/icon_svg/DOC.svg";
import HOL from "../../../public/icon_svg/HOL.svg";
import POL from "../../../public/icon_svg/POL.svg";
import FUNC from "../../../public/icon_svg/FUNC.svg";
import Default from "../../../public/icon_svg/DEFAULT.svg";
import EVT from "../../../public/icon_svg/EVT.svg";
import SHOP from "../../../public/icon_svg/SHOP.svg";
import { SOCKET_CONFIG } from "ipretty/services/constances";
// window.io = require('socket.io-client');

const useStyles = makeStyles((theme) => ({
  white: {
    padding: "0px",
  },
  badgeIcon: {
    backgroundColor: "#FFFFFF",
    // marginRight: "25px", // fix khoang cach header
    cursor: "pointer",
  },
  root: {
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      transform: "translate(-45px, 65px) !important",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translate(-80px, 65px) !important",//fix Pop-up thông báo bị mất 1 phần
    },
    [theme.breakpoints.down("700")]: {
      transform: "translate(-40px, 65px) !important",
    },
    [theme.breakpoints.down("xs")]: {
      transform: "translate(-148px, 65px) !important",//fix Pop-up thông báo bị mất 1 phần
    },
    "& .title": {
      fontFamily: "San Francisco Text",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "19.8142px",
      lineHeight: "28px",
      letterSpacing: "-0.011em",
      color: "#000000",
      paddingTop: "24px",
      paddingLeft: "24px",
    },
    "& .notiBody": {
      background: "#FFFFFF",
      borderRadius: "7.93px",
      width: "320px",
      overflowY: "scroll",
      overflowX: "hidden",
      [theme.breakpoints.up("1500")]: {
        height: "779px",
      },
      [theme.breakpoints.down("1500")]: {
        height: "500px",
      },
      [theme.breakpoints.down("sm")]: {
        "@media screen and (max-height: 600px)": {
          height: "230px",
        },
        "@media screen and (min-height: 600px)": {
          height: "500px",
        },
      },
      "& .noNotify": {
        textAlign: "center",
        padding: "2em 1em",
        display: "block",
      },
      "& .notiHeaderNew": {
        fontFamily: "San Francisco Text",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "17.8328px",
        lineHeight: "24px",
        color: "#000000",
        paddingTop: "7.67px",
        paddingLeft: "24px",
        paddingBottom: "3px",
      },
      "& .notiHeaderBefore": {
        fontFamily: "San Francisco Text",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "17.8328px",
        lineHeight: "24px",
        color: "#000000",
        paddingTop: "12.88px",
        paddingLeft: "24px",
      },
      "& .contentNotify": {
        display: "flex",
        padding: "10px 24px",
        borderBottom: "1px solid #DADFD9",
        wordBreak: "break-word",
        "& .avatarStyle": {
          borderRadius: "50%",
          width: "36px !important",
          height: "36px !important",
          objectFit: "cover",
          minWidth: '36px',//fix avata tron
        },
        "& .listItemText": {
          "& .MuiListItemText-primary": {
            textTransform: "none",
          },
          "& .message": {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            maxWidth: 195,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-all',
            fontFamily: "San Francisco Text",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px !important",
            lineHeight: "16px",
            alignItems: "center",
            color: "#395B65 !important",
            paddingLeft: "14px",
            // height: "50px",
            "& img": {
              width: "195px",
              height: "130px",
              objectFit: "scale-down",
            },
          },
          "& .timeStyle": {
            fontFamily: "San Francisco Text",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "16px",
            display: "flex",
            alignItems: "center",
            color: "#44AD92",
            paddingLeft: "14px",
          },
        },
        "& .iconStatus": {
          width: "6px",
          height: "6px",
        },
      },
    },
  },
}));

function NotificationNew() {
  const { getTranslation, user } = useAuth();
  const anchorRef = useRef(null);
  const classes = useStyles();
  const [contentBadge, setContentBage] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  let history = useHistory();
  const [loadingCircularProgress, setLoadingCircularProgress] = useState(false);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const [snackbar, setSnackbar] = useState({
    openSnackbar: false,
    message: "",
    variant: "info",
  });
  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
    setContentBage(0);
    NotificationService.checkNotification(
      (response) => {},
      (error) => {}
    );
  }

  function closeSnackbar() {
    setSnackbar({ openSnackbar: false, message: "", variant: "info" });
  }

  async function getNotifications(scroll = null) {
    if (scroll == null) {
      setLoadingCircularProgress(false);
    }
    NotificationService.getListNotification(
      (response) => {
        const tempNoti = Object.values(response.data.data).splice(
          0,
          Object.values(response.data.data).length - 1
        );
        setContentBage(response.data.data.count_unchecked);
        let array = [tempNoti.length - 1];
        if (tempNoti && tempNoti[0] != 0 && tempNoti.length > 0) {
          tempNoti.map((item, value) => {
            if (value != tempNoti.length - 1) {
              let type = String(item.type).substring(
                String(item.type).lastIndexOf("\\") + 1,
                String(item.type).length
              );
              let message = item.message.message;
              let userId = item.message.user_id;
              if (type == "NewPushNotification") {
                switch (item.message.type) {
                  case "AD":
                    var avatar = AD;
                    break;
                  case "DOC":
                    var avatar = DOC;
                    break;
                  case "HOL":
                    var avatar = HOL;
                    break;
                  case "POL":
                    var avatar = POL;
                    break;
                  case "FUNC":
                    var avatar = FUNC;
                    break;
                  case null:
                    var avatar = Default;
                    break;
                  default:
                    break;
                }
              } else if (type == "AddStudentEvent") {
                var avatar = EVT;
              } else if (type == "ApprovedAndRejectTransaction") {
                var avatar = SHOP;
              } else {
                var avatar = item.message.avatar;
              }
              if (type == "NewCommentFAQ") {
                var faq_id = item.message.faq_id;
                var faq_question = item.message.faq_question;
              }
              if (
                type == "UpdateCourse" ||
                type == "UpdateListStudentCourse" ||
                type == "NewCourse" ||
                type == "StudentCompletedCourse" ||
                type == "CourseIsOpen" ||
                type == "CourseIsClose"
              ) {
                var course_id = item.message.course_id;
              }
              if (type == "AddStudentEvent") {
                var event_id = item.message.event_id;
              }
              array[value] = {
                id: item.id,
                avatar: avatar ? avatar : Default_User,
                message: message,
                created_at: item.created_at,
                isRead: item.read_at,
                userId: userId,
                type: type,
                faq_id: faq_id ? faq_id : "",
                faq_question: faq_question ? faq_question : "",
                course_id: course_id ? course_id : "",
                event_id: event_id ? event_id : "",
              };
            }
          });

          setNotifications(array);
        }
        if (scroll == null) {
          setLoadingCircularProgress(true);
        }
      },
      (error) => {
        setLoadingCircularProgress(true);
      }
    );
  }

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getNotifications();
    }
  }, [localStorage.getItem("authToken")]);

  async function handleClickNotification(notify) {
    setOpen(false);
    let href;
    const data = new FormData();
    data.append("id", notify.id);
    notify.isRead = true;
    readNotifications(data);
    if (user.role == "admin") {
      if (
        notify.type == "NewRegisterAccount" ||
        notify.type == "ActiveAccount"
      ) {
        href = `/users/${notify.userId}/detail?type=Studentinformation`;
      } else if (notify.type == "NewCommentFAQ") {
        href = `/published-faqs/${notify.faq_id}/faq_question/${notify.faq_question}/false`;
      } else if (notify.type == "AddStudentEvent") {
        href = `/calendar-events/${notify.event_id}`;
      } else if (
         notify.type == "UpdateCourse" ||// fix bug ̉ feauture
        notify.type == "NewCourse" ||
        notify.type == "CourseIsOpen" ||
        notify.type == "CourseIsClose"
      ) {
        href = `/courses/${notify.course_id}/detail`;// fix bug ̉ feauture
      } else if (notify.type == "StudentCompletedCourse") {
        href = `/ courses/${notify.course_id}/students?course_type=Group`;
      } else if (notify.type == "ApprovedAndRejectTransaction") {
        href = "/transaction-history";
      }
    }
    if (user.role == "user") {
      if (notify.type == "ActiveAccount") {
        href = "/profile";
      } else if (notify.type == "NewCommentFAQ") {
        href = `/published-faqs/${notify.faq_id}/faq_question/${notify.faq_question}/false`;
      } else if (
        notify.type == "UpdateCourse" ||
        notify.type == "UpdateListStudentCourse" ||
        notify.type == "NewCourse" ||
        notify.type == "CourseIsOpen" ||
        notify.type == "CourseIsClose"
      ) {
        href = `/detail-course/${notify.course_id}`;
      } else if (notify.type == "StudentCompletedCourse") {
        href = `/detail-course/${notify.course_id}/completed`;
      } else if (notify.type == "AddStudentEvent") {
        href = `/calendar-events/${notify.event_id}`;
      } else if (notify.type == "ApprovedAndRejectTransaction") {
        href = "/transaction-history";
      }
    }
    if (user.role == "employee") {
      if (notify.type == "ActiveAccount") {
        href = "/profile";
      } else if (notify.type == "NewCommentFAQ") {
        href = `/published-faqs/${notify.faq_id}/faq_question/${notify.faq_question}/false`;
      } else if (
        notify.type == "UpdateCourse" ||
        notify.type == "UpdateListStudentCourse" ||
        notify.type == "NewCourse" ||
        notify.type == "CourseIsOpen" ||
        notify.type == "CourseIsClose"
      ) {
        href = `/detail-course/${notify.course_id}`;
      } else if (notify.type == "StudentCompletedCourse") {
        href = `/courses/${notify.course_id}/students?course_type=Group`;
      } else if (notify.type == "AddStudentEvent") {
        href = `/calendar-events/${notify.event_id}`;
      } else if (notify.type == "ApprovedAndRejectTransaction") {
        href = "/transaction-history";
      }
    }
    if (href) {
      history.push(href);
      if (href === location.pathname) {
        // console.log('----------- ~~~~~~~~~~~')
        window.location.ref = "/";
      }
    }
  }

  function readNotifySuccess(res) {}
  function readNotifyError(err) {}
  function readNotifications(data) {
    NotificationService.readNotifications(
      data,
      readNotifySuccess,
      readNotifyError
    );
  }
  function limitMessage(str, maxLength) {
    if (str != null) {
      if (str.length > maxLength) {
        str = str.substring(0, maxLength) + "...";
        return str;
      } else return str;
    }
  }

  function elementNew() {
    return notifications.map((value, index) =>
      moment.utc(value.created_at).toDate().getDate() ===
      moment.utc().toDate().getDate() ? (
        <Grid key={index}>
          <Tooltip title={value.message}>
            <a
              className="contentNotify"
              onClick={() => handleClickNotification(value)}
            >
              <ListItem>
                <img className="avatarStyle" src={value.avatar} />
                <ListItemText className="listItemText">
                  <Typography className="message">
                    {limitMessage(value.message, 100)}
                  </Typography>
                  <div className="timeStyle">
                    {" "}
                    {moment.utc(value.created_at).locale(user.lang).fromNow()}
                  </div>
                </ListItemText>
                {value.isRead == null ? (
                  <img className="iconStatus" src={IconStatus} />
                ) : (
                  ""
                )}
              </ListItem>
            </a>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )
    );
  }

  function elementOld() {
    return notifications.map((value, index) =>
      moment.utc(value.created_at).toDate().getDate() !==
      moment.utc().toDate().getDate() ? (
        <Grid key={index}>
          <Tooltip title={value.message}>
            <a
              className="contentNotify"
              onClick={() => handleClickNotification(value)}
            >
              <ListItem>
                <img className="avatarStyle" src={value.avatar} />
                <ListItemText className="listItemText">
                  <Typography className="message">
                    {limitMessage(value.message, 100)}
                  </Typography>
                  <div className="timeStyle">
                    {moment.utc(value.created_at).locale(user.lang).fromNow()}
                  </div>
                </ListItemText>
                {value.isRead == null ? (
                  <img className="iconStatus" src={IconStatus} />
                ) : (
                  ""
                )}
              </ListItem>
            </a>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )
    );
  }

  function listNotification(notifications) {
    return (
      <>
        <div className="notiHeaderNew">{getTranslation("new")}</div>
        {elementNew()}
        <div className="notiHeaderBefore">{getTranslation("before")}</div>
        {elementOld()}
      </>
    );
  }

  function sectionNotication() {
    return (
      <List>
        {notifications && notifications.length ? (
          listNotification(notifications)
        ) : (
          <Typography component="span" color="textPrimary" className="noNotify">
            {getTranslation("noNotice")}
          </Typography>
        )}
      </List>
    );
  }

  // if (typeof io !== 'undefined') {
  //     window.Echo = new Echo({
  //       broadcaster: 'socket.io',
  //       host: SOCKET_CONFIG.SOCKET_HOSTNAME + ':' + SOCKET_CONFIG.SOCKET_PORT,
  //     });
  // }

  // useEffect(() => {
  //   if (window.Echo) {
  //     window.Echo.channel(`UserReceiver.${user.id}`).listen('.notification', (data) => {
  //       getNotifications()
  //     })
  //   }

  // }, [window.Echo])

  useEffect(() => {
    let time;
    time = setInterval(() => {
      getNotifications(true);
    }, 10000);

    return () => clearInterval(time);
  }, []);

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-label="show new notifications"
        className={classes.white}
        onClick={handleToggle}
        ref={anchorRef}
      >
        <Badge
          className={classes.badgeIcon}
          badgeContent={contentBadge}
          color="error"
        >
          <IconImage
            title={getTranslation("notify")}
            srcIcon={open ? NotificationHoverIcon : NotificationIcon}
          />
        </Badge>
      </IconButton>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <div id="notification">
              <div className="title">{getTranslation("notify")}</div>
              <div className="notiBody">
                {loadingCircularProgress && sectionNotication()}
              </div>
            </div>
          </ClickAwayListener>
        </Paper>
      </Popper>

      {snackbar.openSnackbar && (
        <SnackBar
          close={closeSnackbar}
          message={snackbar.message}
          variant={snackbar.variant}
        />
      )}
    </>
  );
}
export default withRouter(NotificationNew);
