/* global window */
import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import App from './app.jsx';

import 'assets/css/bootstrap.min.css';
import 'assets/css/animate.min.css';
import 'assets/sass/light-bootstrap-dashboard.css';
import 'assets/css/demo.css';
import 'assets/css/pe-icon-7-stroke.css';

const Page = {
  blastoff: function () {

    this.mainElement = ReactDOM.render(
      (
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={App}/>
          </Switch>
        </HashRouter>
      ),
      window.document.getElementById('root')
    );
  }
};


module.exports = Page;


/* $lab:coverage:off$ */
if (!module.parent) {
  window.page = Page;
  Page.blastoff();
}
/* $lab:coverage:on$ */
