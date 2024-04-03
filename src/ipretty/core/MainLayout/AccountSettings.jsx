import React, { useState, useEffect } from "react";
import {
  Menu,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CourseIcon from "../../../public/icons_ipretty/course.svg";
import CourseClickIcon from "../../../public/icons_ipretty/course_click.svg";
import LogoutIcon from "../../../public/icons_ipretty/logout.svg";
import TransactionIcon from "../../../public/icons_ipretty/transaction.svg";
import ReportError from "../../../public/icon_svg/DangerCircle.svg";
import TransactionClickIcon from "../../../public/icons_ipretty/transaction_click.svg";
import AccountIcon from "../../../public/icons_ipretty/account.svg";
import AccountClickIcon from "../../../public/icons_ipretty/account_click.svg";
import { useAuth } from "ipretty/context/AppProvider";
import contextHelper from "ipretty/helpers/contextHelper";
import useNavigator from "ipretty/hook/useNavigator";
import useRouter from "use-react-router";
import SVG from "react-inlinesvg";
import Cart from "../../../public/icons_ipretty/card2.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiListItemText-root": {
      textAlign: "left",
    },
    "& .MuiTypography-body1": {
      fontSize: 15,
    },
    "& .MuiListItemIcon-root": {
      minWidth: "0px",
    },
    "& .MuiTypography-body1": {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "-0.011em",
      color: "#395B65",
      fontFamily: "San Francisco Text",
      paddingLeft: "8px",
    },
    "& .MuiListItem-gutters": {
      paddingLeft: "24px",
      paddingRight: "0px",
    },
  },

  student: {
    marginLeft: "10px",
    marginTop: "10px",
    "& .MuiMenu-paper": {
      width: "246px",
      maxHeight: '350px',
      overflow: 'auto',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
    },
    },
  },
  admin: {
    marginLeft: "10px",
    marginTop: "10px",
    "& .MuiMenu-paper": {
      width: "184px",
      height: "200px",//fix thanh nav menu login-admin bị nhỏ
      [theme.breakpoints.down('xs')]: {
        height: "210px !important",//fix thanh nav menu login-admin bị nhỏ
    },
    },
  },
  nameAdmin: {
    color: "#3D423C",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "San Francisco Text",
    padding: "10px",
    maxWidth: 142,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  // myCourseClick: {
  //   "& .MuiTypography-body1": {
  //     color: '#44AD92',
  //   },
  // },
  // accountClick: {
  //   "& .MuiTypography-body1": {
  //     color: '#44AD92',
  //   },
  // },
  // historyTransactionClick: {
  //   "& .MuiTypography-body1": {
  //     color: '#44AD92',
  //   },
  // },
  selectedItem: {
    "& .MuiTypography-body1": {
      color: theme.palette.primary.colorHoverButton,
    },
    "& svg": {
      stroke: theme.palette.primary.colorHoverButton,
    },
  },
}));

function AccountSettings(props) {
  const classes = useStyles();
  const { user, logout, getTranslation, isAdminPage } = useAuth();
  const navigate = useNavigator();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { renderAvatar } = contextHelper;
  const [useDefaultAvatar, setUseDefaultAvatar] = useState(false);
  const { location } = useRouter();
  const API_URL = process.env.API_URL;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logoutClick() {
    logout(navigate);
  }

  function useDefault() {
    setUseDefaultAvatar(true);
  }

  function goToPage(url) {
    if (location.pathname !== url) {
      navigate(url);
    }
  }
  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Avatar
          className={classes.avatar}
          src={renderAvatar(user && user.avatar)}
          onError={useDefault}
        />
      </IconButton>
      <Hidden smDown>
        <div className={classes.infor}>
          <div className={classes.nameAdmin}>{user && user.name}</div>
        </div>
      </Hidden>

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={open}
        onClose={handleClose}
        // classes={{ list: classes.menuList }}
        className={isAdminPage ? classes.admin : classes.student}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List className={classes.root} disablePadding>
          {isAdminPage || user.role === "admin"  ? (
            ""
          ) : (
            <ListItem
              button
              onClick={() => goToPage("/")}
              selected={location.pathname == "/"}
              classes={{ selected: classes.selectedItem }}
            >
              <ListItemIcon>
                <SVG src={CourseIcon} />
              </ListItemIcon>
              <ListItemText primary={getTranslation("MyCourses")} />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => goToPage("/profile")}
            selected={location.pathname == "/profile"}
            classes={{ selected: classes.selectedItem }}
          >
            <ListItemIcon>
              <SVG src={AccountIcon} />
            </ListItemIcon>
            <ListItemText primary={getTranslation("account")} />
          </ListItem>
          {isAdminPage || user.role === "admin"  ? (
            ""
          ) : (
            <ListItem
              button
              onClick={() => goToPage("/transaction-history")}
              selected={location.pathname == "/transaction-history"}
              classes={{ selected: classes.selectedItem }}
            >
              <ListItemIcon>
                <SVG src={TransactionIcon} />
              </ListItemIcon>
              <ListItemText primary={getTranslation("transactionHistory")} />
            </ListItem>
          )}
          {
            <ListItem
              button
              onClick={() => {
                window.open(API_URL)                
              }}
            >
              <ListItemIcon>
                <SVG src={Cart} />
              </ListItemIcon>
              <ListItemText primary={getTranslation("CourseLibrary")} />
            </ListItem>//Điều hướng về landing page 
          }
          {isAdminPage || user.role === "admin"  ? (
            ""
          ) : (
            <ListItem
              button
              onClick={() => goToPage("/report-errors")}
              selected={location.pathname == "/report-errors"}
              classes={{ selected: classes.selectedItem }}
            >
              <ListItemIcon>
                <SVG src={ReportError} />
              </ListItemIcon>
              <ListItemText primary={getTranslation("ReportError")} />
            </ListItem>
          )}
          <ListItem button onClick={() => logoutClick()}>
            <ListItemIcon>
              <SVG src={LogoutIcon} />
            </ListItemIcon>
            <ListItemText primary={getTranslation("logOut")} />
          </ListItem>
        </List>
      </Menu>
    </React.Fragment>
  );
}

export default AccountSettings;
