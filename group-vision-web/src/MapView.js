import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupCode: this.props.groupCode,
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
              title= { "Group: " + this.state.groupCode }
              onLeftIconButtonClick = { this.props.onClick.bind() }
              iconElementLeft = {<IconButton> <NavigationArrowBack /> </IconButton>}
          ></AppBar>

          <div style={{ height: '89vh', width: '100%' }}>
            <MapContainer/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MapView;


class MapContainer extends Component {
    constructor() {
        super();

        this.state = {

            //This is where the center of map is going to be
            center : {
                lat: 37.3596049,
                lng: -122.0665
            },

            //This is how much you want to zoom in
            zoom : 16,

            //This is the list of markers.
            myMarkers : []
        };


        //Adding to the list of markers
        const aMarker = {
            name : 'Mountain View High School',
            lat : 37.3605,
            lng : -122.0675,
        }
        this.state.myMarkers.push(aMarker);

        const aMarker2 = {
            name : 'FreeStyle',
            lat : 37.3599588,
            lng : -122.0653,
        }
        this.state.myMarkers.push(aMarker2);

        const aMarker3 = {
            name : 'Alta Vista',
            lat : 37.360188,
            lng : -122.064,
        }
        this.state.myMarkers.push(aMarker3);

        this.setState( {myMarkers : this.state.myMarkers} );
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
              <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyChhAXI5l-MsCiGFJDlHCQoJF1C6gEngn4' }}

                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
              >


                  {
                      //Add a list of Markers to Your Map
                      this.state.myMarkers.map( (each) =>
                          <Marker
                              lat = {each.lat}
                              lng = {each.lng}
                              text = {each.name}
                          />
                      )
                  }
              </GoogleMapReact>
            </div>
        );
    }
}
