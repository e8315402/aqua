import React, { Component, FormControl } from 'react';
import { Table } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx'
const Qs = require('qs');
const Actions = require('./actions');
const Store = require('./store');


class Grading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scoreTable: []
        }

        const query = Qs.parse(this.props.location.search.substring(1));
        Actions.getResults(query);

        this.mark = this.mark.bind(this);
        this.state = Object.assign(this.state, Store.getState());
      }
      componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
      }
    
      componentWillUnmount() {
        this.unsubscribeStore();
      }
    
      onStoreChange() {
        this.setState(Store.getState());
      }
      
      setScore(studentId, event) {
          
        const scorePair = {
            studentId,
            score: event.target.value
        }
        this.setState({
            scoreTable: this.state.scoreTable.concat([]).filter(each => each.studentId !== studentId).concat([scorePair])
        });
      }
      mark(){
        let assignmentInfo = Qs.parse(this.props.location.search.substring(1));
        Actions.mark(assignmentInfo,this.state.scoreTable)
    }
    render() {
        if(this.state.results.data.length === 0){
            return (
                <div>
                    Loading
                </div>
            )
        }
        const homeworkTable = this.state.results.data
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <Card
                                title={homeworkTable[0].courseName}
                                category=""
                                contentClass="table-responsive table-full-width"
                                content={
                                    <Table style={{ textAlign: 'center' }} striped hover>
                                        <thead>
                                            <tr>
                                                {
                                                    ["Student ID", "Name", "File", "Score"].map((prop, key) => {
                                                        return (
                                                            <th style={{ textAlign: 'center' }} key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                homeworkTable.map((eachRow, rowKey) => {
                                                    return (
                                                        <tr key={rowKey}>{
                                                        [  
                                                            <td key='0'>{eachRow['studentId']}</td>,
                                                            <td key='1'>{eachRow['studentName']}</td>,
                                                            <td key='2'>{eachRow['filePath'].split('/')[4]}</td>,
                                                            (eachRow['score']) ? <td key='4'>{eachRow['score']}</td> : <td key='4'><input onBlur={this.setScore.bind(this,eachRow['studentId'])} type="number" min={0} max={100} name="score" size="3" /></td>
                                                        ]
                                                        }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                                legend={
                                    <Button style={{marginLeft: '82%'}} onClick={this.mark}>Grading</Button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Grading;