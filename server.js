// const jsonString='{"name":"Dhruv","age":"21"}';
// var jsonObject=JSON.parse(jsonString);
// // console.log(jsonObject.name);

// const s=JSON.stringify(jsonObject);
// console.log(s);
// require('dotenv').config()
const express=require('express');
const app=express();
const db= require('./db');//pehle import krke connection establish kro uske baad http requests handle hongi
const Person=require('./Models/person');
const MenuItem=require('./Models/MenuItem');
require('dotenv').config();
const passport = require('./auth');


const bodyParser= require('body-parser');
app.use(bodyParser.json());//req.body me store krlega body parser jo bhi data aayega post method se

//Middleware Function

const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made To : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

app.get('/',(req,res) => {
    res.send('KYA HAAL HAIN BHAI');
})

app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('listening on port 3000');
});

const personRoutes= require('./Routes/personRoutes');
app.use('/person',personRoutes);

const MenuItemRoutes= require('./Routes/MenuItemRoutes');
app.use('/menuitems',MenuItemRoutes);

//comment added for testing purpose

