
import React, { useEffect, useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from "ipretty/context/AppProvider"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, personName, theme) {
    return {
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const usePlaceholderStyles = makeStyles(theme => ({
    placeholder: {
        color: "#aaa",
        fontSize: 14
    }
}));

function MultipleSelect(props) {
    const { listData, nameField, placeholder, handleFilter, widthItem, valueSelect, isNotification, disabled, value , isStatic} = props
    const theme = useTheme();
    const { getTranslation } = useAuth()
    const [personName, setPersonName] = useState([]);

    useEffect(() => {
        if (isNotification) {
            setPersonName(valueSelect);
        }
    }, [valueSelect])

    const handleChange = (event) => {
        const { target: { value } } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value,);
        handleFilter && handleFilter(nameField, value)
    };

    const Placeholder = ({ children }) => {
        const classes = usePlaceholderStyles();
        return <div className={classes.placeholder}>{children}</div>;
    };

    return (
        <div>
            {listData && listData.length > 0 ? (
                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple={!isStatic ? true : false}
                        value={personName}
                        onChange={handleChange}
                        displayEmpty
                        input={<OutlinedInput />}
                        disabled={disabled}
                        renderValue={
                            personName.length > 0 ? undefined : (value ? () => <Placeholder>{value}</Placeholder> : () => <Placeholder>{placeholder}</Placeholder>)
                        }
                        MenuProps={
                            {
                                PaperProps: {
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                        // width: 250,
                                        // position: 'initial',
                                        // marginTop: '270px',
                                        // marginLeft: '142px',


                                        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                        width: widthItem ? widthItem : 250,
                                        marginTop: 50,
                                        // transition: "opacity 289ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 192ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                        // transformOrigin: "150px 0px !important",
                                        // transform: "none",
                                        // marginLeft: -25
                                    },
                                },
                            }
                        }
                    >
                        {listData.map((list, index) => (
                            <MenuItem
                                key={index}
                                value={list.status || list.status == 0 ? list.status : list.name}
                                style={getStyles(list.name, personName, theme)}
                            >
                                {getTranslation(list.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : ''}
        </div>
    )
}

export default MultipleSelect
