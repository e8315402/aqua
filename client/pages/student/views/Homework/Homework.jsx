import { Modal, Button, Table, Col } from 'react-bootstrap';
const React = require('react');
const Card = require('components/Card/Card.jsx');
const Qs = require('qs');
const PropTypes = require('prop-types');
const FileUpload = require('components/FileUpload/FileUpload.jsx');
const Cookie = require('cookie');

const Actions = require('./actions');
const Store = require('./store');

const propTypes = {
  location: PropTypes.object
};

class Homework extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      targetAssignment: '',
      chooseFile: undefined
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    this.state = Object.assign(this.state, Store.getState());
    this.downloadPage = this.downloadPage.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.doUpload = this.doUpload.bind(this);
  }
  componentWillMount() {
    const query = Qs.parse(this.props.location.search.substring(1));
    Actions.saveQuery(query);
    Actions.updateHomeworksTable(query);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  onStoreChange() {
    this.setState(Store.getState());
  }

  downloadPage(filePath) {
    Actions.downloadFile(filePath);
  }

  close() {
    this.setState({ showModal: false, targetAssignment: '', chooseFile: undefined });
  }

  open(targetIndex) {
    const table = this.state.results.homeworkTable;
    const targetAssignment = this.state.results.assignments.find((each) => (each.assignmentName === table.Rows[targetIndex].Assignment));
    this.setState({ showModal: true, targetAssignment });
  }

  chooseFile(files) {
    this.setState({ chooseFile: (files.length) ? files[0].name : '' });
  }

  doUpload(files) {
    console.log('you just uploaded', typeof files === 'string' ? files : files[0].name);
    setTimeout(this.close, 200);
  }

  uploadSuccess(resp) {
    console.log('upload success..!');
    Actions.updateHomeworksTable(this.state.local.query);
  }

  render() {
    if (this.state.results.loading){
      return (
        <div>loading...</div>
      );
    }

    const table = this.state.results.homeworkTable;
    const options = {
      wrapperDisplay: 'initial',
      baseUrl: '/api/homeworks',
      paramAddToField: {
        courseName: this.state.local.query.courseName,
        assignmentName: this.state.targetAssignment.assignmentName,
        fileName: this.state.chooseFile
      },
      fileFieldName: 'data',
      requestHeaders: { 'X-CSRF-Token': Cookie.parse(document.cookie).crumb },
      chooseFile : this.chooseFile,
      uploadSuccess : this.uploadSuccess,
      doUpload : this.doUpload,
      uploading : function (progress) {
        console.log(progress);
        console.log('loading...', progress.loaded / progress.total + '%');
      },
      uploadError : function (err){
        alert(err.message);
      },
      uploadFail : function (resp){
        alert(resp);
      }
    };
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title style={{ lineHeight: '30px' }}>
                  {this.state.targetAssignment.assignmentName}
                  <span className="text-muted" style={{ fontSize:'18px' }}><br/>Due date: {this.state.targetAssignment.deadline}</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><b>Project Objective:</b></p>
                {this.state.targetAssignment.description}
              </Modal.Body>
              <Modal.Footer>
                <FileUpload options={options}>
                  <Button id="chooseBtn" ref="chooseBtn" {...this.state.chooseFile ? { bsStyle: 'success' } : {}} >{this.state.chooseFile ? `You choose ${this.state.chooseFile}` : 'Choose File'}</Button>&nbsp;
                  <Button id="uploadBtn" ref="uploadBtn">Upload</Button>&nbsp;
                  <Button onClick={this.close}>Close</Button>
                </FileUpload>
              </Modal.Footer>
            </Modal>
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
                                    case 'v-sub' : return (<td key={cellIndex}><Button onClick={this.open.bind(this, rowKey)}><span style={{ marginRight:'5px', color:'#33CC00' }} className="glyphicon glyphicon-ok"/>Submit</Button></td>);
                                    case 'x-sub' : return (<td key={cellIndex}><Button onClick={this.open.bind(this, rowKey)} style={{ width:'102px' }}>Submit</Button></td>);
                                    default: break;
                                  }
                                }
                                if (eachHeader === 'File') {
                                  if(eachRow['File'] === '-'){
                                    return <td key={cellIndex}> - </td>
                                  }
                                  return (<td key={cellIndex}><Button bsStyle="link" onClick={this.downloadPage.bind(this, eachRow[eachHeader])}>{eachRow[eachHeader].split('\\').pop()}</Button></td>);
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

