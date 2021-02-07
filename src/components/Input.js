import PropTypes from "prop-types";
import styled from "styled-components";

const InputStyles = styled.input`
  width: 100%;
  border-radius: 5px;
  height: 3rem;
  border: none;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) =>
    theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-blue)`};
`;

export default function Input(props) {
  const { theme } = props;
  return (
    <>
      <label>
        <InputStyles type="text" theme={theme} />
      </label>
    </>
  );
}

Input.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};
