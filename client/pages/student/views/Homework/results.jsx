const React = require('react');
const CourseCard = require('components/CourseCard/CourseCard.jsx');
const Button = require('elements/CustomButton/CustomButton.jsx');
const Image = require('assets/img/bg-book.jpg');
const PropTypes = require('prop-types');

const propTypes = {
    data: PropTypes.array
};

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }
    render() {
        if (this.props.data.length === 0) {
            return (
                <div>loading...</div>
            );
        };
        return (
            <div className="row">
                {
                    this.props.data.map((eachCourse, key) => {
                        return (
                            <div key={key} className="col-sm-6 col-md-4 col-lg-3">
                                <CourseCard
                                    courseLink='#/assignments'
                                    bgImage={Image}
                                    courseName={eachCourse.courseName}
                                    description={
                                        <span>
                                            {eachCourse.courseTime}
                                            <br/>
                                            {eachCourse.instructor.name}
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
        );
    }
}

Results.propTypes = propTypes;


module.exports = Results;
