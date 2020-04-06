import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MovieCard from './MovieCard.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const MovieList = (props) => {
  const { queue, movieCollection, spacing=2 } = props;
  const enqueuedIds = queue.map(m => m.id)
  console.log(enqueuedIds)
  return (
    <Grid container justify="center" spacing={spacing}>
      {movieCollection.map((movieData) => (
        <Grid key={movieData.id} item xs={3}>
          <MovieCard 
            addToQueueHandler={props.addToQueueHandler} 
            enqueued={enqueuedIds.includes(String(movieData.id))}
            {...movieData} 
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;