import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders'
import { Redirect } from 'react-router-dom'
class Auth extends Component {
  state={
    controls:{

      email: {
          elementType: 'input',
          elementConfig: {
              type: 'email',
              name:'email',
              autoComplete:'email',
              placeholder: 'Your E-Mail'
          },
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
          elementConfig: {
              type: 'password',
              name:'password',
              placeholder: 'Your password',
              autoComplete:'password'
          },
          value: '',
          validation: {
              required: true,
              minLength:7
          },
          valid: false,
          touched: false
      }
    },
    formIsValid:false,
    isSignUp:true
  }
  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }
  submitHandler =(event) =>{
      event.preventDefault();
      this.props.onAuthStart(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)

  }
  inputChangedHandler = (event, inputIdentifier) => {
      const updatedControls = {
          ...this.state.controls
      };
      const updatedFormElement = {
          ...updatedControls[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedControls[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }
      this.setState({controls: updatedControls, formIsValid: formIsValid});
  }
  switchAuthModeHandler =(event) =>{
    event.preventDefault();
    this.setState(prevState=>({
      isSignUp:!prevState.isSignUp
    }))

  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }
    let form = formElementsArray.map(formElement=>
      (<Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />)
    )
    if(this.props.loading) form=<Spinner/>
    return (
      <div>
        {this.props.isAuthenticated?<Redirect to='/'/>:''}
        {this.props.error?`${this.props.error.message}`:''}
        <form onSubmit={this.submitHandler} className={classes.AuthData}>
          {form}
          <Button btnType="Success">SUBMIT</Button><br/>
          <Button
            btnType="Success"
            clicked={this.switchAuthModeHandler}
            >SWITCH TO {this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>
        </form>
      </div>
    )
  }
}
const mapStateToProps= state =>({
  loading:state.auth.loading,
  error:state.auth.error,
  isAuthenticated:state.auth.token!==null
})
const mapDispatchToProps = dispatch =>({
  onAuthStart:(email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth,axios));
