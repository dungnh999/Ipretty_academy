
import {Avatar, Button, Typography, Grid, Menu, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip ,CircularProgress} from '@material-ui/core'
import IconImage from 'ipretty/components/IconImage'
import { makeStyles } from '@material-ui/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import contextHelper from 'ipretty/helpers/contextHelper'
import CloseIcon from '@material-ui/icons/Close'
import { useAuth } from "ipretty/context/AppProvider"
// import Echo from "laravel-echo"
import defaultChat from 'public/icon_svg/defaultChat.svg'
import Send from 'public/icon_svg/SendGreen.svg'
import Photo from 'public/icon_svg/Photo.svg'
import Info from 'public/icon_svg/Info.svg'
import More from 'public/icon_svg/More.svg'
import User from 'public/icon_svg/User.svg';
import Delete from  'public/icon_svg/Delete.svg';
import Attachemenet from 'public/icon_svg/Attachemenet.svg'
import MessengerService from 'ipretty/services/MessengerService'
import { useHistory } from "react-router-dom"
import moment from 'moment';
import UploadFile from 'ipretty/components/UploadFile/UploadFile';
// import { io } from "socket.io-client";
import Dialog from 'ipretty/components/Dialog/Dialog';
import { Picker } from 'emoji-mart';
import SmileyIcon from 'public/icon_svg/Smiley.svg';
import { useNotiStackContext } from 'ipretty/context/Notistack';
import { SOCKET_CONFIG } from 'ipretty/services/constances'
// window.io = require('socket.io-client');

const useStyles = makeStyles(theme => ({ 
    loandingListchat: {   
        "& .labelLoading":{
            
            },
            "& .loadingVisible":{
                display:'none',        
              },
            "& .loadingHidden":{
                visibility: 'hidden',  
                     
            },
            "& .loadingHidden":{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
            "& .contenListChatHidden":{
                visibility: 'hidden',
            },
            "& .contenListChatVisible":{
                opacity: '0',  
                visibility: 'visible',
            }
    },
    
    
}));

const Chat = ((props) => {
    const loandingListchat = useStyles()
    const { userId, classes, detailUserChat, reGetListChat} = props;
    const accept = useMemo(() => '.jpg,.jpeg,.gif,.png,.bmp', []);
    // const [loading, setLoading] = useState(false)
    const [loadingDeleteChat, setLoadingDeleteChat] = useState(false)
    const [avatarURL, setAvatarURL] = useState({ file: '' });
    // console.log(avatarURL, 'avatarURL ------')
    const [avatar, setAvatar] = useState(null)
    // console.log(avatar, 'avatar ------')
    const [conversations, setConversations] = useState([])
    const messagesEnd = useRef();
    const [message, setMessage] = useState('')  
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(false);
    const { renderAvatar } = contextHelper
    let history = useHistory()
    const [userChat, setUserChat] = useState({})
    const { user, getTranslation, hashMess, clickMess,onReceiveMessage } = useAuth()
    const messageInputRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isImage, setIsImage] = useState(false);
    const [isShowPopupCopy, setIsShowPopupCopy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (hashMess) {
            getListChat();
            clickMess(false)
        }
    }, [hashMess])

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }
    const [showEmoji, setShowEmoji] = useState(null)
    const openEmoj = Boolean(showEmoji);
    const { makeShortMessage } = useNotiStackContext();
   var count = 0;
   const [countFile, setCounntFile] = useState(0);
 
    if (typeof io !== 'undefined') {
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: SOCKET_CONFIG.SOCKET_HOSTNAME + ':' + SOCKET_CONFIG.SOCKET_PORT,
        });
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    
                    if (userId) {
                        setIsLoading(true);
                        getListChat()
                        getListMessenger(userId,true,() =>{    
                            scrollToBottom()                       
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 4000)
                        })                      
                    }

                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [userId]);

    // useEffect(() => {
    //     if (window.Echo) {
    //         window.Echo.channel(`User.${user.id}`).listen('.message', (data) => {
    //             getListMessenger(data.sender_id)
    //         })
    //     }
    // }, [window.Echo])

    useEffect(() => {
        let time;
        time = setInterval(() => {
            getListMessenger(userId)
        }, 3000);
        
        return () => clearInterval(time)
      }, [userId])
    function getListChat() {
        
        MessengerService.getListUserChat(
            {},
            res => {
                const response = res.data.data
                let _user = response.filter(item => item.id == userId)
                setUserChat(_user[0])
            },
            err => {
                console.log(err)
            }
        )
    }

    function getListMessenger(userId, scroll = false , cbFunction = null) {
        MessengerService.getListMessenger(
            userId,         
            res => {
                setConversations(res.data.data)
                const response = [...res.data.data]
                const responReverse = response.reverse();//dao nguoc mang response
                const lastReceiveMessage = responReverse.find(item => item.sender_id !== user.id)
                onReceiveMessage(lastReceiveMessage)
                if (response?.length) {
                    cbFunction && cbFunction()
                }
            },
            err => {
                console.log(err)
                cbFunction && cbFunction()
            }
        )
    }

    function useDefault(event) {
        event.target.src = '';
        setUseDefaultAvatar(true);
    }

    const scrollToBottom = () => {
        if (messagesEnd.current) {
            messagesEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    function removeFile() {
        setAvatar(null);
        setAvatarURL({ file: '' });
        setCounntFile(0);
    }

    function handleCickInfo(e, id, role, isTeacher) {
        e.preventDefault()
        let type = (role == 'user' ? 'Studentinformation' : (role == 'admin' ? 'Admininformation' : (role == 'employee' && isTeacher ? 'TeacherInformation' : 'Staffinformation')))
        history.push(`/users/${id}/detail?type=${type}`)
    }

    function handleDeleteListChat(e, id) {
        e.preventDefault()
    }
    function reportError(){
        history.push('/report-errors')
    }

    const sendMessage = () => {
        // console.log(userChat)
        if ((avatar || message !== '') && message !== null && message.match(/^\s+$/) === null) {
            const data = new FormData()
            data.append('receiver_id', userId)
            data.append('body', message)
            data.append('is_attachment', avatar)
            MessengerService.sendMenssenger(
                data,
                res => { 
                    setConversations([...conversations, res.data.data])
                    scrollToBottom()
                    setAvatar(null);
                    setAvatarURL({ file: '' });
                    setMessage('')  
                    if (!userChat) {
                        reGetListChat()
                    }
                },
                err => {

                }
            )
        }
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    function addEmoji(emoji) {
        setMessage(
            message + emoji.native
        )
    }
   
    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            sendMessage()
        }
    }

    function handleImageChange(e) {
        e.preventDefault()
        setAvatar(e.target.files[0]);
        setAvatarURL({ file: URL.createObjectURL(e.target.files[0]) });
        setIsImage(true);
    }

    const handleUpload = (nameField, value) => {
        count += 1;
        setCounntFile(count);
        if (count == 1) {
            setAvatar(value);
            setAvatarURL({ file: '' });
            setIsImage(false);
        } else {
            makeShortMessage(getTranslation("youCanOnlyUploadFile"), "error")
        }
    }
    function handleDelete(id_delete) {
        setLoadingDeleteChat(true);
        MessengerService.deleteMessage(
            id_delete,
            res => {
                setTimeout(() => {
                    makeShortMessage(getTranslation("deleteMessageSuccessfully"), "success")
                    setIsShowPopupCopy(false);
                    setAnchorEl(null);
                    setLoadingDeleteChat(false);
                    getListMessenger(userId)
                    history.push(`/chat`)
                }, 1000)
            },
            err => {
                setTimeout(() => {
                    setLoadingDeleteChat(false);
                }, 1000)
            }
        )
    }
    function confirmDelete(){
        setIsShowPopupCopy(true);
    }
    function handleClose(){
        setIsShowPopupCopy(false);
        setAnchorEl(null);
    }
    function handleDownloadFile(url){
        window.location.href = url; 
    }
    function sendEmoji(e) {
        e.preventDefault();
        setShowEmoji(e.currentTarget);
    }
    const handleCloseEmoj = () => {
        setShowEmoji(null);
      };

    // console.log(userChat)
    // console.log(detailUserChat)

    function menuSenderAction(sender) {
        return (
            <div className="right wrapper">
                <div className="button__info button__redirect">
                    <Tooltip title={getTranslation("ReportError")}>
                        <Button variant="outlined" color="primary" className="button-add--style" onClick={reportError} >
                            <IconImage srcIcon={Info} />
                        </Button>
                    </Tooltip>
                </div>
                <div className="button__more button__redirect">
                    <Button variant="outlined" color="primary" className="button-add--style" onClick={(e) => handleClick(e)}>
                        <IconImage srcIcon={More} />
                    </Button>
                    <div className="menu_list">
                        <Menu
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <List>
                                <ListItem button onClick={(e) => handleCickInfo(e, userId, sender.role, sender.isTeacher)}>
                                    <ListItemIcon>
                                        <img src={User} width={32} height={32} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={getTranslation("Personalpage")}
                                    />
                                </ListItem>
                                <ListItem button onClick={() => confirmDelete()}>
                                    <ListItemIcon>
                                        <img src={Delete} width={32} height={32} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={getTranslation("Delete")}
                                    />
                                </ListItem>
                            </List>
                            {isShowPopupCopy && (
                                <Dialog
                                    open={isShowPopupCopy}
                                    maxWidth="xs"
                                    onClose={handleClose}
                                    actionLabel={getTranslation('Delete')}
                                    action={() => handleDelete(sender.id)}
                                    noIcon={true}
                                    title={getTranslation('deleteChat')}
                                    getTranslation={getTranslation}
                                    loadingButton={loadingDeleteChat}                                 
                                >
                                    {getTranslation("wantToDeleteTheChat")}
                                </Dialog>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <>       
        <div className="list-chat"> 
        <div>          
            <div>            
                {conversations ? (
                <div className="action">
                    {userChat && Object.keys(userChat).length > 0 ? (             
                        <div className="action__header">
                            <div className="left wrapper">
                                <div className="action__header--avatart">
                                    <Avatar alt="Remy Sharp" src={userChat.avatar} />
                                </div>
                                <div className="action__header--name">
                                    <Typography>{userChat.name}</Typography>
                                </div>
                            </div>
                            {menuSenderAction(userChat)}                       
                        </div>
                        
                    ) : (
                        detailUserChat && Object.keys(detailUserChat).length > 0 &&
                            <div className="action__header">
                                <div className="left wrapper">
                                    <div className="action__header--avatart">
                                        <Avatar alt="Remy Sharp" src={detailUserChat.avatar} />
                                    </div>
                                    <div className="action__header--name">
                                        <Typography>{detailUserChat.name}</Typography>
                                    </div>
                                </div>
                                {menuSenderAction(detailUserChat)}
                                {/* <div className="right wrapper">
                                    <div className="button__info button__redirect">
                                            <Button variant="outlined" color="primary" className="button-add--style" onClick={(e) => handleClick(e)} >
                                            <IconImage srcIcon={Info} />
                                        </Button>
                                    </div>
                                    <div className="button__more button__redirect">
                                            <Button variant="outlined" color="primary" className="button-add--style" onClick={(e) => handleDeleteListChat(e, detailUserChat.id)} >
                                            <IconImage srcIcon={More} />
                                        </Button>
                                    </div>
                                </div> */}
                            </div>
                    )}

        <div className={loandingListchat.loandingListchat}>
            <div className={isLoading ? 'loadingHidden' : 'loadingVisible'}>      
                    {/* <span className="labelLoading">{label}</span>              */}
                    <CircularProgress size={56}  />
                </div>    
                <div className={isLoading ? 'contenListChatVisible' : 'contenListChatHiden'}>      
                    <Grid className={ avatar && countFile < 2 ? "action__content height_content" : "action__content"}>
                        {
                            conversations && conversations.map((value, index) => (
                                value.sender_id == user.id ? (
                                    <Grid  key={index} className="sender">
                                        <div className="message-time-sender">
                                            {moment.utc(value.updated_at).toDate().getDate() !== moment.utc().toDate().getDate() ? moment(value.updated_at).format('DD-MM-YYYY').concat(" " + value.created_at) : value.created_at}
                                        </div>
                                        <div className="message-main-sender">
                                            <div className="message-content">
                                                {value.body ?
                                                    <Tooltip title={moment.utc(value.updated_at).toDate().getDate() !== moment.utc().toDate().getDate() ? moment(value.updated_at).format('DD-MM-YYYY').concat(" " + value.created_at) : value.created_at}>
                                                        <div className="message-text">
                                                            {value.body}
                                                        </div>
                                                    </Tooltip>
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="message-main-sender">                                     
                                            <div className="message-content">                                            
                                                {value.is_attachment != null && value.is_attachment != 'null' && value.is_attachment != '' ? (
                                                    value.is_attachment.split('.').pop() == 'png' || value.is_attachment.split('.').pop() == 'jpg' || value.is_attachment.split('.').pop() == 'jpeg' ||
                                                        value.is_attachment.split('.').pop() == 'gif' || value.is_attachment.split('.').pop() == 'png' || value.is_attachment.split('.').pop() == 'bmp' ?
                                                        <Avatar
                                                            variant="square"
                                                            className={classes.backGround}
                                                            src={renderAvatar(value.is_attachment)}
                                                        /> :
                                                        <div className="message-file">
                                                            <span onClick={() => handleDownloadFile(value.is_attachment)}>{value.is_attachment.toString().split('/')[value.is_attachment.toString().split('/').length - 1]}</span>
                                                        </div>
                                                ) : ''}
                                            </div>
                                        </div>
                                    </Grid>
                                ) : (
                                    <Grid  key={index} className="receiver">
                                            <div className="message-time-receiver">
                                                {moment.utc(value.updated_at).toDate().getDate() !== moment.utc().toDate().getDate() ? moment(value.updated_at).format('DD-MM-YYYY').concat(" " + value.created_at) : value.created_at}
                                            </div>
                                            <div className="message-main-receiver">
                                                <div className="message-content">
                                                    {value.body ? 
                                                        <Tooltip title={moment.utc(value.updated_at).toDate().getDate() !== moment.utc().toDate().getDate() ? moment(value.updated_at).format('DD-MM-YYYY').concat(" " + value.created_at) : value.created_at}>
                                                            <div className="message-text">
                                                                {value.body}
                                                            </div>
                                                        </Tooltip>
                                                    : ''}
                                                </div>
                                            </div>
                                            <div className="message-main-receiver">
                                                <div className="message-content">
                                                    {value.is_attachment != null && value.is_attachment != 'null' && value.is_attachment != '' ? (
                                                        value.is_attachment.split('.').pop() == 'png' || value.is_attachment.split('.').pop() == 'jpg' || value.is_attachment.split('.').pop() == 'jpeg' ||
                                                            value.is_attachment.split('.').pop() == 'gif' || value.is_attachment.split('.').pop() == 'png' || value.is_attachment.split('.').pop() == 'bmp' ?
                                                            <Avatar
                                                                variant="square"
                                                                className={classes.backGround}
                                                                src={renderAvatar(value.is_attachment)}
                                                            /> :
                                                            <div className="message-file">
                                                                <span onClick={() => handleDownloadFile(value.is_attachment)}>{value.is_attachment.toString().split('/')[value.is_attachment.toString().split('/').length - 1]}</span>
                                                            </div>
                                                    ) : ''}
                                                   
                                                </div>
                                            </div>
                                    </Grid>
                                )
                            ))
                        }
                        <div style={{ float: "left", clear: "both" }}
                            ref={messagesEnd}>
                        </div>
                    </Grid>                
        </div>
            </div>
                </div>
             ) : (
                <div className="action__no-content">
                    <div className="content">
                        <div className="content__title">{getTranslation('youDoHaveAnyMessagesYet')}</div>
                        <div className="content__title">{getTranslation('pleaseAddFriendsToDiscussCoursesEasily')}</div>
                    </div>
                    <div className="background">
                        <img src={defaultChat} alt="" />
                    </div>
                </div> 
            )}</div>
        </div>
            <div className={avatar && countFile < 2 ? (isImage ? "action__footer action__footer-with-file_img" : (countFile == 1 ? "action__footer action__footer-with-file" : "action__footer")) : "action__footer"}>
                    <div className="chat-form__attachment">
                        <div className="chat-form__attachment--photo">
                            <label className="control-label" htmlFor="update-avatar" >
                                <IconImage srcIcon={Photo} />
                                <input
                                    type="file"
                                    id="update-avatar"
                                    accept={Array.isArray(accept) ? accept.join(',') : accept}
                                    className={classes.input}
                                    hidden={true}
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className="chat-form__attachment--attachment">
                            <UploadFile
                                classes={classes}
                                attachments={'render_option_attachment'}
                                handleUpload={handleUpload}
                                maxFiles={100}
                                isToBase64={false}
                                uploadMultipleFiles={false}
                                iconUpload={<IconImage srcIcon={Attachemenet} />}
                                acceptFile={'.doc, .docx, .pptx, application/ppt, application/pdf'}
                            />
                        </div>
                    </div>
                <div className="chat-form">
                    <div className="chat-form__input">
                        <div className={ avatar && countFile < 2 ? ( countFile == 1 ? "root__main__input__emoji emoji_file" : "root__main__input__emoji emoji_image") : "root__main__input__emoji"} >
                            <input
                                value={message}
                                onKeyDown={onEnterPress}
                                onChange={(e) => handleChange(e)}
                                placeholder={getTranslation("enterAMessage")}
                                ref={messageInputRef}
                            />
                            <IconImage onClick={(e) => sendEmoji(e)} srcIcon={SmileyIcon} />
                        </div>
                         {avatar && countFile < 2 && (
                            <div className="chat-form__input--render-avatar">
                                <div className="render-file">
                                    {avatarURL.file == '' ? (
                                        <div>{avatar.name}</div>
                                    ) : (
                                        <Avatar
                                            className={classes.avatar}
                                            src={avatarURL.file}
                                            onError={useDefault}
                                        />
                                    )}
                                    <div className="remove-file">
                                        <IconButton aria-label="delete" className="remove-file__button" onClick={removeFile}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 
                    <div className="chat-form__button">
                       <img src={Send} onClick={sendMessage} width={24} height={24}/>
                    </div>
                </div>
            </div>         
            <Menu
                open={openEmoj}
                anchorEl={showEmoji}
                onClose={handleCloseEmoj}
            >
                <div className={classes.emoji_child}>
                    <Picker
                        set='apple'
                        showPreview={false}
                        onSelect={(emoji) => addEmoji(emoji)}
                    />
                </div>
            </Menu>             
        </div>
        </>    
    )
})

export default Chat