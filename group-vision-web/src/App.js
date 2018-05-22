import React, { Component } from 'react';

import MapView from './MapView.js';
import HomeView from './HomeView.js';

import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Default Name',
      currentView: 1
    };

    const groupCode = '';
  }

  componentWillMount() {
    console.log("Connecting to Firebase");
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });

    /*
    var users = {};

    const groupRef = firebase.database().ref("groups");

    groupRef.on('value', snapshot => {
      users = snapshot.val();
      console.log(users);
    });
    */
  }

  editUsername = (username) => {
    this.setState({username: username});
  }

  joinGroup = (groupCode) => {
    this.groupCode = groupCode;

    this.segueToMap();
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
          username = {this.state.username}
          onClick = {() => this.segueToMap()}
          editUsername = {this.editUsername}
          joinGroup = {this.joinGroup}
        />
      );
    } else {
      return (
        <MapView
          groupCode = { this.groupCode }
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
