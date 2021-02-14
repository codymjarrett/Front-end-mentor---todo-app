import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const TodoStyles = styled.li`
  ${({ theme }) => css`
    background-color: ${theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-desaturated-blue)`};
  `}
  padding: 1.5rem;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const TextStyles = styled.span`
  color: var(--light-dark-grayish-blue);
  display: block;
  font-size: 16px;
`;

const ButtonStyles = styled.span`
  color: var(--light-dark-grayish-blue);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const FilterButtonStyles = styled(ButtonStyles)`
  margin-right: 1rem;
  cursor: pointer;

  color: ${({ currentFilter, filter }) =>
    currentFilter === filter
      ? `var(--primary-bright-blue)`
      : `var(--light-dark-grayish-blue)`};

  &:hover {
    color: var(--dark-very-dark-grayish-blue);
  }
`;

const TodoBlockStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  ${({ theme }) => css`
    background-color: ${theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-desaturated-blue)`};
  `}
  padding: 1.5rem;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const FilterButtonWrapper = styled.div`
  display: none;

  @media (min-width: 1440px) {
    display: block;
  }
`;
const MobileFilterWrapper = styled.div`
  display: block;

  @media (min-width: 1440px) {
    display: none;
  }
`;

function FilterButtons(props) {
  const { updateVisibilityFilter, visibilityFilter } = props;

  return (
    <div>
      <FilterButtonStyles
        onClick={() => updateVisibilityFilter("SHOW_ALL")}
        currentFilter={visibilityFilter}
        filter="SHOW_ALL"
      >
        All
      </FilterButtonStyles>
      <FilterButtonStyles
        onClick={() => updateVisibilityFilter("SHOW_ACTIVE")}
        currentFilter={visibilityFilter}
        filter="SHOW_ACTIVE"
      >
        Active
      </FilterButtonStyles>
      <FilterButtonStyles
        onClick={() => updateVisibilityFilter("SHOW_COMPLETED")}
        currentFilter={visibilityFilter}
        filter="SHOW_COMPLETED"
      >
        Completed
      </FilterButtonStyles>
    </div>
  );
}

function MobileFilter(props) {
  const { theme, dispatch, updateVisibilityFilter, visibilityFilter } = props;
  return (
    <MobileFilterWrapper>
      <TodoBlockStyles theme={theme}>
        <FilterButtons
          updateVisibilityFilter={updateVisibilityFilter}
          visibilityFilter={visibilityFilter}
        />
      </TodoBlockStyles>
    </MobileFilterWrapper>
  );
}

export default function Footer(props) {
  const {
    theme,
    todos,
    getNumberOfTodosText,
    handleClearComplete,
    dispatch,
    updateVisibilityFilter,
    visibilityFilter,
  } = props;
  return (
    <TodoStyles theme={theme}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextStyles>{getNumberOfTodosText()}</TextStyles>
        <FilterButtonWrapper>
          <FilterButtons
            dispatch={dispatch}
            visibilityFilter={visibilityFilter}
            updateVisibilityFilter={updateVisibilityFilter}
          />
        </FilterButtonWrapper>
        {todos.length > 0 && (
          <ButtonStyles onClick={handleClearComplete}>
            Clear Completed
          </ButtonStyles>
        )}
      </div>
    </TodoStyles>
  );
}

export { MobileFilter };

Footer.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      id: PropTypes.number,
    })
  ),
  handleClearComplete: PropTypes.func.isRequired,
  getNumberOfTodosText: PropTypes.func.isRequired,
  updateVisibilityFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.oneOf([
    "SHOW_ALL",
    "SHOW_COMPLETED",
    "SHOW_ACTIVE",
  ]),
};
