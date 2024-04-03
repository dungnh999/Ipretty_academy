import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Link,
  Paper, 
  Collapse
} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { withRouter } from "react-router-dom";
import { useAuth } from "../../context/AppProvider";
import IconImage from "ipretty/components/IconImage";
import DashboardIcon from "public/icon_svg/Category.svg";
import AnnounceIcon from "public/icon_svg/Announce.svg";
import ContentIcon from "public/icon_svg/Newspaper.svg";
import FaqIcon from "public/icon_svg/Test.svg";
import MemberIcon from "public/icon_svg/Group.svg";
import CourseIcon from "public/icon_svg/graduation_cap.svg";
import { PERMISSIONS } from "ipretty/services/constances";
import SVG from "react-inlinesvg";
import FileWhiteIcon from 'public/icon_svg/FileDashboard.svg'
import { matchPath } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 12.5625rem)",
    },
    overflowX: "hidden",
    overflowY: "auto",
    "& .MuiListItem-gutters.nestedItem": {
      paddingLeft: 54,
      [theme.breakpoints.down("lg")]: {
        paddingLeft: 48
      },
    },
    "& .MuiListItem-gutters": {
      padding: "8px 5px",
      marginBottom: 10,
      [theme.breakpoints.down("lg")]: {
        padding: "8px 10px",
      },
    },
    "& .MuiListItemText-primary": {
      textTransform: "uppercase",
      fontWeight: 600,
    },
    "& .MuiList-root .MuiListItem-root": {
      "& .MuiTypography-body1": {
        fontSize: "1.25rem",
        color: "#A1AFAF",
        whiteSpace: "break-spaces",
        wordBreak: "break-word",
      },
      "& .MuiSvgIcon-root": {
        color: "#A1AFAF",
      },
      "& .MuiListItemIcon-root": {
        minWidth: 30,
        marginRight: 14,
        [theme.breakpoints.down("lg")]: {
          width: 24,
          minWidth: 24,
        },
      },
      "& ::-webkit-scrollbar": {
        width: 5,
      },
    },
  },
  selectedItem: {
    backgroundColor: "transparent!important",
    color: theme.palette.background.paper,
    "& .MuiListItemText-primary": {
      color: theme.palette.background.paper + "!important",
      textTransform: "uppercase",
      fontWeight: 600,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.background.paper + "!important",
    },
    "& svg path": {
      stroke: theme.palette.background.paper,
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
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 0px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "30px 0 14px 25px",
    },
    [theme.breakpoints.up("xl")]: {
      margin: "30px 0 14px 46px",
    },
    "& .MuiLink-underlineHover:hover": {
      textDecoration: "none!important",
    },
    "& .MuiListItem-button:hover": {
      color: theme.palette.background.paper,
      backgroundColor: "transparent!important",
      textDecoration: "none",
    },
  },
  scrollList: {
    height: "calc(100vh - 91px)",
    overflow: "auto",
    background: "transparent",
  },
  icon: {
    width: "30px",
    height: "30px",
    marginRight: "10px",

    "& img": {
      width: "100%",
      height: "100%",
    },
  },
}));

function LeftPanel({ history, location, match, openSidebar }) {
  const classes = useStyles();
  const { user, logout, getTranslation } = useAuth();
  const [openNestedMenu, setOpenNestedMenu] = React.useState(true);
  const categories = useMemo(() => {
    // permissions: "manage_courses,view_course,update_course,delete_course,manage_students,manage_leaders,manage_members,manage_lessons,manage_surveys,manage_dashboard,manage_contents,manage_faqs,manage_notifications"
    return [
      {
        title: "Dashboard",
        listPath: [""],
        pagePath: "/",
        permissions: [PERMISSIONS.MANAGE_DASHBOARD],
        icon: DashboardIcon,
        nested: false,
      },
      {
        title: getTranslation("CourseManagement"),
        listPath: ["courses"],
        pagePath: "/courses",
        permissions: [PERMISSIONS.MANAGE_COURSES, PERMISSIONS.MANAGE_STUDENTS],
        icon: CourseIcon,
        nested: false,
      },
      {
        title: getTranslation("memberManagement"),
        listPath: ["users", "students/uid", "users/add"],
        pagePath: "/users",
        permissions: [PERMISSIONS.MANAGE_MEMBERS],
        icon: MemberIcon,
        nested: false,
      },
      {
        title: getTranslation("contentManagement"),
        listPath: ["banners", "trademarks", "posts", "categories"],
        pagePath: "",
        permissions: [PERMISSIONS.MANAGE_CONTENTS],
        icon: ContentIcon,
        nested: true,
        nestedItems: [
          {
            title: getTranslation("CourseCategories"),
            listPath: ["categories"],
            pagePath: "/categories",
            permissions: [PERMISSIONS.MANAGE_COURSES],
            icon: CourseIcon,
          },
          {
            title: getTranslation("Postmanagement"),
            listPath: ["posts"],
            pagePath: "/posts",
            permissions: [PERMISSIONS.MANAGE_CONTENTS],
            icon: ContentIcon,
          },
          {
            title: getTranslation("Banner"),
            listPath: ["banners"],
            pagePath: "/banners",
            permissions: [PERMISSIONS.MANAGE_CONTENTS],
            icon: ContentIcon,
          },
          {
            title: getTranslation("Trademark"),
            listPath: ["trademarks"],
            pagePath: "/trademarks",
            permissions: [PERMISSIONS.MANAGE_CONTENTS],
            icon: ContentIcon,
          }
        ]
      },
      {
        title: getTranslation("transactionManagement"),
        listPath: ["transactions",],
        pagePath: "/transactions",
        permissions: [PERMISSIONS.MANAGE_DASHBOARD],
        icon: FileWhiteIcon,
        nested: false,
      },
      {
        title: getTranslation("faqManagement"),
        listPath: ["faqs"],
        pagePath: "/faqs",
        permissions: [PERMISSIONS.MANAGE_FAQS],
        icon: FaqIcon,
        nested: false,
      },
      {
        title: getTranslation("notificationManagement"),
        listPath: ["notifications"],
        pagePath: "/notifications",
        permissions: [PERMISSIONS.MANAGE_NOTIFICATIONS],
        icon: AnnounceIcon,
        nested: false,
      },

    ];
  }, []);

  React.useEffect(() => {
    if (!openSidebar) {
      setOpenNestedMenu(openSidebar)
    }
  }, [openSidebar])


  const listItemUI = (
    infoUser,
    index,
    {
      title,
      pagePath = "",
      permissions = [],
      listPath = [],
      icon,
      isPermissions,
      nested,
      nestedItems
    }
  ) => {
    const _permissions = infoUser.permissions
      ? infoUser.permissions.split(",")
      : [];
    const isPermission = permissions.some((per) => _permissions.includes(per));
    // if (isPermissions) pagePath = pagePath.replace(":id", company_id);
    if (isPermission) {
      if (nested) {
        const regex = new RegExp(listPath.join("|"), "g");
        return (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={openSidebar ? () => setOpenNestedMenu(!openNestedMenu) : () => history.push(nestedItems[0].pagePath) }
              selected={(regex.test(location.pathname))}
              classes={{ selected: classes.selectedItem }}
            >
              <ListItemIcon>
                <SVG src={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {openSidebar ? openNestedMenu ? <ExpandLess /> : <ExpandMore /> : ""}
            </ListItem>
            <Collapse in={openNestedMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {nestedItems ? nestedItems.map((childItem, indexChild) => (
                  <Link key={indexChild} href={`#${childItem.pagePath}`}>
                    <ListItem
                      button
                      selected={
                        !!matchPath(location.pathname, {
                          exact: pagePath === "/" || location.pathname == childItem.pagePath,
                          path: childItem.pagePath,
                        })
                      }
                      classes={{ selected: classes.selectedItem }}
                      className="nestedItem"
                    >
                      <ListItemText primary={childItem.title} />
                    </ListItem>
                  </Link>
                )) : ""}
              </List>
            </Collapse>
          </React.Fragment>

        );
      } else {
        return (
          <Link key={index} href={`#${pagePath}`}>
            <ListItem
              button
              // selected={(regex.test(location.pathname))}
              selected={
                !!matchPath(location.pathname, {
                  exact: pagePath === "/" || location.pathname == pagePath,
                  path: pagePath,
                })
              }
              classes={{ selected: classes.selectedItem }}
            >
              <ListItemIcon>
                <SVG src={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      <List className={`${classes.rootList} menuList`}>
        {categories.map((item, index) => listItemUI(user, index, item))}
      </List>
    </div>
  );
}

export default withRouter(LeftPanel);
  