import React, {Component} from 'react';

import MapView from './MapView.js';
import HomeView from './HomeView.js';

import firebase from './firebase.js';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    constructor() {
        super();
        this.state = {
            groupCode: '',
            username: 'Default Name',
            currentView: 1,

            adminData: [],
        };

        this.segueToHome = this.segueToHome.bind(this);
    }

    componentWillMount() {
        console.log("Connecting to Firebase");
        firebase.auth().signInAnonymously().catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        });

        const ref = firebase.database().ref('groups/');

        ref.on('value', (snapshot) => {
            const adminData = [];

            snapshot.forEach(childSnapshot => {
                const groupData = [];
                childSnapshot.forEach(childSnapshot => {
                    const user = {
                        uid: childSnapshot.key,
                        username: childSnapshot.val().username,
                        lat: childSnapshot.val().coordinate.latitude,
                        lng: childSnapshot.val().coordinate.longitude,
                    }
                    groupData.push(user);
                })
                const group = {
                    groupCode: childSnapshot.key,
                    groupData: groupData,
                }
                adminData.push(group);
            });
            this.setState({adminData: adminData});
            ref.off();
        });
    }

    editUsername = (username) => {
        this.setState({username: username});
    }

    joinGroup = (groupCode) => {
        const ref = firebase.database().ref("groups").child(groupCode);

        return ref.once('value').then((snapshot) => {   //Could have issues with once not working
            if (snapshot.val() != null) {
                this.setState({groupCode: groupCode});

                this.segueToMap();
            } else {
                alert('Group Does Not Exist');
            }
        });
    }
    
    createGroup = () => {
        const groupCode = prompt('Enter Group Code: ');
        if(groupCode && groupCode.length === 4) {
            this.setState({groupCode: groupCode});
            this.segueToMap();
        } else {
            alert('Invalid Group Code');
        }
    }

    segueToAdmin = () => {
        const passCode = prompt('Enter Admin Password: ');
        if(passCode === 'password') {
            this.setState({currentView: 3});
        }
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
                    createGroup={this.createGroup}
                    onClick={this.segueToAdmin}
                />
            );
        } else if(this.state.currentView === 2) {
            return (
                <MapView
                    username={this.state.username}
                    groupCode={this.state.groupCode}
                    onClick={() => this.segueToHome()}
                />
            );
        } else {
            return (
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title={"Admin"}
                            onLeftIconButtonClick={this.segueToHome.bind()}
                            iconElementLeft={<IconButton> <NavigationArrowBack/> </IconButton>}

                        ></AppBar>
                        <div>
                            {
                                this.state.adminData.map((each) => {
                                    return(
                                        <div>
                                            <p>{each.groupCode}</p>
                                            <p>{
                                                each.groupData.map((each) => {
                                                    return(
                                                        <ul>
                                                            <li>{each.uid}</li>
                                                            <li>{each.username}</li>
                                                            <li>{each.lat}</li>
                                                            <li>{each.lng}</li>
                                                        </ul>

                                                    );
                                                })
                                            }</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </MuiThemeProvider>
            )
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
