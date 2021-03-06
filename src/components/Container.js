import PropTypes from "prop-types";
import styled from "styled-components";

const ContainerStyles = styled.div`
  width: 80%;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1440px) {
    width: 40%;
  }
`;

export default function Container({ children }) {
  return <ContainerStyles>{children}</ContainerStyles>;
}

Container.propTypes = {
  children: PropTypes.node,
};
