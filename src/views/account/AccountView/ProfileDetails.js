import React from 'react';
import {
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';
import {
  Box, Container, Rating, Typography
} from '@mui/material';
import { languageCompetencies, profile } from './data';

const ProfileDetails = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Experience
        </Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            {`${profile.title} | ${profile.company} (${profile.from} - ${profile.to})`}
          </Typography>
          {profile.descriptions.map((desc) => (
            <Typography variant="body2" gutterBottom>
              {desc}
            </Typography>
          ))}
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant="h5" gutterBottom>Languages</Typography>
        <Divider />
        <Box mt={2}>
          {languageCompetencies.map((language) => (
            <Container>
              <Typography component="legend">{language.name}</Typography>
              <Rating
                defaultValue={language.score}
                readOnly
                precision={0.5}
              />
            </Container>
          ))}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ProfileDetails;
