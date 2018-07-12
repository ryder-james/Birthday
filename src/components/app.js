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

  handleGenerate = function() {
    this.setState({clockActive: true})

    // Set the date we're counting down to
    const countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      const time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      console.log(time);

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        console.log("Expired");
      }
    }, 1000);
  }.bind(this)

  renderItems = function() {
    if(this.state.clockActive) {
      return [
        <Clock/>,
        Button("Change Date", "change-date", () => this.setState({ clockActive: false })),
        LargeText("04/18"),
        <label className="grid__remaining">remaining until your 28th birthday</label>
      ]
    } else {
      return [
        Button("Generate Countdown", "button", () => this.handleGenerate()),
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
