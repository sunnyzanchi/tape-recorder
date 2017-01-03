const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

/* Public */
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* Routes */
// Index
app.get('/', function(req, res){
  const options = {
    root: path.join(__dirname, 'public')
  };
  res.sendFile('index.html', options, function(err){
    if(err){
      console.log(err);
      res.status(err.status).end();
    }
  })
});

app.listen(3000, function(){
  console.log('App started');
});
