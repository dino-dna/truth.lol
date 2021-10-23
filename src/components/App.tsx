import "./App.css";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BullshitFeed from "./BullshitFeed";
import ghlogo from "./gh.png";
import { useRaf } from "../hooks/use-raf";

// import {
//   setBackgroundImageElementStyles,
//   setBackgroundNaturalDimensions,
// } from "../state/dux/background";
// import { get as getBullshit } from "../state/dux/bullshit";
// import { set as setLie, setRandom as setRandomLie } from "../state/dux/lie";
import { useGetBullshit } from "../hooks/use-get-bullshit";
export const App: React.FC = () => {
  const getBullshit = useGetBullshit();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [{ width: naturalWidth, height: naturalHeight }, setNaturalDimensions] =
    useState({ width: 0, height: 0 });
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({
    width: "100%",
    height: "100%",
  });
  // seriously? just use css man
  const updateBg = useCallback(
    useRaf(() => {
      const computedBody = window.getComputedStyle(document.body);
      if (!computedBody || !computedBody.width || !computedBody.height) {
        return setErrorMessage(
          "Sorry, your browser is not supported. Bummer :/"
        );
      }
      let width = parseInt(computedBody.width.slice(0, -2), 10);
      let height = parseInt(computedBody.height.slice(0, -2), 10);
      var idealHeight = (width * naturalHeight) / naturalWidth;
      if (height > width || idealHeight < height) {
        var idealWidth = (height * naturalWidth) / naturalHeight;
        return setImgStyle({
          height: `${height}px`,
          left: `${-(idealWidth - width) / 2}px`,
        });
      }
      return setImgStyle({
        width: `${width}px`,
        top: `${-(idealHeight - height) / 2}px`,
      });
    }),
    [naturalHeight, naturalWidth]
  );
  // update bg image on resize
  useLayoutEffect(() => {
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);
  // reposition bg image on image load
  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const onload = () => {
      updateBg();
      return setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.addEventListener("load", onload);
    return () => img.removeEventListener("load", onload);
  }, [imgRef.current]);
  return (
    <div id="root" className="App">
      <img
        id="bg"
        alt="truth.lol-background"
        ref={imgRef}
        src="/imgs/dt1.jpg"
        style={imgStyle}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <BullshitFeed />
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
};

// export default connect(
//   function mapState(state) {
//     return state;
//   },
//   {
//     getBullshit,
//     setBackgroundImageElementStyles,
//     setBackgroundNaturalDimensions,
//     setLie,
//     setRandomLie,
//   }
// )(App);

export default App;
