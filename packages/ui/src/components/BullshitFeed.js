import './BullshitFeed.css'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeInDownBig } from 'react-animations'
import Bullshit from './Bullshit'
import Arrow from './Arrow'

const fadeInDownBigAnimation = keyframes`${fadeInDownBig}`

const FadeDowner = styled.div`
  animation: 1s ${fadeInDownBigAnimation}
`

class BullshitFeed extends PureComponent {
  componentWillMount () {
    this.props.fetchBullshit()
  }
  render () {
    // const { bullshit } = this.props
    // if (!bullshit) return <p>waiting for bullshit...</p>
    return (
      <div className='bullshit-feed'>
        <FadeDowner className='bullshit-feed-fader' key={'1'}>
          <Bullshit quote='blah blah blaj' reference='https://whitehouse.gov' />
          <Arrow className='down next' />
        </FadeDowner>
      </div>
    )
  }
}

export default BullshitFeed
