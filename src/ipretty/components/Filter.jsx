import React from 'react'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import Search from './Search'
import AddButton from 'ipretty/components/AddButton'
import MultipleSelect from './Autocomplete/MultipleSelect';
import { useAuth } from "ipretty/context/AppProvider"
import IconImage from "./IconImage";
import Filter from "../../public/icon_svg/Filter.svg"
import DatePicker from 'ipretty/components/DatePicker/DatePicker';

const useStyles = makeStyles(
    theme => ({
        view: {
            "& .view-action": {
                display: 'flex',
                justifyContent: 'space-between',
                padding : '16px 0px',
                flexWrap: 'wrap',
                [theme.breakpoints.down("md")]: {
                    flexWrap: 'wrap',
                    // marginLeft : 18 fix button mã giảm gía bị lệch                   
                },
                [theme.breakpoints.down("xs")]: {
                    flexWrap: 'wrap',
                    // marginLeft : 18 fix button mã giảm gía bị lệch
                    padding : '16px 18px',// fix bug 54  Quản lý giao dịch  bị lệch pading trên mobile
                },
                "& .view-action__search" : {
                    [theme.breakpoints.down("lg")]: {
                        marginTop: 19,//fix loi pading tren thiet bị ipad
                    },
                    [theme.breakpoints.down("md")]: {
                        marginBottom :  2 //fix button mã giảm gía bị lệch
                    },
                    '& input' : {
                        width : 280,
                        [theme.breakpoints.down("xs")]: {
                            width : 200,
                        },
                    },
                    '& svg' : {
                        width : 24,
                        height :24
                    }
                },
                "& .view-action__filter": {
                    display: 'flex',
                    [theme.breakpoints.down("md")]: {
                        flexWrap: 'wrap',
                        // marginTop : 18
                    },
                    [theme.breakpoints.down("sm")] : {
                        // marginTop : 18
                    },
                    [theme.breakpoints.down("xs")]: {
                        flexWrap: 'wrap',
                        // marginTop : 18
                    },
                    "& .view-action__filter--item": {
                        // width: 150,
                        marginRight: 10,
                        [theme.breakpoints.down("md")]: {
                            marginTop : 18
                        },
                        [theme.breakpoints.down("xs")]: {
                            marginTop : 18,
                            width: '100px!important', //fix bug 99
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
                    "& .view-action__filter--item:nth-last-child()": {
                        marginRight: 0
                    }
                }
            },
            "& .view-action__filter--button" : {
                [theme.breakpoints.down("md")]: {
                    marginTop : 18
                },
                [theme.breakpoints.down("xs")]: {
                    marginTop : 18
                },
                "& .button" : {
                    justifyContent: "center !important",
                    minWidth : 78,
                    height :40,
                },
                '& img' : {
                   width: '12px',
                   height: '12px',
                   marginTop: '7px',
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
            paddingTop: '1.063rem',
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

const FilterUser = (props) => {
    const classes = useStyles();
    const {
        handleSearch,
        fieldsSearch,
        placeholderSearch,
        links,
        loadingButton,
        filters,
        times,
        handleData,
        handleActionFilter,
        onChangeDatetime,
        isSearch,
        isActionFilter
    } = props
    const { getTranslation } = useAuth()

    return (
            <div className={classes.view}>
                <div className="view-action">
                    {
                        isSearch ?
                            <div className="view-action__search">
                                <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={placeholderSearch} placeholder={getTranslation('SearchForUnit')} />
                            </div>
                        : '' 
                    }
                    <div className="view-action__filter">
                        {filters && filters.length > 0 && filters.map((filter, indexFilter) => {
                            return (
                                <div className="view-action__filter--item" key={indexFilter} style={{ width: filter.widthItem ? filter.widthItem : '200px' }}>
                                    <MultipleSelect
                                        nameField={filter.fieldFilter}
                                        listData={filter.list || []}
                                        placeholder={filter.placeholder}
                                        handleFilter={handleData}
                                        isStatic={filter.isStatic}
                                        widthItem={filter.widthItem}
                                        // value={filter.value}
                                        disabled={filter.disabled}
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
                            {
                                isActionFilter ? '' :
                                    <div className="view-action__filter--button">
                                        <AddButton
                                            label={getTranslation('Filter')}
                                            id="update-button"
                                            buttonClass="button button_filter"
                                            onClick={handleActionFilter}
                                            variant='contained'
                                            disabled={false}
                                            loading={loadingButton}
                                            iconButton={<IconImage srcIcon={Filter} />}
                                        />
                                    </div>
                            }
                    </div>
                </div>
            </div>
    )
}

export default FilterUser