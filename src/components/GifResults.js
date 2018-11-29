import React, { Component } from 'react';
import MediaCard from './MediaCard';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Layout from './Layout';

class GifResults extends Component {
   state = {
     results: this.props.results  
   }
   componentDidMount() {
    console.log('Component DID MOUNT!')
 }

 componentWillReceiveProps (nextProps) {
  if (nextProps.value !== this.props.value) {
    this.setState({ value: nextProps.value })
  }  
} 
      render() {
        let loadedGifs = null;
        if (this.props.results) {
        console.log('GifResults State:', this.state.results);
        console.log('GifResults Props:', this.props.results);
        let gifs = this.state.results;
        loadedGifs = gifs.map(  gif => {
            const maxPos = 25
            if (gif.title.length > maxPos) {
                gif.title = gif.title.slice(0, 40) + '...';
            }
           
          return (
              <Grid item xl={3} key={gif.id}>
                <MediaCard
                          key={gif.id}
                          title={gif.title} 
                          user={gif.username}                       
                          url={gif.images.original.url}
                          uploaded={gif.import_datetime}
                          rating={gif.rating}
                          frames={gif.images.original.frames}
                          faveData={{
                            key: gif.id,
                            title:gif.title,
                            user:gif.username,
                            url:gif.images.original.url,
                            uploaded:gif.import_datetime,
                            rating:gif.rating,
                            frames:gif.images.original.frames,
                          }}
                  />
              </Grid>         
          );
      });
    }
        return (
          <Layout> 
              {loadedGifs ? loadedGifs : null}                        
          </Layout>
        );
      }
}
const mapStateToProps = state => {
    return {
      results: state.search.results
    };
  };
export default connect(mapStateToProps)(GifResults);