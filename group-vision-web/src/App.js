import React, {Component} from 'react';

import MapView from './MapView.js';
import HomeView from './HomeView.js';

import firebase from './firebase.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            groupCode: '',
            username: 'Default Name',
            currentView: 1
        };
    }

    componentWillMount() {
        console.log("Connecting to Firebase");
        firebase.auth().signInAnonymously().catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });
    }

    editUsername = (username) => {
        this.setState({username: username});
    }

    joinGroup = (groupCode) => {
        const ref = firebase.database().ref("groups").child(groupCode);

        return ref.once('value').then((snapshot) => {   //Could have issues with once not working
            if (snapshot.val() != null) {
                this.setState({groupCode: groupCode})

                this.segueToMap();
            } else {
                alert('Group Does Not Exist');
            }
        });
    }

    segueToMap() {
        this.setState({currentView: 2});
    }

    segueToHome() {
        this.setState({currentView: 1});
    }

    currentPage() {
        if (this.state.currentView === 1) {
            return (
                <HomeView
                    username={this.state.username}
                    editUsername={this.editUsername}
                    joinGroup={this.joinGroup}
                />
            );
        } else {
            return (
                <MapView
                    username={this.state.username}
                    groupCode={this.state.groupCode}
                    onClick={() => this.segueToHome()}
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
