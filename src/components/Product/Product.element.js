import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  min-width: 1000px;
  max-width: 1500px;

  > div {
    padding: 0 8px;
    display: flex;
    margin-top: 80px;
  }
`;

export const LeftContainer = styled.div`
  width: 55%;
  margin-right: 2%;
  display: flex;

  .gallery {
    display: flex;
    flex-direction: column;
    min-width: 80px;
    padding-right: 40px;

    img {
      cursor: pointer;
      padding-bottom: 32px;
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
  }

  .display-picture {
    width: 80%;

    > div {
      margin: auto;
      text-align: left;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
      }
    }
  }
`;

export const RightContainer = styled.div`
  width: 43%;
  text-align: left;

  .brand {
    font-family: Raleway;
    font-style: normal;
    font-size: 30px;
    color: #1d1f22;
    margin: 0;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .name {
    font-family: Raleway;
    font-style: normal;
    font-size: 30px;
    color: #1d1f22;
    margin: 0;
    font-weight: normal;
    margin-bottom: 43px;
  }
`;

export const AttributeContainer = styled.div`
  padding-bottom: 20px;
  :last-child {
    padding-bottom: 0;
  }

  > div {
    display: flex;
  }

  p {
    text-transform: uppercase;
    font-family: Roboto Condensed;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #1d1f22;
    margin: 0 0 8px;
  }
`;

const SizeBox = styled.div.attrs((props) => ({
  active: props.active,
  color: props.color,
}))`
  display: flex;
  width: 63px;
  height: 45px;
  margin-right: 12px;
  cursor: pointer;
  text-align: center;
  p {
    margin: auto;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
  }
  border: 1px solid #1d1f22;
`;

export const SizeBoxText = styled(SizeBox).attrs((props) => ({
  active: props.active,
}))`
  background-color: ${(props) => (props.active === "true" ? "black" : "white")};
  p {
    color: ${(props) => (props.active === "true" ? "white" : "#292929")};
  }
`;

export const SizeBoxSwatch = styled(SizeBox).attrs((props) => ({
  active: props.active,
  color: props.color,
}))`
  box-shadow: ${(props) =>
    props.active === "true" && "0px 0px 12px 2px rgba(0, 0, 0, 0.8)"};
  border: ${(props) => props.active === "true" && "1px solid black"};
  background-color: ${(props) => props.color};
`;

export const PriceContainer = styled.div`
  .price {
    text-transform: uppercase;
    font-family: Roboto Condensed;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #1d1f22;
    margin: 40px 0 10px;
  }

  .amount {
    margin: 0;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    color: #1d1f22;
  }
`;

export const AddToCartBtn = styled.button.attrs((props) => ({
  inStock: props.inStock,
}))`
  cursor: ${(props) => props.inStock === "true" && "pointer"};
  background: ${(props) => (props.inStock === "true" ? "#5ece7b" : "grey")};
  padding: 16px 32px;
  width: 292px;
  height: 52px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  border: none;
  margin: 20px 0 40px;

  p {
    text-transform: uppercase;
    color: #ffffff;
    margin: auto;
  }
`;
