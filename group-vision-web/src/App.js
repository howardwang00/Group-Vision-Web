import React, { Component } from 'react';
import { render } from 'react-dom';
import GoogleMapReact from 'google-map-react';




class App extends Component {
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
                <center>
                    <div style={{ height: '100%', width: '100%' }}>

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
                </center>
            </div>

        );
    }
}

export default App;


