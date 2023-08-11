import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import { Card, CardContent } from '@mui/material';

export const PageContainer = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: #212121;
  float: left;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${bp.sm}) {
    width: 85vw;
  }
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

  @media (max-width: ${bp.xs}) {
    height: 50px;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const WelcomeContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  color: white;
  padding: 150px 0;
  margin: 30px 0;
  font-size: 30px;
  letter-spacing: 5px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${bp.md}) {
    letter-spacing: 1px;
  }
`;

export const WelcomeCard = styled(Card)`
  padding: 50px 0;

  @media (max-width: ${bp.xs}) {
    padding: 5px;
  }
`;

export const WelcomeCardContent = styled('div')`
  padding: 50px 0;
`;

export const CardHeader = styled('h1')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;

  @media (max-width: ${bp.xs}) {
    font-size: 10px;
  }
`;

export const CardBodyText = styled('h1')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  padding: 15px;

  @media (max-width: ${bp.xs}) {
    font-size: 13px;
  }
`;
