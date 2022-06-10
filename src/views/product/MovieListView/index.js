/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Page from 'src/components/Page';
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
    fetch(`https://api.themoviedb.org/3/movie/${moviesSelect}?api_key=4c40b76e885cbdd0161087ef43a8fce5&language=en-US&page=${page}`)
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
    const { movies, page, totalPages } = this.state;
    const classes = useStyles;
    return (
      <Page
        className={classes.root}
        title="Movies"
      >
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
