import React from 'react';
import PropTypes from 'prop-types';

const Snackbar = ({error}) => {

    return (
        <div style={{height: '25px', backgroundColor: 'orange'}}>
            {error}
        </div>
    );
};

Snackbar.propTypes = {

};

export default Snackbar;
