import './Bullshit.css'
import * as React from 'react'

export interface BullshitProps {
  quote?: string
  reference?: string
}

function Bullshit (props: any) {
  const { quote, reference } = props
  return (
    <div className='bullshit'>
      <p>{quote}</p>
      <a target='_blank' rel='noopener noreferrer' href={reference}>reference</a>
    </div>
  )
}

export default Bullshit
