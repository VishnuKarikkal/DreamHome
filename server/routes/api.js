const express=require('express');
const app=new express();
const router=express.Router();
const multer  = require('multer');
const jwt=require('jsonwebtoken');
const userData=require('../models/users');
const partnerData=require('../models/partners');
const path=require('path');
const mongoose=require('mongoose');
const { send } = require('process');
const db='mongodb://localhost:27017/DreamHome';

const DIR = 'public/img';

const storage=multer.diskStorage        //where to upload files and what name should be given
({
    destination:(req,file,callack)=>    //destination
                {
                    callack(null,DIR);
                },
    filename:(req,file,callback)=>      //filenaming
                {
                    callback(null,`DMHM_${file.originalname}`)
                }
})
var upload=multer({storage:storage});
mongoose.connect(db,(err)=>
                        {
                          if(err)
                          {
                            console.log("errorrrr occurred:"+err);
                          } 
                          else
                          {
                            console.log("MongoDB SUCCESSFULLY Connected!");
                          }
                        });
 
function verifyToken(req,res,next)      //verifying the token coming from the client side
{
  if(!req.headers.authorization)
  {
     return res.status(401).send({status:"Unauthorized Access!"});
  }
  else
  {
    let token=req.headers.authorization.split(' ')[1];
    if(token==null)
    {
       return res.status(401).send({status:"Unauthorized Access!"});
    }
    else
    {
      let payload=jwt.verify(token,'secretkey');
      if(!payload)
      {
       return res.status(401).send({status:"Unauthorized Access!"});
      }
    }
  }
  //req.userId=payload.subject;
  next();
}
                        //routes
 router.post('/userImgUpload',upload.single('file'),(req,res)=>{  //just for uploading image 
console.log("file")
let file=req.file;
  const url = req.protocol + '://' + req.get('host');
  imgUrl=url+'/public/img/'+`${file.filename}`;
  res.send({url:imgUrl})
 })
router.post('/signupUser',(req,res)=>
                        {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                
        
                          let data = 
                            {
                             name:req.body.user.name,
                             place:req.body.user.place,
                             district:req.body.user.district,
                             phone:req.body.user.phone,
                             email : req.body.user.email,
                             password : req.body.user.password,
                             type:req.body.user.type,
                             imageUrl:req.body.user.imageUrl
                             };
                             let user=userData(data);

                      user.save((err,userSigned)=>
                       {
                           if(err)
                           {
                               console.log("errrrorrrr:"+err);
                           }
                           else
                           {
                               let payload={subject:userSigned._id,type:userSigned.type};
                               let token=jwt.sign(payload,'secretkey');
                               res.send({token});
                           }
                       });
                            
                        });

router.post('/signinUser',(req,res)=>
                        {
                          res.header("Access-Control-Allow-Origin","*");
                          res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
                          console.log("api");
                          console.log(req.body.user);
                          let data=
                          {
                            email:req.body.user.email,
                            password:req.body.user.password
                          }
                          userData.findOne({email:data.email,password:data.password},
                          (err,user)=>
                                  {
                                    if(err)
                                    {
                                      console.log("errrrorrrr:"+err);
                                     }
                                    else
                                    {
                                       if(!user)
                                       {
                                          res.json("Invalid Credentials!")
                                       }
                                       else
                                       {
                                        let payload={subject:user._id,type:user.type};
                                        let token=jwt.sign(payload,'secretkey');
                                        res.send({token});  
                                       }
                                    }
                                  });
                        })
          

router.post('/signupPartner',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  let data=
  {
    name:req.body.partner.name,
    email:req.body.partner.email,
    password:req.body.partner.password,
    phone:req.body.partner.phone,
    district:req.body.partner.district,
    services:req.body.partner.services,
    imageUrl:req.body.partner.imageUrl
  }
  let partner=partnerData(data);
  partner.save((err,partnerSigned)=>
  {
      if(err)
      {
          console.log("errrrorrrr:"+err);
      }
      else
      {
          let payload={subject:partnerSigned._id,type:'partner'};
          let token=jwt.sign(payload,'secretkey');
          res.send({token});
      }
  });
})

router.post('/signinPartner',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log("api");
  let data=
  {
    email:req.body.partner.email,
    password:req.body.partner.password
  }
  console.log(data);
  partnerData.findOne({email:data.email,password:data.password},
    (err,partner)=>
            {
              if(err)
              {
                console.log("errrrorrrr:"+err);
               }
              else
              {
                 if(!partner)
                 {
                    res.json("Invalid Credentials!")
                 }
                 else
                 {
                  let payload={subject:partner._id,type:'partner'};
                  let token=jwt.sign(payload,'secretkey');
                  res.send({token});  
                 }
              }
            });
})

router.post('/getUser',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log("api");
  let id=req.body.id;
  console.log(id);
  userData.findOne({_id:id})
  .then((user)=>
          {
            console.log("result");
            console.log(user);
            res.send({user})
          },
          err=>
          {
            console.log("err");
          })
})

router.post('/getPartner',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log("api");
  let id=req.body.id;
  console.log(id);
  partnerData.findOne({_id:id})
  .then((partner)=>
          {
            console.log("result");
            console.log(partner);
            res.send({partner})
          },
          err=>
          {
            console.log("err");
          })
})

router.post('/updatePartner',verifyToken,(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  const id=req.body.partner._id;
  let data=
  {
    name:req.body.partner.name,
    phone:req.body.partner.phone,
    district:req.body.partner.district,
    services:req.body.partner.services
  }
  partnerData.updateOne({_id:id},
    {
      $set:
      {
       name:data.name,
       phone:data.phone,
       district:data.district,
       services:data.services
      }
    })
.then((partner)=>
{
res.json("Updated One Document!");
})

})

router.post('/updateUser',verifyToken,(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  const id=req.body.user._id;
  let data=
  {
    name:req.body.user.name,
    phone:req.body.user.phone,
    district:req.body.user.district,
    place:req.body.user.place
  }
  userData.updateOne({_id:id},
    {
      $set:
      {
       name:data.name,
       phone:data.phone,
       district:data.district,
       place:data.place
      }
    })
.then((user)=>
{
res.json("Updated One Document!");
})

})

router.post('/search',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

  const service=req.body.service;
  const location=req.body.location;
  const name=req.body.name;
      //if 'name' is empty
      if(name=="")
      {
        partnerData.find({district:location,services:service},(err,partner)=>
                            {
                              if(err)
                              {
                                console.log(err);
                                res.json({message:"error"})
                              }
                              else
                              {
                                if(partner.length==0)
                                {
                                  console.log(partner);
                                  res.json({message:"No Results!"})
                                }
                                else
                                {
                                  console.log("result");
                                  console.log(partner);
                                  res.json({message:"Ok",data:partner})
                                }
                              }
                            });
      }
      else    //if 'name' is not empty
      {
       partnerData.find({district:location,services:service,name:name},(err,partner)=>
        {
          if(err)
          {
            console.log(err);
            res.json({message:"error"})
          }
          else
          {
            if(partner.length==0)
            {
              console.log(partner);
              res.json({message:"No Results!"})
            }
            else
            {
              console.log("result");
              console.log(partner);
              res.json({message:"Ok",data:partner})
            }
          }
        });
      }

})

router.get('/getPartners',verifyToken,(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

  partnerData.find().then(
    (partners)=>
    {
      res.send({message:"OK",data:partners});
    },
    (err)=>
    {
      res.json({message:err});
    })
})
router.post('/deletePartner',(req,res)=>
{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

  const id=req.body.id;
  partnerData.deleteOne({_id:id}).then(
    (partners)=>
    {
      res.json({message:"Deleted One Document!"});
    },
    (err)=>
    {
      res.json({message:"errorr"});
    })
})

module.exports=router;