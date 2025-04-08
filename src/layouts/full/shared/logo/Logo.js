import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import LogoDark from 'src/assets/logo-landscape-dark.png';
import LogoLight from 'src/assets/logo-landscape-white.png';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
    padding: '16px'
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/" style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {customizer.activeMode === 'dark' ? (
          <img src={LogoLight} alt="Logo WalletQ" style={{ height: '100%' }} />
        ) : (
          <img src={LogoDark} alt="Logo WalletQ" style={{ height: '100%' }} />
        )}
      </LinkStyled>
    );
  }
  return (
    <LinkStyled to="/" style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {customizer.activeMode === 'dark' ? (
        <img src={LogoLight} alt="Logo WalletQ" style={{ height: '100%' }} />
      ) : (
        <img src={LogoDark} alt="Logo WalletQ" style={{ height: '100%' }} />
      )}
    </LinkStyled>
  );
};

export default Logo;
