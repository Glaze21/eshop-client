import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 80px;
  right: 80px;
  background-color: white;
  width: 325px;
  height: 540px;
  z-index: 5;
  font-family: Raleway;
  font-style: normal;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 25px 0 0 0;
  max-height: 370px;
  overflow-y: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ListItem = styled.li`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #1d1f22;
  text-align: start;
  padding: 0 0 40px 0;
  line-height: 160%;
  display: flex;
  width: 293px;

  .description-container {
    width: inherit;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .price {
    margin: 5px 0 0 0;
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #1d1f22;
  }

  .amount-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;

    p {
      margin: 0;
      font-family: Raleway;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 160%;
      color: #1d1f22;
    }

    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }

  img {
    width: 105px;
    height: 100px;
    object-fit: contain;
  }
`;

export const TopContainer = styled.div`
  margin: 8px 16px 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title-container {
    display: flex;
    p {
      margin: 0;
    }
    .my-bag {
      font-weight: 700;
    }
    .items {
      margin-left: 6px;
      font-weight: 500;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  place-content: space-between;
  margin-right: 4px;

  .text {
    margin: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #1d1f22;
  }
  .amount {
    margin: 0;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: right;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;

  a,
  button {
    cursor: pointer;
    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #1d1f22;
    width: 140px;
    height: 43px;
  }

  .view-bag {
    padding: 12px;
    text-decoration: none;
    background: #ffffff;
    border: 1px solid #1d1f22;
    box-sizing: border-box;
    color: #1d1f22;
  }

  .check-out {
    border: none;
    background: #5ece7b;
    color: #ffffff;
  }
`;
