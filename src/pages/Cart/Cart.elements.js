import styled from "styled-components";

export const Container = styled.div`
  padding: 80px 0 60px 10%;
  width: 70%;
  .title {
    margin: 0;
    text-align: start;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    text-transform: uppercase;

    color: #1d1f22;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-top: 60px;
  hr {
    border-color: #e5e5e5;
    background-color: #e5e5e5;
    color: #e5e5e5;
    border: 1px solid;
    margin: 21px 0;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  .right-container {
    display: flex;
  }

  .brand {
    margin: 0;
    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #1d1f22;
  }
  .name {
    margin: 16px 0 12px;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #1d1f22;
  }

  .price {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: #1d1f22;
  }

  .amount-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    p {
      margin: 0;
      font-family: Raleway;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 160%;
      display: flex;
      align-items: center;
      text-align: center;
      color: #1d1f22;
    }

    img {
      cursor: pointer;
      width: 45px;
      height: 45px;
    }
  }

  .img-container {
    place-self: center;
    position: relative;
    width: 145px;
    height: 220px;

    img {
      width: inherit;
      height: inherit;
      object-fit: contain;
    }

    .arrow-right {
      position: absolute;
      height: 24px;
      width: 24px;
      top: 40%;
      right: 0;
      cursor: pointer;
    }
    .arrow-left {
      position: absolute;
      height: 24px;
      width: 24px;
      top: 40%;
      left: 0;
      transform: rotate(0.5turn);
      cursor: pointer;
    }
  }
`;
