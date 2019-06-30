import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Col } from 'reactstrap';

class HomeTile extends Component {

    render() {
        return (
            
                  <Link to={this.props.link} className="tiles2 d-flex  flex-column">
                    <Col>
                      <h3 className="tileTitle">{this.props.title}</h3>
                    </Col>
                    <div className="container align-self-end smallText">
                    {this.props.description}
          </div>
                  </Link>
                
        )}
}

export default HomeTile;