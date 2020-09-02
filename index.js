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
    },
    topic:String
});
const task=mongoose.model("Item",itemsSchema);

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
            items.push(foundItems[i]);
            }
              res.render("index",{day:dayName,items:items});
        }
    });
});
app.get("/:topic",function(req,res)
{
    var newtopic=req.params.topic;
    console.log(newtopic);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var day=d.getDay();
var dayName = days[d.getDay()];
var items=[];
const new_task=new task({
    task:"sleep",
    topic:newtopic
});
items.push(new_task);
    task.find(function(err,foundItems){
        if(err)
        {
            console.log(err);
        }
        else{
            for(var i=0;i<foundItems.length;i++)
            {
                if(foundItems[i].topic==newtopic)
                {
            items.push(foundItems[i]);
                }
            }
            console.log(items);
              res.render("index",{day:dayName,items:items});
        }
    });
});
app.post("/",function(req,res)
{
    const topic=req.body.bt;
    var newItem=req.body.newItem;
    var newtopic=req.body.bt;
    const new_task=new task({
        task:newItem,
        topic:newtopic
    });
    task.insertMany([new_task],function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("new item done");
        }
    });
    res.redirect("/" +topic);
});
app.post("/delete",function(req,res){
    const itemChecked=req.body.checkbox;
    task.deleteOne({ _id:itemChecked  }, function (err) {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Deleted");
        }
        res.redirect("/");
    });
});
app.listen(3000,function()
{
    console.log("running");
});