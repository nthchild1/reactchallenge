import actionTypes from './searchAggregator.actionTypes'
import appActionTypes from '../app/app.actionTypes'

import * as constants from '../../constants/constants'
import {googleSearchServiceErrorMessages, searchEngineOptions} from '../../constants/constants'
import GoogleSearchService from '../../../services/googleSearch.service'
import BingSearchService from '../../../services/bingSearch.service'

export const setSearchString = (searchString) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_SEARCH_STRING,
        payload: searchString
    })
}

export const submitSearch = () => async (dispatch, getState) => {
    const {selectedSearchEngine, searchString, currentPage, resultsPerPage} = getState().searchAggregator

    const generateSearchResultsPayload = (data) => {
        const {webPages} = data

        return {
            items: (webPages.value || []).map(webPage => {
                return {
                    title: webPage.name,
                    snippet: webPage.snippet,
                    displayLink: webPage.url
                }
            })
        }
    }

    const googleSearchService = new GoogleSearchService();
    const bingSearchService = new BingSearchService();

    switch (selectedSearchEngine) {
        case searchEngineOptions.bing:
            await bingSearchService.getSearchResults(searchString, {
                count: resultsPerPage,
                offset: (currentPage - 1) * resultsPerPage
            })
                .then((data) => {

                    const payload = generateSearchResultsPayload(data);

                    console.log(payload)

                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload
                    })
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results`, error);
                    dispatch({
                        type: appActionTypes.SET_FETCH_ERROR,
                        payload: `${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results - ${new Date().toString()}`
                    })
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                })
            break
        case searchEngineOptions.google:

            await googleSearchService.getSearchResults(searchString, {}, resultsPerPage, currentPage)
                .then((data) => {
                    if (!('items' in data)) {
                        console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE}  ${googleSearchServiceErrorMessages.NOTHING_FOUND}`);
                        dispatch({
                            type: appActionTypes.SET_FETCH_ERROR,
                            payload: `${constants.TAGS.GOOGLE_SEARCH_SERVICE}${googleSearchServiceErrorMessages.NOTHING_FOUND} - ${new Date().toString()}`,
                        })
                    } else {
                        dispatch({
                            type: actionTypes.SET_SEARCH_RESULTS,
                            payload: data
                        })
                    }
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} ${googleSearchServiceErrorMessages.FETCH_ERROR}`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                    dispatch({
                        type: appActionTypes.SET_FETCH_ERROR,
                        payload: `${constants.TAGS.GOOGLE_SEARCH_SERVICE} ${googleSearchServiceErrorMessages.FETCH_ERROR} - ${new Date().toString()}`
                    })
                });
            break;
        case searchEngineOptions.both:

            const results = await Promise.all([bingSearchService.getSearchResults(searchString, {
                count: resultsPerPage,
                offset: (currentPage - 1) * resultsPerPage
            })
                .then((data) => {
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: generateSearchResultsPayload(data)
                    })
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results`, error)
                    dispatch({
                        type: appActionTypes.SET_FETCH_ERROR,
                        payload: `${constants.TAGS.BING_SEARCH_SERVICE} error getting Bing search results - ${new Date().toString()}`
                    })
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                }), googleSearchService.getSearchResults(searchString, {}, resultsPerPage, currentPage)
                .then((data) => {
                    if (!('items' in data)) {
                        console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE}  ${googleSearchServiceErrorMessages.NOTHING_FOUND}`);
                        dispatch({
                            type: appActionTypes.SET_FETCH_ERROR,
                            payload: `${constants.TAGS.GOOGLE_SEARCH_SERVICE}${googleSearchServiceErrorMessages.NOTHING_FOUND} - ${new Date().toString()}`,
                        })
                    } else {
                        dispatch({
                            type: actionTypes.SET_SEARCH_RESULTS,
                            payload: data
                        })
                    }
                })
                .catch((error) => {
                    console.error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} ${googleSearchServiceErrorMessages.FETCH_ERROR}`, error)
                    dispatch({
                        type: actionTypes.SET_SEARCH_RESULTS,
                        payload: []
                    })
                    dispatch({
                        type: appActionTypes.SET_FETCH_ERROR,
                        payload: `${constants.TAGS.GOOGLE_SEARCH_SERVICE} ${googleSearchServiceErrorMessages.FETCH_ERROR} - ${new Date().toString()}`
                    })
                })])

            dispatch({
                type: actionTypes.SET_SEARCH_RESULTS,
                payload: {items: [...results[0].items, ...results[1].items]}
            })
            break
        default:
            throw new Error(`${constants.TAGS.GOOGLE_SEARCH_SERVICE} selectedSearchEngine should be of type searchEngineOption`)
    }
}

export const setSelectedSearchEngine = (newSelectedSearchEngine) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_SEARCH_ENGINE,
        payload: newSelectedSearchEngine
    })
}

export const getPage = (index) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.SET_PAGE,
        payload: index,
    });

    return dispatch(submitSearch());
}

export const getNextPage = () => async (dispatch, getState) => dispatch(getPage(getState().searchAggregator.currentPage + 1));

export const getPreviousPage = () => async (dispatch, getState) => dispatch(getPage(getState().searchAggregator.currentPage - 1));

export const setResultsPerPage = () => async (dispatch, getState) => {

}
