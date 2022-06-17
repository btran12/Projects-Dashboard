/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { API_KEY } from 'src/services/TMDB/MovieRequest';
import Pagination from '@mui/material/Pagination';
import Page from 'src/components/Page';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from './Toolbar';
import MovieCard from './MovieCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  movieCard: {
    height: '100%'
  }
}));

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesSelect: 'now_playing',
      isLoaded: false,
      error: null,
      page: 1,
      totalPages: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleMoviesSelect = this.handleMoviesSelect.bind(this);
  }

  componentDidMount() {
    const { page, moviesSelect } = this.state;

    this.request(page, moviesSelect);
  }

  request(page, moviesSelect) {
    fetch(`https://api.themoviedb.org/3/movie/${moviesSelect}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result.results,
            totalPages: result.total_pages,
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
  }

  handlePageChange(event, value) {
    this.setState({ page: value });
    this.request(value, this.state.moviesSelect);
  }

  handleMoviesSelect(value) {
    this.setState({
      moviesSelect: value,
      page: 1,
    });
    this.request(this.state.page, value);
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { movies, page, totalPages, isLoaded } = this.state;
    const classes = useStyles;
    return (
      <Page
        className={classes.root}
        title="Movies"
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth={false}>
          <Toolbar onSelectMovies={this.handleMoviesSelect} />
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={totalPages}
              size="large"
              page={page}
              onChange={this.handlePageChange}
            />
          </Box>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              {movies.map((movie) => (
                <Grid
                  item
                  key={movie.id}
                  lg={3}
                  md={6}
                  xs={12}
                >
                  <MovieCard
                    className={classes.movieCard}
                    product={movie}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={totalPages}
              size="large"
              page={page}
              onChange={this.handlePageChange}
            />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default MovieList;
