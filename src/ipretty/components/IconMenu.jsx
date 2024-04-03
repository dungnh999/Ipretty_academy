import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage";

const useStyles = makeStyles(
    theme => ({
        root :{
            '& img' : {
                height : 24,
                marginTop : 4
            }
        },
        viewMore : {
            width : 153,
            fontSize : 16,
            fontFamily : 'San Francisco Text Bold',
            color : '#395B65',
            textAlign : 'center'
        }
}))

const ITEM_HEIGHT = 38;

export default function IconMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { options , icon} = props

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//   const handleAction = (action) => {
//         action()
//   };

  const renderMenu = (options) => {
    return options.map((item, index) => (
        <button className={classes.viewMore} onClick={item.handleAction} key={index}>
            {item.name}
        </button>
    ))
}
  return (
    <div  className={classes.root}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <IconImage  srcIcon={icon} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '18ch',
          },
        }}
      >
            {options && options.length > 0 && renderMenu(options)}
      </Menu>
    </div>
  );
}
