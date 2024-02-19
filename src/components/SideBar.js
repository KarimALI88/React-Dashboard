import React from 'react'
import '../css/sidebar.css'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className='sidebar'>
      <h1>Menue</h1>
      <ul>
        <li><Link className='menuLink' to={'users'}><i className="fa-solid fa-user"></i> all users</Link></li>
        <li><Link className='menuLink' to={'professors'}><i className="fa-solid fa-user-tie"></i> all professors</Link></li>
        <li><Link className='menuLink' to={'courses'}><i className="fa-solid fa-laptop"></i> all courses</Link></li>
        <li><Link className='menuLink' to={'adduser'}><i className="fa-solid fa-plus"></i> add user</Link></li>
        <li><Link className='menuLink' to={'addprof'}><i className="fa-solid fa-plus"></i> add professor</Link></li>
        <li><Link className='menuLink' to={'addcourse'}><i className="fa-solid fa-plus"></i> add course</Link></li> 
      </ul>
    </div>
  )
}

export default SideBar
