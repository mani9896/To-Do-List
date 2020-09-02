const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/rodolistDB",{useNewUrlParser:true, useUnifiedTopology:true});
const itemsSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
});
const task=mongoose.model("Item",itemsSchema);
const task1= new task({
    task:"eat"

});
const task2= new task({
    task:"sleep"
});
const tasks=[task1,task2];
// task.insertMany(tasks,function(err)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("Inserted");
//     }
// });

app.get("/",function(req,res)
{
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var day=d.getDay();
var dayName = days[d.getDay()];
var items=[];
    task.find(function(err,foundItems){
        if(err)
        {
            console.log(err);
        }
        else{
            for(var i=0;i<foundItems.length;i++)
            {
            items.push(foundItems[i].task);
            }
              res.render("index",{day:dayName,items:items});
        }
    });
});
app.post("/",function(req,res)
{
    var newItem=req.body.newItem;
    const new_task=new task({
        task:newItem
    });
    task.insertMany([new_task],function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("new item done");
        }
    });
    res.redirect("/");
});
app.listen(3000,function()
{
    console.log("running");
});