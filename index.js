const express = require("express");
const path = require ('path');
const cookieParser = require('cookie-parser')
const URL = require('./models/url');
const {restrictLogInUseronly} = require('./middleware/auth');
const app = express();
const PORT = 8001;
const {connectionToMongoDB} = require('./connection');
const { timeStamp } = require("console");

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

connectionToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log('MongoDB Connected'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());


app.use('/url' , urlRoute );
app.use('/user' , userRoute);
app.use('/' , staticRoute,);

app.get('/test',async (req, res) =>{
   const allUrl = await URL.find();
   return res.render("home" ,{
      urls : allUrl,
   });
      
});

app.get('/url/:shortID' , async (req, res) =>{
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
  // console.log(entry);
   res.redirect(entry.redirectURL);
   
})
app.listen(PORT,()=> console.log(`server is started at PORT :${PORT}`));