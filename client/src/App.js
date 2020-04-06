import React, { useEffect, useState } from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Form from './components/Form.js'
import MovieList from './components/MovieList.js'
import QueueTable from './components/QueueTable.js'


import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function App() {
  const [moviesData, setMoviesData] = useState([])
  const [refetchQueue, setRefetchQueue] = useState(false);

  const [queue, setQueue] = useState([]);

  async function fetchQueueData() {
    const res = await fetch("/api/movie/queue");
    res
      .json()
      .then(res => setQueue(res.enriched))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchQueueData()
  }, [])

  const updateQuery = async e => {
    let query = e.target.value;
    const response = await fetch(`/api/movie/search/${query}`);
    const json = await response.json()
    setMoviesData(json)
  };

  const addToQueue = async tmdbId => {
    const requestOptions = {
      method: 'POST'
    };
    const response = await fetch(`/api/movie/queue/${tmdbId}`, requestOptions);
    fetchQueueData()
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h2" component="h3">
          Coreyflix
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h5">
          Queue
        </Typography>
        <QueueTable queue={queue}/>
      </Container>
      <Container maxWidth="lg">
        <Form onInputChange={updateQuery} />
        <MovieList movieCollection={moviesData} queue={queue} addToQueueHandler={addToQueue}/>
      </Container>
    </>
  );
}

export default App;
