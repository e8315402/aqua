import React, { Component } from 'react';
import { Table, Row } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
// import { thArray, course } from 'variables/Variables.jsx';
const Qs = require('qs');
const Actions = require('./actions');
const Store = require('./store');

class Assignments extends Component {

  constructor(props) {
    super(props);
    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    
    this.state = Store.getState();
  }
  componentWillMount() {
    const query = Qs.parse(this.props.location.search.substring(1));
    Store.dispatch(Actions.updateAssignmentsTable(query));// get Assignment result
  }
  componentWillUnmount() {
    this.unsubscribeStore();
  }

  onStoreChange() {
    this.setState(Store.getState());
  }

  render() {     
    
    if (this.state.results.loading){
      console.log('[loadddddd]')
      return (
        <div>loading...</div>
      );
    }
    const table = this.state.results.assignmentTable;
    console.log('[re]')
    console.log(JSON.stringify(table,null,2))
    
    return (
      
      <div className="content">
        <div className="container-fluid">
        this is Assignments
          <Row>
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
                      table.Rows.map((eachRow,rowKey)=>{
                        return (
                          <tr key={rowKey}>{
                            table.Headers.map((eachHeader, cellIndex) => {
                              if(eachHeader === 'Assignment'){
                                return (<td key={cellIndex}><a href="#/grading">{eachRow['Assignment']}</a></td>);                              
                              }
                              if (eachHeader === 'Score') {
                                switch (eachRow['Score']) {
                                  case true : return (<td key={cellIndex}><span style={{ color:'#33CC00' }} className="glyphicon glyphicon-ok"/></td>);
                                  case false : return (<td key={cellIndex}><span style={{ color:'red' }} className="glyphicon glyphicon-remove"/></td>);
                                  default: break;
                                }
                              }
                              return (<td key={cellIndex}>{eachRow[eachHeader]}</td>);
                            })
                          }</tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              }
            />
          </Row>
        </div>
      </div>
    );
  }
}
module.exports = Assignments;