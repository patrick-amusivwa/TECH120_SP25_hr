import { Box, Button, Container, TextField } from '@mui/material';
import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';

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

  @media (max-width: ${bp.sm}) {
    background: pink;
    padding: 0;
  }
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

export const StyledTextField = styled(TextField)`
  @media (max-width: ${bp.sm}) {
    border: 1px solid red;
    width: 100px;
    height: 50px;
  }
`;
