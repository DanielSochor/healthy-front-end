import React, { Component } from 'react';
import FloatingActionButton from "../FloatingButton/Fab";
import M from "materialize-css";
import MessageBoard from "../MessageBoard/MessageBoard";
import Leaderboard from "../Leaderboard/Leaderboard";
import UserData from "../UserData/UserData"

class ChallengePage extends Component {
    componentDidMount() {
        M.AutoInit()
    }
    render() {
        return (
            <div>
                <nav className="nav-extended blue-grey">
                    {/* <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">HealthMate</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">

                            <li><a href="#!">Settings</a></li>
                        </ul>
                    </div> */}
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><a className="active" href="#userData"><i className="large material-icons">poll</i></a></li>
                            <li className="tab"><a href="#leaderboard"><i className="large material-icons">local_play</i></a></li>
                            <li className="tab"><a href="#messageBoard"><i className="large material-icons">message</i></a></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <div className="row blue-grey">
                        <i className="account_pic material-icons">account_circle</i>
                        <div className="usernameText col s12"><li>Username</li></div>
                        <div className="daysChallengeText col s12"><li>___ Days on Challenge</li></div>
                    </div>
                    <li><a href="#!"><i className="settingsIcon material-icons">settings</i><p>Settings</p></a></li>
                    <div className="col s12" id="logoutBtn"><li><a className="waves-effect waves-light btn-large " href="#!">Logout</a></li></div>
                </ul>

                <div id="userData" className="col s12 center">
                    <UserData />
                </div>
                <div id="leaderboard" className="col s12 center">
                    <h3>Leaderboard</h3>
                    <Leaderboard/>
                </div>
                <div id="messageBoard" className="col s12 center">
                    <h3>Message Board</h3>
                    <MessageBoard/>
                </div>
                {/* <FloatingActionButton /> */}
            </div>
        );
    }
}

export default ChallengePage;

