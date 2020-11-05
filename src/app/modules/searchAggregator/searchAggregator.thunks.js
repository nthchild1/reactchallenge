import actionTypes from './searchAggregator.actionTypes'
import * as constants from "../../constants/constants";
import {searchEngineOptions} from "../../constants/constants";
import GoogleSearchService from "../../../services/googleSearch.service";

export const setSearchString = (searchString) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_SEARCH_STRING,
        payload: searchString,
    });
};

export const submitSearch = () => async (dispatch, getState) => {
    const {selectedSearchEngine, searchString} = getState().searchAggregator;

    switch (selectedSearchEngine){
        case searchEngineOptions.bing:
            break;
        case searchEngineOptions.google:
            const googleSearchService = new GoogleSearchService();
            return googleSearchService.getSearchResults(searchString)
                .then(({data}) => {
                    console.error(data);
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} error getting Google search results`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
            });
        case searchEngineOptions.both:
            break;
        default: throw new Error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} selectedSearchEngine should be of type searchEngineOption`);
    }

}

export const setSelectedSearchEngine = (newSelectedSearchEngine) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_SEARCH_ENGINE,
        payload: newSelectedSearchEngine
    })
}