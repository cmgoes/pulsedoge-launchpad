import React, { useState, useRef } from "react";
import { Menu } from "react-feather";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import Web3Status from "components/Web3Status";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const StyledMenuIcon = styled(Menu)`
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #d16b35;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`;

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const MenuFlyout = styled.span`
  min-width: 200px;
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: -2rem;
  z-index: 100;
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const activeClassName = "ACTIVE";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  position: relative;
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 0.9rem;
  font-family: SF-Pro-Text-Medium;
  width: fit-content;
  font-weight: 500;
  padding: 12px 0;
  /* &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.text2};
  } */
`;

const ActiveStyledNavLink = styled(StyledNavLink)`
  font-weight: 600;
  color: ${({ theme }) => theme.text2};
`

const Web3Element = styled.div`
  margin-top: 12px;
`;

export default function MobileMenu() {
  const { pathname } = useLocation();
  const node = useRef<HTMLDivElement>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  useOnClickOutside(
    node,
    openModal ? () => setOpenModal(!setOpenModal) : undefined
  );

  return (
    <StyledMenu ref={node as any}>
      <StyledMenuButton
        onClick={() => setOpenModal(!openModal)}
        id="open-mobile-menu-dialog-button"
      >
        <StyledMenuIcon />
      </StyledMenuButton>
      {openModal && (
        <MenuFlyout>
          <MobileLinks>
            {pathname === "/" ? (
              <ActiveStyledNavLink to={"/"}>Home</ActiveStyledNavLink>
            ) : (
              <StyledNavLink to={"/"}>
              Home
              </StyledNavLink>
            )}
            {pathname === "/staking" ? (
              <ActiveStyledNavLink to={"/staking"}>Staking</ActiveStyledNavLink>
            ) : (
              <StyledNavLink to={"/staking"}>Staking</StyledNavLink>
            )}
            {pathname === "/nft" ? (
              <ActiveStyledNavLink to={"/nft"}>NFT</ActiveStyledNavLink>
            ) : (
              <StyledNavLink to={"/nft"}>
              NFT
              </StyledNavLink>
            )}
            {pathname === "/memebank" ? (
              <ActiveStyledNavLink to={"/memebank"}>Meme Bank</ActiveStyledNavLink>
            ) : (
              <StyledNavLink to={"/memebank"}>
              Meme Bank
              </StyledNavLink>
            )}
          </MobileLinks>
          <Web3Element>
            <Web3Status />
          </Web3Element>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
