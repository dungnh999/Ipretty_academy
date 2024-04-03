import React from "react";
import { Button, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage";
import Down from '../../public/icon_svg/Down.svg'
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(
    theme => ({
    root :{
            marginRight : 16,
        '& .button__add-leader' : {
        }
    },
    viewMore : {
        width : 155,
        '& span' :{
            fontSize : 20,
            fontFamily : 'San Francisco Text Bold',
            color : '#395B65',
            // textAlign : 'center'
        }
    }
}))
export default function MenuButton(props) {
  const {listMenu , getTranslation , titleMenuButton} = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAction = (action) => {
    action()
  };

  const renderMenu = (listMenu) => {
    return listMenu.map((item, index) => (
        <ListItem button onClick={() => handleAction(item.action)} key={index}>
            {
                item.icon ? 
                    <ListItemIcon>
                        <IconImage  srcIcon={item.icon} />
                    </ListItemIcon>
                    : ''
            }
            <ListItemText
                className={classes.viewMore}
                primary={getTranslation(`${item.title}`)}
            />
        </ListItem>
    ))
}

  return (
    <div className={classes.root}>
        <Button
            variant="contained"
            color="primary"
            className="button button__add-leader"
            endIcon={<IconImage srcIcon={Down} />}
            onClick={handleClick}
        >
           {titleMenuButton}
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
            <List className={classes.ListItem} disablePadding>
                {listMenu && listMenu.length > 0 && renderMenu(listMenu)}
            </List>
        </Menu>
    </div>
  );
}
