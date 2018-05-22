import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import firebase from './firebase.js';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupCode: this.props.groupCode,

      center : {
          lat: 37.3596049,
          lng: -122.0665
      },
      zoom : 16,
      groupLocations : null
    }
  }

  componentWillMount() {
    const ref = firebase.database().ref('groups/' + this.state.groupCode);

    ref.on('value', (snapshot) => {
      const updatedLocations = [];

      console.log('Updating Markers');
      console.log(snapshot.val());
      snapshot.forEach(childSnapshot => {
        const marker = {
          username: childSnapshot.val().username,
          lat: childSnapshot.val().coordinate.latitude,
          lng: childSnapshot.val().coordinate.longitude,
        }
        console.log("Adding marker: " + marker.username + " " + marker.lat + " " + marker.lng);
        updatedLocations.push(marker);
      });

      this.setState({groupLocations: updatedLocations});
    });

  }

  render() {
    //Marker Component
    const Marker = ({text}) => {
        return (
            <div><b>{text}</b></div>
        );
    }

    return (
      <div>
        <MuiThemeProvider>
          <AppBar
              title= { "Group: " + this.state.groupCode }
              onLeftIconButtonClick = { this.props.onClick.bind() }
              iconElementLeft = {<IconButton> <NavigationArrowBack /> </IconButton>}
          ></AppBar>
        </MuiThemeProvider>

        <div style={{ height: '89vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyChhAXI5l-MsCiGFJDlHCQoJF1C6gEngn4' }}

              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}

          >
            {
              this.state.groupLocations ?
                this.state.groupLocations.map( (each) =>
                    <Marker
                        lat = {each.lat}
                        lng = {each.lng}
                        text = {each.username}
                    />
                )
                :
                undefined
            }
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default MapView;
