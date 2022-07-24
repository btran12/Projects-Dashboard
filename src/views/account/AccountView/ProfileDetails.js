import React from 'react';
import {
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';
import { Box, Rating, Typography } from '@mui/material';

const ProfileDetails = () => {
  const values = {
    title: 'Senior Software Engineer',
    company: '3M',
    from: 'Feb 2017',
    to: 'Present',
    descriptions: ['Lead developer on international and domestic projects.',
      'Provide guidance and support to new engineers on the team.',
      'Facilitate the development of medical coding, grouping and billing software using Java.',
      'Facilitate the migration of legacy technologies to using Java.',
      'Build and support internal web applications written in ReactJS and AngularJS.',
      'Develop and maintain internal web services.',
      'Able to quickly learn and adapt to proprietary languages and technologies.',
      'Able to clearly communicate with other team members and stakeholders.'
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Experience
        </Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            {`${values.title} | ${values.company} (${values.from} - ${values.to})`}
          </Typography>
          {values.descriptions.map((desc) => (
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
          <Typography component="legend">Java</Typography>
          <Rating
            defaultValue={5}
            readOnly
          />
          <Typography component="legend">Javascript</Typography>
          <Rating
            defaultValue={5}
            readOnly
          />
          <Typography component="legend">PHP</Typography>
          <Rating
            defaultValue={4.5}
            precision={0.5}
            readOnly
          />
          <Typography component="legend">Python</Typography>
          <Rating
            defaultValue={4}
            readOnly
          />
          <Typography component="legend">Sql</Typography>
          <Rating
            defaultValue={3.5}
            precision={0.5}
            readOnly
          />
          <Typography component="legend">C++</Typography>
          <Rating
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          <Typography component="legend">C</Typography>
          <Rating
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ProfileDetails;
