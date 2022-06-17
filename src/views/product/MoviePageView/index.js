/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { API_KEY } from 'src/services/TMDB/MovieRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BANNER_BASE_URL = 'https://image.tmdb.org/t/p/original';

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const movieId = searchParams.get('id');

    this.request(movieId);
  }

  request = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movieDetails: result,
            error: null
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const classes = useStyles;
    const { movieDetails, isLoaded } = this.state;
    return (
      <Page
        className={classes.root}
        title="Settings"
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container id="movie-page">
          <Box
            id="banner"
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <img
              alt="Product"
              src={BANNER_BASE_URL + movieDetails.backdrop_path}
              width="100%"
              variant="square"
            />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default MoviePage;
