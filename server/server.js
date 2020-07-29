const express=require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const jwt=require('jsonwebtoken');
const api=require('../server/routes/api');
const path=require('path');
const app=new express();
// Make "public" Folder Publicly Available
//app.use('/public', express.static('public'));
app.use('/public/img',express.static(path.join(__dirname,'/public/img')));

app.use(cors());
app.use(bodyparser.json());
app.use('/api',api);
app.get('/',(req,res)=>
                        {
                            res.send("Hello From Server!!");
                        });

app.listen(3232,()=>
                    {
                        console.log("Server Listening On Port:3232");
                    });