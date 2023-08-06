import { TableRow } from '@mui/material';
import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 80vw;
  height: 100%;
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
`;

export const TableHeader = styled.h1`
  color: white;
  font-size: 15px;
`;

export const TableItem = styled.h1`
  color: white;
  font-size: 11px;
`;

export const StyledTableRow = styled(TableRow)`
  color: white;

  &:hover {
    background-color: green;
    cursor: pointer;
    color: black;
  }
`;
