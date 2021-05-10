import styled from 'styled-components';

export const StyledHeader = styled('header')`
  width: 100%;
  height: fit-content;
  position: sticky;
  background: white;
  color: black;
  border-bottom: 1px solid black;
  box-shadow: 0 2px 18px 8px black;
  & .header__title {
    font-size: 20px;
    @media (min-width: 768px) {
      font-size: 30px;
    }
    @media (min-width: 1280px) {
      font-size: 40px;
    }
    display: inline-block;

    &.enter,
    &.entering {
      transform: translateX(100px);
      opacity: 0;
    }

    &.enterActive,
    &.entered {
      transform: translateX(0);
      opacity: 1;
      transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
    }

    &.exit,
    &.exiting {
      transform: translateX(0);
      opacity: 1;
    }

    &.exitActive,
    &.exited {
      transform: translateX(100px);
      opacity: 0;
      transition: transform 200ms ease-in-out, opacity 200ms ease-in-out 200ms;
    }
  }
`;
