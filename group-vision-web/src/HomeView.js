import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import firebase from './firebase.js';

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Default Name"
        };

        this.editUsername = this.editUsername.bind(this);
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

    editUsername() {
      alert("Edit Username");
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
                    onLeftIconButtonClick = { this.editUsername.bind() }
                    iconElementLeft = {<IconButton> <Edit /> </IconButton>}
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
