/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { TMDB } from 'src/services/TMDB/MovieRequest';
import {
  Button, Card, CardActions, CardContent, CardMedia, Backdrop, CircularProgress,
  Typography, Stack, Link
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BANNER_BASE_URL = 'https://image.tmdb.org/t/p/original';
const BANNER_PLACEHOLDER = 'https://placehold.jp/1000x600.png';
const PLACE_HOLDER_URL = 'https://placehold.jp/400x600.png';

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: [],
      credits: [],
      recommendations: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const movieId = searchParams.get('id');
    this.requestData(movieId);
  }

  requestData = (movieId) => {
    this.setState({
      isLoaded: false
    });
    Promise.all([
      fetch(TMDB(movieId, '')),
      fetch(TMDB(movieId, '/credits')),
      fetch(TMDB(movieId, '/recommendations'))
    ]).then((responses) => {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map((response) => response.json()));
    }).then(
      (data) => {
        this.setState({
          isLoaded: true,
          error: null,
          movieDetails: data[0],
          credits: data[1],
          recommendations: data[2]
        });
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const classes = useStyles;
    const {
      movieDetails, credits, recommendations, isLoaded
    } = this.state;

    let genres = '';
    if (movieDetails.genres !== undefined) {
      genres = movieDetails.genres.map((genre) => genre.name).join(' | ');
    }

    let fiveCasts = [];
    if (credits.cast !== undefined) {
      fiveCasts = credits.cast.slice(0, 5);
    }

    let fiveRecommendations = [];
    if (recommendations.results !== undefined) {
      fiveRecommendations = recommendations.results.slice(0, 5);
    }
    return (
      <Page
        className={classes.root}
        title={movieDetails.original_title}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container id="movie-page">
          <Card>
            <CardMedia
              component="img"
              image={(movieDetails.backdrop_path === null)
                ? BANNER_PLACEHOLDER : BANNER_BASE_URL + movieDetails.backdrop_path}
              alt="movie banner"
            />
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                gutterBottom
                variant="h4"
              >
                {movieDetails.original_title}
              </Typography>
              <Typography
                align="right"
                gutterBottom
                variant="overline"
              >
                {genres}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
              >
                {movieDetails.overview}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={movieDetails.homepage}>Official Website</Button>
            </CardActions>
          </Card>

          <Stack direction="row" spacing={2} mt={3}>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Top Casts
            </Typography>
            {fiveCasts.map((member) => (
              <Card key={member.name} sx={{ width: '20%' }}>
                <CardMedia
                  component="img"
                  image={(member.profile_path === null)
                    ? PLACE_HOLDER_URL : BANNER_BASE_URL + member.profile_path}
                  alt="Profiler"
                />
                <CardContent>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    {`${member.name} as ${member.character}`}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} mt={3}>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Recommendations
            </Typography>
            {fiveRecommendations.map((movie) => (
              <Card key={movie.title} sx={{ width: '20%' }}>
                <Link href={`/dashboard/movie?id=${movie.id}`} underline="none">
                  <CardMedia
                    component="img"
                    image={(movie.poster_path === null)
                      ? PLACE_HOLDER_URL : BANNER_BASE_URL + movie.poster_path}
                    alt="Profiler"
                  />
                  <CardContent>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </Stack>
        </Container>
      </Page>
    );
  }
}

export default MoviePage;
