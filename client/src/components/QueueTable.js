import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const QueueTable = (props) => {
  const classes = useStyles();
  const { queue } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>IMDb</TableCell>
            <TableCell>nzbgeek</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queue.map((movie) => (
            <TableRow key={movie.name}>
              <TableCell component="th" scope="row">{movie.title}</TableCell>
              <TableCell>
                <Link 
                  target="_blank" 
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                >IMDb page</Link>
              </TableCell>
              <TableCell>
                <Link
                  target="_blank" 
                  href={`https://nzbgeek.info/geekseek.php?movieid=${movie.imdb_id.replace('tt','')}`}
                >Movie Seek</Link>
              </TableCell>
              <TableCell>{movie.progress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QueueTable