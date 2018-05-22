import React, { Component } from 'react';

import MapView from './MapView.js';
import HomeView from './HomeView.js';

import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: 1,
      groupCode: 'AAAA'
    };
  }

  componentWillMount() {
    console.log("Connecting to Firebase");
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });

    const users = [];

    const groupRef = firebase.database().ref("groups").child('0UN5');

    groupRef.on('value', snapshot => {

      snapshot.forEach(childSnapshot => {
        const user = {
          coordinate: childSnapshot.val().coordinate,
          timestamp: childSnapshot.val().timestamp,
          username: childSnapshot.val().username,
        }

        users.push(user);
      });
    });

    console.log(users);
  }

  joinGroup = (groupCode) => {
    this.setState({groupCode: groupCode});

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
          onClick = {() => this.segueToMap()}
          joinGroup = {this.joinGroup}
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
