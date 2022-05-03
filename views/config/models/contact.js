const mongoose=require('mongoose');

const Contactschema=new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

const Contact=mongoose.model('contact',Contactschema);
module.exports=Contact;