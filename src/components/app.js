import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="grid">
        <div className="grid__skew-dark-box" />
        <div className="grid__skew-dark" />
        <div className="grid__skew-light" />
      </div>
    );
  }
}
