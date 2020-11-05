import React from 'react';
import PropTypes from 'prop-types';
import EngineSelect from "./EngineSelect";
import {useDispatch, useSelector} from "react-redux";
import {setSearchString} from "../../modules/searchAggregator/searchAggregator.thunks";

const MainPage = props => {

    const dispatch = useDispatch();

    const {searchString} = useSelector(state => state.searchAggregator);

    const handleSearchSubmit = (searchString) => {
        dispatch();
    }

    const handleSearchStringChange = ({target}) => dispatch(setSearchString(target.value));

    return (
        <form onSubmit={() => handleSearchSubmit(searchString)}>
            <input type="text" onChange={handleSearchStringChange}/>
            <input type="submit" />
            <EngineSelect/>
        </form>
    );
};

MainPage.propTypes = {

};

export default MainPage;