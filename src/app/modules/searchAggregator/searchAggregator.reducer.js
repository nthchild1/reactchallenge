import actionTypes from './searchAggregator.actionTypes'

const initialState = {
  selectedSearchEngine: 'google',
  searchResults: [],
  searchString: null,
  currentPage: 1,
  resultsPerPage: 10,
}

const searchAggregatorReducer = (state = initialState, action) => {
  let newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_SEARCH_ENGINE:
      newState = {
        ...state,
        selectedSearchEngine: action.payload
      }
      break
    case actionTypes.SET_SEARCH_RESULTS:
      newState = {
        ...state,
        searchResults: action.payload
      }
      break
    case actionTypes.SET_SEARCH_STRING:
      newState = {
        ...state,
        searchString: action.payload
      }
      break;
    case actionTypes.SET_PAGE:
      newState = {
        ...state,
        currentPage: action.payload < 1 ? 1 : action.payload
      }
      break;
    case actionTypes.SET_RESULTS_PER_PAGE:
      newState = {
        ...state,
        resultsPerPage: action.payload < 1 ? 1 : action.payload
      }
    default:
      break
  }

  return newState
}

export default searchAggregatorReducer
