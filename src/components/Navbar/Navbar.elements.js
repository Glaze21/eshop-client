import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background-color: white;
  height: 80px;
  > div {
    height: inherit;
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
    z-index: 12;
    transition: top 0.4s ease 0s;
    z-index: 4;
  }
`;

export const NavMenu = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const NavBtn = styled(Link).attrs((props) => ({
  active: props.active,
}))`
  font-family: Raleway;
  font-style: normal;
  font-weight: ${(props) => (props.active === "true" ? "600" : "500")};
  font-size: 16px;
  text-transform: uppercase;
  color: ${(props) => (props.active === "true" ? "#5ECE7B" : "black")};
  display: flex;
  align-items: center;
  text-decoration: ${(props) =>
    props.active === "true" ? "underline 2px" : "none"};
  text-underline-offset: ${(props) =>
    props.active === "true" ? "20px" : "0px"};
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover,
  &:focus {
    text-underline-offset: 20px;
    text-decoration: underline 2px;
  }
  transition: text-underline-offset 400ms, text-decoration 400ms;
`;

export const NavLogo = styled.img`
  display: flex;
  place-self: center;
  height: 50px;
`;

export const CurrencyContainer = styled.div.attrs((props) => ({
  active: props.active,
}))`
  place-content: start;
  width: 70px;
  height: 20px;
  align-items: center;
  cursor: pointer;
  padding-right: 22px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin: 0;
  max-width: 175px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;

  img {
    position: absolute;
    content: url(/arrow.svg);
    display: block;
    right: 16px;
    top: 60%;
    transition: transform 0.25s ease-out;
    transform: ${(props) =>
      props.active === "false" && "matrix(1, 0, 0, -1, 0, 0)"};
    transition: transform 0.25s ease-out;
    width: 6px;
    height: 3px;
  }
`;

export const CartContainer = styled.div`
  width: 25px;
  height: 20px;
  align-items: center;
  cursor: pointer;
  text-align: start;
  position: relative;

  p {
    display: flex;
    place-content: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    align-items: center;
    color: white;
    position: absolute;
    bottom: 9px;
    left: 11px;
    margin: 0;
    padding: 6px;
    background: #1d1f22;
    border-radius: 60px;
    width: 8px;
    height: 8px;
    text-align: center;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;
