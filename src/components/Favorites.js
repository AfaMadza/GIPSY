import React, { Component } from 'react';
import { connect } from 'react-redux';

import MediaCard from '../components/MediaCard';
//import axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
//import Spinner from '../../components/UI/Spinner/Spinner';
import Grid from '@material-ui/core/Grid';
import Layout from './Layout';

class Favorites extends Component {
    componentDidMount () {
        this.props.onFetchFavorites(this.props.token, this.props.userId);
    }
    
    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

    render () {
        let gifs = this.props.favorites;
        console.log('Favorites Log:', this.props.favorites)
         let favorites = gifs.map(  gif => {
            const maxPos = 25
            if (gif.faveData.title.length > maxPos) {     
                gif.faveData.title = gif.faveData.title.slice(0, 40) + '...';
            }
                      
          return (
              <Grid item xl={3} key={gif.faveData.key+this.makeid()}>
                <MediaCard
                          title={gif.faveData.title} 
                          url={gif.faveData.url}
                          user={gif.faveData.user}
                          uploaded={gif.faveData.uploaded}
                          rating={gif.faveData.rating}
                          frames={gif.faveData.frames}
                          favorited={true}
                  />
              </Grid>       
          );
      });
        return (
          <Layout> 
              {favorites}                        
          </Layout>
        );
      }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites.favorites,
        loading: state.favorites.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFavorites: (token, userId) => dispatch( actions.fetchFavorites(token, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Favorites );
