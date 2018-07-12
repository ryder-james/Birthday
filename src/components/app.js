import React, { Component } from 'react';
import moment from 'moment';

import Picker from './picker';
import Button from './button';
import Clock from './clock';
import LargeText from './largeText';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clockActive: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }

  handleChange = function(date) {
    this.setState({
        startDate: date
    });
  }.bind(this)

  handleGenerate = function() {
    this.setState({clockActive: true})

    const bday = this.state.startDate.toDate();
    const today = new Date();
    const currentMonth = today.getMonth();
    const bMonth = bday.getMonth();

    if (bMonth > currentMonth) {
      bday.setFullYear(today.getFullYear());
    } else if (bMonth < currentMonth) {
      bday.setFullYear(today.getFullYear() + 1);
    } else if (bMonth == currentMonth) {
      if (bday.getDate() > today.getDate()) {
        bday.setFullYear(today.getFullYear());
      } else if (bday.getDate() <= today.getDate()) {
        bday.setFullYear(today.getFullYear() + 1);
      }
    }

    const countDownDate = bday.getTime();

    this.timer = setInterval(function() {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.setState({
        timeRemaining: {
          days,
          hours,
          minutes,
          seconds
        }
      });

      if (distance < 0) {
        clearInterval(this.timer);
        console.log("Expired");
      }
    }.bind(this), 1000);
  }.bind(this)

  renderItems = function() {
    if(this.state.clockActive) {
      return [
        <Clock timeRemaining={ this.state.timeRemaining }/>,
        Button("Change Date", "change-date", 
        () => {
          this.setState({ clockActive: false });
          clearInterval(this.timer);
        }),
        LargeText("04/18"),
        <label className="grid__remaining">remaining until your 28th birthday</label>
      ]
    } else {
      return [
        Button("Generate Countdown", "button", () => this.handleGenerate()),
        <Picker startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>
      ]
    }
  }.bind(this)

  render() {
    return (
      <div className="grid">
        <h1 className="grid__title">Birthday Countdown</h1>
        
        <div className="grid__skew-dark"/>
        <div className="grid__skew-light"/>

        { this.renderItems() }
      </div>
    );
  }
}
