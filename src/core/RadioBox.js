import React, { useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';

const RadioBox = ({ prices, handleFilters, handleClose1 }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
        handleClose1()
    };

    return prices.map((p, i ) => (
        <MenuItem  key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2"
            />
            <label className="form-check-label">{p.name} </label>
        </MenuItem>
    ));
};

export default RadioBox;
