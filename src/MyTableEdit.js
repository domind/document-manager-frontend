import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

class MyTableEdit extends Component {
  emptyItem = {
    category: "",
    description: "",
    issueDate: Date,
    expiryDate: Date,
    myCheckBox: "",
    filePath: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const myTable = await (await fetch(
        `http://localhost:8080/api/myTable/${this.props.match.params.id}`
      )).json();
      this.setState({ item: myTable });
    }
  }
  handleChange2(event) {
    let item = { ...this.state.item };
    const formData = new FormData();
    const target = document.querySelector('input[type="file"]').files[0];
    formData.append("file", target);
    fetch("http://localhost:8080/uploadFile/myTable", {
      method: 'POST',
      headers: {
        "token": this.props.loginData.token,
        "user": this.props.loginData.user,
      },
      body: formData
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    item.filePath = target.name;
    this.setState({ item });

  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value; //target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    let x = {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": this.props.loginData.token,
        "user": this.props.loginData.user,
      },
      body: JSON.stringify(item),

    }
    await fetch("http://localhost:8080/api/myTable", x);
    this.props.history.push("/myTable");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit myTable" : "Add myTable"}</h2>;

    return (
      <div>
          <Container className="mainText">
          {title}
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="category">category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={item.category || ""}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="description">description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={item.description || ""}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-2 mb-2">
                <Label for="issueDate">Start Date</Label>
                <Input
                  type="date"
                  name="issueDate"
                  id="issueDate"
                  value={
                    item.issueDate !== null ? item.issueDate.toString() : ""
                  }
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-2 mb-2">
                <Label for="expiryDate">Exipry Date</Label>
                <Input
                  type="date"
                  name="expiryDate"
                  id="expiryDate"
                  value={
                    item.expiryDate !== null ? item.expiryDate.toString() : ""
                  }
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-2 mb-2">
              </FormGroup>
              <FormGroup className="col-md-2 mb-2">
                <Label for="myCheckBox">
                  <Input
                    type="checkbox"
                    name="myCheckBox"
                    id="myCheckBox"
                    checked={item.myCheckBox}
                    onChange={this.handleChange}
                  />
                  Some Check Box
                </Label>
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup encType="multipart/form-data" action="">
                <Label for="filePath">file</Label>
                <input
                  type="file"
                  name="filePath"
                  id="filePath"
                  defaultValue={item.filePath}
                />
                <input
                  type="button"
                  value="upload"
                  onClick={this.handleChange2.bind(this)}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/myTable">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>

      </div>
    );
  }
}

export default withRouter(MyTableEdit);
