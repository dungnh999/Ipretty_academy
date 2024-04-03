import React, { useState, useEffect } from 'react'
import { Menu, Avatar, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core';
import { makeStyles, Hidden } from '@material-ui/core'
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import InfoIcon from 'public/icons/info.png';
import LogOutIcon from 'public/icons/log_out.png';
import useNavigator from 'ipretty/hook/useNavigator';
import contextHelper from 'ipretty/helpers/contextHelper';
import { useAuth } from 'ipretty/context/AppProvider';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiListItemText-root": {
      textAlign: 'center'
    },
    "& .MuiTypography-body1": {
      fontSize: 15
    }
  },
  menuList: {
    minWidth: theme.spacing(20),
    padding: 0
  },
  list: {
    marginLeft: '10px',
  },
  name: {
    color: "#147B65"
  },
  email: {
    color: '#707070',
    fontSize: '13px',
    fontStyle: 'italic'
  },
  nameAdmin: {
    color: '#FFFFFF',

    [theme.breakpoints.down('sm')]: {
      color: '#404040'
    },
  },
  emailAdmin: {
    color: '#FFFFFF',

    [theme.breakpoints.down('sm')]: {
      color: '#404040'
    },
  },
  infor: {
    marginLeft: '9px'
  }
}));

function AccountSettingAdmin(props) {
  const classes = useStyles();
  const { user, logout, getTranslation } = useAuth();
  const navigate = useNavigator();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { renderAvatar } = contextHelper
  const [useDefaultAvatar, setUseDefaultAvatar] = useState(false);
  const appBarUser= true;

  // useEffect(() => {
  //   if (user && user.role && user.role === "student") {
  //     setAppBarUser(false);
  //   }
  // }, [user]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function firstCase(name) {
    return name[0].toUpperCase();
  }

  function logoutClick() {
    logout(navigate);
  }

  function userProfile() {
    navigate("/profile");
  }

  function useDefault() {
    setUseDefaultAvatar(true);
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
          <div
            className={classNames(classes.name, {
              [classes.nameAdmin]: appBarUser,
            })}
          >
            {user && user.name }
          </div>
          <div
            className={classNames(classes.email, {
              [classes.emailAdmin]: appBarUser,
            })}
          >
            {user && user.email ? user.email : ""}
          </div>
        </div>
      </Hidden>
      {/* <Button onClick={handleClick}>
        Admin
        <KeyboardArrowDown/>
      </Button> */}
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={open}
        onClose={handleClose}
        classes={{ list: classes.menuList }}
        className={classes.list}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List className={classes.root} disablePadding>
          <ListItem button onClick={() => userProfile()}>
            <ListItemIcon>
              <img src={InfoIcon} />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: "left" }}
              primary={getTranslation("myInfo").toUpperCase()}
            />
          </ListItem>
          <ListItem button onClick={() => logoutClick()}>
            <ListItemIcon>
              <img src={LogOutIcon} />
            </ListItemIcon>
            <ListItemText
              style={{ textAlign: "left" }}
              primary={getTranslation("logOut").toUpperCase()}
            />
          </ListItem>
        </List>
      </Menu>
    </React.Fragment>
  );
}

export default withRouter(AccountSettingAdmin)
