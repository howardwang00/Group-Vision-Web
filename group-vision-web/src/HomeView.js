import React, { Componenet } from 'react';
import { render } from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class HomeView extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Default Name"
        };

        this.changeNameTapped = this.changeNameTapped.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    changeNameTapped(event) {
        this.setState({name: event.target.value});
    }

    handleClick() {
        alert(this.state.name + " Clicked");
    }

    render() {
        return (
            <MuiThemeProvider>
                <AppBar
                    title= { "Hello " + this.state.name }
                    showMenuIconButton={false}
                ></AppBar>
                <p> Name: </p>
                <input type="text" onChange={this.changeNameTapped} />

                <button onClick={this.handleClick.bind(this)}> Cool Button </button>
            </MuiThemeProvider>
        );
    }
}

export default HomeView;
