/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField
} from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Search as SearchIcon } from 'react-feather';

const Toolbar = (props) => {
  const moviesSelectionsLabels = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];
  const moviesSelections = ['now_playing', 'popular', 'top_rated', 'upcoming'];

  const [selected, setSelected] = React.useState(0);

  const handleClick = (value, index) => {
    props.onSelectMovies(value);
    setSelected(index);
  };

  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box>
              <Stack direction="row" spacing={1}>
                {moviesSelections.map((selection, index) => (
                  <Chip
                    label={moviesSelectionsLabels[index]} 
                    variant={selected === index ? 'filled' : 'outlined'} 
                    onClick={() => { handleClick(selection, index); }} 
                  />
                ))}
              </Stack>
              <Box mt={3} maxWidth={500}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  size="small"
                  placeholder="Search movie"
                  variant="outlined"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  onSelectMovies: PropTypes.func
};

export default Toolbar;
