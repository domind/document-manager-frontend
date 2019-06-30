import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";


class MyTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = { myTable: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/myTable")
      .then(response =>  response.json())
      .then(data => this.setState({ myTable: data, isLoading: false }));
  }


  async remove(id, filePath) {
    await fetch(`http://localhost:8080/api/myTable/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": this.props.loginData.token,
        "user": this.props.loginData.user,
      }
    }).then(() => {
      let updatedTable = [...this.state.myTable].filter(i => i.id !== id);
      this.setState({ myTable: updatedTable });
      if (filePath !== "")
        fetch(`http://localhost:8080/delete/myTable/${filePath}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token": this.props.loginData.token,
            "user": this.props.loginData.user,
          }
        });

    });
  }

  render() {
    const { myTable, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const table = []
      .concat(myTable)
      .sort((a, b) => a.category.localeCompare(b.category))
      .map(myTable => {
        return (
          <tr key={myTable.id}>
            <td style={{ whiteSpace: "nowrap" }}>{myTable.category}</td>
            <td style={{ whiteSpace: "nowrap" }}>
              {myTable.filePath ? (
                <a
                  href={"/uploads/myTable/" + myTable.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {myTable.description}
                </a>
              ) : (
                  myTable.description
                )}{" "}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>{myTable.issueDate}</td>

            <td className="center" style={{ whiteSpace: "nowrap" }}>{myTable.expiryDate}</td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              <div >
                {myTable.myCheckBox ? "YES" : "NO"}
              </div>
            </td>

            {(this.props.loginData.user !== "") ?
              <td>
                <ButtonGroup>
                  <Button
                    size="sm"
                    color="primary"
                    tag={Link}
                    to={"/myTable/" + myTable.id}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => this.remove(myTable.id, myTable.filePath)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td> : null
            }
          </tr>

        );
      });

    return (
      <div className="mainBody">
        <Container fluid >
          {(this.props.loginData.user !== "") ? <div className="float-right">
            <Button color="success" tag={Link} to="/myTable/new">
              Add record
            </Button>
          </div> : ''}
          <h1 className="titleText">
            Main title
          </h1>
          <h3 className="titleText">
            Document list title
          </h3>
          <Table className="mt-4 table">
            <thead >
              <tr><th width="10%">Category (List is sorted by this column)</th>
                <th width="30%">
                  Description of document (click on the 'description' to open)
                </th>
                <th width="10%">Issue Date</th>
                <th width="10%">Expiry date</th>
                <th width="5%">My Check Box</th>
                {(this.props.loginData.user !== "") ? <th width="10%">Actions</th> : null}
              </tr>
            </thead>
            <tbody className="table">{table}</tbody>
          </Table>

        </Container>

      </div>
    );
  }
}

export default MyTable2;
