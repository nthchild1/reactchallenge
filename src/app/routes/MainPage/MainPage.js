import React from 'react';
import PropTypes from 'prop-types';
import EngineSelect from "./EngineSelect";
import {useDispatch} from "react-redux";
import {setSearchString, submitSearch} from "../../modules/searchAggregator/searchAggregator.thunks";
import SearchResults from "./SearchResults";
import {colors} from "../../constants/constants";

const MainPage = props => {

    const dispatch = useDispatch();

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        dispatch(submitSearch());
    }

    const handleSearchStringChange = ({target}) => dispatch(setSearchString(target.value));

    return (
        <div>
            <form onSubmit={handleSearchSubmit} style={{padding: '40px', display: 'block' ,backgroundColor: colors.simaBlue}}>
                <input type="text" onChange={handleSearchStringChange}/>
                <input type="submit" />
                <EngineSelect/>
            </form>
            <SearchResults/>
        </div>

    );
};

MainPage.propTypes = {

};

export default MainPage;