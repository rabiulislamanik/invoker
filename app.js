const express = require('express');
const util = require('util');
const shelljs = require('shelljs');
const bodyParser=require('body-parser');
const app=express();
const handlebars = require('express-handlebars');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// var child = shelljs.exec('pwd', {async:true});
// child.stdout.on('data', function(data) {
//   console.log(`Now its giving output:${data} `);
// });

app.set('views', __dirname + '/views');
app.engine('handlebars',handlebars());
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/',(req,res,next)=>{
  res.render('home');
});


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(command) {
    shelljs.exec(command, (code, stdout, stderr)=> {
      if(stderr){
        ws.send(stderr);
      }
      else{
        ws.send(stdout);
      }
    });

  });
  //ws.send("connected");
  shelljs.exec('ping 8.8.8.8', (code, stdout, stderr)=> {
    ws.send(stdout);
    util.log(this);
  });
});

app.listen(3000,()=>{
  console.log("Http server running on port 3000");
});
