const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/DreamHome');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::DreamHome  
const Schema=mongoose.Schema;               //to define schema
const partnerSchema=new mongoose.Schema(       //schema definition
                                    {
                                    name:String,
                                    email:String,
                                    password:String,
                                    district:Array,
                                    phone:String,
                                    services:Array,
                                    imageUrl:String
                                    }
                                    );
var partnerData=mongoose.model('partner',partnerSchema); //converting schema into a collection--model creation
                            //creation of "partners" collection in the Database as an effect 
module.exports=partnerData;