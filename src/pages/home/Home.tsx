import {
  CardBodyText,
  CardHeader,
  PageContainer,
  WelcomeCard,
  WelcomeContainer,
} from './Home.styles';

const HomePage = () => {
  return (
    <PageContainer>
      <WelcomeContainer>
        <WelcomeCard>
          <div>
            <CardHeader>Employee Management App</CardHeader>
            <CardBodyText>
              Welcome to the Employee Management App. This app allows you to
              manage your company's employees efficiently.
            </CardBodyText>
          </div>
        </WelcomeCard>
      </WelcomeContainer>
    </PageContainer>
  );
};

export default HomePage;
