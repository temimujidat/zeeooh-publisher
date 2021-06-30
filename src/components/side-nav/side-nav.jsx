import CloseIcon from '@material-ui/icons/Close';
import {
  StyledDrawer,
  StyledSideDrawer,
  CloseIconContainer,
  SideNavLinkContainer,
  SideNavLink,
  SideNavBtn,
} from './side-nav.styled';

const SideNav = ({ showRightDrawer, closeRightDrawer }) => {
  return (
    <StyledDrawer open={showRightDrawer} anchor="right">
      <StyledSideDrawer>
        <CloseIconContainer>
          <CloseIcon onClick={closeRightDrawer} />
        </CloseIconContainer>
        <SideNavLinkContainer>
          <SideNavLink
            href="https://publisher.zeeooh.com"
            target="_blank"
            rel="noopener"
          >
            publisher
          </SideNavLink>
          <SideNavLink
            href="https://publisher.zeeooh.com"
            target="_blank"
            rel="noopener"
          >
            agency
          </SideNavLink>
          <SideNavLink
            href="https://publisher.zeeooh.com"
            target="_blank"
            rel="noopener"
          >
            brand
          </SideNavLink>
          <SideNavBtn propsty="about-btn">about us</SideNavBtn>
          <SideNavBtn propsty="contact-btn">contact us</SideNavBtn>
        </SideNavLinkContainer>
      </StyledSideDrawer>
    </StyledDrawer>
  );
};

export default SideNav;
