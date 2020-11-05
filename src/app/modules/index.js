import {combineReducers} from 'redux';
import app from './app/app.reducer';
import searchAggregator from './searchAggregator/searchAggregator.reducer'

const rootReducer = combineReducers({
    app,
    searchAggregator
});

export default rootReducer;
