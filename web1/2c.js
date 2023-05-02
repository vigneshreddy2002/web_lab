
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { response } = require("express");
const dbConnect = require('./2a');
const app = express(); 

// Parse request body as JSON
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const display=async()=>
{
    const db=await dbConnect();
    const res=await db.find({}).toArray();
   
        console.log(res);
    
}
const insert = async () => {
    const db = await dbConnect();
    const result1 = await db.insertOne(
   {name:"s"}
    );
    if(result1.acknowledged)
    {
    console.log(result1);
    }
    }
    const update=async () => {
        const db=await dbConnect();
        const res=await db.updateOne(
            {id:1},{$set:{name:"abcd"}}
            );
        if(res.acknowledged)
        {
            console.log(res);
        }
    }
    const del=async ()=>{
        const db=await dbConnect();
        const res=await db.deleteMany({name:'b'});
        if(res.acknowledged)
        {
            console.log(res);
        }

    }
    del();
    update();
    insert();
//fetchMongoData();
display();