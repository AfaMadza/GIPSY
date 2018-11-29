import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';

class SocialMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleShareClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton aria-label="Share">
            <ShareIcon onClick={this.handleShareClick}/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><a href="http://www.facebook.com"><i className="fa fa-facebook fa-2x fa-scale-inverse"></i></a></MenuItem>
          <MenuItem onClick={this.handleClose}><a href="http://www.twitter.com"><i className="fa fa-twitter fa-2x fa-scale-inverse"></i></a></MenuItem>
          <MenuItem onClick={this.handleClose}><a href="http://www.instagram.com"><i className="fa fa-instagram fa-2x fa-scale-inverse"></i></a></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SocialMenu;