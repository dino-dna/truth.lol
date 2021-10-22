import "./Bullshit.css";
import React from "react";

function Bullshit(props) {
  const { text, reference_url: referenceUrl, date } = props;
  return (
    <div className="bullshit">
      <p>{text}</p>
      <span className="bullshit-date">{date}</span>
      <a
        className="bullshit-reference"
        target="_blank"
        rel="noopener noreferrer"
        href={referenceUrl}
      >
        reference
      </a>
    </div>
  );
}

export default Bullshit;
