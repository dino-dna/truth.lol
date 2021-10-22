import "./App.css";
import React, { PureComponent } from "react";
import BullshitFeed from "./BullshitFeed";
import { connect } from "react-redux";
import { debounce } from "lodash";
import ghlogo from "./gh.png";

import {
  setBackgroundImageElementStyles,
  setBackgroundNaturalDimensions,
} from "../state/dux/background";
import { get as getBullshit } from "../state/dux/bullshit";
import { set as setLie, setRandom as setRandomLie } from "../state/dux/lie";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.setImgRef = this.setImgRef.bind(this);
  }

  componentWillMount() {
    const { getBullshit } = this.props;
    getBullshit();
    this.sizeBg();
    this.sizeBg = debounce(this.sizeBg.bind(this), 50);
    window.addEventListener("resize", this.sizeBg.bind(this));
  }
  sizeBg() {
    const {
      background: {
        naturalDimensions: { width: naturalWidth, height: naturalHeight },
      },
      setBackgroundImageElementStyles,
    } = this.props;
    const computedBody = window.getComputedStyle(document.body);
    if (!computedBody || !computedBody.width || !computedBody.height) {
      return <p>Sorry, your browser is not supported. Bummer :/</p>;
    }
    let width = parseInt(computedBody.width.slice(0, -2), 10);
    let height = parseInt(computedBody.height.slice(0, -2), 10);
    var idealHeight = (width * naturalHeight) / naturalWidth;
    if (height > width || idealHeight < height) {
      var idealWidth = (height * naturalWidth) / naturalHeight;
      return setBackgroundImageElementStyles({
        height: `${height}px`,
        left: `${-(idealWidth - width) / 2}px`,
      });
    }
    return setBackgroundImageElementStyles({
      width: `${width}px`,
      top: `${-(idealHeight - height) / 2}px`,
    });
  }
  setImgRef(img) {
    const { setBackgroundNaturalDimensions } = this.props;
    return img.addEventListener(
      "load",
      function _setImgNaturalDims() {
        this.sizeBg();
        return setBackgroundNaturalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }.bind(this)
    );
  }
  render() {
    const {
      background: { elementDimensions },
      bullshit,
      lie,
      setLie,
      setRandomLie,
    } = this.props;
    return (
      <div id="root" className="App">
        <img
          id="bg"
          alt="truth.lol-background"
          ref={this.setImgRef}
          src="/imgs/dt1.jpg"
          style={elementDimensions}
        />
        <BullshitFeed
          {...{
            bullshit,
            lie,
            setLie,
            setRandomLie,
          }}
        />
        <footer>
          <a
            href="http://www.bbc.co.uk/ethics/lying/lying_1.shtml"
            target="_blank"
            rel="noopener noreferrer"
          >
            Is lying bad?
          </a>
          <a
            id="gh-ref"
            href="https://github.com/dino-dna/truth.lol/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Have more lies? <img height="15px" alt="ghlogo" src={ghlogo} />
          </a>
        </footer>
      </div>
    );
  }
}

export default connect(
  function mapState(state) {
    return state;
  },
  {
    getBullshit,
    setBackgroundImageElementStyles,
    setBackgroundNaturalDimensions,
    setLie,
    setRandomLie,
  }
)(App);
