import "./BullshitFeed.css";
import { isNumber } from "lodash";
import React, { PureComponent } from "react";
import styled, { keyframes } from "styled-components";
import { fadeInDownBig, fadeInUpBig } from "react-animations";
import Bullshit from "./Bullshit";
import Arrow from "./Arrow";
import Swipeable from "react-swipeable";

const fadeInDownBigAnimation = keyframes`${fadeInDownBig}`;
const FadeDowner = styled.div`
  animation: 0.5s ${fadeInDownBigAnimation};
`;

const fadeInUpBigAnimation = keyframes`${fadeInUpBig}`;
const FadeUpper = styled.div`
  animation: 0.5s ${fadeInUpBigAnimation};
`;

class BullshitFeed extends PureComponent {
  componentWillReceiveProps() {
    const {
      bullshit,
      lie: { index: lieIndex },
      setRandomLie,
    } = this.props;
    if (bullshit.length && !isNumber(lieIndex)) {
      setRandomLie({ max: bullshit.length });
    }
  }

  navLie(dir) {
    const {
      bullshit,
      lie: { index: lieIndex },
      setLie,
    } = this.props;
    let nextIndex;
    let nextFade;
    if (dir === "prev") {
      nextIndex = bullshit[lieIndex - 1]
        ? lieIndex - 1
        : bullshit[bullshit.length - 1];
      nextFade = "up";
    } else {
      nextIndex = bullshit[lieIndex + 1] ? lieIndex + 1 : 0;
      nextFade = "down";
    }
    return setLie({ index: nextIndex, fade: nextFade });
  }
  render() {
    const {
      bullshit,
      lie: { index: lieIndex, fade },
    } = this.props;
    let bsProps;
    if (!isNumber(lieIndex)) {
      if (!bullshit.length) {
        bsProps = {
          text: "Queing up some bullshit...",
          reference_url: "http://whitehouse.gov",
        };
      }
    } else {
      bsProps = bullshit[lieIndex];
    }
    const Fader = fade === "up" ? FadeUpper : FadeDowner;
    return (
      <Swipeable
        onSwipedUp={this.navLie.bind(this, "prev")}
        onSwipedDown={this.navLie.bind(this, "next")}
      >
        <div className="bullshit-feed">
          <div id="bullshit-nav">
            <Arrow
              id="last-bullshit"
              className="up"
              onClick={this.navLie.bind(this, "prev")}
            />
            <Arrow
              id="next-bullshit"
              className="down"
              onClick={this.navLie.bind(this, "next")}
            />
          </div>
          <Fader className="bullshit-feed-fader" key={lieIndex || "-1"}>
            <Bullshit {...bsProps} />
          </Fader>
        </div>
      </Swipeable>
    );
  }
}

export default BullshitFeed;
