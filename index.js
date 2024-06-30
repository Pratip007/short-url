const express = require("express");
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();
const PORT = 8001;
const {connectionToMongoDB} = require('./connection');
const { timeStamp } = require("console");


connectionToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log('MongoDB Connected'));

app.use(express.json());
app.use('/url' , urlRoute);

app.get('/:shortID' , async (req, res) =>{
   const shortID = req.params.shortID;
  const entry =  await URL.findOneAndUpdate(
   {
   shortID,
   },{
    $push :{
    visitHistorty :{
        timestamp : Date.now(),
     } 
    },
   });
   //console.log(entry);
   res.redirect(entry.redirectURL);
   
})
app.listen(PORT,()=> console.log(`server is started at PORT :${PORT}`));