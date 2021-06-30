import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { verticalModalContent } from '../../redux/vertical-modal/verticalModalReducer';
import './header.css';
import { CgProfile } from 'react-icons/cg';
import { resetDashboard } from '../../redux/dashboard/dashboardReducer';
import { useUserData } from '../../hooks/user-hook';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import SideNav from '../side-nav/side-nav';
import {
  StyledHeaderBar,
  StyledHeaderToolBar,
  HeaderLogoContainer,
  HeaderNavigationContainer,
  HeaderNavLinkContainer,
  HeaderNavLink,
  HeaderNavBtnContainer,
  HeaderNavBtn,
  HeaderNavigationHambugerContainer,
} from './header.styled';

const Header = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const userState = useSelector((state) => state.user);
  const { logUserOut } = useUserData();
  return userState ? (
    <header>
      <nav className="navbar fixed-top navbar-expand-sm  navbar-light header-nav">
        <Link className="navbar-brand" to="/">
          <img
            src={
              userState.company_logo
                ? userState.company_logo
                : 'https://res.cloudinary.com/adesanza/image/upload/v1624361933/zabuni/Group_bnbco9.svg'
            }
            alt="OE"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-list-4"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-list-4">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle dropping"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {`${userState.first_name} ${userState.last_name}`}{' '}
                <CgProfile className="cgprofile" />
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <p
                  className="dropdown-item user-options"
                  onClick={() => {
                    dispatch(resetDashboard());
                    history.push('/management');
                  }}
                >
                  Dashboard
                </p>
                <p
                  className="dropdown-item user-options"
                  onClick={() => {
                    dispatch(verticalModalContent('edit-user-profile'));
                  }}
                >
                  Edit Profile
                </p>
                <Link className="dropdown-item" to="/">
                  Settings
                </Link>
                <p
                  className="dropdown-item user-options"
                  onClick={() => {
                    logUserOut();
                    history.push('/');
                    dispatch(resetDashboard());
                  }}
                >
                  Log Out
                </p>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  ) : (
    <StyledHeaderBar>
      <StyledHeaderToolBar>
        <HeaderLogoContainer to="/">
          <img
            src="https://res.cloudinary.com/adesanza/image/upload/v1624361933/zabuni/Group_bnbco9.svg"
            alt="company logo"
          />
        </HeaderLogoContainer>
        <HeaderNavigationContainer>
          <HeaderNavLinkContainer>
            <HeaderNavLink href="https://publisher.zeeooh.com" rel="noopener">
              publisher
            </HeaderNavLink>
            <HeaderNavLink href="https://publisher.zeeooh.com" rel="noopener">
              agency
            </HeaderNavLink>
            <HeaderNavLink href="https://publisher.zeeooh.com" rel="noopener">
              brand
            </HeaderNavLink>
          </HeaderNavLinkContainer>
          <HeaderNavBtnContainer>
            <HeaderNavBtn propsty="about-btn">about us</HeaderNavBtn>
            <HeaderNavBtn propsty="contact-btn">contact us</HeaderNavBtn>
          </HeaderNavBtnContainer>
        </HeaderNavigationContainer>
        <HeaderNavigationHambugerContainer>
          <IconButton onClick={() => setShowRightDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </HeaderNavigationHambugerContainer>
        <SideNav
          showRightDrawer={showRightDrawer}
          closeRightDrawer={() => setShowRightDrawer(false)}
        />
      </StyledHeaderToolBar>
    </StyledHeaderBar>
  );
};

export default Header;
