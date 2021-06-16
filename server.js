require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());



//connect to mongoose
mongoose.connect("mongodb+srv://Lynn:lynn062504@cluster0.obzya.mongodb.net/notesDB?retryWrites=true&w=majority"
, {useNewUrlParser: true, useUnifiedTopology: true})

//data schema & model

const noteSchema = {
  title: String,
  content: String,
}

const Note = mongoose.model("Note", noteSchema);

//API routes
//take the Item model to extract data from database
// /todolist will be accessed from frontend
app.get("/notes", function(req, res) {
  Note.find().then(notes => res.json(notes));
})

// add new item
app.post("/newnote", function(req, res) {
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Note({
    title,
    content
  })
  newNote.save();
})


app.delete("/delete/:id", function(req, res) {
  const id = req.params.id;
  Note.findByIdAndDelete({_id: id}, function(err) {
    if(!err) {
      console.log("Note is deleted!");
    } else {
      console.log(err);
    }
  })
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, function() {
  console.log("Backend server is running on port 5000")
})
