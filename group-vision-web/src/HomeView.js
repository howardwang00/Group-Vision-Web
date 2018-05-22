import React from 'react';

import './HomeView.css';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

    editUsername() {
      const username = prompt("New Username: ");
      this.setState({ name: username });
    }

    joinButton() {
      const groupCode = prompt("Enter Group Code: ");
      this.props.joinGroup(groupCode);
    }

    createButton() {
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
              <div className = "buttonDiv">
                <FlatButton className = "joinButton"
                  label = "Join"
                  onClick={this.joinButton}
                />
                <br />
                <FlatButton className = "createButton"
                  label = "Create"
                  onClick={this.createButton}
                />
              </div>
            </div>
          </MuiThemeProvider>
        );
    }
}

export default HomeView;
