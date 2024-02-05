import styled from 'styled-components';

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    h2 {
      margin: 0;
    }
  }
`;