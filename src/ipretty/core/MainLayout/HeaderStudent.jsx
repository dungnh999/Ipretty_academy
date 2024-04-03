import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Select,
  MenuItem,
  Badge,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import logoSrc from "public/logo/logo-ipretty.png";
import ChatIcon from "public/icon_svg/Chat-svg.svg";
import CalendarIcon from "public/icon_svg/calendar.svg";
import FaqIcon from "public/icons_ipretty/Survey_Icon.png";
import IconImage from "ipretty/components/IconImage";
import Logo from "ipretty/components/Logo";
import AccountSettings from "./AccountSettings";
import { useAuth } from "ipretty/context/AppProvider";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useNavigator from "ipretty/hook/useNavigator";
import NotificationNew from "./NotificationNew";
// import Echo from "laravel-echo";
import LeftPanel from "./LeftPanel";
import LeftPanelMini from "ipretty/core/MainLayout/LeftPanelMini";
import useRouter from "use-react-router";
import MessengerService from "ipretty/services/MessengerService";
// import NotificationNew from './../../NotificationNew';
// import { io } from "socket.io-client";
// window.io = require('socket.io-client');

import SVG from "react-inlinesvg";
import { SOCKET_CONFIG } from "ipretty/services/constances";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    "& .MuiListItem-gutters": {
      padding: theme.spacing(0, 0),
      marginRight: '30px',
      // [theme.breakpoints.up('xl')]: {
      //   marginBottom: '38px',
      // },
      float: "left",
    },
    "& .MuiListItemText-primary": {
      textTransform: "uppercase",
    },
    "& .MuiList-root .MuiListItem-root": {
      "& .MuiTypography-body1": {
        fontSize: 15,
        color: theme.palette.primary.colorText,
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.background,
      },
      "& .MuiListItemIcon-root": {
        minWidth: 0,
      },
      "& ::-webkit-scrollbar": {
        width: 5,
      },
    },
    "& .MuiList-padding": {
      padding: theme.spacing(0, 0),
    },
  },
  selectedItem: {
    backgroundColor: theme.palette.primary.backgroundMenuSide + "!important",
    borderRadius: "9px",
    "& .MuiListItemText-primary": {
      color: theme.palette.primary.colorTextSelected + "!important",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.colorTextSelected + "!important",
    },
  },
  logo: {
    justifyContent: "center",
    padding: theme.spacing(1.1875, 3.75),
    background: theme.palette.primary.background,
    position: "sticky",
    zIndex: "999",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  rootList: {
    display: "flex",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "& .MuiListItem-button:hover": {
      backgroundColor: theme.palette.primary.backgroundMenuSide + "!important",
      borderRadius: "9px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
    },
    "& .MuiListItem-root:last-child": {
      marginRight: "0px",
    },
    "& .MuiIconButton-root": {
      padding: "0 12px",
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "transparent",
    },
  },
  account: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dFLexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      columnGap: '6px',
  }, 
    "& .chat": {
      "& svg": {
        width: "24px",
        height: "24px",
        marginRight: "13px",
        [theme.breakpoints.down("xs")]: {
          marginRight: "0px", //khoang cach qua gan giua cac icon header
      }, 
        cursor: "pointer",
        marginTop: "7px",
      },
    },
    "& .message-header": {
      marginRight: "15px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px", //khoang cach qua gan giua cac icon header
    }, 
      "& .MuiBadge-root": {
        "& div": {
          margin: "0",
        },
        "& .MuiBadge-badge": {
          backgroundColor: "red",
        },
        "& .MuiBadge-anchorOriginTopRightRectangle": {
          transform: "scale(1) translate(5%, -10%)",
        },
      },
    },
    "& .MuiInput-root": {
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "4px !important", //fix lỗi ENV , mũi tên quá gần
      },
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "#fff",
    },
    "& .MuiIconButton-root": {
      color: "#fff !important", 
      [theme.breakpoints.down("xs")]: {
        marginLeft: '-15px',//fix bug 70 avata bị cắt
        zIndex: '99',
      },
    },
    "& .calendar": {
      "& svg": {
        width: 24,
        height: 24,
        cursor: "pointer",
        marginTop: "7px",
        marginRight: 10,
      },
    },
  },

  language: {
    background: "#F4F6F3",
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      width: 53,
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: 30,
      width: 72,
    },

    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: 0,
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-icon": {
      right: 10,
      color: theme.palette.primary.main,
    },
  },
  menuItem: {
    [theme.breakpoints.down("sm")]: {
      width: "25px",
      height: "25px",
    },
  },
  menu: {
    display: "flex",
    "& img": {
      objectFit: "contain",
    },
    "& .imgStyle": {
      objectFit: "contain",
    },
  },
  selectedChat: {
    stroke: theme.palette.primary.colorHoverButton,
  },
}));

function HeaderStudent(props) {
  const classes = useStyles();
  const { user, changeLanguage, getTranslation, isAdminPage, clickMess} = useAuth();
  const [lang, setLang] = useState((user && user.lang) || "vi");

  const navigate = useNavigator();
  const [countAllReceiverSeen, setCountAllReceiverSeen] = useState(0);
  const [open, setOpen] = useState(false);
  const { location } = useRouter();

  // if (typeof io !== 'undefined') {
  //     window.Echo = new Echo({
  //       broadcaster: 'socket.io',
  //       host: SOCKET_CONFIG.SOCKET_HOSTNAME + ':' + SOCKET_CONFIG.SOCKET_PORT,
  //     });
  // }

  // useEffect(() => {
  //   if (window.Echo) {
  //     let currentUrl = window.location.href
  //     let splitUrl = currentUrl.split('/')
  //     if (splitUrl[splitUrl.length - 1] != 'chat' || splitUrl[splitUrl.length - 2] != 'chat') {
  //       window.Echo.channel(`messages-receiver-seen.${user.id}`).listen('.messages-receiver-seen', (data) => {
  //         setCountAllReceiverSeen(data.data)
  //       })
  //     }
  //   }
  // }, [])

  useEffect(() => {
    let time;
    time = setInterval(() => {
      getCountUnreadMessage();
    }, 10000);

    return () => clearInterval(time);
  }, []);

  function getCountUnreadMessage() {
    MessengerService.countUnreadMessage(
      (res) => {
        // console.log(res.data.data, '---------')
        setCountAllReceiverSeen(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const handleChange = (event) => {
    const value = {
      lang: event.target.value,
    };
    setLang(value.lang);
    changeLanguage(value);
  };

  const chatFeature = () => {
    setCountAllReceiverSeen(0);
    navigate("/chat");
    setOpen(true);
    clickMess(true);
  }; 

  return (
    <>
      <Hidden smDown>
        <Logo /*variant={'animated'}*/ user={user} logoSrc={logoSrc} />
      </Hidden>
      <div className={classes.menu}>
        {isAdminPage || user.role === "admin"  ? (
          <Hidden mdUp>
             <Logo variant="mobile" logoSrc={logoSrc} /> {/*bug 68 them logo*/}
            <LeftPanelMini leftPanel={<LeftPanel openSidebar={true} />} />
          </Hidden>
        ) : (
          <Hidden mdUp className="imgStyle">
            <Logo variant="mobile" logoSrc={logoSrc} />
          </Hidden>
        )}
      </div>

      <div className={classes.root}>
        {/* <Notification />
        <Support context={context} history={history} /> */}
        <List className={classes.dFLexCenter}>
          <div className={classes.dFLexCenter}>
            {/* <IconImage
              isMr10
              title={getTranslation("Chat")}
              onClick={chatFeature}
              srcIcon={ChatIcon}
            /> */}
           {user.role !== "admin" ? (
              countAllReceiverSeen > 0 ? (
                <div className="message-header">
                  <Badge badgeContent={countAllReceiverSeen} color="secondary">
                    <span className="chat">
                      <Tooltip title={getTranslation("chat")}>
                        <SVG
                          className={
                            location.pathname.includes("chat")
                              ? classes.selectedChat
                              : ""
                          }
                          onClick={chatFeature}
                          src={ChatIcon}
                        />
                      </Tooltip>
                    </span>
                  </Badge>
                </div>
              ) : (
                <Tooltip title={getTranslation("chat")}>
                  <span className="chat">
                    <SVG
                      className={
                        location.pathname.includes("chat")
                          ? classes.selectedChat
                          : ""
                      }
                      onClick={chatFeature}
                      src={ChatIcon}
                    />
                  </span>
                </Tooltip>
              )
            ) : (
              ""
            )}
            <Tooltip title={getTranslation("calendar")}>
              <div className="calendar">
                <SVG
                  onClick={() => {
                    navigate("/calendar-events");
                  }}
                  src={CalendarIcon}
                  className={
                    location.pathname.includes("calendar-events")
                      ? classes.selectedChat
                      : ""
                  }
                />
              </div>
            </Tooltip>
            <NotificationNew />
            {!isAdminPage ? (
              <IconImage
                isMr10
                title="FAQ"
                onClick={() => {
                  navigate("/published-faqs");
                }}
                srcIcon={FaqIcon}
              />
            ) : (
              ""
            )}
            <Select
              value={lang}
              onChange={(e) => handleChange(e)}
              disableUnderline
              className={classes.language}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="vi">VI</MenuItem>
            </Select>
          </div>
          <div className={classes.account}>
            <AccountSettings />
          </div>
        </List>
      </div>
    </>
  );
}

export default HeaderStudent;
