const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
var items=["eat","love","rave","repeat"];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res)
{
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var day=d.getDay();
var dayName = days[d.getDay()];
 
    res.render("index",{day:dayName,items:items});
});
app.post("/",function(req,res)
{
    var newItem=req.body.newItem;
    items.push(newItem);
    res.redirect("/");
});
app.listen(3000,function()
{
    console.log("running");
});