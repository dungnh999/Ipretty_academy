import React, { useEffect, useState } from "react";
import './styleFooterStudent.css';
import { useAuth } from "ipretty/context/AppProvider";
import { Typography, Link } from "@material-ui/core";
import { addressCompany, hotLineCompany, emailCompany, companyName, copyRight } from 'ipretty/helpers/config'
import SendFb  from 'public/icons_ipretty/SendFb.svg'
import facebook  from 'public/icons_ipretty/facebook.svg'
import instagram from 'public/icons_ipretty/instagram.svg'
import linkedin from 'public/icons_ipretty/linkedin.svg'
import twitter from 'public/icons_ipretty/twitter.svg'
import youtube from 'public/icons_ipretty/youtube.svg'
import IconImage from 'ipretty/components/IconImage';
import { useHistory } from "react-router-dom";
import UserService from 'ipretty/services/UserService'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import { FOOTER_URL_REDIRECT, SOCIAL_LINK } from "ipretty/services/constances"
import {
    Select,
    MenuItem,
  } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        // position: "relative",
        // display: "flex",
    },
    language: {
    background: "transparent",
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginRight: -15,
      width: 112,
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: -10,
      width: 112,
    },

    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: 0,
      border: '1px solid #fff',
      color: '#fff',
      borderRadius: '5px',
      fontFamily: 'San Francisco Text',
      padding: '6px 12px 7px',
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-icon": {
      right: 20,
      color:'#fff',
    },
  },
     
}));
function FooterStudent(props) {
    const {  } = props;
    const { makeShortMessage } = useNotiStackContext();
    const { user, changeLanguage, getTranslation } = useAuth();
    const history = useHistory();
    const [ errors, setErrors] = useState()
    const [email, setEmail] = useState('')
    const classes = useStyles();
    const [lang, setLang] = useState(user && user.lang || "vi");
    // const handleChange = (event) => {
    //   const value = {
    //     lang: event.target.value,
    //   };
    //   setLang(value.lang);
    //   changeLanguage(value);
    // };

    function handleSendEmail() {
        setErrors(false)
        const data = new FormData()
        data.append('email', email);
        UserService.receive_information( data,
            res => {
                makeShortMessage(getTranslation('signUpToReceiveInformationsuccessfully'), "success");
                setTimeout(() => {
                    setEmail('')
                }, 1000)
            },
            err => {
                setErrors(err.response.data.errors)
                console.log(err)
            })
    }
    const validateKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendEmail();
        }
    };

    const handleChangeEmail = (event) => {
        setErrors(false)
        setEmail(event.target.value)
    }
    const handleChange = (event) => {
        const value = {
          lang: event.target.value,
        };
        setLang(value.lang);
        changeLanguage(value);
      };
    const about = [
        {
            'name': getTranslation('aboutUs'),
            'url': FOOTER_URL_REDIRECT.ABOUT_US,
            'external_link': true
        },
        {
            'name': getTranslation('Trademark'),
            'url': FOOTER_URL_REDIRECT.BRANDS,
            'external_link': true
        },
        {
            'name': getTranslation('enterprise'),
            'url': FOOTER_URL_REDIRECT.ENTERPRISE,
            'external_link': true
        },
        {
            'name': getTranslation('news'),
            'url': FOOTER_URL_REDIRECT.NEWS,
            'external_link': true
        },
        {
            'name': getTranslation('careerOpportunities'),
            'url': FOOTER_URL_REDIRECT.CAREER_OPPORTUNITY,
            'external_link': true
        },
        {
            'name': getTranslation('contact'),
            'url': "/contact"
        },
    ];

    const trainingProgram = [
        {
            'name': getTranslation('aboutIPrettyEdu'),
            'url': FOOTER_URL_REDIRECT.ABOUT_IPRETTY,
            'external_link': true
        },
        {
            'name': getTranslation('teamOfExperts'),
            'url': FOOTER_URL_REDIRECT.TEAM_OF_EXPERTS,
            'external_link': true
        },
        {
            'name': getTranslation('coursesAndTraining'),
            'url': FOOTER_URL_REDIRECT.COURSE_AND_TRAINING,
            'external_link': true
        },
        {
            'name': getTranslation('frequentlyAskedQuestions'),
            'url': "/published-faqs"
        },
        {
            'name': getTranslation('termsAndCondition'),
            'url': FOOTER_URL_REDIRECT.TERMS_AND_CONDITION,
            'external_link': true
        },
        {
            'name': getTranslation('categories'),
            'url': FOOTER_URL_REDIRECT.CATEGORIES,
            'external_link': true
        },
    ]

    const socialButton = [
        {
            "icon": facebook,
            "url": SOCIAL_LINK.FACEBOOK,
        },
        {
            "icon": linkedin,
            "url": SOCIAL_LINK.LINKEDIN,
        },
        {
            "icon": instagram,
            "url": SOCIAL_LINK.INSTAGRAM,
        },
        {
            "icon": youtube,
            "url": SOCIAL_LINK.YOUTUBE,
        },
    ]
    return(
        <div className="main">
            <div className="footer">
                <div className="gridDemo">
                    <div className="column1">
                        <Typography variant="h3">
                            {getTranslation(companyName.preName)}
                            <br />
                            {getTranslation(companyName.name)}   
                        </Typography>
                        <Typography variant="body2">{getTranslation('Address')}</Typography>
                        <ul>
                            {addressCompany.map((address, index) => (
                                <li key={index}>{getTranslation(address)}</li>
                            ))}
                            <li>{getTranslation('address')}</li>
                        </ul>
                        <Typography variant="body2">Hotline: {hotLineCompany}</Typography>
                        <Typography variant="body2">Email: {emailCompany}</Typography>
                    </div>
                    <div className="column2 column">
                        <Typography variant="h3">{getTranslation('introductionBanner')}</Typography>
                        {
                            about.map((item, index) => (
                                <Link key={index} onClick={() => {
                                    if (item.external_link) {
                                        window.open(item.url)
                                    }else {
                                        history.push(item.url)
                                    }
                                }} 
                                underline="none">{item.name}</Link>
                            ))
                        }
                    </div>
                    <div className="column3 column">
                        <Typography variant="h3">{getTranslation('trainingProgram')}</Typography>
                        {
                            trainingProgram.map((item, index) => (
                                <Link key={index} 
                                // to={item.url} 
                                onClick={
                                    () => {
                                        if (item.external_link) {
                                            window.open(item.url)
                                        } else {
                                            history.push(item.url)
                                        }
                                    }
                                }
                                underline="none">{item.name}</Link>
                            ))
                        }
                    </div>
                    <div className={classes.root}>
                    <div className="column4 column">
                        <Typography variant="h3">{getTranslation('connectWithUs')}</Typography>
                        <div className="social">
                            <div className="icon">
                                {socialButton.map((social, index) => (
                                    <div key={index} onClick={() => window.open(social.url)} style={{ cursor: 'pointer' }}>
                                        <IconImage key={index} srcIcon={social.icon} />
                                    </div>
                                ))}
                            {/* <i className="fa fa-facebook-f marginRight"></i>
                            <i className="fa fa-linkedin marginRight"></i>
                            <i className="fa fa-twitter marginRight"></i>
                            <i className="fa fa-instagram marginRight"></i>
                            <i className="fa fa-youtube marginRight"></i> */}
                            </div>
                            {/* <select onChange={handleChange} value={lang}>
                            
                                <option value="en" style={{ backgroundColor: '#227065', color: '#fff'}}>EN</option>
                                <option value="vi" style={{ backgroundColor: '#227065', color: '#fff' }}>VI</option>
                            </select> */}
                            {/* <img src={arrow}></img> */}
                            {/* <IconImage  srcIcon={arrow} /> */}
                            
                            <Select
                                value={lang}
                                onChange={(e) => handleChange(e)}
                                disableUnderline
                                className={classes.language}
                                IconComponent={ExpandMoreIcon}
                                >
                                <MenuItem value="en">EN</MenuItem>
                                <MenuItem value="vi">VI</MenuItem>
                            </Select>
                              

                        </div>
                        <div className="register">
                            <Typography variant="h3">{getTranslation('signUpToReceiveInformation')}</Typography>
                            <div className="input-feedback">
                                <input id='inputText' value={email} onKeyPress={validateKeyPress} onChange={handleChangeEmail} type="email" placeholder={getTranslation("EnterEmail")} />
                                <IconImage onClick={handleSendEmail} srcIcon={SendFb} />
                            </div>
                                {
                                    errors ? <div className="error">{errors.email}</div> :  ''
                                }
                        </div>
                    </div>    
                    </div>
                </div>
                <hr/>
                <div className="aligncenter">
                    <Typography variant="body2">{getTranslation('copyRight')}</Typography>
                </div>
            </div>
        </div>
        
    )
}

export default FooterStudent;