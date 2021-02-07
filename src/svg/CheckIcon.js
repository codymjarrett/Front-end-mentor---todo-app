import React from "react";

export default function CheckIcon(props) {
  const { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
      fill={fill ? fill : "none"}
    >
      <path
        fill="current"
        stroke="#FFF"
        stroke-width="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
}
