
import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

// const Dashboard = require('./views/Dashboard/Dashboard');

import Dashboard from './views/Dashboard/Dashboard';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel">
                    <Header {...this.props}/>

                    <Switch>
                        <Route path="/student" component={Dashboard}/>
                        {/* <Route path="/student/settings" component={Dashboard}/> */}
                        {/* <Redirect from="/" to="/dashboard"/> */}
                    </Switch>

                    <Footer />
                </div>
            </div>
        );
    }
}

module.exports = App;
