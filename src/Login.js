import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";


class Login extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      auth: this.emptyAuth,
      msg: "Pls login",
      timeLeft: 3
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let auth = { ...this.state.auth };
    auth[name] = value;
    this.setState({ auth });
  }

  timeCount = () => {
    if (this.state.timeLeft > 0) {
      this.setState({ msg: "Logged in, moving to home page in: " + this.state.timeLeft + " seconds  " })
      setTimeout(this.timeCount, 1000);
      this.setState({ timeLeft: this.state.timeLeft - 1 })
    }
    else
      this.props.history.push("/");
  }

  async handleSubmit(event) {
    event.preventDefault();
    let resp = null;
    let responseFull = null;
    let sha1 = require('sha1');
    let pass = sha1(this.state.auth.password);
    let sendText = "http://localhost:8080/api/user?user=" + this.state.auth.user + "&password=" + pass;
    await fetch(sendText, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify('')
    })
      .then(response => {
        resp = response.status;
        return response.json();
      }).then(data => {
        responseFull = data;
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
    ;
    if (resp === 200) {
      this.props.callbackFromLogin(responseFull.user, responseFull.token);
      this.timeCount();
    }
    else {
      this.props.callbackFromLogin("", "");
      alert("Wrong user name or password");
      this.setState({ msg: "Wrong user name or password" });
    }
  }
  render() {
    return (
      <div>
        <Container className="col-md-3 mb-3 mainText">

          <Form onSubmit={this.handleSubmit}>

            <FormGroup className="col-md-12 mb-3">
              <Label for="unionAgreement">Login</Label>
              <Input
                type="text"
                name="user"
                id="user"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="col-md-12 mb-3">
              <Label for="seaCode">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">
                Login
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>

          </Form>
          {this.state.msg}

        </Container>

      </div>

    )
  }
}
export default Login;
