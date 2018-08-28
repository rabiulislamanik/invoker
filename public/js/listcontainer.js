import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ListContainer extends React.Component {
  componentDidMount(){
    console.log(this.props.arr);
  }

  render(){
    const listitems= this.props.arr.map((item,index)=>
      <ul>
        <li>{item.id}</li>
        <li>{item.current_directory}</li>
        <li>{item.reply}</li>
      </ul>
    );

    return(
      <div>
        {listitems}
      </div>
    );
  }
};
