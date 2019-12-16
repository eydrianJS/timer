const mongo = require("mongodb").MongoClient;
const express = require("express");
var http = require('http').createServer(express);
const multer = require("multer");
const bodyParser = require("body-parser");
const ObjectID = require('mongodb').ObjectID;
var io = require('socket.io')(http);


const upload = multer({ dest: "uploads/" });
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

let db, m;
const url = "mongodb://localhost:27017";

const main = () => {
  mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, client) => {
      if (err) {
        console.error(err);
        return;
      }
      db = client.db("Main"); //MongoClient.connect();
      m = name => db.collection(name);
    }
  );
};
main();

router
  .get("/", async (req, res) => {
    try {
      let total = await db
        .collection("timer")
        .find({})
        .toArray();
      return res.json(total);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  })
  .put("/",async (req, res) => {
    try {
        let query = { "_id":  new ObjectID("5df3411dfc110efe30d47891")} ;
        let newVal = {$set: {creator: "new Creator", startTime: new Date().toISOString()}};
        let total = await db
          .collection("timer")
          .updateOne(query,newVal , function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
          });
      } catch (e) {
        console.log(e);
        res.json(e);
      }
    res.send("Update the book");
  });

app.use("/", router);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.listen(8080, () => {
  console.log("Example app listening on port 8000!");
});
