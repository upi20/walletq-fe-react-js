import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Header from './vertical/header/Header';
import HorizontalHeader from '../full/horizontal/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from './horizontal/navbar/Navbar';
import ScrollToTop from '../../components/shared/ScrollToTop';
import LoadingBar from '../../LoadingBar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: 'transparent',
}));

const ContentWrapper = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'auto',
}));

const FullLayout = () => {
  const customizer = useSelector((state) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
      <LoadingBar />
      {/* Sidebar */}
      {!customizer.isHorizontal && <Sidebar />}

      {/* Main Content Area */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {/* Header */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}

        {/* Horizontal Navigation */}
        {customizer.isHorizontal && <Navigation />}

        {/* Main Content */}
        <ContentWrapper>
          <Container
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
              maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
              height: '100%',
            }}
          >
            <ScrollToTop>
              <Outlet />
            </ScrollToTop>
          </Container>
        </ContentWrapper>

        {/* Customizer */}
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
