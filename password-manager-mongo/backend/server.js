const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require("body-parser")
const cors = require("cors")
const dotenv = require('dotenv')
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'password-manager';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

//get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save the passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

//delete passwords
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
})