import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';

export const PageContainer = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: #212121;
  float: left;
  color: white;
  padding: 20px;

  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.div`
  width: 100%;
  height: 10vh;
  border: 1px solid white;
  color: white;
  padding: 20px;
  margin: 30px 0;
  font-size: 30px;
  letter-spacing: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${bp.sm}) {
    height: 50px;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;
