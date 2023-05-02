
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

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/2.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const name1 = req.body.name;
  const usn1 = req.body.usn;
  const s_c1 = req.body.s_c;
  const marks1= req.body.marks;



  try {
    const collection = await dbConnect();
    const result = await collection.insertOne({usn:usn1,name:name1,s_c:s_c1,marks:marks1});
    console.log(result);
    res.send('Data inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data into database');
  }
});

app.post('/search', async (req, res) => {
    const name1 = req.body.name2;

    try {
      const collection = await dbConnect();
      const result = await collection.find({name:name1}).toArray();
      console.log(result);
      if(result.length>0)
      res.send(`${name1} found in database`);
      else
      res.send(`${name1} not found in database`)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting data into database');
    }
  });

  app.post('/delete', async (req, res) => {
    const usn = req.body.usn2;

    try {
      const collection = await dbConnect();
      const result = await collection.deleteMany({usn:usn});
      console.log(result);
      if(result.acknowledged)
      res.send(`${usn} deleted in database`);
      else
      res.send(`${usn} not found in database`)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting data into database');
    }
  });

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});