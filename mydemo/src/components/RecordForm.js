import React, { Component } from 'react';
import * as ccgRecordsAPI from '../utils/ccgdataAPI'

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
    handleSumbit(event){
        event.preventDefault();
        const data={
            date:this.state.date,
            title:this.state.title,
            amount:Number.parseInt(this.state.amount,0)
        };
        ccgRecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    render() {
    return (
        <form className="form-inline mb-3" onSubmit={this.handleSumbit.bind(this)}>
            <div className="from-group mr-1" >
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
            </div>
            <div className="from-group mr-1">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
            </div>
            <div className="from-group mr-1">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
            </div>
            <button type="sumbit" className="btn btn-primary" disabled={!this.vaild()}>Create Record</button>
        </form>
    );
  }
}
