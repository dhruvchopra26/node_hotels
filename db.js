const mongoose=require('mongoose');
require('dotenv').config();
// const localURL=process.env.LOCAL_URL;
const mongoURL=process.env.MONGODB_URL;

//define mongodb connection URL
mongoose.connect(mongoURL
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    //these 2 methods were earlier used but are now deprecated
)

//Get the default connection
//db object to establish bridge bw mongodb and nodejs
const db = mongoose.connection; 

//event listener keywords: connected,disconnected,errors : pre defined syntax
db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
})

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB Server');
})

db.on('error',(err)=>{
    console.log('MongoDB Connection failed!', err); 
})


//export the database connection so that you can import it and use it in 
//other parts of nodejs application such as server.js
module.exports ={
    db
};