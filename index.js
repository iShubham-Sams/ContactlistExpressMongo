const express=require('express');
const path = require('path');
const port=7000;

const db=require('./views/config/mongoose')

const Contact=require('./views/config/models/contact')

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'))


const contact=[
    {
        name:"shubham",
        phone:1234567890
    },
    {
        name:"white",
        phone:5554442221
    },
    {
        name:"wolf",
        phone:0987654321
    }
]

app.get('/fun',function(rew,res){
    return res.render('funwork',{
        title:"i am fun page"
    })
})
app.get('/',function(req,res){

    Contact.find({},function(err,contact){
        if(err){
            console.log('err in feching data');
            return;
        }
        return res.render('home',{
            title:"i am contact list",
            contact_list:contact
    })

    })
})
app.get('/delete_contact/',function(req,res){
    let id=req.query.id;

    Contact.findByIdAndRemove(id,function(err){
        if(err){
            console.log('err in deleting data');
            return;
        }
        res.redirect('back');
    })
    

})



app.post('/creat-contect',function(req,res){
    
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in populaing');
         return }
 
         console.log('******',newContact);
        return res.redirect('/')
    })
    // contact.push(req.body);

    
})


app.listen(port,function(err){
    if(err){
        console.log('error ocured',err)
        return;
    }
    console.log('your port is doing well:',port)
}
)