import './DoubleChevron.css'
import React from 'react'

export default function DoubleChevron (props) {
  var classes = `double-chevron ${props.down ? 'down' : 'up'} ${props.padded ? 'padded' : ''}`
  return (
    <svg className={classes}
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 414.496 414.496'>
      <g>
        <path fill='red' d='M275.283 28.238L246.953 0 40.379 207.248l206.574 207.248 28.33-28.238-178.427-179.01z' />
        <path fill='blue' d='M374.117 28.238L345.787 0 139.213 207.248l206.574 207.248 28.33-28.238-178.427-179.01z' />
      </g>
    </svg>
  )
}
/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.496 414.496">
    <g fill="#2488ff">
        <path d="M275.283 28.238L246.953 0 40.379 207.248l206.574 207.248 28.33-28.238-178.427-179.01z"/>
        <path d="M374.117 28.238L345.787 0 139.213 207.248l206.574 207.248 28.33-28.238-178.427-179.01z"/>
    </g>
</svg> */
