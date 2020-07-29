const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/DreamHome');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::DreamHome  
const Schema=mongoose.Schema;               //to define schema
const userSchema=new mongoose.Schema(       //schema definition
                                    {
                                    name:String,
                                    email:String,
                                    password:String,
                                    place:String,
                                    district:String,
                                    phone:String,
                                    type:String,
                                    imageUrl:String
                                    }
                                    );
var userData=mongoose.model('user',userSchema); //converting schema into a collection--model creation
                            //creation of "users" collection in the Database as an effect 
module.exports=userData;