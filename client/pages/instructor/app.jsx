import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import Course from './views/Course/Course';
import Assignment from './views/Assignment/Assignment';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel">
          <Header {...this.props}/>

          <Switch>
            <Route path="/courses" component={Course}/>
            <Route path="/assignments" component={Assignment}/>
            <Redirect from="/" to="/courses"/>
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

module.exports = App;
