import React, { Component } from 'react';
import MediaCard from './MediaCard';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Layout from './Layout';

class Gifs extends Component {
        state = {
          trending : [],
      };
    componentDidMount () {
        const url = 'http://api.giphy.com/v1/gifs/trending?&api_key=W8BRD3J2mSsN3CNKdKXCVKFjJkoVa8kI&limit=50&fmt=json'
        axios.get(url)
            .then(response => {
                const trends = response.data.data //.slice(0, 24);
                const updatedTrends = trends.map(trend => {
                          return {
                              ...trend,
                          }
                      })
                this.setState({trending: updatedTrends})
                console.log("[Response Data]", response.data);
                console.log('[Current State]', this.state);
            })
            .catch(error => {
                console.log(error);
            });
      }
   
      render() {
        let gifs = this.state.trending;
         
         let loadedGifs = gifs.map(  gif => {
            const maxPos = 25
            if (gif.title.length > maxPos)  {  
                gif.title = gif.title.slice(0, 40) + '...';
            }
                  
          return (
              <Grid item xl={3} key={gif.id}>
                <MediaCard
                          key={gif.id}
                          title={gif.title} 
                          url={gif.images.original.url}
                          user={gif.username}
                          //trending={gif.trending_datetime}
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
        return (
          <Layout> 
              {loadedGifs}                        
          </Layout>
        );
      }
}

export default Gifs;