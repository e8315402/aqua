import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';
// import sidebarBg from 'assets/img/sidebar.jpg';
// import logo from 'assets/img/homework256.png';

const logo = 'http://127.0.0.1:8000/public/media/homework.png'
const sidebarBg = 'http://127.0.0.1:8000/public/media/sidebar-2.jpg'

class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  activeRoutes(routeNames) {
    for (let i = 0; i < routeNames.length; ++i) {
      if (this.props.location.pathname.indexOf(routeNames[i]) > -1) {
        return 'active';
      }
    }
    return '';
  }
  updateDimensions(){
    this.setState({ width:window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }  render(){
    const sidebarBackground = {
      backgroundImage: `url(${sidebarBg})`
    };
    return (
      <div id="sidebar" className="sidebar" data-color="black" data-image={'public/pages/sidebar-3.jpg'}>
        <div className="sidebar-background" style={sidebarBackground}></div>
        <div className="logo">
          <a href="#/courses" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image"/>
            </div>
          </a>
          <a href="#/courses" className="simple-text logo-normal">
                            Assignment Submission
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            { this.state.width <= 991 ? (<HeaderLinks />) : null }
            <li className={this.activeRoutes(['/courses'])}>
              <NavLink to={'/courses'} className="nav-link" activeClassName="active">
                <i className="pe-7s-notebook"></i>
                <p>My Course</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('/user')}>
              <NavLink to={'/user'} className="nav-link" activeClassName="active">
                <i className="pe-7s-user"></i>
                <p>User Profile</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('/accounts')}>
              <NavLink to={'/accounts'} className="nav-link" activeClassName="active">
                <i className="pe-7s-users"></i>
                <p>Accounts</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('/typography')}>
              <NavLink to={'/typography'} className="nav-link" activeClassName="active">
                <i className="pe-7s-news-paper"></i>
                <p>Typography</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('/icons')}>
              <NavLink to={'/icons'} className="nav-link" activeClassName="active">
                <i className="pe-7s-science"></i>
                <p>Icons</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('/notifications')}>
              <NavLink to={'/notifications'} className="nav-link" activeClassName="active">
                <i className="pe-7s-bell"></i>
                <p>Notifications</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
