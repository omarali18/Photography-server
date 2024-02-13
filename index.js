const express = require("express");
// const { MongoClient } = require('mongodb');
// var ObjectId = require('mongodb').ObjectId;
// require('dotenv').config()
const cors = require("cors")
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middel wire
app.use(cors())
app.use(express.json())

// mongodb photography1  zqLrik00iRRabJsY

const uri = "mongodb+srv://photography1:zqLrik00iRRabJsY@cluster0.av6mz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("photoGraphySide");
    const photoCard = database.collection("photoCard");
    const videoCard = database.collection("videoCard");

    app.post('/addPhoto', async (req, res) =>{
        const newPhoto = req.body;
        const result = await photoCard.insertOne(newPhoto);
        res.send(result)
        // newPhoto.id = user
    })
    app.get('/allPhoto', async (req, res) =>{
        const cursor = photoCard.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.delete('/deletePhoto/:id', async (req,res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await photoCard.deleteOne(query);
        res.send(result)
    })

    // video server 
    app.get('/allVideo', async (req, res) =>{
        const cursor = videoCard.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.post('/addVideo', async (req, res) =>{
        const newVideo = req.body;
        const result = await videoCard.insertOne(newVideo);
        res.send(result)
    })
    app.delete('/deleteVideo/:id', async (req,res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await videoCard.deleteOne(query);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
    res.send("Data base connected")
});
app.listen(port, () => {
    console.log("Lostening to car seller bd to ", port);
})