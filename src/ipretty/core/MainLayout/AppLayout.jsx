import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "./ResponsiveDrawer"
import classNames from "classnames";
import IconImage from "ipretty/components/IconImage";
import MenuIcon from "public/icons/menu.png";
import LeftPanel from "./LeftPanel";
// import logoSrc from "public/logo/logo-home-bhs.png";
import logoSrc from "public/logo/Logo-header.svg";
import Logo from "ipretty/components/Logo";
import AppBarBig from "./AppBarBig";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(2.25, 3, 0, 4),
      ...theme.mixins.toolbar,
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
      // paddingLeft: 105,
      width: "100%",
    },
    viewContainer: {
      // minHeight: `calc(100vh - ${theme.spacing(2) + 4 + 70}px)`
    },
    view: {
      backgroundColor: theme.palette.background.paper,
      // flex: 1,
      // flexGrow: 1,
      marginLeft: 0,
      minHeight: "100vh",
      paddingTop: 64
      // display: "flex",
    },
    drawerOpenLogo: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(1, 3, 1, 4),
      ...theme.mixins.toolbar,
      background: theme.palette.primary.background,
      position: "sticky",
      zIndex: "999",
      boxShadow: "0px 3px 6px #00000029",

      "& .MuiIconButton-root": {
        borderRadius: "9px",
      },
    },
    drawerCloseLogo: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: "none",
    },
    drawerButtonOpen: {
      display: "block",
    },
    drawerButtonClose: {
      display: "none",
    },
    buttonMenu: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 0",
      "& .MuiIconButton-root": {
        borderRadius: "9px",
        "&:hover": {
          color: theme.palette.primary.backgroundMenuSide + "!important",
        },
      },
    },
  }),
  {
    name: "AppLayout",
  }
);


const AppLayout = ({ children }) => {
  const classes = useStyles();
  const [isDrawerOpened, setDrawerState] = React.useState(false);
  // const { makeLongMessage } = useNotification();

  // useEffect(() => {
  //   makeLongMessage('test in app layout')
  // }, []);

  return (
    <div className={classes.root}>
      <AppBarBig
        handleDrawerOpen={() => setDrawerState(true)}
        open={isDrawerOpened}
      />
      <ResponsiveDrawer open={isDrawerOpened} small>
        <div
          className={classNames({
            [classes.drawerOpenLogo]: isDrawerOpened,
            [classes.drawerCloseLogo]: !isDrawerOpened,
          })}
        >
          <Logo variant={"animated"} logoSrc={logoSrc} />
          <IconButton onClick={() => setDrawerState(false)}>
            <IconImage srcIcon={MenuIcon} />
          </IconButton>
        </div>
        <div className={classes.buttonMenu}>
          <IconButton
            onClick={() => setDrawerState(true)}
            className={classNames({
              [classes.drawerButtonClose]: isDrawerOpened,
              [classes.drawerButtonOpen]: !isDrawerOpened,
            })}
          >
            <IconImage srcIcon={MenuIcon} />
          </IconButton>
        </div>
        <div className={classes.padding6TB}>
          <LeftPanel />
        </div>
      </ResponsiveDrawer>
      <div className={classes.content}>
        <div className={classes.viewContainer}>
          <main className={classes.view}>{children}</main>
        </div>
      </div>
    </div>
  );
}
export default AppLayout;