import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function UserProfile() {
  const { isAuthenticated, user } = useAuth0();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className="abount_me">
      <Card className={classes.card}>
      <CardContent>
        <Avatar alt="Remy Sharp" src={user.picture} className={classes.bigAvatar} />
        <br/>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          User Name : {user.name}
        </Typography>
        <Typography variant="body2" component="p">
          Email : {user.email}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </div>
  );
}

export default UserProfile;
