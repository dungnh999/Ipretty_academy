import React from 'react'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import Search from 'ipretty/components/Search'
import AddButton from 'ipretty/components/AddButton'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect';
import { useAuth } from "ipretty/context/AppProvider"
import Back from '../../../public/icon_svg/back.svg'
import Plus_White from '../../../public/icons_ipretty/Plus_White.png';
import Plus from '../../../public/icons_ipretty/Plus.png';
import IconImage from "ipretty/components/IconImage";
import DatePicker from 'ipretty/components/DatePicker/DatePicker';
import Filter from '../../../public/icons_ipretty/Filter.png';
import MenuButton from '../MenuButton'

const useStyles = makeStyles(
    theme => ({
        viewPage: {
            "& .header": {
                "& .header__breacrumd": {
                    "& .MuiTypography-root": {
                        color: '#6F9396',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '16px',
                    }
                },
                "& .header__content": {
                    display: 'flex',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down("sm")]: {
                       flexDirection: 'column'
                     },
                     [theme.breakpoints.down("xs")]: {
                        lexDirection: 'column'
                     },
                    "& .banners": {
                        // display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // marginLeft: 17,
                        "& .banners__title--back": {
                            "& .MuiButton-startIcon": {
                                marginRight: 17
                            },
                            "& button": {
                                background: '#E5E5E5',
                                color: '#395B65',
                                fontFamily: 'San Francisco Text Bold',
                                fontSize: '32px',
                                padding: 0,
                                [theme.breakpoints.down("xs")]: {
                                    fontSize: '17px !important',//fix bug 55 size chữ quá lớn
                                },
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: '17px !important',//fix bug 55 size chữ quá lớn
                                },
                                "& span": {
                                    "& span": {
                                        "& div": {
                                            width: 12,
                                            display: 'flex'
                                        }
                                    },
                                    "& div": {
                                        display: 'flex',
                                        marginTop: 3
                                    }
                                }
                            },
                            "& button:hover": {
                                boxShadow: 'none',
                            },
                            "& button:focus": {
                                boxShadow: 'none'
                            }
                        },
                    },
                    "& .header__content--button": {
                        display: "flex",
                        [theme.breakpoints.up("sm")]: {
                            justifyContent: 'end'
                        },
                        [theme.breakpoints.down("xs")]: {
                            // justifyContent: 'end',fix bug 78
                            paddingTop : 18,
                            paddingRight: '60px',//fix bug 39 quan ly khoa hoc
                            // paddingRight: '36px',//fix bug 39 quan ly khoa hoc
                            // marginRight: 19,//buton ma giảm giá bị lệch + bug 63 quan ly khoa hoc hoi lech
                        },
                        "& .button": {
                            height: "40px",
                            background: '#147B65',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '16px',
                            [theme.breakpoints.down("xs")]: {
                                fontSize: '12px',//fix bug buton quan ly khoa hoc
                                padding: '6px 4px',//fix button bug 71 Quản lý khóa học 
                            },
                            "@media screen and (max-height: 750px)": {
                                padding: '6px 2px',//fix button bug 97 Quản lý khóa học 
                              },
                        },
                    },
                }
            },
            "& .view": {
                background: '#FFFFFF',
                marginTop: 20,
                [theme.breakpoints.up("sm")]: {
                    padding: 20,
                },
                "& .view-action": {
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    "& .view-action__filter": {
                        display: 'flex',
                        marginBottom: 15,
                        [theme.breakpoints.down("md")]: {
                            flexWrap: 'wrap',
                            marginLeft : 18
                        },
                        [theme.breakpoints.down("xs")]: {
                            flexWrap: 'wrap',
                            marginLeft : 18 
                        },
                        "& .view-action__filter--item": {
                            width: 190,
                            marginRight: 10,
                            [theme.breakpoints.down("md")]: {
                                paddingTop : 18
                             },
                             [theme.breakpoints.down("xs")]: {
                                 paddingTop : 18
                             },
                            "& .MuiFormControl-root": {
                                width: '100%',
                                "& .MuiSelect-root": {
                                    padding: 10
                                },
                                "& .MuiInputBase-root": {
                                    background: "#FFFFFF"
                                }
                            },
                            "& .MuiInput-underline": {
                                padding: '4px',
                                border: '1px solid #C4C4C4'
                            }
                        },
                        "& .view-action__filter--datatime": {
                            [theme.breakpoints.down("md")]: {
                               paddingTop : 18
                            },
                            [theme.breakpoints.down("xs")]: {
                                paddingTop : 18
                            },
                            "& .Mui-error:after": {
                                // borderBottomColor: '#147B65'
                                border: 0
                            },
                        },
                        "& .view-action__filter--item:nth-last-child()": {
                            marginRight: 0
                        }
                    },
                    "& .view-action__search": {
                        marginBottom: 15,
                        [theme.breakpoints.down("md")]: {
                             margin :  18,
                         },
                         [theme.breakpoints.down("xs")]: {
                            margin :  18,
                         },
                    },
                    "& .view-action__filter--button": {
                        [theme.breakpoints.down("md")]: {
                            paddingTop : 18
                         },
                         [theme.breakpoints.down("xs")]: {
                             paddingTop : 18
                         },
                        "& .button": {
                            justifyContent: "center !important",
                            minWidth: 78,
                            height: 39,
                            fontSize: '16px',
                            [theme.breakpoints.down("xs")]: {
                                fontSize: '14px',//fix size button quản lý kháo học không đồng nhất
                            },
                        },
                        '& img': {
                            width: '12px',
                            height: '12px',
                            marginTop: '7px',
                        }
                    }
                }
            }
        },

        title: {
            fontSize: '2.25rem',
            fontWeight: 600,
        },
        closeButton: {
            position: 'absolute',
            right: 0,
            top: 14,
            marginRight: '0.781vw',
            cursor: 'pointer',
            color: '#243882',
        },
        mainComponent: {
            // paddingTop: '1.063rem',
            flexDirection: 'column'
        },
        flexDisplay: {
            display: 'flex',
            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
                padding: '10px',
                '& .MuiButton-root': {
                    marginTop: theme.spacing(1)
                }
            },
        },
    })
)

const ViewPage = (props) => {
    const classes = useStyles();
    const {
        titlePage,
        children,
        titleButton,
        url,
        isDisabled,
        handleSearch,
        fieldsSearch,
        placeholderSearch,
        links,
        filters,
        handleData,
        handleActionFilter,
        redirectBack,
        handleFilter,
        redirectCreate,
        typeButtonScreen,
        time,
        onChangeDatetime,
        noAction,
        times,
        listMenu,
        menuDiscount,
        titleMenuButton
    } = props
    const { getTranslation , user} = useAuth()
    // console.log(user)
    return (
        <div className={classes.viewPage}>
            <div className="header">
                <div className="header__breacrumd">
                    <BreadCrumbs classes={classes} links={links} titleCurrent={titlePage} />
                </div>
                <div className="header__content">
                    <div className="banners">
                        <div className="banners__title">
                            <div className="banners__title--back">
                                <AddButton
                                    label={titlePage}
                                    id="update-button"
                                    buttonClass="button header__button--back--style"
                                    onClick={redirectBack}
                                    variant='contained'
                                    iconButton={<IconImage srcIcon={Back} />}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                    {!noAction && (
                        <div className={"header__content--button"}>
                            {listMenu && (
                                <MenuButton classes={classes}  listMenu={listMenu} getTranslation={getTranslation} titleMenuButton={titleMenuButton}/>
                            )}
                            {
                                user.permissions.includes("manage_courses") ?
                                    <AddButton
                                        label={titleButton}
                                        id="update-button"
                                        buttonClass={"button header__button--create"}
                                        onClick={redirectCreate}
                                        variant='contained'
                                        iconButton={typeButtonScreen ? <IconImage srcIcon={Plus} /> : <IconImage srcIcon={Plus_White} />}
                                        disabled={false}
                                    />
                                    : ''
                            }
                        </div>
                    )}
                </div>
            </div>


            <div className="view">
                {!noAction && (
                    <div className="view-action">
                        <div className={"view-action__search"}>
                            <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={placeholderSearch} />
                        </div>
                        <div className="view-action__filter">
                            {filters && filters.length > 0 && filters.map((filter, indexFilter) => {
                                return (
                                    <div className="view-action__filter--item" key={indexFilter} style={{ width: filter.widthItem ? filter.widthItem : '200px' }}>
                                        <MultipleSelect
                                            nameField={filter.fieldFilter}
                                            listData={filter.list || []}
                                            placeholder={filter.placeholder}
                                            handleFilter={handleData}
                                            widthItem={filter.widthItem}
                                        />
                                    </div>
                                )
                            })}
                            {times && times.length > 0 && times.map((time, indexTime) => {
                                return (
                                    <div className="view-action__filter--item view-action__filter--datatime" key={indexTime}>
                                        <DatePicker
                                            type={time.type}
                                            value={time.value || null}
                                            format={time.format}
                                            placeholder={time.placeholder}
                                            handleDateChange={onChangeDatetime(`${time.field}`)}
                                        />
                                    </div>
                                )
                            })}
                            <div className="view-action__filter--button">
                                <AddButton
                                    label={getTranslation('Filter')}
                                    id="update-button"
                                    buttonClass="button button_filter"
                                    onClick={handleActionFilter}
                                    variant='contained'
                                    iconButton={<IconImage srcIcon={Filter} />}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <Grid container className={classes.mainComponent}>
                    {children}
                </Grid>
            </div>
        </div>
    )
}

export default ViewPage