import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/auth';

class Auth extends Component {

  state = {
    controls: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        signUpOnly: true
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        signUpOnly: true
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        signUpOnly: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        signUpOnly: false
      }
    },
    isSignup: false
  }

  //checking if last action was signing up the user. If so changing state to login
  componentWillReceiveProps(nextProps) {
    if(nextProps.isSignedUp) {
      this.setState({
        ...this.state,
        isSignup: false
      })
    }
  } 

  inputChangeHandler = (event, name) => {
    const updatedControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[name].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls });
  }

  switchAuthModeHandler = () => {
    this.setState( prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }

  submitHandler = ( event ) => {
    event.preventDefault();
    if(this.state.isSignup) {
      this.props.onSignup(
        this.state.controls.firstName.value,
        this.state.controls.lastName.value,
        this.state.controls.email.value,
        this.state.controls.password.value
      )
    } else {
      this.props.onLogin(
        this.state.controls.email.value, 
        this.state.controls.password.value
      );
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    
    let form = formElementsArray
      .filter(element => this.state.isSignup || !element.config.signUpOnly)
      .map(element => (
      <Input
        key={element.id}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangeHandler(event, element.id)} />
    ));

    if ( this.props.loading ) {
      form = <Spinner />
    }

    let errorMessage = null;

    if ( this.props.error ) {
      console.log('error', this.props.error);
        errorMessage = (
            <p>{this.props.error}</p>
        );
    }

    let authRedirect = null;
    if ( this.props.isAuthenticated ) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        <h3>{this.state.isSignup ? 'Sign up' : 'Sign in'}</h3>
        <div className={classes.SwitchMethod} onClick={this.switchAuthModeHandler}>
          <span>Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}</span>
        </div>
        <br/><br/>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler} className={classes.Form}>
          { form }
          <div className={classes.Submit}>
            <Button type="Highlight" size="20">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isSignedUp: state.auth.token === null && state.auth.user !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onSignup: (firstName, lastName, email, password) => dispatch(actions.signup(firstName, lastName, email, password)),
    onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);