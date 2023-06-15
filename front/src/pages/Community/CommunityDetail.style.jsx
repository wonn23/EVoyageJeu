import styled from "styled-components";

export const Container = styled.div`
  margin: 150px 0 300px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;

  p {
    padding: 100px 30px 35px;
    width: 2300px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 110%;
    text-align: center;
    color: #21272A;
  }
`;

export const TypeContainer =  styled.div`
  display: flex;
  justify-content: center;

  div {
    width: 2316px;
    border-bottom: 3px solid #DDE1E6;
  }
`;

export const TypeButton = styled.button`
  cursor: pointer;
  padding: 40px 85px;
  border: none;
  background: none;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  letter-spacing: 0.5px;
  color: ${(props) => props.fontColor};

  &:hover {
    background: #A6C8FF;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 2300px;
    background: #f9f8f7;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 110%;
    color: #000000;
  }

  .title-box {
    padding-top: 70px;
    background: #f2f2f2;
    border-top-left-radius: 60px;
    border-top-right-radius: 55px;
    border-top: 53px dotted #4fc174;
    border-bottom: 1px solid #00000033;
    div {
      padding-left: 80px;
      width: 100%;
      height: 100px;
      background: #DFDCD3;

      font-weight: 700;
      font-size: 40px;
    }
  }

  .posting-infobox {
    margin-top: 0;
    border-bottom: 1px solid #00000033;
    div {
      justify-content: center;
      height: 60px;
      text-align: center;
    }
    .index { width: 150px; }
    .type { width: 200px; }
    .author { width: 400px; }
    .date { width: 400px; }
    .likeCount { width: 150px; }
    .info { 
      width: 200px;
      background: #DFDCD3; 
    }
  }

  .content-box {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #00000033;
    div {
      align-items: start;
      padding: 40px;
      background: #F9F8F3;
      width: 2220px;
    }
    .content {
      padding-bottom: 300px;
    }
  }

`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  padding: 40px 380px 40px;

  div {
    display: flex;
    justify-content: flex-end;

    width: 100%;

    button {
      width: 150px;
      height: 50px;

      margin-left: 15px;
      border: 1px solid #3563E9;
      border-radius: 5px;
      background: #FFFFFF;

      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 19px;
      text-align: center;
      letter-spacing: 0.46px;
      color: #3563E9;

      &:hover {
        background: #3563E9;
        color: #FFFFFF;
      }

      &:active {
        position: relative;
        top: 2px;
      }
    }
    
    .tolist {
      border: 1px solid #15BE51;
      background: #FFFFFF;
      color: #15BE51;
  
      &:hover {
        background: #15BE51;
        color: #FFFFFF;
      }
    }
    
    .delete {
      border: 1px solid #FFD229;
      background: #FFFFFF;
      color: #FFD229;
      
      &:hover {
        background: #FFD229;
        color: #FFFFFF;
      }
    }

    .like {
      border: 1px solid #F91C1C;
      background: #FFFFFF;
      color: #F91C1C;
      
      &:hover {
        background: #F91C1C;
        color: #FFFFFF;
      }
    }

    .liked {
      border: 1px solid #F91C1C;
      background: #F91C1C;
      color: #FFFFFF;
      
      &:hover {
        background: #FFFFFF;
        color: #F91C1C;
      }
    }
  }
`;