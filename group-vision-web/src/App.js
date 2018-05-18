import React, { Component } from 'react';

import MapView from './MapView.js';
import HomeView from './HomeView.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: 1,
      groupCode: 'AAAA'
    };
  }

  segueToMap() {
    this.setState({currentView: 2});
  }

  segueToHome() {
    this.setState({currentView: 1});
  }

  currentPage() {
    if(this.state.currentView === 1) {
      return (
        <HomeView
          onClick = {() => this.segueToMap()}
        />
      );
    } else {
      return (
        <MapView
          groupCode = { this.state.groupCode }
          onClick = {() => this.segueToHome()}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.currentPage()}
      </div>
    );
  }
}

export default App;
