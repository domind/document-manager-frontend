import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';
import './HomeTile';
import HomeTile from './HomeTile';


class Home extends Component {

  render() {
    return (
      <div  >
        <div >
        <Row>
        <Col><br/></Col>
        </Row>
        <Row>
        <Col xs="1"></Col>
          <Col xs="10"className="title titleText" ><h1 >Simple doc management</h1></Col>
          <Col xs="1"></Col>
        </Row>

          <Row className="grid">
            <Col xs="6">
            
              <Row>
                <HomeTile link="/myTable" title="Table 1" description="Nice sortable and searchable documents list" />
                <HomeTile link="/myTable2" title="Table 2" description="Simple documents list allowing to be saved for offline use" />
                <HomeTile link="/login" title="Login" description="Link to login page" />
              </Row>
              <Row>
                <HomeTile link="" title="Empty tile" description="description here" />
                <HomeTile link="" title="Empty tile" description="description here" />
                <HomeTile link="" title="Empty tile" description="description here" />
              </Row>
              <Row>
                <HomeTile link="" title="Empty tile" description="description here" />
                <HomeTile link="" title="Empty tile" description="description here" />
                <HomeTile link="" title="Empty tile" description="description here" />
              </Row>
            </Col>
            <Col xs="1"></Col>
            <Col xs="3" className="title" >
 

                <h3 className="tileTitle">Some description</h3>
                <p>text here</p>

               
              </Col>

            <Col xs="1"  ></Col>
          </Row>

        </div>

      </div>
    );
  }
}

export default Home;
