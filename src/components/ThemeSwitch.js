import PropTypes from "prop-types";
import styled from "styled-components";

import Svg from "../components/Svg";

const ButtonStyles = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Moon = process.env.PUBLIC_URL + "/images/icon-moon.svg";
const Sun = process.env.PUBLIC_URL + "/images/icon-sun.svg";

export default function ThemeSwitch(props) {
  const { theme, toggleTheme } = props;
  const isLight = theme === "light";

  return (
    <ButtonStyles onClick={toggleTheme}>
      <Svg name={isLight ? "moon" : "sun"} />
      <span className="sr-only">Toogle Theme</span>
    </ButtonStyles>
  );
}

ThemeSwitch.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
