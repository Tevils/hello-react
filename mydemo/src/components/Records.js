import React, { Component } from 'react';
import Record from './Record';
import * as ccgRecordsAPI from '../utils/ccgdataAPI'

export default class Records extends Component {
  constructor() {
    super();
    this.state={
      error:null,
      isLoad:false,
      records:[]
    }
  }
  componentDidMount(){
    ccgRecordsAPI.getAll().then(
      response => this.setState({records:response.data,isLoad:true})
    ).catch(
      error =>this.setState({isLoad:true,error})
    )
  }
  render() {
    const {error, isLoad, records}=this.state;
    if(error){
      return <div>Error:{error.message}</div>
    }else if(!isLoad){
      return <div>Loading ...</div>
    }else{
      return (
        <div>
          <h2>Records</h2>
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
        </div>
      );
    }
  }
}

