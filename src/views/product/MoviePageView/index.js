import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const classes = useStyles;
    return (
      <Page
        className={classes.root}
        title="Settings"
      >
        <Container id="movie-page">
          <Box
            id="banner"
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <img
              alt="Product"
              src="https://image.tmdb.org/t/p/original/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg"
              width={1000}
              variant="square"
            />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default MoviePage;
