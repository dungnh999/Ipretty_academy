import React, {useState} from "react";
import {Toolbar, makeStyles, Menu, List, ListItem, Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  toolbarRoot: {
    width: "100%",
    "& .MuiButton-textPrimary": {
      color: '#395B65',
      background: 'none',
    },
    "& .MuiButton-text": {
      color: '#395B65',
      padding: '0px'
    }
  },
  menuList: {
    minWidth: theme.spacing(22.5),
    padding: '0px'
  },
  listRoot: {
    backgroundColor: '#147B65'
  },
  menuicon: {
    justifyContent: "flex-start",
    cursor: 'pointer'
  },
}));

function LeftPanelMini({leftPanel}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClose() {
    setAnchorEl(null);
  }
  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Toolbar className={classes.toolbarRoot}>
      <Button onClick={handleClick} color='primary' className={classes.menuicon}>
        {open ? <Close/> : <MenuIcon/>}
      </Button>
      <Menu
        open={open} onClose={handleClose} keepMounted
        anchorEl={anchorEl} getContentAnchorEl={null} classes={{list: classes.menuList}}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
      >
        <List className={classes.listRoot} disablePadding>
          <ListItem>
            {leftPanel}
          </ListItem>
        </List>
      </Menu>
    </Toolbar>
  );
}

export default LeftPanelMini;
