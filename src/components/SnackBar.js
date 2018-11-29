import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as actions from '../store/actions/index';
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };
  handleFavoriteClick = () => {
    let faveInfo = {faveData: this.props.faveData, userId: this.props.userId  };
    this.props.onAddFavorite(faveInfo, this.props.token);
    this.setState({open: true});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Button onClick={this.handleClick}>Open simple snackbar</Button> */}
        {this.props.isAuthenticated && !this.props.favorited ? 
            <IconButton aria-label="Add to favorites">
                <FavoriteIcon onClick={this.handleFavoriteClick}/>
            </IconButton> : null}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Gif added to favorites</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    // clicked: state.favorites.favorited
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddFavorite: (faveData, token) => dispatch(actions.addFavorite(faveData, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleSnackbar));