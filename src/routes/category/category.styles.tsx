import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
    row-gap: 25px;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    column-gap: 10px;
    row-gap: 20px;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
`;