import './Bullshit.css'
import React from 'react'

function Bullshit (props) {
  const { quote, reference } = props
  return (
    <div className='bullshit'>
      <p>{quote}</p>
      <a target='_blank' rel='noopener noreferrer' href={reference}>reference</a>
    </div>
  )
}

export default Bullshit
