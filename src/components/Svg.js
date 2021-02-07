import PropTypes from "prop-types";
import styled from "styled-components";

import CheckIcon from "../svg/CheckIcon";
import CrossIcon from "../svg/CrossIcon";
import MoonIcon from "../svg/MoonIcon";
import SunIcon from "../svg/SunIcon";

export default function Svg(props) {
  const { name, color = "" } = props;

  switch (name) {
    case "check":
      return <CheckIcon fill={color} />;
    case "cross":
      return <CrossIcon fill={color} />;
    case "sun":
      return <MoonIcon fill={color} />;
    case "moon":
      return <SunIcon fill={color} />;
  }
}

Svg.propTypes = {
  name: PropTypes.oneOf(["check", "cross", "sun", "moon"]).isRequired,
  color: PropTypes.string,
};
