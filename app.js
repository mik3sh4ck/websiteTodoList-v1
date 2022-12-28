// require
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")

//const variable that needed
const app = express();
const PORT = 3000;
var items = ["Buy Food", "Cook Food", "Eat Food"];
var WorkItems = [];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');



app.get("/", (req,res)=>{

    

    var today = new Date();
    
    var option = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var day = today.toLocaleDateString("en-US", option);

    res.render('list', {listTitle: day, newListItem: items});
});

app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work List", newListItem: WorkItems})
})

app.post("/work", (req, res) => {
    let item = req.body.newToDoList;
    WorkItems.push(item);
    res.redirect("/work");
})
app.post("/", (req,res) => {
    console.log(req.body)
    let item;
    if(req.body.button == "Work"){
         item = req.body.newToDoList;
        WorkItems.push(item);
        res.redirect("/work");
    }else{
        item = req.body.newToDoList;
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/about", (req, res) =>{
    res.render('about')
});



app.listen(PORT, () => {
    console.log("the app running on port: %d", PORT);
});