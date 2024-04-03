import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import {
  drawerWidth,
  drawerWidthExpanded,
  drawerWidthExpandedHd,
  drawerWidthExpandedMobile,
} from "./consts";

const useStyles = makeStyles(
  (theme) => ({
    drawer: {
      left: 0,
      [theme.breakpoints.up("md")]: {
        width: drawerWidthExpandedHd,
      },
      [theme.breakpoints.up("xl")]: {
        width: drawerWidthExpanded,
      },
      flexShrink: 0,
      position: "fixed",
    },
    drawerDesktop: {
      background: theme.palette.background.backgroundGradient,
      border: "none",
      height: "100vh",
      overflow: "visible",
      padding: 0,
      position: "relative",
      transition: "width 0.3s ease",
      [theme.breakpoints.up("md")]: {
        width: drawerWidthExpandedHd,
      },
      [theme.breakpoints.up("xl")]: {
        width: drawerWidthExpanded,
      },
    },
    drawerDesktopSmall: {
      background: theme.palette.background.backgroundGradient,
      overflow: "visible",
      transition: "width 0.2s ease",
      width: drawerWidth,
    },
    drawerMobile: {
      background: theme.palette.background.backgroundGradient,
      width: drawerWidthExpandedMobile,
    },
    drawerOpen: (props) => ({
      [theme.breakpoints.up("md")]: {
        marginLeft: 0,
        width: props.small ? drawerWidthExpandedHd : drawerWidth,
      },
      [theme.breakpoints.up("xl")]: {
        width: props.small ? drawerWidthExpanded : drawerWidth,
      },
      // transition: theme.transitions.create("width", {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
      transition: 'box-shadow 0.3s 0.15s, transform 0.3s, margin-left 0.3s, margin-right 0.3s, width 0.3s, z-index 0s ease 0.3s, -webkit-transform 0.3s',
      overflow: "hidden",
      display: "block",
    }),
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowY: "hidden",
      display: "block",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
      },
      "& .MuiListItemText-root": {
        overflow: "hidden",
        height: 26,
        transition: 'height 4s'
      },
      "& .MuiTypography-body1": {},
    },
    paperAnchorDockedLeft: {
      border: "none",
      // backgroundColor: theme.palette.primary.background,
    },
  }),
  { name: "ResponsiveDrawer" }
);

const ResponsiveDrawer = (props) => {
  const { children, onClose, open, small, className } = props;

  const classes = useStyles(props);

  return (
    <>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          open={open}
          className={classNames(className, classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames(
              small ? classes.drawerDesktop : classes.drawerDesktopSmall,
              {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }
            ),
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          onClose={onClose}
          open={open}
          classes={{ paper: classes.drawerMobile }}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};
export default ResponsiveDrawer;
