import React from 'react';
import "./style.css";



export function Headers() {
   
  return (
    <div>
       <nav>
      <h1 className='headings' style={{
        marginLeft:"40px"
      }}>Todo List</h1>
  <ul className="buttons">
    <li>
    <a href='/login' style={{textDecoration:"none"}}>Login</a>
    </li>
    <li>
        <a href='/' style={{textDecoration:"none"}}>Register</a>
        </li>
  </ul>
          </nav>
    </div>
  )
}

export default Headers
