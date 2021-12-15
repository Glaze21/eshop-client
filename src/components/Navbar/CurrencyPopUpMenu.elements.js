import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 60px;
  right: 130px;
  background-color: white;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  width: 100px;
  height: 190px;
  z-index: 4;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0 16px;
`;

export const ListItem = styled.li`
  cursor: pointer;
  padding: 0 0 12px 0;
`;
