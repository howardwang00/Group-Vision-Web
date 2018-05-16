import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import firebase from './firebase.js';

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Default Name"
        };

        this.changeNameTapped = this.changeNameTapped.bind(this);
        this.joinButton = this.joinButton.bind(this);
        this.createButton = this.createButton.bind(this);
    }

    componentWillMount() {
      console.log("Connecting to Firebase");
      firebase.auth().signInAnonymously().catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
    }

    changeNameTapped(event) {
        this.setState({name: event.target.value});
    }

    joinButton() {
      console.log("Join Clicked");
      this.props.onClick();
    }

    createButton() {
      console.log("Create Clicked");
      this.props.onClick();
    }

    render() {
        return (
            <MuiThemeProvider>
              <div>
                <AppBar
                    title= { "Hello " + this.state.name }
                    showMenuIconButton={false}
                ></AppBar>

                <FlatButton label = "Join"
                  onClick={this.joinButton}
                />

                <FlatButton label = "Create"
                  onClick={this.joinButton}
                />
              </div>
            </MuiThemeProvider>
        );
    }
}

export default HomeView;
