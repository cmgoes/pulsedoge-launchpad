import React, { useRef } from "react";
import { Moon, Sun } from "react-feather";
import { Link } from "react-router-dom";
import { useDarkModeManager } from "state/user/hooks";
import styled, { css } from "styled-components/macro";

import { ReactComponent as MenuIcon } from "../../assets/images/menu.svg";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useModalOpen, useToggleModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { ExternalLink } from "../../theme";

export enum FlyoutAlignment {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const StyledToggleButton = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border: 1px solid #d16b35;
  /* background-color: transparent; */
  margin: 0 0 0 8px;
  padding: 0;
  background-color: ${({ theme }) => theme.bg3};
  /* background-color: transparent; */

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
  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.8;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const MenuFlyout = styled.span<{ flyoutAlignment?: FlyoutAlignment }>`
  min-width: 196px;
  max-height: 350px;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.bg0};
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 3rem;
  z-index: 100;

  ${({ flyoutAlignment = FlyoutAlignment.RIGHT }) =>
    flyoutAlignment === FlyoutAlignment.RIGHT
      ? css`
          right: 0rem;
        `
      : css`
          left: 0rem;
        `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    bottom: unset;
    right: 0;
    left: unset;
  `};
`;

const MenuItem = styled(ExternalLink)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`;

const InternalMenuItem = styled(Link)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;

export default function ToggleTheme() {
  const [darkMode, toggleDarkMode] = useDarkModeManager();

  return (
    <StyledToggleButton onClick={toggleDarkMode}>
      {darkMode ? <Moon size={16} /> : <Sun size={16} />}
    </StyledToggleButton>
  );
}

interface NewMenuProps {
  flyoutAlignment?: FlyoutAlignment;
  ToggleUI?: React.FunctionComponent;
  menuItems: {
    content: any;
    link: string;
    external: boolean;
  }[];
}

const NewMenuFlyout = styled(MenuFlyout)`
  top: 3rem !important;
`;
const NewMenuItem = styled(InternalMenuItem)`
  width: max-content;
  text-decoration: none;
`;

const ExternalMenuItem = styled(MenuItem)`
  width: max-content;
  text-decoration: none;
`;

export const NewMenu = ({
  flyoutAlignment = FlyoutAlignment.RIGHT,
  ToggleUI,
  menuItems,
  ...rest
}: NewMenuProps) => {
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.POOL_OVERVIEW_OPTIONS);
  const toggle = useToggleModal(ApplicationModal.POOL_OVERVIEW_OPTIONS);
  useOnClickOutside(node, open ? toggle : undefined);
  const ToggleElement = ToggleUI || StyledMenuIcon;
  return (
    <StyledMenu ref={node as any} {...rest}>
      <ToggleElement onClick={toggle} />
      {open && (
        <NewMenuFlyout flyoutAlignment={flyoutAlignment}>
          {menuItems.map(({ content, link, external }, i) =>
            external ? (
              <ExternalMenuItem href={link} key={i}>
                {content}
              </ExternalMenuItem>
            ) : (
              <NewMenuItem to={link} key={i}>
                {content}
              </NewMenuItem>
            )
          )}
        </NewMenuFlyout>
      )}
    </StyledMenu>
  );
};
