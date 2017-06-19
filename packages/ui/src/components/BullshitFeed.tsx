import * as React from 'react'
import Bullshit, { BullshitProps } from './Bullshit'

export interface BullshitFeedProps {
  bullshits?: BullshitProps[]
}

class BullshitFeed extends React.PureComponent<BullshitFeedProps, null> {
  componentWillMount () {
    // fetchBullshit
  }
  render () {
    // const { bullshit } = this.props
    // if (!bullshit) return <p>waiting for bullshit...</p>
    return (
      <div className='bullshit-feed'>
        <Bullshit quote='blah blah blaj' reference='https://whitehouse.gov' />
      </div>
    )
  }
}

export default BullshitFeed
