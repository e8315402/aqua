import React, { Component } from 'react';
import { Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

import { CourseCard } from 'components/CourseCard/CourseCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';

import color from 'assets/img/bg-book.jpg';
import { course } from 'variables/Variables.jsx';
import logo from 'assets/img/homework256.png';

class Dashboard extends Component {
    constructor(props) {

        super(props);
        this.state = { showLoginModal: false, showCourseModal: false };
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeCourseModal = this.closeCourseModal.bind(this);
        this.openCourseModal = this.openCourseModal.bind(this);

    }

    componentDidMount() {

        this.openLoginModal();
    }

    closeLoginModal() {

        this.setState({ showLoginModal: false });
    }

    openLoginModal() {

        this.setState({ showLoginModal: true });
    }

    closeCourseModal() {

        this.setState({ showCourseModal: false });
    }

    openCourseModal() {

        this.setState({ showCourseModal: true });
    }
    render() {

        const FieldGroup = function ({ id, label, help, ...props }) {

            return (
                <FormGroup controlId={id}>
                    <Col sm={12}>
                        <ControlLabel>{label}</ControlLabel>
                        <FormControl {...props} />
                    </Col>
                </FormGroup>
            );
        };
        const imgStyle = {
            width: '110px'
        };
        return (
            <div className="content">
                <div className="container-fluid">
                    <Modal show={this.state.showLoginModal} onHide={this.closeLoginModal} dialogClassName="custom-modal-width">
                        <Modal.Header closeButton>
                            <Modal.Title style={{ textAlign: 'center' }}>
                                <img src={logo} alt="logo_image" style={imgStyle}/>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal>
                                <FieldGroup
                                    id="formHorizontalEmail"
                                    type="text"
                                    label="Email / ID"
                                    placeholder="Email / ID"
                                />

                                <FieldGroup
                                    id="formHorizontalPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                />
                                <FormGroup>
                                    <Col sm={12}>
                                        <table>
                                            <tbody>
                                                <tr key="1">
                                                    <td>
                                                        <Checkbox
                                                            number={'1'}
                                                            isChecked={false}
                                                        />
                                                    </td>
                                                    <td>Remember me</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={12}>
                                        <Button type="submit" style={{ width: '100%' }}>
                      Log in
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.showCourseModal} onHide={this.closeCourseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ textAlign: 'center' }}>
                                <p className="pe-7s-notebook">{'I\'m course'}</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal>
                                <FieldGroup
                                    id="formHorizontalEmail"
                                    type="text"
                                    label="Email / ID"
                                    placeholder="Email / ID"
                                />
                                <FieldGroup
                                    id="formHorizontalPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                />
                                <FormGroup>
                                    <Col sm={12}>
                                        <table>
                                            <tbody>
                                                <tr key="1">
                                                    <td>
                                                        <Checkbox
                                                            number={'1'}
                                                            isChecked={false}
                                                        />
                                                    </td>
                                                    <td>Remember me</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={12}>
                                        <Button type="submit" style={{ width: '100%' }}>
                      Log in
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Button fill style={{ position: 'fixed', right: '5%', top: '10%' }}  href={'#/newcourse'}>Create course</Button>
                    <div className="row">
                        {
                            course.map((eachCourse, key) => {
                                return (
                                    <div key={key} className="col-sm-6 col-md-4 col-lg-3">
                                        <CourseCard
                                            courseLink={key === 0 ? '#/assignments' : '#/table'}
                                            bgImage={color}
                                            courseName={eachCourse.courseName}
                                            description={
                                                <span>
                                                    {eachCourse.courseTime.map((eachTime, key) => (<span key={key}>{eachTime}<br/></span>))}
                                                    <br/>
                                                    {eachCourse.teacher_ch}
                                                    <br/>
                                                    {eachCourse.teacher_en}
                                                </span>
                                            }
                                            socials={
                                                <Button simple href={eachCourse.courseWebsite} target="_blank"><i className="pe-7s-home"></i> Course home</Button>
                                            }
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;
