import React from 'react'
import './navbar.css'
export const Navbar = () => {
  return (
    <div className='navbar-container'>
        <h2>PAAM</h2>
        
        <a className='navlink' href='#Image-done'>Promp-Gen</a>
        <a className='navlink' href='/Image-done'>AI-image</a>
        <a className='navlink' href='/Image-done'>Code-gen</a>
        
    </div>
  )
}
