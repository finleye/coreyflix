import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Form = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off" onChange={props.onInputChange}>
      <TextField id="search" label="Search" />
    </form>
  );
}

export default Form;