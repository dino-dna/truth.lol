import React, { PureComponent } from 'react'
import Bullshit from './Bullshit'

export default class BullshitFeed extends PureComponent {
  componentWillMount () {
    // fetchBullshit
  }
  render () {
    // const { bullshit } = this.props
    // if (!bullshit) return <p>waiting for bullshit...</p>
    return (
      <div className='bullshit-feed'>
        <Bullshit quote='Im an idiot' reference='https://whitehouse.gov' />
      </div>
    )
  }
}
