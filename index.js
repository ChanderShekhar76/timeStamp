// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isValiDate = (date)=> date.toUTCString() !== "Invalid Date"
// your first API endpoint... 
app.get('/api/:date',async(req,res)=>{
  let dateInput
  if(req.params.date.length >10 && !req.params.date.match(/[a-zA-Z]/g)){
    dateInput =new Date(parseInt(req.params.date))
  }else{
    dateInput = new Date(req.params.date)
  }
  if(isValiDate(dateInput)){
     res.json({
        "unix" : dateInput.getTime(),
        "utc" :  dateInput.toUTCString()
    })
  }else{
    res.json({"error":"Invalid Date"})
  }


})
app.get('/api',(req,res)=>{
  res.json({
    "unix" : (new Date()).getTime(),
    "utc" : (new Date()).toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
