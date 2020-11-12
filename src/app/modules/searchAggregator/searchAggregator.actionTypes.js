import {prefixes} from '../../constants/constants';

const actionTypes = {
    SET_SEARCH_RESULTS: `${prefixes.searchAggregatorPrefix}SET_SEARCH_RESULTS`,
    SET_SEARCH_ENGINE: `${prefixes.searchAggregatorPrefix}SET_SEARCH_ENGINE`,
    SET_SEARCH_STRING: `${prefixes.searchAggregatorPrefix}SET_SEARCH_STRING`,
    SET_PAGE: `${prefixes.searchAggregatorPrefix}SET_PAGE`,
    SET_RESULTS_PER_PAGE: `${prefixes.searchAggregatorPrefix}SET_RESULTS_PER_PAGE`
};

export default actionTypes;
