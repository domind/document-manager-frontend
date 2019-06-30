import React, { Component } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }
  static contextTypes = {
    router: () => null,
  }

  toggleLogin() {
    if (this.props.loginData.user !== "") {
      this.props.fromNavbar("", "");
      console.log('logged out')
    }
    else {
      console.log('redirecting');
      this.props.history.push("/login");
      console.log('redirected')
    }
  }

  home() {
    this.props.history.push("/");
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (<div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Button} onClick={this.home.bind(this)}>
          Home
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="http://localhost:8080/api/myTable" target="_blank">
              api
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="http://localhost:8080/h2/" target="_blank">
              database
            </NavLink>
          </NavItem>
        </Nav>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Navigate
               </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/">
                  Home
                 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/login">
                  Login
                 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/myTable">
                  Table 1
                 </DropdownItem>
                <DropdownItem tag={Link} to="/myTable2">
                  Table 2
                 </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavbarBrand style={{ color: 'grey' }}>
                {(this.props.loginData.user !== "") ? 'you can edit now' : 'pls login to edit'}
              </NavbarBrand>
            </NavItem>

            <NavItem>

              <Button
                size="md"
                color="primary"
                onClick={this.toggleLogin.bind(this)}
              >
                {(this.props.loginData.user === "") ? "Login" : " Logout"}
              </Button>

            </NavItem>
          </Nav>
        </Collapse>
        <div>

        </div>
      </Navbar>

    </div>
    );
  }
}

export default withRouter(AppNavbar);
