import axios from 'axios';
import * as actionTypes from './actionTypes';
//import config from '../../config';

//Hide API_KEYS
//let API_KEY = config.API_KEY;
let API_KEY = 'W8BRD3J2mSsN3CNKdKXCVKFjJkoVa8kI';

export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_START
    };
};

export const searchSuccess = ( data, query ) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        results: data,
        query: query
    };
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error: error
    };
};
export const setSearchRedirectPath = (path) => {
    return {
        type: actionTypes.SET_SEARCH_REDIRECT_PATH,
        path: path
    }
};
export const search = ( searchTerm ) => {
    let query = encodeURIComponent(searchTerm).replace(/%20/g,'+');
    return dispatch => {
        dispatch(searchStart());
        let url = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=' + API_KEY + '&limit=40';
        axios.get(url)
            .then(response => {
                console.log('Search Action:', response.data.data);
                dispatch(searchSuccess(response.data.data, query));
            })
            .catch(err => {
                dispatch(searchFail(err.response.data.error));
            });
    };
};



