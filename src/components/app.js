import React, { Component } from 'react';
import Picker from './picker';
import Button from './button';
import Clock from './clock';
import LargeText from './largeText';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clockActive: false
    }
  }

  renderItems = function() {
    if(this.state.clockActive) {
      return [
        <Clock/>,
        Button("Change Date", "change-date", () => {this.setState({ clockActive: false })}),
        LargeText("04/18"),
        <label className="grid__remaining">remaining until your 28th birthday</label>
      ]
    } else {
      return [
        Button("Generate Countdown", "button", () => this.setState({clockActive: true})),
        <Picker/>
      ]
    }
  }.bind(this)

  render() {
    return (
      <div className="grid">
        <h1 className="grid__title">Birthday Countdown</h1>
        
        <div className="grid__skew-dark"></div>
        <div className="grid__skew-light" />

        { this.renderItems() }
      </div>
    );
  }
}
