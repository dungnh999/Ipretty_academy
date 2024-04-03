
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import { useAuth } from "ipretty/context/AppProvider"
import MessengerService from 'ipretty/services/MessengerService'
// import Echo from "laravel-echo"
import ListUser from '../components/ListUser'
import Chat from '../components/Chat'
import defaultChat from 'public/icon_svg/defaultChat.svg'
import UserService from 'ipretty/services/UserService'
// import { io } from "socket.io-client";
import { SOCKET_CONFIG } from 'ipretty/services/constances'
// window.io = require('socket.io-client');
const useStyles = makeStyles(
    theme => ({
        emoji_child: {
            '& span': {
                cursor: 'pointer'
            },
            "& .emoji-mart-scroll": {
                "& .emoji-mart-category": {
                    "& .emoji-mart-category-list": {
                        "& li:hover": {
                            cursor: 'pointer',
                            '& span': {
                                cursor: 'pointer'
                            }
                        }
                    }
                }
            }
        },
        chat: {
            display: 'flex',
            backgroundColor: '#DADFD9 !important',
            [theme.breakpoints.up("md")]: {
                height: 'calc(100vh - 5.685rem)',
            },
            [theme.breakpoints.down("sm")]: {
                "@media screen and (max-height: 1000px)": {
                    height: 'calc(100vh + 4.685rem)',
                },
                "@media screen and (min-height: 1000px)": {
                    height: 'calc(100vh - 5.685rem)',
                },
            },
            [theme.breakpoints.down("xs")]: {
                height: 'calc(100vh - 5.685rem)',
            },
            '& section': {
                cursor: 'pointer'
            },
            "& .action__no-content": {
                flex: 3,
                display: 'flex',
                background: '#FFF',
                flexDirection: 'column',
                justifyContent: 'center',
                "& .content": {  
                    background: '#F4F6F3',
                    borderRadius: 16,
                    [theme.breakpoints.up("1400")]: {
                        width: '798px',
                        height: '108px',
                        padding: '22px 40px',
                    },
                    [theme.breakpoints.down("1400")]: {
                        width: '550px',
                        height: 'auto',
                        padding: '10px 20px',
                    },
                    [theme.breakpoints.down("xs")]: {
                        width: '265px',
                        height: 'auto',
                        padding: '10px 20px',
                    },
                    margin: '0 auto',
                    '& .content__title': {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        lineHeight: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#A1AFAF'
                    }
                },
                "& .background": {
                    margin: '0 auto',
                    '& img':{
                        height: '29rem',
                        marginTop: '72px',
                        [theme.breakpoints.down("1400")]: {
                            height: '23rem',
                        },
                        [theme.breakpoints.down("md")]: {
                            width: '85%',
                            height: '21rem',
                        },
                        [theme.breakpoints.down("sm")]: {  
                            "@media screen and (max-height: 1000px)": {
                                width: '60%',
                                marginTop: '0px',
                            },
                            "@media screen and (min-height: 1000px)": {
                                width: '85%',
                                marginTop: '21rem',
                            },
                        },
                        [theme.breakpoints.down("xs")]: {
                            width: '100%',
                        },

                    }
                }
            },
            "& .list-user": {
                overflowX: 'hidden',
                padding: '24px 0px 68px 0px',
                [theme.breakpoints.up("1700")]: {
                    minWidth: '36rem',   
                },
                [theme.breakpoints.down("1700")]: {
                    minWidth: '31rem'
                },
                [theme.breakpoints.down("1200")]: {
                    minWidth: '29rem'
                },
                [theme.breakpoints.down("sm")]: {
                    flex: 0,
                    padding: '10px',
                    overflowY: 'scroll',
                    paddingRight: '70px',
                    overflowX: 'hidden',
                    minWidth: '0px'
                },
                "& .user": {
                    display: 'flex',  
                    [theme.breakpoints.up("1600")]: {
                        padding: '10px 31px 10px 80px',
                    },
                    [theme.breakpoints.down("1600")]: {
                        padding: '10px 31px 10px 50px',
                    },
                    [theme.breakpoints.down("1050")]: {
                        padding: '10px 31px 10px 30px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: '10px 31px 10px 5px',
                    },
                    borderBottom: '1px solid #dddd',
                    "&:hover": {
                        cursor: 'pointer',
                    },
                    "& .user__name": {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '18px',
                        lineHeight: '24px',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#6F9396',
                        marginLeft: '23px',
                        [theme.breakpoints.down("sm")]: {
                            marginLeft: '-15px'
                        },
                        '& .MuiTypography-root': {
                            fontFamily: 'San Francisco Text',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            letterSpacing: '-0.011em',
                            color: '#395B65',
                        }, 
                        '& .user_name_message': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            [theme.breakpoints.up("1600")]: {
                                width: '400px',
                            },
                            [theme.breakpoints.down("1600")]: {
                                width: '300px',
                            }, 
                            '& .user_name_message_limit': {
                                [theme.breakpoints.up("1600")]: {
                                    width: '275px',
                                },
                                [theme.breakpoints.down("1600")]: {
                                    width: '185px',
                                },
                            },            
                        }
                    },
                    "& .none_user__name": {
                        display: 'none',
                    },
                    "& .circle": {
                        minWidth: 18,
                        height: 18,
                        background: 'red',
                        borderRadius: '50%',
                        position: 'absolute',
                        marginLeft: '32px',
                        "& .MuiTypography-root": {
                            fontSize: 12,
                            color: '#FFF',
                            textAlign: 'center'
                        }
                    },
                    "& .circle__no-data": {
                        minWidth: 12,
                        height: 12,
                        marginTop: '25px',
                        position: 'relative',
                        marginLeft: '-11px',
                        '& img': {
                            width: '12px',
                            height: '12px'
                        }
                    }
                },
                "& .user_hightlight": {
                    [theme.breakpoints.up("1600")]: {
                        padding: '10px 31px 10px 80px',
                    },
                    [theme.breakpoints.down("1600")]: {
                        padding: '10px 31px 10px 50px',
                    },
                    [theme.breakpoints.down("1050")]: {
                        padding: '10px 31px 10px 30px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: '10px 31px 10px 5px',
                    },
                    borderBottom: '1px solid #dddd',
                    [theme.breakpoints.up("md")]: {
                        backgroundColor: '#F4F6F3',
                    }, 
                    display: 'flex',
                    "&:hover": {
                        cursor: 'pointer',
                    },
                    "& .user__name": {
                        fontFamily: 'San Francisco Text',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '1.125rem',
                        lineHeight: '1.5rem',
                        alignItems: 'center',
                        letterSpacing: '-0.011em',
                        color: '#6F9396',
                        marginLeft: '23px',
                        [theme.breakpoints.down("sm")]: {
                            marginLeft: '-15px'
                        },
                        '& .MuiTypography-root': {
                            fontFamily: 'San Francisco Text',
                            fontStyle: 'normal',
                            fontWeight: 'normal', 
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            letterSpacing: '-0.011em',
                            color: '#395B65',
                        }, 
                        '& .user__name_color': {
                            fontFamily: 'San Francisco Text',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',            
                            alignItems: 'center',
                            letterSpacing: '-0.011em', 
                            color: '#395B65',
                        },
                        '& .user_name_message': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            [theme.breakpoints.up("1600")]: {
                                width: '400px',
                            },
                            [theme.breakpoints.down("1600")]: {
                                width: '300px',
                            }, 
                            '& .user_name_message_limit': {
                                [theme.breakpoints.up("1600")]: {
                                    width: '275px',
                                },
                                [theme.breakpoints.down("1600")]: {
                                    width: '185px',
                                },    
                            },        
                        }
                    },
                    "& .none_user__name": {
                        display: 'none',
                    },
                    "& .circle": {
                        width: 18,
                        height: 18,
                        background: 'red',
                        borderRadius: '50%',
                        "& .MuiTypography-root": {
                            fontSize: 12,
                            color: '#FFF',
                            textAlign: 'center'
                        }
                    },
                    "& .circle__no-data": {
                        minWidth: 12,
                        height: 12,
                        marginTop: '25px',
                        position: 'relative',
                        marginLeft: '-11px',
                        '& img': {
                            width: '12px',
                            height: '12px'
                        }
                    }
                },
                '& .no_user': {
                    [theme.breakpoints.up("1600")]: {
                        paddingLeft: '80px',
                        width: '560px'
                    },
                    [theme.breakpoints.down("1600")]: {
                        paddingLeft: '50px',
                        width: '300px'
                    },
                },
                "& .search": {
                    marginBottom: 27,
                    [theme.breakpoints.up("1600")]: {
                        paddingLeft: '80px',
                        "& .MuiFormControl-root": {
                            width: '100%'
                        },
                    },
                    [theme.breakpoints.down("1600")]: {
                        paddingLeft: '50px',
                        "& .MuiFormControl-root": {
                            width: '100%'
                        },
                    },
                    [theme.breakpoints.down("1200")]: {
                        paddingLeft: '30px',
                        "& .MuiFormControl-root": {
                            width: '95%'
                        },
                    },
                    [theme.breakpoints.down("900")]: {
                        paddingLeft: '5px !important',
                    },
                    '& .MuiInput-root': {
                        background: '#F3F3F3',
                        [theme.breakpoints.up("1600")]: {
                            minWidth: '464px',
                        },
                        [theme.breakpoints.down("1600")]: {
                            minWidth: '300px',
                        },  
                        [theme.breakpoints.down("1200")]: {
                            minWidth: '200px'
                        },
                        height: '36px',
                        marginTop: '20px',
                        [theme.breakpoints.down("sm")]: {
                            minWidth: '46px'
                        },
                    },
                    [theme.breakpoints.down("sm")]: {
                        '& svg': {
                            marginTop: '20px',
                            marginLeft: '10px' 
                        }
                    },
                }
            },
            "& .list-chat": {
                display: 'flex',
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFF',
                position:'relative',
                "& .action__no-content": {
                    display: 'flex',
                    background: '#FFF',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100vh',
                    "& .content": {
                        margin: '20px 60px',
                        padding: '10px 20px',
                        background: '#F4F6F3',
                        borderRadius: 16,
                    },
                    "& .background": {
                        margin: '0 auto',   
                    }
                },
                "& .action": {
                    flex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFF',
                    "& .action__header": {
                        height: '96px',
                        background: '#FFF',
                        borderBottom: '1px solid #DADFD9',
                        [theme.breakpoints.up("md")]: {
                            padding: '20px 50px',
                            display: 'flex',
                        },
                        [theme.breakpoints.down("sm")]: {
                            padding: '10px 30px',
                            display: 'flex',
                        },
                        [theme.breakpoints.down("xs")]: {
                            display: 'flex',
                            padding: '0px 10px',
                        },
                        '& .MuiButton-label':{
                            '& div': {
                                width: '26.67px !important',
                                height: '26.67px !important'
                            },
                            '& img': {
                                width: '26.67px !important',
                                height: '26.67px !important'
                            },
                        },
                        justifyContent: 'space-between',
                        "& .wrapper": {
                            display: 'flex',
                            alignItems: 'center',
                            "& .action__header--name": {
                                '& .MuiTypography-root': {
                                    marginLeft: 20,
                                    fontFamily: 'San Francisco Text',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    lineHeight: '24px',
                                    alignItems: 'center',
                                    letterSpacing: '-0.011em',
                                    color: '#6F9396',
                                },
                            },
                            "& .button__redirect": {
                                [theme.breakpoints.up("md")]: {
                                    width: '43px',
                                },
                                "& .MuiButtonBase-root": {
                                    border: 'none',
                                    "&:hover": {
                                        background: "#FFF"
                                    }
                                },
                            }
                        },  
                    },
                    "& .action__content": {
                        overflow: 'scroll',
                        [theme.breakpoints.up("md")]: {
                            padding: '38px  50px 0px 50px',
                            height: 'calc(100vh - 290px)',
                        },
                        [theme.breakpoints.down("md")]: {
                            padding: '38px  50px 0px 50px',
                            height: 'calc(100vh - 335px)',
                        },
                        [theme.breakpoints.down("1050")]: {
                            padding: '28px 30px 0px 30px',
                            height: 'calc(100vh - 265px)',
                        },
                        [theme.breakpoints.down("sm")]: {
                            padding: '28px 20px 0px 20px',    
                            "@media screen and (max-height: 1000px)": {
                                height: 'calc(100vh - 150px)'
                            },
                            "@media screen and (min-height: 1000px)": {
                                height: 'calc(100vh - 280px)'
                            },
                        },
                        [theme.breakpoints.down("xs")]: {
                            padding: '18px 20px 0px 20px',
                            height: 'calc(100vh - 280px)',
                        },
                        "& .sender": {
                            "&+.sender .message-time-sender": {
                                display: 'none',
                            }
                        },
                        "& .receiver": {
                            "&+.receiver .message-time-receiver": {
                                display: 'none',
                            }
                        },
                        "& .message-time-sender": {
                            color: '#6F9396',
                            textAlign: 'end'
                        },
                        "& .message-time-receiver": {
                            color: '#6F9396',
                            textAlign: 'start'
                        },
                        "& .message-main-receiver": {
                            display: 'flex',
                            justifyContent: 'start',
                            paddingTop: '5px',
                            "& .message-content": {
                                [theme.breakpoints.up("md")]: {
                                    marginRight: '50%',
                                },
                                "& .message-text": {
                                    background: '#F4F6F3',
                                    borderRadius: 16,
                                    color: '#395B65',
                                    padding: '7px 10px',
                                    wordBreak: 'break-word',
                                    cursor: 'default'
                                },
                                "& .message-file": {
                                    background: '#F0F2F5',
                                    borderRadius: 16,
                                    color: '#3178AF',
                                    padding: '7px 10px',
                                    wordBreak: 'break-word',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                },
                                [theme.breakpoints.up("md")]: {
                                    '& .MuiAvatar-root': {
                                        width: '360px',
                                        height: '205px'
                                    }
                                },
                                [theme.breakpoints.down("sm")]: {
                                    '& .MuiAvatar-root': {
                                        width: '180px',
                                        height: '103px'
                                    }
                                },
                            }
                        },
                        "& .message-main-sender": {
                            display: 'flex',
                            flexDirection: 'row-reverse',//Tin nhắn gửi nên ở bên phải 
                            paddingTop: '5px',
                            "& .message-content": {
                                [theme.breakpoints.up("md")]: {
                                    marginLeft: '50%',
                                },
                                justifyItems: 'end',
                                "& .message-text": {
                                    background: '#395B65',
                                    borderRadius: 16,
                                    color: '#FFFFFF',
                                    padding: '7px 10px',
                                    wordBreak: 'break-word',
                                    cursor: 'default'
                                },
                                "& .message-file": {
                                    background: '#F0F2F5',
                                    borderRadius: 16,
                                    color: '#3178AF',
                                    padding: '7px 10px',
                                    wordBreak: 'break-word',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                },
                                [theme.breakpoints.up("md")]: {
                                    '& .MuiAvatar-root': {
                                        width: '360px',
                                        height: '205px'
                                    }
                                },
                                [theme.breakpoints.down("sm")]: {
                                    '& .MuiAvatar-root': {
                                        width: '180px',
                                        height: '103px'
                                    }
                                },
                             
                            }
                        }
                    },
                    '& .height_content': {
                        [theme.breakpoints.up("md")]: {
                            padding: '0 50px',
                            height: 'calc(100vh - 350px) !important',
                        },
                        [theme.breakpoints.down("md")]: {
                            padding: '0 50px',
                            height: 'calc(100vh - 335px) !important',
                        },
                        [theme.breakpoints.down("1050")]: {
                            padding: '0 30px',
                            height: 'calc(100vh - 265px) !important',
                        },
                        [theme.breakpoints.down("sm")]: {
                            padding: '0 20px',
                            "@media screen and (max-height: 1000px)": {
                                height: 'calc(100vh - 200px) !important'
                            },
                            "@media screen and (min-height: 1000px)": {
                                height: 'calc(100vh - 350px) !important'
                            },
                        },
                        [theme.breakpoints.down("xs")]: {
                            padding: '0 20px',
                            height: 'calc(100vh - 344px) !important',
                        },
                    }
                },
                "& .action__footer": {
                    background: '#FFF',
                    borderTop: '1px solid #DADFD9',
                    [theme.breakpoints.up("md")]: {
                        display: 'flex',
                        padding: '20px 50px',
                    },
                    [theme.breakpoints.down("sm")]: {
                        padding: '15px 20px',
                        height: '165px',
                    },
                    [theme.breakpoints.down("xs")]: {
                        padding: '15px 20px',
                        height: '230px',
                    },
                    justifyContent: 'space-between',
                    "& .chat-form__attachment": {
                        display: 'flex',
                        alignItems: 'center',
                        "& .chat-form__attachment--attachment": {
                            marginLeft: 10,
                            "& button": {
                                border: '0',
                                background: '#FFF'
                            }
                        },
                    },
                    '& .chat-form': {
                        display: 'flex',
                        [theme.breakpoints.up("md")]: {
                            flex: 1
                        },
                        "& .chat-form__input": {
                            flex: 2,
                            marginRight: '6px',
                            [theme.breakpoints.up("md")]: {
                                margin: '5px 25px',
                                width: '100%'
                            },
                            [theme.breakpoints.down("sm")]: {
                                '& input': {
                                    marginTop: '5px !important'
                                },
                            },
                            "& input": {
                                width: '100%',
                                borderRadius: 30,
                                border: '0',
                                padding: 10,
                                background: '#F4F6F3',
                                '&:focus-visible': {
                                    outline: 'none'
                                }
                            },
                            '& .root__main__input__emoji': {
                                display: 'flex',
                                border: '1px solid #F4F6F3',
                                borderRadius: '30px',
                                backgroundColor: '#F4F6F3',
                                cursor: 'pointer',
                                '& div': {
                                    alignSelf: 'center',
                                    marginRight: '6px',
                                    // paddingTop: '10px'
                                },
                            },
                            '& .emoji_image': {
                                '& div': {
                                    paddingTop: '40px'
                                }
                            },
                            '& .emoji_file': {
                                '& div': {
                                    paddingTop: '10px'
                                }
                            }
                        },
                        "& .chat-form__button": {
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            "& button": {
                                backgroundColor: '#FFF',
                                [theme.breakpoints.down("sm")]: {
                                    minWidth: '50px',
                                },
                                "& .hover": {
                                    backgroundColor: '#FFF',
                                    boxShadow: 'none',
                                    border: 'none',
                                    width: '0px',
                                    height: '0px',
                                }
                            }
                        },
                    },
                },
                "& .action__footer-with-file_img": {
                    height: '310px',
                    "& .chat-form__input": {
                        borderRadius: '15px',
                        background: '#F4F6F3',
                        marginRight: '6px',
                        "& .chat-form__input--render-avatar": {
                            margin: '0px 0px 10px 20px',
                            position: 'relative',
                            alignItems: 'center',
                            width: '90%',
                            border: '0',
                            background: '#F4F6F3',
                            "& .render-file": {
                                position: 'relative',
                                width: 60,
                                "& .MuiAvatar-root": {
                                    borderRadius: 0,
                                    width: 60,
                                    height: 60
                                },
                                "& .remove-file": {
                                    position: 'absolute',
                                    top: '-11px',
                                    right: '-10px',
                                    borderRadius: '50%',
                                    background: 'aliceblue',
                                    "& .MuiButtonBase-root": {
                                        padding: 0
                                    },
                                }
                            }
                        }
                    }
                },
                "& .action__footer-with-file": {
                    "& .chat-form__input": {
                        borderRadius: '15px',
                        background: '#F4F6F3',
                        "& .chat-form__input--render-avatar": {
                            margin: '0px 0px 0px 20px',
                            position: 'relative',
                            alignItems: 'center',
                            width: '90%',
                            border: '0',
                            background: '#F4F6F3',
                            "& .render-file": {
                                position: 'relative',
                                width: 'auto',
                                display: 'flex',
                                '& div': {
                                    wordBreak: 'break-all',
                                },
                                "& .remove-file": {
                                    position: 'relative',
                                    top: '-11px',
                                    [theme.breakpoints.down("sm")]: {
                                        marginRight: '11px',
                                        marginBottom: '44px'
                                    },
                                    borderRadius: '50%',
                                    background: 'aliceblue',
                                    "& .MuiButtonBase-root": {
                                        padding: 0
                                    },
                                }
                            }
                        }
                    }
                },
            }
        },
    })
)

function HomeView(props) {
    const { match: { params } } = props;
    const { getTranslation, user, hashMess, clickMess, receiveMessage } = useAuth();
    const { userId } = params;
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    let history = useHistory()
    const [listChat, setListChat] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [keyword, setKeyword] = useState({})
    const [messengers, setMessengers] = useState([])
    const [haveMessage, setHaveMessage] = useState(false)
    const [countReceiverSeen, setCountReceiverSeen] = useState(0)
    const [showUnreadMessages, setShowUnreadMessages] = useState(true)
    const [detailUserChat, setDetailUserChat] = useState({})
    const [resetValue, setResetValue] = useState(false);
    // const [showColor, SetShowColor] = useState();

    // if (typeof io !== 'undefined') {
    //     window.Echo = new Echo({
    //         broadcaster: 'socket.io',
    //         host: SOCKET_CONFIG.SOCKET_HOSTNAME + ':' + SOCKET_CONFIG.SOCKET_PORT,
    //     });
    // }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    if (userId) {
                        MessengerService.receiverSeen(userId, res => { }, err => { })
                        getDetailUser(userId)
                    }
                    getListChat()
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [userId])
    // useEffect(() => {
    //     if (window.Echo) {
    //         window.Echo.channel(`User.${user.id}`).listen('.message', (data) => {
    //             setHaveMessage(true)
    //         })

    //         window.Echo.channel(`list-chat.${user.id}`).listen('.list-chat', (data) => {
    //             getListChat()
    //         })

    //         window.Echo.channel(`list-chat-by-seender.${user.id}`).listen('.list-chat-by-seender', (data) => {
    //             getListChat(null, true)
    //         })
    //     }
    // }, [window.Echo])

    // useEffect(() => {
    //     let time;
    //     time = setInterval(() => {
    //         getListChat()
    //     }, 3000);
        
    //     return () => clearInterval(time)
    //   }, [])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearch) {
                        setLoading(true);
                        getListChat(keyword)
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
    }, [isSearch]);

    useEffect(() => {
        if (hashMess) {
            getListChat();
            clickMess(false)
        }
    }, [hashMess])

    useEffect(() => {
        if (receiveMessage) {

            if (listChat?.length && receiveMessage && userId == receiveMessage.sender_id) {
                const receiveList = [...listChat]
                receiveList.map(receiveChat => {
                    if (receiveChat.id === receiveMessage.sender_id  ) {
                        receiveChat.mess_last = receiveMessage.body;     
                        return receiveChat;         
                    }
                 return receiveChat;
                 })
                 setListChat(receiveList) 
            }
        }
    }, [receiveMessage])
    function getListChat(params, type = null) {
        // if (!type) {
            // setLoadingSkeleton(true)
        // }
        MessengerService.getListUserChat(
            params,
            res => {
                const response = res.data.data
                setListChat(response)
                setIsSearch(false)
                // setLoadingSkeleton(false)
            },
            err => {
                // setLoadingSkeleton(false)
                console.log(err)
            }
        )
    }

    function getDetailUser(userId) {
        UserService.detail(
            userId,
            res => {
                setDetailUserChat(res.data.data)
            },
            err => { }
        )
    }

    function handleListChat(e, _userId) {
        e.preventDefault()
        e.stopPropagation()
        setHaveMessage(false);
        // SetShowColor(_userId);
        // window.Echo.join('chat')
        //     .joining((user) => {
        //         MessengerService.userOnline(_userId, res => {}, err => {})
        //         console.log(user, 'user')
        //     });
        MessengerService.receiverSeen(
            _userId,
            res => {
                setCountReceiverSeen(0)
                setShowUnreadMessages(false)
                setKeyword({})
                setIsSearch(true)
                setResetValue(true)
                history.push(`/chat/${_userId}`)
            },
            err => {
                console.log(err)
            }
        )
    }

    function handleSearch(value, fields) {
        let obj = {
            'keyword': value
        }
        setKeyword(obj)
        setIsSearch(true)
        setResetValue(false)
    }

    return (
        <div className={classes.chat}>
            <ListUser
                classes={classes}
                listChat={listChat}
                handleSearch={handleSearch}
                handleListChat={handleListChat}
                countReceiverSeen={countReceiverSeen}
                showUnreadMessages={showUnreadMessages}
                userId={userId}
                resetValue={resetValue}
                // loadingSkeleton={loadingSkeleton}
                user={user}
            />
            {userId ? (
                <Chat
                    classes={classes}
                    userId={userId}
                    detailUserChat={detailUserChat}
                    getTranslation={getTranslation}
                    reGetListChat={getListChat}
                />
            ) : (
                <div className="action__no-content">
                    <div className="content">
                        <div className="content__title">{ getTranslation('youDoHaveAnyMessagesYet')}</div>
                        <div className="content__title">{getTranslation('pleaseAddFriendsToDiscussCoursesEasily')}</div>
                    </div>
                    <div className="background">
                        <img src={defaultChat} alt="" />
                    </div>
                </div>
            )}
        </div >
    )
}

export default HomeView