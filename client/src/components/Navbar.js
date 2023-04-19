import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar_conteiner'>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/chat">Chat</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar