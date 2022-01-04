import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 80px);
  > div {
    padding: 80px 100px;
    @media (max-width: 1430px) {
      padding: 80px 0;
    }
  }

  .flex-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Category = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 42px;
  line-height: 160%;
  text-transform: capitalize;
  text-align: left;
  margin: 0 0 100px 10%;
  color: #1d1f22;
`;

export const CardContainer = styled.div.attrs((props) => ({
  instock: props.instock,
}))`
  display: flex;
  position: relative;
  .card {
    position: relative;
    top: 0;
    left: 0;
    color: black;
    text-decoration: none;
    padding: 25px;
    text-align: start;
    cursor: pointer;
    opacity: ${(props) => props.instock === "false" && 0.5};

    .name {
      margin: 0 0 0;
      font-family: Raleway;
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 160%;
      color: #1d1f22;
    }

    .brand {
      margin: 24px 0 0;
      font-family: Raleway;
      font-style: normal;
      font-size: 18px;
      color: #1d1f22;
      font-weight: 600;
    }

    .out-of-stock-text {
      opacity: 0.8;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: Raleway;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 160%;
      color: #8d8f9a;
      text-transform: uppercase;
    }

    img {
      position: relative;
      top: 0;
      left: 0;
      width: 354px;
      height: 330px;
      object-fit: contain;
    }
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 15%), 0 4px 8px 0 rgb(0 0 0 / 15%);
    .addToCarFloatingtBtn {
      cursor: pointer;
      background-color: #5ece7b;
      border-radius: 35px;
      padding: 12px;
      width: 25px;
      height: 25px;
      content: url("/empty-cart-white.svg");
      filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
      position: absolute;
      right: 31px;
      bottom: 60px;
    }
  }
`;

export const Price = styled.p`
  margin: 0px;
  display: flex;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-align: right;
  color: #1d1f22;
`;
