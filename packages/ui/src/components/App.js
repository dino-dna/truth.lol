import './App.css'
import React, { PureComponent } from 'react'
import BullshitFeed from './BullshitFeed'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import {
  setBackgroundImageElementStyles,
  setBackgroundNaturalDimensions
} from '../state/dux/background'

class App extends PureComponent {
  constructor (props) {
    super(props)
    this.setImgRef = this.setImgRef.bind(this)
  }

  componentWillMount () {
    this.sizeBg()
    this.sizeBg = debounce(this.sizeBg.bind(this), 50)
    window.addEventListener('resize', this.sizeBg.bind(this))
  }
  sizeBg () {
    const {
      background: {
        naturalDimensions: {
          width: naturalWidth,
          height: naturalHeight
        }
      },
      setBackgroundImageElementStyles
    } = this.props
    const computedBody = window.getComputedStyle(document.body)
    if (!computedBody || !computedBody.width || !computedBody.height) {
      return <p>Sorry, your browser is not supported.  Bummer :/</p>
    }
    let width = parseInt(computedBody.width.slice(0, -2), 10)
    let height = parseInt(computedBody.height.slice(0, -2), 10)
    var idealHeight = width * naturalHeight / naturalWidth
    if (height > width || idealHeight < height) {
      var idealWidth = height * naturalWidth / naturalHeight
      return setBackgroundImageElementStyles({
        height: `${height}px`,
        left: `${-(idealWidth - width) / 2}px`
      })
    }
    return setBackgroundImageElementStyles({
      width: `${width}px`,
      top: `${-(idealHeight - height) / 2}px`
    })
  }
  setImgRef (img) {
    const { setBackgroundNaturalDimensions } = this.props
    return img.addEventListener('load', function _setImgNaturalDims () {
      this.sizeBg()
      return setBackgroundNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }.bind(this))
  }
  render () {
    const { background: { elementDimensions } } = this.props
    return (
      <div id='root' className='App'>
        <img id='bg' alt='truth.lol-background'
          ref={this.setImgRef}
          src='/imgs/dt1.jpg' style={elementDimensions} />
        <BullshitFeed />
      </div>
    )
  }
}

export default connect(
  function mapState (state) { return state },
  {
    setBackgroundImageElementStyles,
    setBackgroundNaturalDimensions
  }
)(App)
