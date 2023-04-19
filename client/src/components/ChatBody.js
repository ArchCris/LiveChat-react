import React, { useState, useEffect } from 'react'
import '../styles/ChatBody.css'

const ChatBody = (props) => {

    const[message,setMessage]=useState("")
    const[displayedMessages,setDisplayedMessages]=useState([])

    const sendMessage = async () =>{
        if(message !== ""){
            const messageData = {
                room: props.room,
                author: props.name,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit('send_message',messageData)
        }

    }

    useEffect(()=>{
        props.socket.on("receive_message",(data)=>{
            console.log(data)
            setDisplayedMessages((displayedMessages)=>[...displayedMessages,data])
            
        })
    },[props.socket])

    return (
        <div className='chatBody-conteiner'>
            <div className='display'>
                {displayedMessages.map((message,key)=>{
                    return(
                        <p key={key}>{message.message}</p>
                    )
                })}
            </div>
            <div className='input'>
                <input onChange={(e)=>{setMessage(e.target.value)}}></input>
                <button onClick={()=>{sendMessage()}}>SEND THE MESSAGE</button>
            </div>
        </div>
  )
}

export default ChatBody