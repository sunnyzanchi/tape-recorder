const express = require('express');
const path = require('path');
const app = express();

/* Public */
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
// Index
app.get('/', function(req, res){
  const options = {
    root: __dirname + '/public/'
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
