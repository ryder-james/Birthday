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
      },
      age: 0
    }
  }

  handleChange = function(date) {
    this.setState({
        startDate: date
    });
  }.bind(this)

  handleGenerate = function() {
    const bday = this.state.startDate.toDate();
    const today = new Date();
    const cMonth = today.getMonth();
    const bMonth = bday.getMonth();

    const timeBetween = today.getTime() - bday.getTime();
    const daysOld = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
    const yearsOld = Number((daysOld/365).toFixed(0));
    this.setState({
      age: yearsOld,
      clockActive: true
    });
    
    if (bMonth > cMonth) {
      bday.setFullYear(today.getFullYear());
    } else if (bMonth < cMonth) {
      bday.setFullYear(today.getFullYear() + 1);
      this.setState({ age: yearsOld + 1 });
    } else if (bMonth == cMonth) {
      if (bday.getDate() > today.getDate()) {
        bday.setFullYear(today.getFullYear());
      } else if (bday.getDate() <= today.getDate()) {
        bday.setFullYear(today.getFullYear() + 1);
        this.setState({ age: yearsOld + 1 });
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

  getBirthDate = function(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month < 10) {
      return `0${month}/${day}`
    } else {
      return `${month}/${day}`
    }
  }.bind(this)

  renderItems = function() {
    if(this.state.clockActive) {
      return [
        <Clock key={0} timeRemaining={ this.state.timeRemaining }/>,
        Button("Change Date", "change-date", 1, 
        () => {
          this.setState({ clockActive: false });
          clearInterval(this.timer);
        }),
        LargeText(this.getBirthDate(this.state.startDate.toDate(), 2)),
        <label key={3} className="grid__remaining">remaining until you turn {this.state.age}</label>
      ]
    } else {
      return [
        Button("Generate Countdown", "button", 0, () => this.handleGenerate()),
        <Picker key={1} startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>
      ]
    }
  }.bind(this)

  render() {
    return (
      <div key={-4} className="grid">
        <h1 key={-3} className="grid__title">Birthday Countdown</h1>
        
        <div key={-2} className="grid__skew-dark"/>
        <div key={-1} className="grid__skew-light"/>

        { this.renderItems() }
      </div>
    );
  }
}
