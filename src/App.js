import React, { useEffect } from 'react';
import './App.css';
import { Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {AccountCircle, Collections } from '@mui/icons-material';
import Message from './Message';
import db from "./firebase";
import { collection, addDoc, query, deleteDoc, doc, onSnapshot, QuerySnapshot, Timestamp, orderBy } from "firebase/firestore";
import FlipMove from 'react-flip-move';
import logo from "./image/Connect.png"



function App() {
  const[input, setinput] = React.useState("") // For getting input  from input field 
  const[message, setmessage] = React.useState([]) // STore the message we type in input field 
  const[username, setUsername] = React.useState([]) // store username

  useEffect(() => {
    setUsername(prompt("Enter A name"))
  }, [])
  

  //  this function used to update real time data from database without reloading 
  // useEffect(() => {
  //   const q = query(collection(db,'messages'), orderBy('created', 'desc')) // add collection to a variable 
  //   onSnapshot(q, (QuerySnapshot) =>{       // add a snap shotbased on collection and update the ChangeInputfield according to the database entries
  //     setmessage(QuerySnapshot.docs.map(doc => ({
  //       id:doc.id ,
  //       text:doc.data().message,
  //       username: doc.data().username,
  //       time:doc.data().created
  //     })))
  //   })
  // }, [])

  useEffect(() => {
    const q = query(collection(db,'messages'), orderBy('created', 'desc')) // add collection to a variable 
    onSnapshot(q, (QuerySnapshot) =>{       // add a snap shotbased on collection and update the ChangeInputfield according to the database entries
    setmessage(QuerySnapshot.docs.map(doc => ({
      id:doc.id ,
      message:doc.data(),
    })))
    })
  }, [])

  console.log(message)

    // When pressing send btn This snippet of code will execute

  const sentbtn = async (e) => {
    e.preventDefault();                        // For preventing reload 
    await addDoc(collection (db,'messages'),{     // addDoc method is used to add data to firebase 
      message: input,  
      username: username,
      created: Timestamp.now()                            // Grab the collection by reference and attach our input according to the field 
    })
    setinput('')
  };

  


  return (
    <div className="App">     
        <img src={logo} alt="Logo" width="150px"/>
        <h1 className='header'> Connect Me Messenger </h1>
        <h5 className='build'>build : 1.0.0</h5>
        <h3>Welcome : {username}</h3>
        <div className='input-field'>
          <form className='form_input'>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField 
              id="input-with-sx" 
              label="Message" 
              className='form_input' 
              value={input}
              variant="standard"    
              onChange={event => setinput(event.target.value)}       
            />
            <Button className='form_btn' disabled={!input} type="submit"  onClick={sentbtn}>Send <SendIcon/></Button>
            </Box>
          </form>
        </div>
        <div className='text-field'>
          <FlipMove>
            {message.map(({id,message}) => (
              <Message
                key={id}
                user={username}
                message={message}
              />
            ))}
          </FlipMove>
        </div>
    </div>
  );
}

export default App;
