import './App.css'
import * as React from 'react'
// import BullshitFeed from './BullshitFeed'
import { debounce } from 'lodash'
import State from '../types/State'
import BACKGROUND_MODE from '../types/BackgroundMode'

class App extends React.PureComponent<State, null> {
  componentWillMount () {
    this.sizeBg()
    this.sizeBg = debounce(this.sizeBg.bind(this), 50)
    window.addEventListener('resize', this.sizeBg.bind(this))
  }
  sizeBg () {
    const { bgMode, handlers: { setBgMode } } = this.props
    const computedBody = window.getComputedStyle(document.body)
    if (!computedBody || !computedBody.width || !computedBody.height) {
      return <p>Sorry, you're browser isn't supported.  Bummer :/</p>
    }
    let width: number = parseInt(computedBody.width.slice(0, -2), 10)
    let height: number = parseInt(computedBody.height.slice(0, -2), 10)
    const newBgMode = height > width ? BACKGROUND_MODE.MAX_HEIGHT : BACKGROUND_MODE.MAX_WIDTH
    return bgMode === newBgMode ? null : setBgMode(newBgMode, { height, width })
  }
  render () {
    const { bgMode, bgDim } = this.props
    const isMaxWidth = bgMode === BACKGROUND_MODE.MAX_WIDTH
    const bgProps = {}
    bgProps[isMaxWidth ? 'width' : 'height'] = (isMaxWidth ? bgDim.width : bgDim.height) + 'px'
    return (
      <div id='root' className='App'>
        <img id='bg' src='/imgs/dt1.jpg' />
        {/*<BullshitFeed />*/}
      </div>
    )
  }
}

export default App
