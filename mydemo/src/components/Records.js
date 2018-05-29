import React, { Component } from 'react';
import Record from './Record';
import {getJSON} from 'jquery';

class Records extends Component {
  constructor() {
    super();
    this.state={
      error:null,
      isLoad:false,
      records:[]
    }
  }
  componentDidMount(){
    getJSON("https://5b0d18bf8126c9001499756a.mockapi.io/api/v1/record").then(
      response => this.setState({records:response,isLoad:true}),
      error =>this.setState({isLoad:true,error})
    )
  }
  render() {
    const {error, isLoad, records}=this.state;
    if(error){
      return <div>Error:{error.responseText}</div>
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

export default Records;
