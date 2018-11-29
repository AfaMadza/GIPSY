import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    favorites: [],
    loading: false,
    favorited: false
};

const faveStart = ( state, action ) => {
    return updateObject( state, { loading: false, favorited: true } );
};

const faveSuccess = ( state, action ) => {
    const newFave = updateObject( action.faveData, { id: action.faveId } );
    return updateObject( state, {
        loading: false,
        favorites: state.favorites.concat( newFave ),
    });
};

const faveFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchFavesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchFavesSuccess = ( state, action ) => {
    return updateObject( state, {
        favorites: action.favorites,
        loading: false
    } );
};

const fetchFavesFail = ( state, action ) => {
    return updateObject( state, { loading: false } )
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FAVE_START: return faveStart( state, action );
        case actionTypes.FAVE_SUCCESS: return faveSuccess( state, action )
        case actionTypes.FAVE_FAIL: return faveFail( state, action );
        case actionTypes.FETCH_FAVES_START: return fetchFavesStart( state, action );
        case actionTypes.FETCH_FAVES_SUCCESS: return fetchFavesSuccess( state, action );
        case actionTypes.FETCH_FAVES_FAIL: return fetchFavesFail( state, action );
        default: return state;
    }
};
export default reducer;