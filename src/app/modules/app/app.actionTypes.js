import {prefixes} from '../../constants/constants';

const actionTypes = {
    SET_STATE: `${prefixes.appReducerPrefix}SET_STATE`,
    SET_FETCH_INIT: `${prefixes.appReducerPrefix}SET_FETCH_INIT`,
    SET_FETCH_SUCCESS: `${prefixes.appReducerPrefix}SET_FETCH_SUCCESS`,
    SET_FETCH_ERROR: `${prefixes.appReducerPrefix}SET_FETCH_ERROR`,
};

export default actionTypes;
