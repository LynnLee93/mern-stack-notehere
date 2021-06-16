import React, {useState, useEffect} from "react";
import Axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import DeleteIcon from "@material-ui/icons/Delete";


function App() {
  //tracking the state of expand textarea when it is clicked
  const [isExpandClicked, setExpandClicked] = useState(false);
  //extract notes from databse
  const [notes, setNotes] = useState([{
    title:"",
    content:""
  }]);

  //create note
  const [note, setNote] = useState({
      title:"",
      content:"",
      _id:"",
    })

  useEffect(() => {
    fetch("/notes").then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNotes(jsonRes))
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setNote(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value

        }
      )
    });
  }

  function addNote(event) {
    event.preventDefault();
    setNote({
      title:"",
      content:""
    });
    const newNote = {
      title: note.title,
      content: note.content,
    }
    Axios.post("/newnote", newNote);
  }


  function deleteNote(id) {
    Axios.delete("/delete/" + id);
  }

  //function of expand textarea when it is clicked
  function expandClick() {
    setExpandClicked(true);
  }

  return (
    <div>
      <Header />

    <div>
      <form className="create-note">
        {isExpandClicked && (
          <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"></input> )}

          <textarea
          onChange={handleChange}
          onClick={expandClick}
          name="content"
          value={note.content}
          placeholder="Take a note"
          rows={isExpandClicked ? 3 : 1}/>

          <Zoom in={isExpandClicked}>
            <Fab onClick={addNote}>
              <AddIcon />
            </Fab>
          </Zoom>
      </form>
    </div>

      {notes.map((note, index) => (

          <div key={index} className="note">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}><DeleteIcon /></button>
          </div>

        ))}

      <Footer />
  </div>
  );
}


export default App;
