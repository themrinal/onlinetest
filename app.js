require('./models/db');

const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

//configuring app to use body-parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//setting up the views path 
app.set('views', path.join(__dirname, './views'));

//configuring the handlebars template engine
app.engine('hbs', exhbs({
  extname : 'hbs',
  layoutsDir : __dirname + '/views/layouts',
  defaultLayout : 'mainLayout',
  runtimeOptions : {
    allowProtoPropertiesByDefault : true,
    allowProtoMethodsByDefault :true
  }
}));
app.set('view engine', 'hbs');

//running the server on port 3000
app.listen(port, () => {
  console.log('Listening to port 3000');
});

//instructing to server to route to testControllers.js by default
const testControllers = require('./controllers/testController');
app.use('/', testControllers);