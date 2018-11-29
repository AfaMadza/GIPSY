import React, { Component } from 'react';
import {connect} from 'react-redux';
import Gifs from './components/Gifs';
import {Route, Redirect, withRouter, Switch} from 'react-router-dom';
import Drawer from './components/Drawer';
import Auth from './components/Auth'; 
import Logout from './components/Logout';
import Favorites from './components/Favorites'
import * as actions from './store/actions/index';
import GifResults from './components/GifResults';
import AuthBackground from './components/AuthBackground';
import './App.css';

function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);
class App extends Component {
  
  componentDidMount () {
    this.props.onTryAutoSignIn();
  }
  render() {
  
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} /> 
        <Route path="/trending" component={Gifs} />
        <Route path="/search" key={this.props.searchRedirectPath} component={GifResults} />
        <Route path="/" component={Gifs} />
        <Redirect to="/"/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route exact path="/favorites" component={Favorites} />
          <Route path="/auth" component={Auth} /> 
          <Route path="/trending" component={Gifs} />
          <Route path="/search" key={this.props.searchRedirectPath} component={GifResults} />
          <Route path="/" component={Gifs} />
          <Redirect to="/"/>
        </Switch>
      );
    }
    let searchRedirect = null;
    if (this.props.results) {
      searchRedirect = <Redirect exact to={this.props.searchRedirectPath} key={this.props.searchRedirectPath}/>;
    }

    return (
      <div className="App" style={{background: `url(${AuthBackground})`}}>
        <Drawer />
        {searchRedirect}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    results: state.search.results,
    searchRedirectPath: state.search.searchRedirectPath + '?q=' + state.search.query
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
