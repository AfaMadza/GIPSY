import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
//import AuthBackground from './AuthBackground';
import * as actions from '../store/actions/index';
import { Container, Row, Col, Button, Fa, Modal, ModalBody, ModalFooter } from 'mdbreact';

const styles = theme => ({
    padd: {
        paddingTop: '70px !important',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'white',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      modalContent: {
        backgroundColor: '#3f51b5',          
      }
});
class Auth extends React.Component  {

  state = {
    controls: {
        email: {
            elementType: 'input',
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    },
    isSignup: true,
    modal: false
}

componentDidMount() {
    if (!this.props.requestDelivery && this.props.authRedirectPath !== '/') {
        this.props.onSetAuthRedirectpath()
    }
}

checkValidity ( value, rules ) {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}

inputChangedHandler = ( event, controlName ) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
            touched: true
        }
    };
    this.setState( { controls: updatedControls } );
}

submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
}

switchAuthModeHandler = () => {
    this.setState(prevState => {
        return {isSignup: !prevState.isSignup};
    });
}

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { classes } = this.props;

    let form = (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <EmailIcon style={{color: 'white'}} />
                </div>
                <Input
                    placeholder="Email"
                    value={this.state.controls.email.value}
                    //invalid={!this.state.controls.email.valid}
                    shoulvalidate={this.state.controls.email.validation}
                    //touched={this.state.controls.email.touched}
                    onChange={( event ) => this.inputChangedHandler( event, 'email' )} 
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                />
            </div>
            <div className={classes.search} style={{marginTop: '10px'}}>
                <div className={classes.searchIcon}>
                    <LockIcon style={{color: 'white'}}/>
                </div>
                <Input 
                    placeholder="Password"
                    value={this.state.controls.password.value}
                    //invalid={!this.state.controls.password.valid}
                    shouldvalidate={this.state.controls.password.validation}
                    //touched={this.state.controls.password.touched}
                    onChange={( event ) => this.inputChangedHandler( event, 'password' )} 
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                />
            </div>
        </div>          
    );
    // if (this.props.loading) {
    //     form = <Spinner />
    // }

    let errorMessage = null;

    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return(
      <Container className="d-flex justify-content-center" style={{paddingTop: '250px', width: '100vw', height: '100vh', backgroundImage: `url(require('../assets/images/AuthBackground.png')) !important`}}>
        <Row>
          <Col md="6">
            <Button color="info" onClick={this.toggle}>Get Started</Button>
            <div>
                <Modal  className={classes.padd + ' cascading-modal'} isOpen={this.state.modal} toggle={this.toggle}  >
                <div className="modal-header primary-color white-text" >
                    <h4 className="title">
                    <Fa /> {this.props.error ? errorMessage : 'Welcome!'} </h4>
                    <button type="button" className="close" onClick={this.toggle}>
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                {authRedirect}
                <ModalBody className={classes.modalContent}>
                    <form>
                         {form}
                         <Button color="secondary" onClick={this.submitHandler}>Submit</Button>{' '}
                    </form>
                </ModalBody>
                <ModalFooter className={classes.modalContent} style={{display: 'inline-table'}}>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
                    <Button color="primary"
                    onClick={this.switchAuthModeHandler}>
                    {this.state.isSignup ? 'Log In' : 'Sign Up'}</Button>
                </ModalFooter>
                </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        // requestDelivery: state.requestBuilder.requesting,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectpath: () => dispatch(actions.setAuthRedirectPath('/trending'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withStyles(styles)(Auth) );
