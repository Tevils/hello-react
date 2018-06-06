import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as ccgRecordsAPI from '../utils/ccgdataAPI'

export default class Records extends Component {
  constructor() {
    super();
    this.state={
      error:null,
      isLoad:false,
      records:[]
    }
  };
  componentDidMount(){
    ccgRecordsAPI.getAll().then(
      response => this.setState({records:response.data,isLoad:true})
    ).catch(
      error =>this.setState({isLoad:true,error})
    )
  };
  addRecord(record){
    this.setState({
      error:null,
      isLoad:true,
      records:[
        ...this.state.records,
        record
      ]
    })
  }
  render() {
    const {error, isLoad, records}=this.state;
    let recordsComponent;
    if(error){
      recordsComponent=<div>Error:{error.message}</div>
    }else if(!isLoad){
      recordsComponent=<div>Loading ...</div>
    }else{
      recordsComponent= (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>          
            </tr>
          </thead>
          <tbody>
            {records.map((record)=><Record  key={record.id} {...record}/>)}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

