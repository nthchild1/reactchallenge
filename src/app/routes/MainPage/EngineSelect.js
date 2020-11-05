import React from 'react';
import PropTypes from 'prop-types';
import Select from "../../../components/Select/Select";
import {searchEngineOptions} from "../../constants/constants";
import {useDispatch} from "react-redux";
import {setSelectedSearchEngine} from "../../modules/searchAggregator/searchAggregator.thunks";

const EngineSelect = props => {
    const dispatch = useDispatch();

    const handleSelectedEngineChange = (event) => {
        const {value: newSelectedSearchEngine} = event.target;
        dispatch(setSelectedSearchEngine(newSelectedSearchEngine));
    }

    return (
        <div>
            <label htmlFor="engineSelect">Engine</label>
            <Select
                name="engineSelect"
                id="engineSelect"
                options={searchEngineOptions}
                onChange={handleSelectedEngineChange}
            />
        </div>
    );
};

EngineSelect.propTypes = {
    
};

export default EngineSelect;