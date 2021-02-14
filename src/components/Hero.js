import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const BgDesktopDark = process.env.PUBLIC_URL + "/images/bg-desktop-dark.jpg";
const BgDesktopLight = process.env.PUBLIC_URL + "/images/bg-desktop-light.jpg";

const BackgroundImage = styled.div`
  background-image: ${({ theme }) =>
    theme === "light" ? `url("${BgDesktopLight}")` : `url("${BgDesktopDark}")`};
  height: 250px;
  background-size: cover;
`;

export default function Hero(props) {
  const { theme } = props;
  return <BackgroundImage theme={theme} />;
}

Hero.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};
