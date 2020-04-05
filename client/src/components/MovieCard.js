import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
  },
});

const MovieCard = (props) => {
  const classes = useStyles();
  const { poster_path, title, release_date, overview} = props;
  const releaseYear =  release_date ? `(${release_date.substring(0,4)})` : undefined

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title} {releaseYear}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to queue
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;