import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
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
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader=""
          title="EXPERIENCE"
        />
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {`${values.title} | ${values.company} (${values.from} - ${values.to})`}
          </Typography>
          {values.descriptions.map((desc) => (
            <Typography variant="body2" gutterBottom>
              {desc}
            </Typography>
          ))}
        </CardContent>
        <Divider />
        <CardHeader
          subheader=""
          title="PROJECTS"
        />
        <Divider />
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
