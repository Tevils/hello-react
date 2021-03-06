import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as ccgRecordsAPI from '../utils/ccgdataAPI';
import AmountBox from './AmountBox';

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
  };
  updateRecord(record,data){
    const recordIndex=this.state.records.indexOf(record);
    const newRecords =this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
          // This isn't the item we care about - keep it as-is
          return item;
      }
      // Otherwise, this is the one we want - return an updated value
      return {
          ...item,
          ...data
      };    
    });
    this.setState({
      records:newRecords
    });
  };
  deleteRecord(record){
    const recordIndex=this.state.records.indexOf(record);
    const newRecords=this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      records:newRecords
    });
  };
  credit(){
    let credit=this.state.records.filter((record)=>{
      return record.amount>=0;
    });
    return credit.reduce((prev,curr)=>{
      return prev+Number.parseInt(curr.amount,0);
    },0)
  };
  debit(){
    let debit=this.state.records.filter((record)=>{
      return record.amount<0;
    });
    return debit.reduce((prev,curr)=>{
      return prev+Number.parseInt(curr.amount,0);
    },0)
  };
  balance (){
    return this.credit()+this.debit();
  };
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
              <th>Actions</th>          
            </tr>
          </thead>
          <tbody>
            {records.map((record)=>(<Record  
              key={record.id} 
              record={record} 
              handleEditRecord={this.updateRecord.bind(this)}
              handleDeleteRecord={this.deleteRecord.bind(this)}
              />)
              )}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" amount={this.credit()} />
          <AmountBox text="Debit" amount={this.debit()} />
          <AmountBox text="Balance" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

