import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import classNames from "classnames";
import useNavigator from "../../hook/useNavigator"
// import { IMenuItem } from "./menuStructure";

const useStyles = makeStyles(
  theme => ({
    root: {
      "& .MuiListItemIcon-root": {
        minWidth: 30,
      },
      "& .MuiTypography-root": {
        color: '#757575',
        // fontWeight: 'bold',
        fontSize: 14
      },
    },
    navDisplayFlex: {
      padding: 0
    },
    selectedItem: {
      background: '#dcdcdc'
    },
    linkText: {

    }
  }),
  { name: "MenuList" }
)

const MenuList = props => {
  const {
    className,
    menuItems,
    location,
  } = props;

  const classes = useStyles(props);
  const navigate = useNavigator();

  function gotoPage(menuItem) {
    navigate(menuItem.url);
  }

  function isActiveMenu (menuItem) {
    const patt = new RegExp("^\/home\/(information|billing|confidentiality).$");
    const pattDb = new RegExp("^\/home\/workspace\/(\d+)\/((firewall|endpoint|dashboard|vulnerability|monitoring|data-leak|web-scoring|license|best-practises)$|(firewall|endpoint|dashboard|vulnerability|monitoring|data-leak|web-scoring)\/((\d+)|add))$");
    return location === menuItem.url || (patt.test(menuItem.url) && patt.test(location)) || (pattDb.test(menuItem.url) && pattDb.test(location) );
  }


  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.navDisplayFlex}
      >
        {/* <ListItem>
          <ListItemText
            id="header-menu"
            primary={intl.formatMessage({ defaultMessage: "My Page Menu" })}
            className={classes.headerMenu}
          />
        </ListItem> */}
        {menuItems.map(menuItem => {
          return (
            <ListItem
              key={menuItem.ariaLabel}
              selected={isActiveMenu(menuItem)}
              button
              onClick={() => {
                gotoPage(menuItem)
              }}
              classes={{ selected: classes.selectedItem }}
              className={classes.linkText}
            >
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

}

MenuList.displayName = "MenuList";
export default MenuList;
