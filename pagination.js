const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const User = require("./users");

const port = 5000;
const app = express();

mongoose.connect(
  "mongodb+srv://Sandip:Sandip@cluster0.36ktn.mongodb.net/pagination?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/get", (re, res)=> {
    // try{
    //     let {page,size}= req.query
    //     if (!page){
    //         page = 1
    //     }
    //     if(!size){
    //         size = 10
    //     }
    //     const limit = parseInt(size)
    //     const skip = (page - 1) * size;

    //     const userss = await User.find().limit(limit).skip(skip)
    //     app.send("Hello");


    // }catch (error){
    //     res.sendStatus(500).send(error.message);

    // }


  User.find()
    .sort({ message: 1 })
    .limit(10)// limit for data tetching
    .then((data) => {
      res.status(201).json(data);
    });
});

app.post("/post", jsonParser, function (req, res) {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    message: req.body.message,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(port, () => console.log(port));
