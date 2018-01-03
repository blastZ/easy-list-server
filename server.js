const express = require('express');
const app = express();
const fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./static'));

app.post('/savelists', (req, res) => {
  let bodyStr = '';
  req.on("data",function(chunk){
    bodyStr += chunk.toString();
  });
  req.on("end",function(){
    fs.writeFile('./static/lists.txt', bodyStr, (error) => {
      if(error) {
        return console.log(error);
      }
      console.log('The file was saved')
    })
  });
});

app.get('/getlists', (req, res) => {
  fs.readFile('./static/lists.txt', 'utf8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    res.json(data);
  })
})

app.listen(5002, () => {
  console.log('server is listening at port 5002.');
})
