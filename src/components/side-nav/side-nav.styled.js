import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import { HeaderNavBtn } from '../header/header.styled';
// // import { GlobalDropdownLink, GlobalDropdownMenu } from './Global.styled';

const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root {
    width: 100%;
    height: fit-content;
  }
`;
// const GlobalDropdownMenu = styled.div`
//   display: ${(props) => (props.open ? 'block' : 'none')};
//   background-color: red;
//   position: absolute;
//   z-index: 999;
//   min-width: fit-content;
//   width: 50%;
//   border: 1px solid grey;
//   box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
//     0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
//   transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
// `;

// const GlobalDropdownLink = styled.div`
//   width: 100%;
//   text-align: center;
// `;
const StyledSideDrawer = styled.div`
  color: #fff;
  padding: 0 0.89rem;
`;

const CloseIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: black;
  /* border: 1px solid blue; */
  padding-top: 0.89rem;
  margin-bottom: 0.84rem;

  & > .MuiSvgIcon-root {
    font-size: 2.56rem;
    cursor: pointer;
  }
`;

const SideNavLinkContainer = styled.div`
  /* border: 1px solid green; */
  padding-left: 1rem;
  margin-top: 1.43rem;
`;

const SideNavLink = styled(Link)`
  display: block;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 24px;
  color: #0056b3;
  margin-bottom: 2.67rem;
  text-transform: capitalize;
  &:hover {
    text-decoration: none;
  }
`;

const SideNavBtn = styled(HeaderNavBtn)`
  display: block;
  margin-bottom: 2rem;
  font-size: 1.23rem;
`;

// const SidenavLoginBtn = styled(Button)`
//   color: #fff;
//   text-transform: capitalize;
//   margin: 1rem 0;
//   /* border: 1px solid blue; */
// `;
export {
  StyledDrawer,
  StyledSideDrawer,
  CloseIconContainer,
  SideNavLinkContainer,
  SideNavLink,
  SideNavBtn,
};
