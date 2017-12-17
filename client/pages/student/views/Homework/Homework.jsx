const React = require('react');
const Table = require('react-bootstrap').Table;
const Row = require('react-bootstrap').Row;
const Button = require('elements/CustomButton/CustomButton.jsx');
const Card = require('components/Card/Card.jsx');
const Qs = require('qs');

const Actions = require('./actions');
const Store = require('./store');

class Homework extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

        this.state = Store.getState();
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
                        {/* <SubmitModal
                            show={this.state.showModal}
                            onHide={this.close}
                            title={this.assignments[3].assignment}
                            dueDate={this.assignments[3].dueDate}
                        /> */}
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
                                                                        case 'v-sub' : return (<td key={cellIndex}><Button onClick={this.open}><span style={{ marginRight:'5px' }} className="glyphicon glyphicon-ok"/>Submit</Button></td>);
                                                                        case 'x-sub' : return (<td key={cellIndex}><Button style={{ width:'102px' }}>Submit</Button></td>);
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
module.exports = Homework;

