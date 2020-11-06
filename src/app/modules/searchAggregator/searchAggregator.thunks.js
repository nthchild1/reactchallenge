import actionTypes from './searchAggregator.actionTypes'
import * as constants from "../../constants/constants";
import {searchEngineOptions} from "../../constants/constants";
import GoogleSearchService from "../../../services/googleSearch.service";
import BingSearchService from "../../../services/bingSearch.service";

export const setSearchString = (searchString) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_SEARCH_STRING,
        payload: searchString,
    });
};

export const submitSearch = () => async (dispatch, getState) => {
    const {selectedSearchEngine, searchString} = getState().searchAggregator;

    const generateSearchResultsPayload = (data) => {
        const {webPages} = data;

        return {
            items: (webPages.value || []).map(webPage => {
            return {
                title: webPage.name,
                snippet: webPage.snippet,
                displayLink: webPage.url,
            }
        })
        };
    }

    const googleSearchService = new GoogleSearchService();
    const bingSearchService = new BingSearchService();

    switch (selectedSearchEngine){
        case searchEngineOptions.bing:
            await bingSearchService.getSearchResults(searchString)
                .then((data) => {
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: generateSearchResultsPayload(data)
                    });
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                });
            break;
        case searchEngineOptions.google:

            await googleSearchService.getSearchResults(searchString)
                .then((data) => {
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: data
                    });
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} error getting Google search results`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
            });
            break;
        case searchEngineOptions.both:
            const bingResults = await bingSearchService.getSearchResults(searchString)
                .then((data) => {
                    return generateSearchResultsPayload(data)
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                });

            const googleResults = await googleSearchService.getSearchResults(searchString)
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} error getting Google search results`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                });

            dispatch({
                type: actionTypes.SET_SEARCH_RESULTS,
                payload: {items: [...googleResults.items, ...bingResults.items]}
            });
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