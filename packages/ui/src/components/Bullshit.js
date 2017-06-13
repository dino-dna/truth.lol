import './Bullshit.css'
import React from 'react'

export default function Bullshit (props) {
  const { quote, reference } = props
  return (
    <div className='bullshit'>
      <p>{quote}</p>
      <a target='_blank' href={reference}>reference</a>
    </div>
  )
}
