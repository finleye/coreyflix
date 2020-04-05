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
  const { movieCollection, spacing=2 } = props;
  return (
    <Grid container justify="center" spacing={spacing}>
      {movieCollection.map((movieData) => (
        <Grid key={movieData.id} item xs={3}>
          <MovieCard {...movieData} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;