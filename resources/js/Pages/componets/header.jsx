import React from 'react'
import "../css/test.css";


function Headers() {
   
  return (
    <div>
       <nav>
      <h1 className='headings'>Todo List</h1>
  <ul>
    <li>
    <a href='/login' style={{textDecoration:"none"}}>Login</a>
    </li>
    <li>
        <a href='/api' style={{textDecoration:"none"}}>Register</a>
        </li>
  </ul>
          </nav>
    </div>
  )
}

export default Headers
