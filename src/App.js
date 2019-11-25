import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./component/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from './component/PrivateRoute'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import Headers from './component/TopMenu';
import Chart from './component/Chart';
import Home from './component/Home';
import UserProfile from './component/UserProfile';
import { makeStyles } from '@material-ui/core/styles';
import { width } from '@material-ui/system';

function App() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Headers/>
        </header>
        <div style={{ position: 'relative', height: 'calc(100vh - 50px)'}}>
        <SideNav onSelect={(selected) => {const to = '/' + selected; history.push(to);}} style={{background: 'midnightblue'}}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="">
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="chart">
              <NavIcon>
                  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>Charts</NavText>
            </NavItem>
            <NavItem eventKey="userprofile">
              <NavIcon>
                  <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>User</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <main>
          <div style={{ position: 'relative', left: '70px', display: 'inline-block', width:1800 }}>
          <PrivateRoute path="/chart" component={props => <Chart />} />
          <PrivateRoute path="/userprofile" component={props => <UserProfile/>} />
          <PrivateRoute path="/" exact component={props => <Home />} />
          </div>
        </main>
        </div>
      </Router>
      </div>
  );

}

export default App;
