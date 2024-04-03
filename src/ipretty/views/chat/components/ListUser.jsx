
import Search from 'ipretty/components/Search'
import React, { useState } from 'react'
import { useAuth } from "ipretty/context/AppProvider"
import { Avatar, Typography , Hidden , makeStyles, Link } from '@material-ui/core'
import Dialog from 'ipretty/components/Dialog/Dialog';
import Skeleton from 'ipretty/components/Skeleton';
import { ArrowBackIos } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import IconStatusOnline from "../../../../public/icons_ipretty/IconStatus.png";
import IconStatusOffLine from "../../../../public/icons_ipretty/Icon_Status_OffLine.png";

const useStyles = makeStyles(theme => ({ 
    chat: {
        '& .user': {
            display: 'flex',
            paddingBottom: '6px',
            '& .none_user__name': {
                paddingLeft: '25px'
            }
        },
        [theme.breakpoints.down("sm")]: {
            '& .MuiFormControl-root': {
                minWidth: '300px !important'
            },
            paddingLeft: '40px'
        },
        [theme.breakpoints.down("xs")]: {
            '& .MuiFormControl-root': {
                minWidth: '250px !important'
            },
            paddingLeft: '10px'
        },
    },
    skeleton_text: {
        paddingTop: '20px'
    },
    backLink: {
        display : "flex",
        fontFamily: 'San Francisco Text',
        fontWeight: '600',
        fontSize: '16px',
        color: '#395B65',
        "& .MuiSvgIcon-fontSizeSmall": {
          marginTop: '2px',
          fontSize: '1.1rem'
        },
        [theme.breakpoints.up("1600")]: {
            paddingLeft: '80px',
        },
        [theme.breakpoints.down("1600")]: {
            paddingLeft: '50px',
        },
        [theme.breakpoints.down("1200")]: {
            paddingLeft: '30px',
        },
        [theme.breakpoints.down("800")]: {
            paddingLeft: '5px',
        },
      },
}))

const ListUser = React.memo((props) => {
    const { listChat, handleSearch, handleListChat, userId, user, resetValue } = props
    const { getTranslation } = useAuth();
    const classes = useStyles();
    let history = useHistory()
    const [openDialogSearch, setOpenDialogSearch] = useState(false)
    function handleClickListUser() {
        setOpenDialogSearch(true);
    }
    function handleCloseListUser() {    
        setOpenDialogSearch(false)
    }
    function limitMessage(str) {
        if (screen.width < 1400 && str && str.length > 15) {
            return str.substring(0, 10) + '...';
        } else if (screen.width > 1400 && str && str.length > 30)
            return str.substring(0, 30) + '...';
        else
            return str;
    }

    // console.log(hideChat)
    // console.log(hideId)

    function listUser() {
        return listChat ?
            // listChat.length > 0 ?
            Array.isArray(listChat) ?
            listChat.map((item, indexUser) => (
                <div className={userId == item.id ? "user_hightlight" : "user"} onClick={(e) => handleListChat(e, item.id)} key={indexUser}>
                    <div className="user__avatar">
                        <Avatar alt="Remy Sharp" src={item.avatar} />
                    </div>
                    {(!userId || userId != item.id) && item.unread_messages > 0 && !userId ? (
                        <div className="circle">
                            <Typography>{item.unread_messages}</Typography>
                        </div>
                    ) : (
                        !item.latest_active_at || moment(new Date()).diff(moment(item.latest_active_at)) < 1800000 ?
                            <div className="circle__no-data"><img src={IconStatusOnline} />
                            </div> : <div className="circle__no-data"><img src={IconStatusOffLine} /></div>
                    )}
                    <div className={openDialogSearch ? "none_user__name" : "user__name"}>
                        <Hidden smDown>
                            {userId == item.id ? <Typography className="user__name_color">{item.name}</Typography> : <Typography>{item.name}</Typography>}
                            {
                                <div className="user_name_message">
                                    <div className="user_name_message_limit">{limitMessage(item.mess_last)}</div>
                                    <span>{item.last_message_sent_time ? (moment.utc(item.last_message_sent_time).toDate().getDate() === moment.utc().toDate().getDate() ? item.last_message_sent_time.substring(10, item.last_message_sent_time.length - 3) : moment.utc(item.last_message_sent_time).locale(user.lang).fromNow()) : ""}</span>
                                </div> 
                            }                 
                        </Hidden>
                        {openDialogSearch ? <Typography>{item.name}</Typography> : ''}
                    </div>
                </div>
            )) : <Hidden smDown><div className="no_user">{getTranslation('noData')}</div></Hidden> : ''
    }
    return (
        <div className="list-user">
            <Hidden smDown>
                <Link
                    id="linkBack"
                    component="button"
                    variant="body2"
                    classes={{
                        root: classes.backLink
                    }}
                    onClick={() => {
                        history.push('/')
                    }
                    }
                >
                    <ArrowBackIos fontSize="small" />
                    {getTranslation('Back')}
                </Link>
            </Hidden>
            <div className="search">
                <Hidden mdUp>
                    <SearchIcon color={'secondary'} onClick={handleClickListUser} />
                </Hidden>
                <Hidden smDown>
                    <Search onSearch={handleSearch} fieldName={[]} placeholder={getTranslation('SearchForUnit') + '...'} resetValue={resetValue} />
                </Hidden>
            </div>
            {listUser()}
            {openDialogSearch && (
                <Dialog
                    open={openDialogSearch}
                    maxWidth="xs"
                    onClose={handleCloseListUser}
                >
                    <div className={classes.chat}>
                        <Search onSearch={handleSearch} fieldName={[]} placeholder={getTranslation('SearchForUnit') + '...'} resetValue={resetValue}/>
                    </div>
                </Dialog>
            )}
        </div>
    )
})

export default ListUser