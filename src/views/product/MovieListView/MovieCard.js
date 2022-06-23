import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import Rating from '@mui/material/Rating';
import Stars from '@material-ui/icons/Stars';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const MovieCard = ({ className, product: movie, ...rest }) => {
  const classes = useStyles();
  const [rating, setRating] = React.useState(0);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <NavLink to={`/app/movie?id=${movie.id}`}>
            <img
              alt="movie"
              src={POSTER_BASE_URL + movie.poster_path}
              variant="square"
            />
          </NavLink>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {movie.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body2"
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={1}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Stars
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {movie.vote_average}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

MovieCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default MovieCard;
