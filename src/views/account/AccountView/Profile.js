import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Link,
  Grid
} from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const user = {
  avatar: `${process.env.PUBLIC_URL}/static/images/avatars/baotran.jpg`,
  city: 'Middletown, CT',
  country: 'USA',
  jobTitle: 'Senior Software Engineer',
  name: 'Bao Tran',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container spacing={5}>
          <Grid item xs={1}>
            <Link href="https://www.linkedin.com/in/baoqtran" color="inherit">
              <LinkedInIcon fontSize="large" color="primary" />
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link href="https://github.com/btran12" color="inherit">
              <GitHubIcon fontSize="large" />
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
