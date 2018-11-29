import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: null,
    error: null,
    loading: false,
    searchRedirectPath: '/search',
    query: null
};

const searchStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const searchSuccess = (state, action) => {
    return updateObject( state, { 
        results: action.results,
        error: null,
        loading: false,
        query: action.query
     } );
};

const searchFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};
const setSearchRedirectPath = (state, action) => {
    return updateObject(state, {searchRedirectPath: action.path})
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
        case actionTypes.SEARCH_FAIL: return searchFail(state, action);
        case actionTypes.SET_SEARCH_REDIRECT_PATH: return setSearchRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;