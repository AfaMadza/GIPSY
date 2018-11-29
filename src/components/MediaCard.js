import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import SnackBar from './SnackBar';
import SocialMenu from './SocialMenu';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import * as actions from '../store/actions/index';
import classnames from 'classnames';
const styles  = theme => ({
  
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  faveColor: {
    color: '#f50057'
  }
});

class MediaCard extends React.Component {
  state = { 
    expanded: false,
    currentTarget: null
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

 handleShareClick = (event) => {
  this.setState({currentTarget: event.currentTarget});
 }
  render() {
    const { classes } = this.props;

    return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.url}
          title={this.props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.title}
          </Typography>
          <Typography component="p">
            {this.props.loading ? <span className="fa-li"><i class="fas fa-spinner fa-pulse"></i></span> : null}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <SnackBar favorited={this.props.favorited} faveData={this.props.faveData}/>
          <SocialMenu currentTarget={this.state.currentTarget}/>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              About this GIF:
            </Typography>
            <Typography paragraph>
              Rating: {this.props.rating}
            </Typography>
            {/* <Typography paragraph>
              Source: {this.props.source}
            </Typography> */}
            <Typography paragraph>
              User: {this.props.user ? this.props.user : 'None'}
            </Typography>
            <Typography paragraph>
              Uploaded: {this.props.uploaded}
            </Typography>
            {/* <Typography>
              Trending: {this.props.trending}
            </Typography> */}
            <Typography>
              Frames: {this.props.frames}
            </Typography>
          </CardContent>
        </Collapse>
    </Card>
  );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      token: state.auth.token,
      userId: state.auth.userId,
      loading: state.favorites.loading
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onAddFavorite: (faveData, token) => dispatch(actions.addFavorite(faveData, token))
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MediaCard));
