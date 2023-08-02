import { Card, CardContent, Typography } from '@mui/material';
import { PageContainer, PageHeader, WelcomeContainer } from './Home.styles';

const HomePage = () => {
  return (
    <PageContainer>
      <PageHeader>Job Positions</PageHeader>
      <WelcomeContainer>
        <Card>
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Employee Management App
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '18px',
              }}
            >
              Welcome to the Employee Management App. This app allows you to
              manage your company's employees efficiently.
            </Typography>
          </CardContent>
        </Card>
      </WelcomeContainer>
    </PageContainer>
  );
};

export default HomePage;
