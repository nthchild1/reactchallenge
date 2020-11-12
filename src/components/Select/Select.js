import React from 'react';
import PropTypes from 'prop-types';

const Select = ({name, options, onChange}) => {
    return (
        <select name={name} onChange={onChange}>
            {Object.keys(options).map((optionKey) => {
                return (<option key={options[optionKey]} value={options[optionKey]}>{optionKey}</option>)
            })}
        </select>
    );
};

Select.propTypes = {};

export default Select;
