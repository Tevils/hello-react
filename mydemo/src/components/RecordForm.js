import React, { Component } from 'react';

export default class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state={
            date:"",
            title:"",
            amount:""
        }
    };
    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    vaild(){
        return this.state.date && this.state.title && this.state.amount;
    };
    render() {
    return (
        <form className="form-inline">
            <div className="from-group">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
            </div>
            <div className="from-group">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
            </div>
            <div className="from-group">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
            </div>
            <button type="sumbit" className="btn btn-primary" disabled={!this.vaild()}>Create Record</button>
        </form>
    );
  }
}
