import React, { useEffect, useState } from "react";
import { Avatar, IconButton, LinearProgress, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useNavigator from "../../hook/useNavigator";
import { useAuth } from 'ipretty/context/AppProvider';
import ResponsiveDrawer from "./ResponsiveDrawer"
import Container  from "../../components/Container"
import { AddBox } from '@material-ui/icons';
import MenuList from "./MenuList";
import menuStructure from "./menuStructure";
import useRouter from "use-react-router";
import {HideMenuList} from './AppLayout'
import classNames from "classnames";
const useStyles = makeStyles(
  theme => ({
    root: {
      width: `100%`,
      display: 'flex',
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: 150,
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: 200,
      },
      [theme.breakpoints.up("xl")]: {
        paddingLeft: '12.656vw',
      },
      width: "100%",
    },
    sideBar: {
      [theme.breakpoints.down("sm")]: {
        padding: 0,
        position:'fixed',
        zIndex:2
      },
      [theme.breakpoints.up("sm")]: {
        width: 150,
      },
      [theme.breakpoints.up("lg")]: {
        width: 200,
      },
      [theme.breakpoints.up("xl")]: {
        width: '12.656vw',
      },
      background: theme.palette.primary.light,
      height: '100%',
      position: 'fixed',
      display:'flex',
      flexDirection:'column',
      top: '0',
    },
    showMenuList:{
      display:'none'
    },
    headerMenu: {
      fontWeight: 'bold',
      fontSize: 16,
      background: theme.palette.background.paper,
      padding: '0.938rem 25px 0.938rem'
    },
    appLoader: {
      height: 4,
      marginBottom: theme.spacing(2),
      zIndex: 1201
    },
    appLoaderPlaceholder: {
      height: 4,
      marginBottom: theme.spacing(2)
    },
    viewContainer: {
      minHeight: `calc(100vh - ${theme.spacing(2) + 4 + 70}px)`,
      // paddingTop: '3.375rem',
    },
    view: {
      // backgroundColor: theme.palette.background.default,
      flex: 1,
      flexGrow: 1,
      marginLeft: 0,
      // padding: '25px 29px'
    },
    menuHeader: {
      background: theme.palette.background.paper,
      fontWeight: 'bold',
      fontSize: 16,
      height: '3.375rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuStructure: {
      "& .MuiListItem-button:hover": {
        background: theme.palette.primary.contrastText,
      }
    },
    title: {
      padding: '0.938rem 23px',
      zIndex: 9,
      width: '100%',
      background: theme.palette.primary.contrastText,
      "& .MuiTypography-root": {
        color: theme.palette.text.hint,
        fontWeight: 'bold'
      }
    }
  }),
  {
    name: "ProfileLayout"
  });


const ProfileLayout = ({ children }) => {
  const classes = useStyles({});
  const navigate = useNavigator();
  const { getTranslation } = useAuth();
  const { location } = useRouter();
  const menuItems = menuStructure.createMenuStructure();

  const [title, setTitle] = React.useState(getTranslation('Dashboard'));

  React.useEffect(() => {
    renderTitlePage()
  }, [location.pathname])

  function renderTitlePage(){
    if (/home\/confidentiality/.test(location.pathname)) {
      setTitle(getTranslation("Confidentiality"))

    } else if (/home\/billing\/address\/create/.test(location.pathname)) {
      setTitle(getTranslation("Create Billing"))

    } else if (/home\/billing\/payment\/create/.test(location.pathname)) {
      setTitle(getTranslation("Create Payment"))

    }else if (/home\/billing/.test(location.pathname)) {
      setTitle(getTranslation("Billing"))

    }else if (/home\/workspaces\/(\d+)/.test(location.pathname)) {
      setTitle(getTranslation("Workspaces"))

    }else if (/home\/workspaces/.test(location.pathname)) {
      setTitle(getTranslation("Workspace creation"))

    }else if (/home/.test(location.pathname)) {
      setTitle(getTranslation("My information"))

    }else {
      setTitle(getTranslation("My information"))
    }
  }

  return (
    <div className={classes.root}>
        <div className={classes.sideBar}
        >
        <div className={classes.headerMenu}>
          {getTranslation('Compte Utilisateur')}
        </div>
        <div className={classes.menuStructure}>
          <MenuList
             menuItems={menuItems}
             location={location.pathname}
           />
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <Typography>{title}</Typography>
        </div>
        <div className={classes.viewContainer}>
          <main className={classes.view}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout;
