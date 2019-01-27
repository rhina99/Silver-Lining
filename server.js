var express = require('express');
//create instances of web pages or links
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var Request = require("request");
var parseString = require('xml2js').parseString;
var jsonQuery = require('json-query');

app.set('view engine', 'ejs');

router.get('/', function(req, res){

  var response = Request.get("https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=2012",
   function (error, response, body) {
              if (error) {
                  throw error;
              }
              parseString(body, function (err, result) {
    console.dir(result.menuItems.menuItem[0].text);
     res.render('pages/homePage.ejs',{makes:result.menuItems.menuItem});
     var testdata = {
      tatas: [
       {tata:'tata', value:'nuto'},
       {tata:'tata', value:'nuta'},
       {tata:'samer'}
     ]
   }
     var query = jsonQuery('tatas[tata=tata].text', {
  testdata: testdata
});
    console.log("query" + JSON.stringify(query));
});

  //console.log(res);//, {
  //   response: response
  // });
});

})

router.get('/otherPage', function(req, res){
  res.render('pages/otherPage.ejs');
})

router.get('/quiz', function(req, res){
  res.render('pages/quiz.ejs');
})

router.get('/carbonEmissions', function(req, res){
  res.render('pages/carbonEmissions.ejs');
})

router.get('/airPollution', function(req, res){
  res.render('pages/airPollution.ejs');
})

router.get('/musicPropaganda', function(req, res){
  res.render('pages/musicPropaganda.ejs');
})

router.post('/musicPropaganda', function(req, res){
  
})

//setting folder as views folder
app.set('TypeScript', path.join(__dirname, 'TypeScript'));
//enabling css and js
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//to make all webFlow valid from router variable
app.use('/', router);

app.listen(1337); //listens on port 1337
console.log("Server is running on port 1337");

//console.log(response);
