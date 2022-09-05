import React from 'react'
import styled from 'styled-components/macro'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  /* background: ${({ theme }) => theme.bg1}; */
  background: rgba(14, 19, 27, 0.4);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.6rem;
  @media (min-width: 360px) {
    border-radius: 30px;
    padding: 1rem;
  }
`


/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  return <BodyWrapper {...rest}>{children}</BodyWrapper>
}
