import React from 'react'
import io from "socket.io-client"
import '../styles/Chat.css'
import { useState } from 'react'
import ChatBody from '../components/ChatBody'

const socket = io.connect('http://localhost:3001')

const Chat = () => {

  const[name,setName]=useState('')
  const[room,setRoom]=useState('')

  const joinRoom = () =>{
    if(name !== "" && room !== ""){
      socket.emit('join_room',room)
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
        <ChatBody socket={socket} name={name} room={room}/>
      </div>
    </div>
  )
}

export default Chat