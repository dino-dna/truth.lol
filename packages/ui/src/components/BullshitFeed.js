import './BullshitFeed.css'
import isNumber from 'lodash/isNumber'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeInDownBig, fadeInUpBig } from 'react-animations'
import Bullshit from './Bullshit'
import Arrow from './Arrow'
import Swipeable from 'react-swipeable'
import detectIt from 'detect-it'

const fadeInDownBigAnimation = keyframes`${fadeInDownBig}`
const FadeDowner = styled.div`
  animation: 0.5s ${fadeInDownBigAnimation}
`

const fadeInUpBigAnimation = keyframes`${fadeInUpBig}`
const FadeUpper = styled.div`
  animation: 0.5s ${fadeInUpBigAnimation}
`

class BullshitFeed extends PureComponent {
  componentWillReceiveProps () {
    const { bullshit, lie: { index: lieIndex }, setRandomLie } = this.props
    if (bullshit.length && !isNumber(lieIndex)) {
      setRandomLie({ max: bullshit.length })
    }
  }

  navLie (dir) {
    const { bullshit, lie: { index: lieIndex }, setLie } = this.props
    let nextIndex
    let nextFade
    if (dir === 'prev') {
      nextIndex = bullshit[lieIndex - 1] ? (lieIndex - 1) : bullshit[bullshit.length - 1]
      nextFade = 'up'
    } else {
      nextIndex = bullshit[lieIndex + 1] ? (lieIndex + 1) : 0
      nextFade = 'down'
    }
    return setLie({ index: nextIndex, fade: nextFade })
  }
  swiping (e, deltaX, deltaY, absX, absY, velocity) {
    // this.props.setLieOffset()
    console.log.apply(console, arguments)
    window.document.getElementById('active-lie').style.bottom = `${deltaY}px`
  }
  handleSwipeUp (evt, deltaY, isFlick) {
    if (isFlick || deltaY > 100) return this.navLie('prev')
    window.document.getElementById('active-lie').style.bottom = 0
  }
  handleSwipeDown (evt, deltaY, isFlick) {
    if (isFlick || deltaY < -100) return this.navLie('next')
    window.document.getElementById('active-lie').style.bottom = 0
  }
  render () {
    const { bullshit, lie: { index: lieIndex, fade } } = this.props
    let bsProps
    let clickNav
    if (!isNumber(lieIndex)) {
      if (!bullshit.length) {
        bsProps = { text: 'Queing up some bullshit...', reference_url: 'http://whitehouse.gov' }
      }
    } else {
      bsProps = bullshit[lieIndex]
    }
    const Fader = fade === 'up' ? FadeUpper : FadeDowner
    if (detectIt.deviceType !== 'touchOnly') {
      clickNav = (
        <div id='bullshit-nav'>
          <Arrow id='last-bullshit' className='up'
            onClick={this.navLie.bind(this, 'prev')} />
          <Arrow id='next-bullshit' className='down'
            onClick={this.navLie.bind(this, 'next')} />
        </div>
      )
    }
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipedUp={this.handleSwipeUp.bind(this)}
        onSwipedDown={this.handleSwipeDown.bind(this)}>
        <div className='bullshit-feed'>
          {clickNav}
          <Fader className='bullshit-feed-fader' key={lieIndex || '-1'}>
            <Bullshit id='active-lie' {...bsProps} />
          </Fader>
        </div>
      </Swipeable>
    )
  }
}

export default BullshitFeed
