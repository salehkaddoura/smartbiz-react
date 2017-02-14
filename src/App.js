import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      formValidated: false
    }
  }

  componentDidMount() {
    this._initPathAttributes();
  }

  render() {
    var formClass = classNames({
      'form__submit__wrapper': true,
      'form__valid': this.state.formValidated
    });

    console.log('here');

    return (
      <div>
        <form>
          <input className="form__input form__input--name" type="text" placeholder="name" ref={(input) => this._nameInput = input} onKeyUp={this._debounce(this._validateNameField.bind(this), 500)} />
          <input className="form__input form__input--email" type="email" placeholder="mail" ref={(input) => this._emailInput = input} onKeyUp={this._debounce(this._validateEmailField.bind(this), 500)} />
          <input className="form__input form__input--message" type="text" placeholder="message" ref={(input) => this._messageInput = input} onKeyUp={this._debounce(this._validateMessageField.bind(this), 500)} />
        </form>

        <div className={formClass}>
            <button className="form__button" type="submit">send</button>
            <svg className="form__submit__svg">
              <path ref={(path) => this._svgPath = path} d="M65,0 H120 A15,15 0 0,1 135,15 V17 A15,15 0 0,1 120,32 H15 A15,15 0 0,1 0,17 V15 A15,15 0 0,1 15,0 Z" fill="none" stroke="#e67e22" strokeWidth="2"></path>
            </svg>    
        </div>
      </div>
    );
  }

  _validateNameField() {
    let nameValue = this._nameInput.value;

    if (nameValue) {
      this._drawSvgPath();
    }
  }

  _validateEmailField() {
    let emailValue = this._emailInput.value;

    if (emailValue) {
      this._drawSvgPath();
    }
  }

  _validateMessageField() {
    let messageValue = this._messageInput.value;

    if (messageValue) {
      this._drawSvgPath();
    }
  }

  _drawSvgPath() {
    // length = length - sectionLength;
    // svgPath.style.strokeDashoffset = length;

    // this.setState((prevState, props) => ({
    //   svgPathLength: prevState.svgPathLength - this.state.sectionLength
    // }));
    if (this._svgPath.style.strokeDashoffset <= 0) {
      return;
    }

    this._svgPath.style.strokeDashoffset -= this.state.sectionLength;

    if (this._svgPath.style.strokeDashoffset <= 0) {
      setTimeout(function() {
        this.setState({ formValidated: true });
      }.bind(this), 100);
      
      return;
    } 
  }

  _initPathAttributes() {
    let length = this._svgPath.getTotalLength();

    this.setState({ 
      sectionLength: (length / 3),
      svgPathLength: length 
    });
  
    this._svgPath.style.transition = this._svgPath.style.WebkitTransition = 'none';
    // Set up the starting positions
    this._svgPath.style.strokeDasharray = length + ' ' + length;
    this._svgPath.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this._svgPath.getBoundingClientRect();
    // Define our transition
    this._svgPath.style.transition = this._svgPath.style.WebkitTransition = 'stroke-dashoffset 0.50s ease-in-out';
  }

  _debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

export default App;
