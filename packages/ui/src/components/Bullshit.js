import './Bullshit.css'
import React from 'react'
import DoubleChevron from './DoubleChevron'
import detectIt from 'detect-it'

function Bullshit (props) {
  const { text, reference_url: referenceUrl, ...rest } = props
  let upChev, downChev
  if (detectIt.deviceType === 'touchOnly') {
    upChev = <DoubleChevron padded />
    downChev = <DoubleChevron down padded />
  }
  return (
    <div {...rest} className='bullshit'>
      {upChev}
      <span>{text}</span>
      <span className='bullshit-reference'><a target='_blank' rel='noopener noreferrer' href={referenceUrl}>reference</a></span>
      {downChev}
    </div>
  )
}

export default Bullshit
