import { Box, Button, Container } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormBodyContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 30px;
`;

export const InputContainer = styled(Container)`
  width: 50%;
  padding: 30px;
`;
export const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled(Box)`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  width: 400px;
  padding: 10px;
`;

export const style = {
  color: 'white',
};
