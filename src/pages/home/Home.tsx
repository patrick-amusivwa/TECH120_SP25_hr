import {
  CardBodyText,
  CardHeader,
  PageContainer,
  WelcomeCard,
  WelcomeCardContent,
  WelcomeContainer,
} from './Home.styles';

const HomePage = () => {
  return (
    <PageContainer>
      <WelcomeContainer>
        <WelcomeCard>
          <WelcomeCardContent>
            <CardHeader>Employee Management App</CardHeader>
            <CardBodyText>
              Welcome to the Employee Management App. This app allows you to
              manage your company's employees efficiently.
            </CardBodyText>
          </WelcomeCardContent>
        </WelcomeCard>
      </WelcomeContainer>

      {/* Footer with names and roles */}
      <footer style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Ali Alajmi (77464) - Project Manager</p>
        <p>Salma Alazmi (10093132) - Frontend Developer</p>
        <p>Athoob Almutar (10088045) - UI/UX Designer</p>
      </footer>
    </PageContainer>
  );
};

export default HomePage;
