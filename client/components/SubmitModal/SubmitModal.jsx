import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
const FileUpload = require('react-fileupload');
const Cookie = require('cookie');

const propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.string,
  dueDate: PropTypes.string
};

class SubmitModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chooseFile: undefined
    };
    this.chooseFile = this.chooseFile.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }
  chooseFile(files) {
    console.log('you choose',typeof files === 'string' ? files : files[0].name);
    this.setState({ chooseFile: `You choose ${files[0].name}` });
  }
  closeModel(e) {
    this.setState({ chooseFile: undefined });
    this.props.onHide(e);
  }
  render() {
    const options = {
      wrapperDisplay: 'initial',
      baseUrl: '/api/homeworks',
      requestHeaders: {
        'X-CSRF-Token': Cookie.parse(document.cookie).crumb
      },
      chooseFile : this.chooseFile,
      doUpload : function (files, mill){
        console.log('you just uploaded', typeof files === 'string' ? files : files[0].name);
      },
      uploading : function (progress){
        console.log(progress);
        console.log('loading...', progress.loaded / progress.total + '%');
      },
      uploadSuccess : function (resp){
        console.log('upload success..!');
      },
      uploadError : function (err){
        alert(err.message);
      },
      uploadFail : function (resp){
        alert(resp);
      }
    };
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ lineHeight: '30px' }}>
            {this.props.title}
            <span className="text-muted" style={{ fontSize:'18px' }}><br/>Due date: {this.props.dueDate}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Project Objective:</b></p>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <FileUpload options={options}>
            <Button ref="chooseBtn"  {...this.state.chooseFile ? { bsStyle: 'success' } : {}} >{this.state.chooseFile ? this.state.chooseFile : 'Choose File'}</Button>&nbsp;
            <Button ref="uploadBtn">Upload</Button>&nbsp;
            <Button onClick={this.closeModel}>Close</Button>
          </FileUpload>
        </Modal.Footer>
      </Modal>
    );
  }

}

SubmitModal.propTypes = propTypes;

module.exports = SubmitModal;
