import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListContainer from "./listcontainer.js";
const ws = new WebSocket("ws://localhost:8080");


ws.onopen = function()
{
  console.log("Connected ... ");

};



ws.onclose = function()
{
   // websocket is closed.
   alert("Connection is closed...");
};


export default class TaskContainer extends Component {

  state={
    pending:true,
    current_directory:[],
    data : []
  }
  onEnterSendCommand(e){
    if(e.keyCode=="13"){
      ws.send(document.getElementById('a').textContent);
    }
  }

  // componentDidMount(){
  //   ws.onmessage = function getResponse(evt)
  //   {
  //      console.log(evt.data);
  //      this.showData(evt.data);
  //   };
  // }
  componentDidMount(){
    ws.onmessage = (e)=>{
       console.log(this);
       console.log(e.data);
       this.showData(e.data);
    };
  }

  showData(data){
    this.setState({
      pending:false,
      data : data
    });
  }

  render () {
    return (
      <div>
        <p className="border" id="a" contentEditable="true"  onKeyUp={(e)=> this.onEnterSendCommand(e)}></p>
        <p><span>{this.state.data}</span></p>
      </div>
    );
  }
}

ReactDOM.render(<TaskContainer idn="b" />, document.getElementById('container'));
ReactDOM.render(<ListContainer arr={dataArray} />, document.getElementById('container2'));
