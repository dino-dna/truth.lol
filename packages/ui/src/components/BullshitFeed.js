import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeInDownBig } from 'react-animations'
import Bullshit from './Bullshit'

const fadeInDownBigAnimation = keyframes`${fadeInDownBig}`

const FadeDowner = styled.div`
  animation: 1s ${fadeInDownBigAnimation}
`

class BullshitFeed extends PureComponent {
  componentWillMount () {
    // fetchBullshit
  }
  render () {
    // const { bullshit } = this.props
    // if (!bullshit) return <p>waiting for bullshit...</p>
    return (
      <div className='bullshit-feed'>
        <FadeDowner>
          <Bullshit quote='blah blah blaj' reference='https://whitehouse.gov' />
        </FadeDowner>
      </div>
    )
  }
}

export default BullshitFeed
