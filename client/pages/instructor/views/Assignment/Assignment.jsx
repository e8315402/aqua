import React, { Component } from 'react';
import { Table, Row, Col, Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Card from 'components/Card/Card.jsx';
import Actions from './actions';
import Store from './store';
import Qs from 'qs';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object
};

class Assignments extends Component {

  constructor(props) {
    super(props);
    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    this.state = {
      showModal: false,
      deadline: moment(),
      assignmentName: '',
      description: ''
    };

    this.state = Object.assign(this.state, Store.getState());
    this.handleDateChange = this.handleDateChange.bind(this);
    this.createAssignment = this.createAssignment.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentWillMount() {
    const query = Qs.parse(this.props.location.search.substring(1));
    Actions.saveQuery(query);
    Actions.updateAssignmentsTable(query);
  }
  componentWillUnmount() {
    this.unsubscribeStore();
  }

  onStoreChange() {
    this.setState(Store.getState());
  }

  handleDateChange(date) {
    this.setState({ deadline: date });
  }

  handleNameChange(e) {
    this.setState({ assignmentName: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  createAssignment(e) {
    e.preventDefault();

    const query = {
      courseName: this.state.local.query.courseName,
      assignmentName: this.state.assignmentName,
      description: this.state.description,
      deadline: this.state.deadline
    };
    this.closeModal();
    setTimeout(() => {
      Actions.createAssignment(query);
    }, 500);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {
    if (this.state.results.loading){
      return (
        <div>loading...</div>
      );
    }

    const table = this.state.results.assignmentTable;
    return (
      <div className="content">
        <div className="container-fluid">
          <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
              <Modal.Title>
                  New Assignment
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.createAssignment}>
                <Row>
                  <Col sm={12} md={6}>
                    <FormGroup controlId="formControlsText">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl type="text" placeholder="Enter assignment name" value={this.state.assignmentName} onChange={this.handleNameChange}/>
                    </FormGroup>
                  </Col>

                  <Col sm={12} md={6}>
                    <FormGroup controlId="formControlsDate">
                      <ControlLabel>Deadline</ControlLabel>
                      <DatePicker
                        selected={this.state.deadline}
                        onChange={this.handleDateChange}
                        monthsShown={2}
                        dateFormat="YYYY/MM/DD"
                        className='form-control'
                      />
                    </FormGroup>
                  </Col>

                  <Col sm={12}>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Enter assignment description" value={this.state.description} onChange={this.handleDescriptionChange} style={{ 'maxWidth': '100%', 'minWidth': '100%' }}/>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={6} md={1}>
                    <Button type="submit">Create</Button>
                  </Col>
                </Row>
              </Form>

            </Modal.Body>
          </Modal>
          <Row>
            <Col sm={12}>
              <Card
                content={
                  <Button bsStyle="primary" onClick={this.openModal}>Create an New Assignment</Button>
                }
              />
            </Col>
            <Col sm={12}>
              <Card
                title = {table.courseName}
                category=""
                contentClass="table-responsive table-full-width"
                content={
                  <Table style={{ textAlign: 'center' }} striped hover>
                    <thead>
                      <tr>
                        {
                          table.Headers.map((prop, key) => {
                            return (
                              <th style={{ textAlign: 'center' }} key={key}>{prop}</th>
                            );
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        table.Rows.map((eachRow,rowKey) => {
                          return (
                            <tr key={rowKey}>{
                              table.Headers.map((eachHeader, cellIndex) => {
                                switch (eachHeader) {
                                  case 'Assignment': return (<td key={cellIndex}><a href={`#/grading?courseName=${table.CourseName}&assignmentName=${eachRow.Assignment}`}>{eachRow.Assignment}</a></td>);
                                  case 'All Marked':
                                    if (eachRow[eachHeader]) {
                                      return (<td key={cellIndex}><span style={{ color:'#33CC00' }} className="glyphicon glyphicon-ok"/></td>);
                                    }
                                    return (<td key={cellIndex}><span style={{ color:'red' }} className="glyphicon glyphicon-remove"/></td>);
                                  default: return (<td key={cellIndex}>{eachRow[eachHeader]}</td>);
                                }
                              })
                            }</tr>
                          );
                        })
                      }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Assignments.propTypes = propTypes;

module.exports = Assignments;
