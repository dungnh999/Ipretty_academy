import React from 'react'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import Search from 'ipretty/components/Search'
import AddButton from 'ipretty/components/AddButton'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect';
import { useAuth } from "ipretty/context/AppProvider"
import IconImage from "ipretty/components/IconImage";
import Filter from "../../../../public/icons_ipretty/Filter.png"
const useStyles = makeStyles(
    theme => ({
        view: {
            "& .view-action": {
                display: 'flex',
                justifyContent: 'space-between',
                padding : '16px 0px',
                [theme.breakpoints.down("md")]: {
                    flexWrap: 'wrap',
                    marginLeft : 18
                },
                [theme.breakpoints.down("xs")]: {
                    flexWrap: 'wrap',
                    marginLeft : 18 
                },
                "& .view-action__search" : {
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
                        marginTop : 18
                    },
                    [theme.breakpoints.down("xs")]: {
                        flexWrap: 'wrap',
                        marginTop : 18
                    },
                    "& .view-action__filter--item": {
                        // width: 150,
                        marginRight: 10,
                        [theme.breakpoints.down("md")]: {
                            marginTop : 18
                        },
                        [theme.breakpoints.down("xs")]: {
                            marginTop : 18
                        },
                        "& .MuiFormControl-root": {
                            width: '100%',
                            "& .MuiSelect-root": {
                                padding: 8.5
                            }
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
                    height :36,
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
        filters,
        handleData,
        handleActionFilter,
        redirectBack,
        handleFilter
    } = props
    const { getTranslation } = useAuth()

    return (
            <div className={classes.view}>
                <div className="view-action">
                    <div className="view-action__search">
                        <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={placeholderSearch} placeholder={getTranslation('SearchForUnit')} />
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
                        <div className="view-action__filter--button">
                            <AddButton
                                label={getTranslation('Filter')}
                                id="update-button"
                                buttonClass="button button_filter"
                                onClick={handleActionFilter}
                                variant='contained'
                                disabled={false}
                                iconButton={<IconImage srcIcon={Filter} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default FilterUser