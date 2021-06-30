import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

const headerNavBtnStyle = {
  'about-btn': {
    color: 'rgba(254, 65, 39, 1)',
    'background-color': 'rgba(254, 65, 39, 0.15)',
  },
  'contact-btn': { color: '#fff', 'background-color': 'rgba(254, 65, 39, 1)' },
};

const StyledHeaderBar = styled(AppBar)`
  background-color: #fff;
  padding-left: 0.35rem;
  padding-right: 0.35rem;
  z-index: 1;
  @media (min-width: 801px) {
    padding-left: 1.39rem;
    padding-right: 1.34rem;
  }
  @media (min-width: 1300px) {
    padding-left: 3.59rem;
    padding-right: 3.19rem;
  }
`;

const StyledHeaderToolBar = styled(Toolbar)`
  justify-content: space-between;
  height: 84px;
`;

const HeaderLogoContainer = styled(RouterLink)``;

const HeaderNavigationContainer = styled.div`
  display: none;
  @media (min-width: 801px) {
    color: black;
    /* border: 1px solid blue; */
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    flex-basis: 70%;
  }
  @media (min-width: 901px) {
    flex-basis: 65%;
  }
  @media (min-width: 1300px) {
    flex-basis: 53%;
  }
`;

const HeaderNavigationHambugerContainer = styled.div`
  & .MuiSvgIcon-root {
    font-size: 2.5rem;
  }
  @media (min-width: 801px) {
    display: none;
  }
`;

const HeaderNavLinkContainer = styled.div`
  /* border: 1px solid yellow; */
  flex-basis: 47%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  text-align: center;
  /* margin-right: 9rem; */

  & > a {
    color: black;
    @media (min-width: 901px) {
      flex-basis: 50%;
    }
    @media (min-width: 1300px) {
      flex-basis: 60%;
      margin-left: 3.2rem;
    }
  }
  & > a:first-child {
    color: #0056b3;
  }
  & > a:hover {
    color: #0056b3;
  }
`;
const HeaderNavBtnContainer = styled.div`
  /* border: 1px solid green; */
  flex-basis: 49%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 901px) {
    flex-basis: 48%;
  }
  @media (min-width: 1300px) {
    flex-basis: 40%;
  }
`;

const HeaderNavLink = styled(Link)`
  display: inline-block;
  text-transform: capitalize;
  &:hover {
    text-decoration: none;
  }
`;

const HeaderNavBtn = styled(Button)`
  text-transform: capitalize;
  border-radius: 10px;
  padding: 0.7rem 1.36rem;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  ${(props) => (props.propsty ? headerNavBtnStyle[props.propsty] : '')}

  &:hover {
    background-color: ${(props) =>
      props.propsty
        ? headerNavBtnStyle[props.propsty]['background-color']
        : ''};
  }
`;

export {
  StyledHeaderBar,
  StyledHeaderToolBar,
  HeaderLogoContainer,
  HeaderNavigationContainer,
  HeaderNavLinkContainer,
  HeaderNavLink,
  HeaderNavBtnContainer,
  HeaderNavBtn,
  HeaderNavigationHambugerContainer,
};
