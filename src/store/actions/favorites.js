import axios from '../../axios-favorites';
import * as actionTypes from './actionTypes';

export const faveStart = () => {
    return {
        type: actionTypes.FAVE_START
    };
};

export const faveSuccess = ( id, faveData ) => {
    return {
        type: actionTypes.FAVE_SUCCESS,
        faveId: id,
        faveData: faveData
    };
};

export const faveFail = (error) => {
    return {
        type: actionTypes.FAVE_FAIL,
        error: error
    };
};

export const addFavorite = ( faveData, token) => {
    return dispatch => {
        dispatch( faveStart() );
        axios.post( '/favorites.json?auth=' + token, faveData )
            .then( response => {
                    console.log( response.data );
                    dispatch( faveSuccess( response.data.name, faveData ) );
            } )
            .catch( error => {
                dispatch( faveFail( error ) );
            } );
    };
};


export const fetchFavesSuccess = ( favorites ) => {
    return {
        type: actionTypes.FETCH_FAVES_SUCCESS,
        favorites: favorites
    };
};

export const fetchFavesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FAVES_FAIL,
        error: error
    };
};

export const fetchFavesStart = () => {
    return {
        type: actionTypes.FETCH_FAVES_START
    };
};

export const fetchFavorites = (token, userId) => {
    return dispatch => {
        //const  queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const  queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(fetchFavesStart());
        axios.get( '/favorites.json' + queryParams)
            .then( res => {
                console.log('FetchFave Res:', res)
                const fetchedFaves = [];
                for ( let key in res.data ) {
                    fetchedFaves.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchFavesSuccess(fetchedFaves));
            } )
            .catch( err => {
                dispatch(fetchFavesFail(err));
            } );
    };
};