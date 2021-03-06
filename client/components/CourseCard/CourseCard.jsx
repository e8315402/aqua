const React = require('react');

class CourseCard extends React.Component{
  render(){
    return (
      <div className="card card-course box-shadow-effects">
        <a href={this.props.courseLink}>
          <div className="image">
            {/* <img src={this.props.bgImage} alt="..."/> */}
            <img src={'http://127.0.0.1:8000/public/media/bg-book.jpg'} alt="..."/>
          </div>
          <div className="content">
            <div className="author">
              {/* {<img className="avatar border-gray" src={this.props.avatar} alt="..."/>} */}
              <h4 className="title">
                <br />
                <b>{this.props.courseName}</b>
                {/* <br /> */}
                {/* <small>{this.props.userName}</small> */}
              </h4>
            </div>
            <br />
            <p className="description text-center">
              {this.props.description}
            </p>
          </div>
          <hr />
        </a>
        <div className="footer">
          {this.props.socials}
        </div>
      </div>
    );
  }
}

module.exports = CourseCard;
