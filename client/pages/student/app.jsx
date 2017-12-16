import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import MyCourse from './views/MyCourse/MyCourse';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel">
                    <Header {...this.props}/>

                    <Switch>
                        <Route path="/course" component={MyCourse}/>
                        <Redirect from="/" to="/course"/>
                    </Switch>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
