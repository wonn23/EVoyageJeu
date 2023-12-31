import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;

  position: absolute;
  width: 100%;
  height: 200px;
  left: 0px;
  top: 0px;

  background: #4fc174;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    border-top-left-radius: 70px;
    border-top-right-radius: 70px;
    background: #caf5d7;
  }

  img {
    width: 80px;
    height: 80px;
    padding-left: 120px;
  }

  a {
    width: 250px;
    height: 51px;
    padding-left: 30px;
    padding-right: 70px;
    text-decoration: none;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
  
    color: #000000;

    &:active {
      position: relative;
      top: 3px;
    }
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: row;

  width: 50%;
  height: 100%;
`;

export const NavContainer = styled.div`
  width: 100%;

  &:hover {
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    background: #f9f8f7;
  }

  .clicked {
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    background: #f9f8f7;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;

    width: 100%;
    height: 100%;

    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
    letter-spacing: 0.2px;
    text-decoration-line: none;

    color: #000000;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;

  margin-right: 50px;
  padding: 38px 22px;
  gap: 10px;

  width: 650px;
  height: 75px;

  p {
    padding-left: 50px;
    margin-right: 15px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.46px;
  }

  .profile {
    display: flex;
    align-content: center;
    margin-top: 25px;
    width: 600px;
  }

  .profilebox {
    cursor: pointer;

    margin-right: 35px;    
    width: 75px;
    height: 75px; 
    border-radius: 70%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-size: cover;

      &:hover {
        background: #f9f8f7;
      }
    }

    &:active {
      position: relative;
      top: 3px;
    }
  }
`;

export const HeaderButton = styled.button`
  cursor: pointer;
  margin-top: 25px;

  width: 150px;
  height: 70px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.46px;
  color: ${(props) => props.fontColor};

  background: ${(props) => props.backgroundColor};
  border-radius: 40px;
  border-color: #218721;

  &:active {
    position: relative;
    top: 3px;
  }
`;