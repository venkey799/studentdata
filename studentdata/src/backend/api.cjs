
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const { ObjectId } = require('mongodb');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const connectstr = "mongodb://localhost:27017"
app.get('/students',(req,res)=>{
    mongoClient.connect(connectstr).then(studentsdata=>{
        
        var database = studentsdata.db("studentdata");

        database.collection("students").find({}).toArray().then(data=>{
            res.send(data);
            res.end();
        });
    });
});

app.get('/students/:_id',(req,res)=>{
    const studentId = req.params._id;
    mongoClient.connect(connectstr).then(studentsdata=>{
        
        var database = studentsdata.db("studentdata");

        database.collection("students").findOne({_id : new ObjectId(studentId) }).then(data=>{
            res.send(data);
            res.end();
        });
    });
});


app.put('/students/:_id',(req,res)=>{
    const studentId = req.params._id;
    const student = {
        email : req.body.email,
        name: req.body.name
    }
    mongoClient.connect(connectstr).then(studentsdata=>{
      
        
        var database = studentsdata.db("studentdata");
        console.log(req.body);
        database.collection("students").updateOne({_id: new ObjectId(studentId)},{$set: student}).then(data=>{
            res.send(data);
            res.end();
        });
    });
});

app.delete('/students/:_id',(req,res)=>{
    const studentId = req.params._id;
    mongoClient.connect(connectstr).then(studentsdata=>{
        
        var database = studentsdata.db("studentdata");

        console.log(studentId)

        database.collection("students").deleteOne({_id: new ObjectId(studentId)}).then(data=>{
            res.send(data);
            console.log("data deleted");
            res.end();
        });
    });
});
app.post('/students',(req,res)=>{
    const student = {
        email : req.body.email,
        name: req.body.name
    }
    mongoClient.connect(connectstr).then(studentsdata=>{
        
        var database = studentsdata.db("studentdata");

        database.collection("students").insertOne(student).then(data=>{
            res.send(data);
            
        });
    }).catch(err=>{
        alert(err)
    })
});


app.listen(5000)
console.log(`server is running on http://localhost:5000`)