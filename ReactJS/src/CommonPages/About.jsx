import React from 'react'
import eStoreLogo from '../assets/estore-logo.svg'

export default function About() {
  return (
    <div className='about-section'>
        <div>
            <h2>About Us</h2>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            </p>
        </div>
        <div>
            <img src={eStoreLogo}/>
        </div>
    </div>
  )
}
