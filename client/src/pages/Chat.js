import React from 'react'
import io from "socket.io-client"
import '../styles/Chat.css'
import { useState } from 'react'
import ChatBody from '../components/ChatBody'

const socket = io.connect('http://localhost:3001')

const Chat = () => {

  const[name,setName]=useState('')
  const[room,setRoom]=useState('')
  const[logged,setLogged]=useState(false)

  const joinRoom = () =>{
    if(name !== "" && room !== ""){
      socket.emit('join_room',room)
      setLogged(true)
    }
  }

  return (
    <div className='chatConteiner'>
      <div className='chatDisplay'>
        <div className='chatDisplay-input'>
          <label>Name:</label>
          <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name}></input>
          <label>Room:</label>
          <input type='text' onChange={(e)=>{setRoom(e.target.value)}} ></input>
          <button onClick={()=>{joinRoom()}}>ENTER TO THE ROOM</button>
        </div>
        {logged === true ? <ChatBody socket={socket} name={name} room={room} userinfo={[name,room]}/> : null}
      </div>
    </div>
  )
}

export default Chat