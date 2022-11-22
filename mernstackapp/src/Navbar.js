import React from 'react'
import './Navbar.css'

const Navbar = ({setSearch}) => {
   
  return (
    <div className='Navbar'>
        <h3>Expenser</h3>
        <input type="text" onChange={(e)=>setSearch(e.target.value)}placeholder='search details....'/>

    </div>
  )
}

export default Navbar