import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyTable2 from './MyTable2';
import MyTable from './MyTable';
import MyTableEdit from './MyTableEdit';
import Login from './Login';
import AppNavbar from "./AppNavbar";


class App extends Component {
  loginDetCont = {
    user: "",
    token: ""
  }
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: "",
      token: "",
      loginDet: this.loginDetCont,
    };
  }
  userToken = (user, token, login) => {
    let x = this.loginDetCont;
    x.user = user;
    x.token = token;
    this.setState({ user: user, token: token, isAuthenticated: login, loginDet: x });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path='/'
            exact={true}
            render={(props) =>
              <div>
                <AppNavbar
                  user={this.state.user}
                  loginData={this.state.loginDet}
                  fromNavbar={this.userToken}
                />
                <Home />
              </div>}
          />
          <Route
            path='/myTable'
            exact={true}
            render={(props) =>
              <div>
                <AppNavbar
                  loginData={this.state.loginDet}
                  fromNavbar={this.userToken}
                />
                <MyTable
                  loginData={this.state.loginDet}
                />
              </div>}
          />
          <Route
            path='/myTable/:id'
            render={(props) =>
              <div>
                <AppNavbar
                  loginData={this.state.loginDet}
                  fromNavbar={this.userToken}
                />
                {(this.state.loginDet.user !== "") ? <MyTableEdit loginData={this.state.loginDet} /> : <Home />}
              </div>}
          />

          <Route
            path='/myTable2'
            exact={true}
            render={(props) =>
              <div>
                <AppNavbar
                  loginData={this.state.loginDet}
                  fromNavbar={this.userToken}
                />
                <MyTable2 loginData={this.state.loginDet} />
              </div>
            }
          />

          <Route
            path='/login'
            exact={true}
            render={(props) =>
              <div>
                <AppNavbar
                  loginData={this.state.loginDet}
                  fromNavbar={this.userToken}
                />
                <Login {...props}
                  callbackFromLogin={this.userToken}
                />
              </div>}
          />

        </Switch>
      </Router>
    )
  }
}

export default App;
