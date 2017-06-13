import './App.css'
import React, { PureComponent } from 'react'
import BullshitFeed from './BullshitFeed'

export default class App extends PureComponent {
  render () {
    return (
      <div id='root' className='App'>
        <img id='bg' src='/imgs/dt1.jpg' alt='trump-nasty' />
        <BullshitFeed />
      </div>
    )
  }
}

/*

t0, state === {}
t1 (load BullshitFeed), state === {}, request /bullshit
t2 recieve /bullshit, state === { bullshit: { ... } }
*/
