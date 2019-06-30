import React, { Component } from "react";
import { Button, ButtonGroup, Container } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = { myTable: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/myTable")
      .then(response => response.json())
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

    function filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
      return (
        row[id] !== undefined ?
          String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
          :
          true
      );
    }

    const columns = [
      { accessor: 'category', Header: 'Category', priorityLevel: 1, position: 1, minWidth: 50, },
      {
        accessor: 'description', Header: "Description of the document (click on the 'description' to open)",
        priorityLevel: 2, position: 2, minWidth: 150, Cell: e => (e.row.filePath) ? <a href={'http://localhost:3000/uploads/myTable/' + e.row.filePath}>
          {e.value} </a> : e.value
      },
      { accessor: 'filePath', show: false },
      { accessor: 'issueDate', Header: 'Issue Date', priorityLevel: 2, position: 3, minWidth: 50, filterable: false, },
      { accessor: 'expiryDate', Header: 'Expiry date', priorityLevel: 2, position: 4, minWidth: 50, filterable: false, },
      { accessor: 'myCheckBox', Header: 'Some check box', priorityLevel: 3, position: 5, filterable: false, Cell: e => (e.value) ? "YES" : "NO" },
    ]

    if ((this.props.loginData.user !== "")) columns.push({
      accessor: 'id', Header: "Actions", filterable: false, minWidth: 50, Cell: e => <ButtonGroup>
        <Button
          size="sm"
          color="primary"
          tag={Link}
          to={"/myTable/" + e.value}
        >
          Edit
  </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => this.remove(e.value, e.row.filePath)}
        >
          Delete
  </Button>
      </ButtonGroup>
    })

    const rows2 = []
      .concat(myTable)
      .map(myTable => {
        return ({
          id: myTable.id, category: myTable.category,
          description: myTable.description,
          filePath: myTable.filePath,
          issueDate: myTable.issueDate,
          expiryDate: myTable.expiryDate,
          myCheckBox: myTable.myCheckBox
        })
      })


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

          <ReactTable
            className="-striped -highlight"
            pageSize={10}
            data={rows2}
            columns={columns} filterable={true}
            defaultSorted={[{
              id: 'category',
            }]}
            defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
          />

        </Container>

      </div>
    );
  }
}

export default MyTable;
