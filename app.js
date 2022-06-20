const express=require('express');
const bodyParser = require('body-parser');

//My code
const cookieParser = require("cookie-parser");
//My code

const app=express();

//My code
app.use(cookieParser());
 
//const initRoutes = require("./routes/company_details");
global.__basedir = __dirname + "/..";
app.use(express.urlencoded({ extended: true }));
// initRoutes(app);

//My code

app.use(bodyParser.json({ limit: '50mb' }));
const port=8000;

 const cors=require("cors");
 app.use(cors());


require('./config/seqConfig');
require('./config/routes')(app);


//const brnd_ctrl=require('./controllers/brand_ctrl');

app.get("/",(res,resp)=>{
resp.send("Home page");
});


app.listen(port,()=>{
console.log('App is listening at http://localhost:'+ port);
})


//app.post("/add_brand",brnd_ctrl.add_brand);


//My code start
 module.exports = app;
//My code end

