const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mydb';
const client = new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    console.log("connected")
    db = result.db(databaseName);
    return db.collection('student');
}
module.exports=dbConnect;