const React = require('react');
const Table = require('react-bootstrap').Table;
const Row = require('react-bootstrap').Row;
const Button = require('elements/CustomButton/CustomButton.jsx');
const Card = require('components/Card/Card.jsx');
const Qs = require('qs');
const SubmitModal = require('components/SubmitModal/SubmitModal.jsx');
const PropTypes = require('prop-types');

const Actions = require('./actions');
const Store = require('./store');


const propTypes = {
  location: PropTypes.object
};

class Homework extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false, targetAssignment: '' };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    this.state = Object.assign(this.state, Store.getState());
  }
  componentWillMount() {
    const query = Qs.parse(this.props.location.search.substring(1));
    Store.dispatch(Actions.updateHomeworksTable(query));
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  onStoreChange() {
    this.setState(Store.getState());
  }

  close() {
    this.setState({ showModal: false, targetAssignment: '' });
  }

  open(targetIndex) {
    const table = this.state.results.homeworkTable;
    const targetAssignment = this.state.results.assignments.find((each) => (each.assignmentName === table.Rows[targetIndex].Assignment));
    this.setState({ showModal: true, targetAssignment });
  }

  render() {
    if (this.state.results.loading){
      return (
        <div>loading...</div>
      );
    }

    const table = this.state.results.homeworkTable;
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <SubmitModal
              show={this.state.showModal}
              onHide={this.close}
              title={this.state.targetAssignment.assignmentName}
              dueDate={this.state.targetAssignment.deadline}
              body={this.state.targetAssignment.description}
            />
            <div className="col-md-12">
              <Card
                title={this.props.location.search.substring(1).split('=').pop()}
                category=""
                contentClass="table-responsive table-full-width"
                content={
                  <Table style={{ textAlign: 'center' }}  striped hover>
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
                        table.Rows.map((eachRow, rowKey) => {
                          return (
                            <tr key={rowKey}>{
                              table.Headers.map((eachHeader, cellIndex) => {
                                if (eachHeader === 'Status') {
                                  switch (eachRow[eachHeader]) {
                                    case 'v' : return (<td key={cellIndex}><span style={{ color:'#33CC00' }} className="glyphicon glyphicon-ok"/></td>);
                                    case 'x' : return (<td key={cellIndex}><span style={{ color:'red' }} className="glyphicon glyphicon-remove"/></td>);
                                    case 'v-sub' : return (<td key={cellIndex}><Button onClick={this.open.bind(this, rowKey)}><span style={{ marginRight:'5px' }} className="glyphicon glyphicon-ok"/>Submit</Button></td>);
                                    case 'x-sub' : return (<td key={cellIndex}><Button onClick={this.open.bind(this, rowKey)} style={{ width:'102px' }}>Submit</Button></td>);
                                    default: break;
                                  }
                                }
                                return (<td key={cellIndex}>{eachRow[eachHeader]}</td>);
                              })
                            }</tr>
                          );
                        })
                      }
                    </tbody>
                  </Table>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Homework.propTypes = propTypes;

module.exports = Homework;

