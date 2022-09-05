// import { useContext } from "react";
import { Trans } from "@lingui/macro";
import { Percent } from "@uniswap/sdk-core";
// import styled, { ThemeContext } from "styled-components/macro";
import styled from "styled-components/macro";

import { ThemedText } from "../../theme";
import { RowBetween, RowFixed } from "../Row";
import SettingsTab from "../Settings";

const StyledSwapHeader = styled.div`
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`;

export default function SwapHeader({
  allowedSlippage,
}: {
  allowedSlippage: Percent;
}) {
  // const theme = useContext(ThemeContext);
  return (
    <StyledSwapHeader>
      <RowBetween>
        <RowFixed>
          <ThemedText.Black
            fontWeight={600}
            fontSize={18}
            color='white'
            style={{ marginRight: "8px" }}
          >
            <Trans>Swap</Trans>
          </ThemedText.Black>
        </RowFixed>
        <RowFixed>
          <SettingsTab placeholderSlippage={allowedSlippage} />
        </RowFixed>
      </RowBetween>
    </StyledSwapHeader>
  );
}
