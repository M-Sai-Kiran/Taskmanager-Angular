//All the imports here
require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const taskmanagerRoutes = require('./routes/taskmanagerRoutes');

//middlewares
app.use(bodyparser.json())
app.use(cors())
//DB connection 
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true, useUnifiedTopology: true }).then(()=>console.log('connected to DB.'))

//routing
app.use('/api',taskmanagerRoutes);
//app.get('/',(req,res)=>res.send('kojja'))

//server start
app.listen(port,()=> console.log(`server started running at port ${port}`))