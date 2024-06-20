var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://admin:Kendrickpogi18@cluster0.faf73bn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME="tododb";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    });
})

app.get('/mevn/tododb/GetNotes',(request, response)=>{
    database.collection("todocollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/mevn/tododb/AddNotes',multer().none(),(request,response)=>{
    database.collection("todocollection").count({},function(error, numOfDocs){
        database.collection("todocollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully");
    })
})
app.delete('/mevn/tododb/DeleteNotes',(request,response)=>{
    database.collection("todocollection").deleteOne({
        id:request.query.id
        
    });
    response.json("Deleted Succesfully");
})