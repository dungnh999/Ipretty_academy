import * as React from 'react';
import { Box, Tabs, Tab, makeStyles, Hidden, IconButton, Menu, List, withStyles } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import Search from '../Search';
import { useAuth } from 'ipretty/context/AppProvider';

const useStyles = makeStyles(theme => ({
    tabMenu: {
        backgroundColor: 'white',
        borderRadius: 8,
        '& .MuiTabs-indicator': {
            height: '4px',
            backgroundColor: theme.palette.primary.colorOvewViewTitle + '!important',
            // width: 
            // display: 'none'
        },
        "& .MuiTabs-flexContainer": {
            padding: '0 17px 0 9px',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0px 4px 10px rgba(10, 80, 58, 0.1)'
        }

    },
    tabItem: {
        padding: '22px 15px',
        minWidth: 0,
        "& .MuiTab-wrapper": {
            color: theme.palette.primary.colorOvewViewTitle,
            fontSize: '20px',
            lineHeight: '28px',
            textTransform: 'none',
        },
        "&:first-child": {
            // paddingLeft: 30,
        },
        "&.Mui-selected": {
            // borderBottom: '4px solid ' + theme.palette.primary.colorOvewViewTitle,
            "& .MuiTab-wrapper": {
                fontFamily: 'San Francisco Text Bold',
            },
        }
    },
    searchWeb: {
        // paddingTop: '4px', 
        width: '100%', 
        textAlign: 'end', 
        "& .MuiInput-root": {
            width: 335,
            paddingTop: 3,
            paddingBottom: 3,
            [theme.breakpoints.down('md')]: {
                width: 200,
            },
        }
        
        // paddingRight: '2px'
    },
    searchCustorm: {
        backgroundColor: 'white', 
        height: '45px',
        paddingTop: '3px',
        paddingLeft: '2px',
        paddingRight: '2px',
        // margin: '0 13.90vw 0 13.90vw',
        [theme.breakpoints.down('md')]: {
            background: 'none', //bug 61 fix lỗi viền trắng seach
        },
        [theme.breakpoints.down('sm')]: {
            background: 'none', //bug 61 fix lỗi viền trắng seach
        },
        [theme.breakpoints.down('xs')]: {
            background: 'none', //bug 61 fix lỗi viền trắng seach
        }
    },
    componentRender: {
        // padding: '0 13.20vw 0 13.20vw',
        [theme.breakpoints.down('md')]: {
            // padding: '0 6.20vw 0 6.20vw',
        },
        [theme.breakpoints.down('sm')]: {

        },
        [theme.breakpoints.down('xs')]: {
            
        }
    },
    boxTab: {
        borderBottom: 1, 
        borderColor: 'divider', 
        // padding: '0 13.90vw 0 13.90vw',
        [theme.breakpoints.down('md')]: {
            // padding: '0 6.9vw 0 6.9vw',
        },
        [theme.breakpoints.down('sm')]: {

        },
        [theme.breakpoints.down('xs')]: {
            
        }
    }
}));

const AntTabs = withStyles((theme) =>({
    root: {
        "& .MuiTab-textColorInherit": {
            opacity: 1,
            paddingRight: '11px',
        },
        "& .MuiTabs-flexContainer": {
            flexDirection: "column",
            height: 'auto',
        },
    },
    indicator: {
        backgroundColor: "#A5133C",
        display: "none",
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "uppercase",
        minWidth: 72,
        fontWeight: 600,
        color: "#707070",
        paddingRight: theme.spacing(4),
        backgroundColor: "#fff",
        "&:hover": {
            color: theme.palette.primary.colorText,
            opacity: 1,
        },
        "&$selected": {
            color: "#44AD92",
            fontWeight: 600,
            borderBottom: "3px solid #44AD92",//fix color UI Gạch chân màu đỏ không hợp lý
        },
        "&:focus": {
            color: '#44AD92',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const { labels, components, onSearch, setParams, params } = props;
    const [value, setValue] = React.useState(localStorage.getItem('indexTab') ? +localStorage.getItem('indexTab') : 0);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { getTranslation } = useAuth()

    const handleChange = (event, newValue) => {
        setParams({ ...params, page: 1 })
        localStorage.setItem('indexTab', newValue);
        setValue(newValue);
    };

    const handleOpenStatus = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Hidden xsDown>
                <Box className={classes.boxTab}>
                    <Tabs className={classes.tabMenu} value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            labels && labels.length > 0 && labels.map((label, index) => {
                                return(
                                    <Tab key={index} className={classes.tabItem} label={label} {...a11yProps(index)} />
                                )
                            })
                        }
                        <Hidden xsDown>
                            <div className={classes.searchWeb}>
                                <Search onSearch={onSearch} placeholder={getTranslation('SearchForUnit')} />
                            </div>
                        </Hidden>
                    </Tabs>
                </Box>
            </Hidden>
            <Hidden smUp>
                <div className={classes.searchCustorm}>
                    <Search onSearch={onSearch} placeholder={getTranslation('SearchForUnit')}  />
                </div>
            </Hidden>
            <Hidden smUp>
                <div>
                    <React.Fragment>
                        <IconButton
                            edge="end"
                            aria-haspopup="true"
                            onClick={handleOpenStatus}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <List disablePadding>
                                <AntTabs value={value} onChange={handleChange}>
                                    {labels && labels.length > 0 ? labels.map((label, index) => (
                                        <AntTab value={index} key={index} label={label} />
                                    )) : ''}
                                </AntTabs>
                            </List>
                        </Menu>
                    </React.Fragment>
                </div>
            </Hidden>
            <div className={classes.componentRender}>
            {
                components && components.length > 0 && components.map((component, index) => {
                    return(
                        <React.Fragment key={index}>
                          {value == index && component}
                        </React.Fragment>
                    );
                })
            }
            </div>
        </Box>
    );
}
