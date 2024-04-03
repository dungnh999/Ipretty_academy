
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const usePlaceholderStyles = makeStyles(theme => ({
    placeholder: {
        color: "#aaa",
        fontSize: 14
    }
}));

function SelectNotify(props) {
    const { listData, nameField, placeholder, handleFilter, value } = props
    const [personName, setPersonName] = useState();

    const handleChange = (event) => {
        setPersonName(event.target.value);
        const { target: { value } } = event;
        handleFilter && handleFilter(nameField, value)
    };

    const Placeholder = ({ children }) => {
        const classes = usePlaceholderStyles();
        return <div className={classes.placeholder}>{children}</div>;
    };

    return (
        <div>
            {listData && listData.length > 0 ? (
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={personName || ''}
                        onChange={handleChange}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={
                            personName != null ? undefined : (value ? () => <Placeholder>{value}</Placeholder> : () => <Placeholder>{placeholder}</Placeholder>)
                        }
                    >
                        {listData.map((list, index) => (
                            <MenuItem
                                key={index}
                                value={list.status || list.status == 0 ? list.status : list.name}
                            >
                                {list.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : ''}
        </div>
    )
}

export default SelectNotify
