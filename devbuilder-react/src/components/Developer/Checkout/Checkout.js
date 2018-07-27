import React, { Component } from 'react';

import classes from './Checkout.css';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import { checkValidity } from '../../../shared/utility';

class Checkout extends Component {

  state = {
    controls: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        value: '',
        validation: {
          required: false
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Details'
        },
        value: '',
        validation: {
          required: false
        },
        valid: false,
        touched: false
      }
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

  submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onSend(this.state.controls.title.value, this.state.controls.description.value);
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

    return (
      <div className={classes.Checkout}>
        <h3>New order</h3>
        { form }
        <div className={classes.Button}>
          <Button
            type="Highlight"
            size="25"
            clicked={this.submitHandler}>Send</Button>
        </div>
      </div>
    );
  }
}

export default Checkout;