import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import PulseDogeLogo from "assets/images/Pulsedoge-Logo.png";
import Row, { RowFixed } from "../Row";
import Web3Status from "../Web3Status";
import MobileMenu from "./MobileMenu";
import ToggleTheme from "components/Menu";

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLinks = styled(Row)`
  justify-content: center;
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: ${({ theme, active }) =>
    !active ? theme.buttonbg1 : theme.buttonbg1}; */
  background-color: #ff7f37;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const UniIcon = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const PriceBox = styled.div`
  border: 1px solid #595959;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
`;

const PriceIcon = styled.div`
  display: flex;
  align-items: center;
`;

const PriceText = styled.span`
  font-size: 12px;
  padding-left: 6px;
  color: white;
`;

const activeClassName = "ACTIVE";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  position: relative;
  align-items: left;
  /* border-radius: 3rem; */
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #ddd;
  font-size: 0.9rem;
  font-family: SF-Pro-Text-Medium;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  :hover,
  :focus {
    color: #bbb;
  }

  ::before {
    position: absolute;
    top: -4px;
    right: 0;
    width: 6px;
    height: 6px;
    background: #58da9c;
    border-radius: 50%;
  }

  &.${activeClassName} {
    /* border-radius: 12px; */
    font-weight: 600;
    color: #fff;
    border-bottom: 1px solid white;

    ::before {
      content: "";
    }
  }
`;
const MobileMenuContent = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

export default function Header() {
  return (
    <HeaderFrame>
      <RowFixed>
        <Title href=".">
          <UniIcon>
            {/* <img width={'120px'} src={isDark ? LogoDark : Logo} alt="logo" /> */}
            <img width={"36px"} src={PulseDogeLogo} alt="logo" />
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={"/swap"}>
            Home
          </StyledNavLink>
          <StyledNavLink id={`swap-nav-link`} to={"/staking"}>
            Staking
          </StyledNavLink>
          <StyledNavLink id={`swap-nav-link`} to={"/nft"}>
            NFT
          </StyledNavLink>
          <StyledNavLink id={`swap-nav-link`} to={"/memebank"}>
            Meme Bank
          </StyledNavLink>
        </HeaderLinks>
      </RowFixed>
      <HeaderControls>
        <HeaderElement>
          <PriceBox>
            <PriceIcon>
              <img width={"24px"} src={PulseDogeLogo} alt="profile" />
            </PriceIcon>
            <PriceText>$0.009</PriceText>
          </PriceBox>
          <AccountElement active={!true}>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <MobileMenuContent>
          <MobileMenu />
        </MobileMenuContent>
        <HeaderElementWrap>
          <ToggleTheme />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  );
}
