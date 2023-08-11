import { Box } from '@mui/material';
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

  @media (max-width: ${bp.sm}) {
    height: 50px;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

export const JobTitlesContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: ${bp.sm}) {
    border: 1px solid white;
  }
`;

export const JobTitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  margin: 10px;
  width: 300px;
  flex-wrap: wrap;

  @media (max-width: ${bp.sm}) {
    font-size: 10px;
    width: 120px;
    margin: 5px;
    border: 1px solid white;
  }
`;

export const Position = styled('h1')`
  font-size: 15px;
  color: white;

  @media (max-width: ${bp.sm}) {
    font-size: 5px;
    letter-spacing: 1px;
  }
`;

export const TableContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  margin: 10px 0;
  width: 100%;
  overflow-x: auto;

  @media (max-width: ${bp.sm}) {
    width: 100%;
    max-width: none;
    border: 1px solid white;
  }
`;

export const TableHeader = styled('h1')`
  font-size: 15px;
  color: white;

  @media (max-width: ${bp.sm}) {
    font-size: 10px;
    white-space: nowrap;
  }
`;

export const StyledTable = styled('table')`
  width: 100%;

  @media (max-width: ${bp.sm}) {
  }
`;
