import Loader from "../../components/Loader";
import ApeModeQueryParamReader from "hooks/useApeModeQueryParamReader";
import { lazy, Suspense, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import GoogleAnalyticsReporter from "../../components/analytics/GoogleAnalyticsReporter";
import ErrorBoundary from "../../components/ErrorBoundary";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/Progressbar";
import Web3ReactManager from "../../components/Web3ReactManager";
import DarkModeQueryParamReader from "../../theme/DarkModeQueryParamReader";
import AddLiquidity from "../AddLiquidity";
import { RedirectDuplicateTokenIds } from "../AddLiquidity/redirects";
import { RedirectDuplicateTokenIdsV2 } from "../AddLiquidityV2/redirects";
import Earn from "../Earn";
import Manage from "../Earn/Manage";
import MigrateV2 from "../MigrateV2";
import MigrateV2Pair from "../MigrateV2/MigrateV2Pair";
import Pool from "../Pool";
import { PositionPage } from "../Pool/PositionPage";
import PoolV2 from "../Pool/v2";
import PoolFinder from "../PoolFinder";
import RemoveLiquidity from "../RemoveLiquidity";
import RemoveLiquidityV3 from "../RemoveLiquidity/V3";
import Swap from "../Swap";
import {
  OpenClaimAddressModalAndRedirectToSwap,
  RedirectPathToSwapOnly,
  RedirectToSwap,
} from "../Swap/redirects";
import BackgroundLand from "../../assets/images/bodybackbg.jpg";
import ProfileIco from "../../assets/images/PulseDoge-logo1.png";
import CopyIco from "../../assets/images/Vector.png";
import StakingImage1 from "../../assets/images/PulseSpace1.png";
import StakingImage2 from "../../assets/images/PulseSpace2.png";

const Vote = lazy(() => import("../Vote"));

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  background: linear-gradient(
      180deg,
      #0e131b 12.58%,
      rgba(14, 19, 27, 0.45) 47.15%,
      rgba(14, 19, 27, 0.85) 81.22%,
      #0e131b 99.99%
    ),
    url(${BackgroundLand});
  
  /* opacity: 0.8; */
  /* background-image: url(${BackgroundLand}); */
  background-size: cover;
  background-position: center center;
  /* background-color: rgba(0, 0, 0, 0.8);   */
  /* background-color: #0e131b; */
  @media (min-width: 1200px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (min-width: 1400px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @media (min-width: 1600px) {
    padding-left: 6rem;
    padding-right: 6rem;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  padding-top: 2rem;
  flex-direction: column-reverse;
  /* align-items: center; */
  justify-content: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  @media (min-width: 768px) {
    justify-content: space-between;
    flex-direction: row;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 3rem;
  }

  @media (min-width: 1200px) {
    padding-top: 4rem;
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (min-width: 1400px) {
    padding-top: 5rem;
    padding-left: 64px;
    padding-right: 64px;
  }

  z-index: 1;
`;

const TechContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;
const HeadTitle = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 700;
  font-family: SF-Pro-Display-Medium;
  padding-bottom: 10px;
  @media (min-width: 1200px) {
    font-size: 32px;
  }
`;

const HeadText = styled.div`
  color: white;
  opacity: 0.8;
  font-weight: 400;
  font-size: 16px;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;
  line-height: 28px;
  @media (min-width: 1200px) {
    font-size: 18px;
    line-height: 32px;
  }
`;

const ListCont = styled.ul`
  margin: 16px 0;
  list-style-type: disc;
  font-size: 16px;
  color: white;
  padding-left: 20px;
  line-height: 28px;
  @media (min-width: 1200px) {
    font-size: 18px;
    line-height: 32px;
  }
`;

const ListedText = styled.li`
  font-weight: 400;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;
`;

const AddressBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  border-radius: 8px;
  backdrop-filter: blur(20px);
  max-width: 280px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  @media (min-width: 360px) {
    max-width: 300px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 16px;
    max-width: 340px;
  }

  @media (min-width: 980px) {
    max-width: 420px;
  }
`;

const AddressText = styled.div`
  border: none;
  color: white;
  font-weight: 400;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;
  font-size: 9px;
  line-height: 14px;

  @media (min-width: 360px) {
    font-size: 10px;
  }

  @media (min-width: 768px) {
    font-size: 12px;
  }

  @media (min-width: 980px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const CopyButton = styled.div`
  position: relative;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;

  :hover {
    background: rgba(255, 255, 255, 0.13);
  }

  img {
    width: 8px;
    @media (min-width: 768px) {
      width: 10px;
    }
  }

  @media (min-width: 768px) {
    padding: 6px 8px;
  }
`;

const CopiedText = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg2};
  padding: 4px 8px;
  border-radius: 4px;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;  
`;

const ChartButton = styled.div`
  margin-top: 16px;
  padding: 5px 10px;
  width: 120px;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  line-height: 16px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 19px;
    padding: 7px 14px;
  }
`;

const StateTitle = styled.div`
  margin: 24px auto;
  font-size: 28px;
  font-family: SF-Pro-Display-Medium;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  @media (min-width: 1200px) {
    font-size: 32px;
    margin-top: 36px;
    margin-bottom: 32px;
  }
`;

const StateBox = styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
  width: 90%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  @media (min-width: 768px) {
    width: 720px;
    padding: 16px 28px;
  }
  @media (min-width: 1200px) {
    width: 840px;
    padding: 20px 32px;
  }
`;

const StateCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StateCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 32%;
  height: 132px;
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 8px;
    height: 100px;
  }
`;

const ProfileCard = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 32%;
  height: 132px;
  @media (max-width: 600px) {
    width: 100%;
    height: 100px;
  }
`;

const Statetext = styled.div`
  font-size: 22px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  color: #f3f3f3;
  font-weight: 700;
`;

const PriceTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;
  @media (max-width: 600px) {
    padding-left: 24px;
  }
`;

const PriceTitle = styled.div`
  font-size: 18px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  color: #f9f9ff;
  font-weight: 500;
  margin-bottom: 8px;
`;

const PriceText = styled.div`
  font-size: 18px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  font-weight: 270;
  color: #f9f9ff;
`;

const StateCardTitle = styled.div`
  position: absolute;
  bottom: 5px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  left: 16px;
  color: white;
  opacity: 30%;
  font-size: 12px;  
`;

const ProfileLogo = styled.div`
  padding: 8px;
  width: 52px;
`;

const SwapBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  min-height: 400px;
  @media (min-width: 768px) {
    align-items: end;
    padding-left: 20px;
    min-height: 460px;
  }
`;

const StakingBox = styled.div`
  display: flex;
  padding: 32px 24px;
  flex-direction: column;
  background: #0e131b;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 64px 32px;
  }

  @media (min-width: 1200px) {
    padding: 80px 128px;
  }

  @media (min-width: 1400px) {
    padding: 120px 160px;
  }
`;

const StakingCard = styled.div`
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 20px;
  z-index: 1;
  @media (min-width: 768px) {
    width: 47.5%;
    padding: 12px;
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  :first-child::before {
    background: #1774ff;
    opacity: 0.3;
    filter: blur(566.167px);
  }

  :last-child::before {
    background: #ff7f37;
    opacity: 0.1;
    filter: blur(200px);
  }
`;

const StakingImageContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background: #1774FF;
  opacity: 0.3;
  filter: blur(566.167px); */
  img {
    width: 300px;
    z-index: 10;
    @media (min-width: 768px) {
      width: 450px;
    }
  }
`;

const StakingTitle = styled.div`
  padding: 5px 0;
  font-weight: 700;
  font-size: 24px;
  font-family: SF-Pro-Display-Medium;
  letter-spacing: 0.1rem;
  line-height: 24px;
  color: white;
`;

const StakingText = styled.div`
  font-weight: 400;
  padding: 5px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 16px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  line-height: 28px;
  color: #ffffff;
  opacity: 0.8;
`;

const StakingButton = styled.div`
  display: flex;
`;

const StakingLearnMoreButton = styled.div`
  cursor: pointer;
  margin: 24px 12px 24px 0;
  background: tranparent;
  width: 130px;
  border-radius: 8px;
  font-weight: 700;
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;
  line-height: 19px;
  border: 1px solid #ff7f37;
  color: #ff7f37;
`;

const StakingLaunchDappButton = styled.div`
  cursor: pointer;
  margin: 24px 0;
  background: #ff7f37;
  width: 142px;
  border-radius: 8px;
  font-weight: 700;
  padding: 10px 20px;
  font-size: 14px;
  font-family: SF-Pro-Display-Thin;
  text-align: center;
  letter-spacing: 0.08rem;
  line-height: 19px;
  color: #ffffff;
`;
const Marginer = styled.div`
  @media (min-width: 768px) {
    margin-top: 5rem;
  }
`;

export default function Home() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const showCopiedText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      
      <AppWrapper> 
        <BodyWrapper>          
          <TechContainer>
            <HeadTitle>In it for the Tech</HeadTitle>
            <HeadText>
              Pulsedoge is the first memecoin fully backed by the world&apos;s fastest Rolex.
              <br />
              Perhaps, there&apos;s more than meets the eye...
              <br />              
            </HeadText>
            <ListCont>
              <ListedText>
                World&apos;s first deflationary staking
              </ListedText>
              <ListedText>
                Holders receive Pulsechain airdrop
              </ListedText>
              <ListedText>1B max supply, shrinking</ListedText>
              <ListedText>Also Jpegs</ListedText>
            </ListCont>
            <AddressBox>
              <AddressText>
                0xd4d55b811d9ede2adce61a98d67d7f91bffce495
              </AddressText>
              <CopyButton>
                <CopyToClipboard
                  text={"0xd4d55b811d9ede2adce61a98d67d7f91bffce495"}
                  onCopy={showCopiedText}
                >
                  <img src={CopyIco} alt="copy" />
                </CopyToClipboard>
                {isCopied && <CopiedText>Copied</CopiedText>}
              </CopyButton>
            </AddressBox>
            <ChartButton>Price Chart</ChartButton>
          </TechContainer>
          <Suspense fallback={<Loader />}>
            <SwapBox>
              <Web3ReactManager>
                <Switch>
                  <Route strict path="/vote" component={Vote} />
                  <Route exact strict path="/create-proposal">
                    <Redirect to="/vote/create-proposal" />
                  </Route>
                  <Route
                    exact
                    strict
                    path="/claim"
                    component={OpenClaimAddressModalAndRedirectToSwap}
                  />
                  <Route exact strict path="/uni" component={Earn} />
                  <Route
                    exact
                    strict
                    path="/uni/:currencyIdA/:currencyIdB"
                    component={Manage}
                  />

                  <Route
                    exact
                    strict
                    path="/send"
                    component={RedirectPathToSwapOnly}
                  />
                  <Route
                    exact
                    strict
                    path="/swap/:outputCurrency"
                    component={RedirectToSwap}
                  />
                  <Route exact strict path="/" component={Swap} />

                  <Route
                    exact
                    strict
                    path="/pool/v2/find"
                    component={PoolFinder}
                  />
                  <Route exact strict path="/pool/v2" component={PoolV2} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route
                    exact
                    strict
                    path="/pool/:tokenId"
                    component={PositionPage}
                  />

                  <Route
                    exact
                    strict
                    path="/add/v2/:currencyIdA?/:currencyIdB?"
                    component={RedirectDuplicateTokenIdsV2}
                  />
                  <Route
                    exact
                    strict
                    path="/add/:currencyIdA?/:currencyIdB?/:feeAmount?"
                    component={RedirectDuplicateTokenIds}
                  />

                  <Route
                    exact
                    strict
                    path="/increase/:currencyIdA?/:currencyIdB?/:feeAmount?/:tokenId?"
                    component={AddLiquidity}
                  />

                  <Route
                    exact
                    strict
                    path="/remove/v2/:currencyIdA/:currencyIdB"
                    component={RemoveLiquidity}
                  />
                  <Route
                    exact
                    strict
                    path="/remove/:tokenId"
                    component={RemoveLiquidityV3}
                  />

                  <Route
                    exact
                    strict
                    path="/migrate/v2"
                    component={MigrateV2}
                  />
                  <Route
                    exact
                    strict
                    path="/migrate/v2/:address"
                    component={MigrateV2Pair}
                  />                  

                  {/* <Route component={RedirectPathToSwapOnly} /> */}
                </Switch>
              </Web3ReactManager>
            </SwapBox>
          </Suspense>
          
          <Marginer />
        </BodyWrapper>
        <StateTitle>Stats</StateTitle>
        <StateBox>
          <ProgressBar completed={70} />
          <StateCardContainer>
            <ProfileCard>
              <ProfileLogo>
                <img src={ProfileIco} width="100%" alt="profile" />
              </ProfileLogo>
              <PriceTextContainer>
                <PriceTitle>PulseDoge</PriceTitle>
                <PriceText>$0,007500</PriceText>
              </PriceTextContainer>
              <StateCardTitle>Token Price</StateCardTitle>
            </ProfileCard>
            <StateCard>
              <Statetext>255,045.00</Statetext>
              <StateCardTitle>Remaining tokens</StateCardTitle>
            </StateCard>
            <StateCard>
              <Statetext>1,785</Statetext>
              <StateCardTitle>NFT’s Left</StateCardTitle>
            </StateCard>
          </StateCardContainer>
        </StateBox>               
      </AppWrapper>

      <StakingBox>
        <StakingCard>
          <StakingImageContainer>
            <img src={StakingImage1} alt="Staking" />
          </StakingImageContainer>
          <StakingTitle>What is Echo Staking?</StakingTitle>
          <StakingText>
            Stake your Pulsedoge and earn up to 36,9% yield - 
            the rewards come from existing supply so it is never inflationary!
          </StakingText>
          <StakingButton>
            <StakingLearnMoreButton>Learn more</StakingLearnMoreButton>
            <StakingLaunchDappButton>Launch dApp</StakingLaunchDappButton>
          </StakingButton>
        </StakingCard>
        <StakingCard>
          <StakingImageContainer>
            <img src={StakingImage2} alt="Staking" />
          </StakingImageContainer>
          <StakingTitle>What is Echo Staking?</StakingTitle>
          <StakingText>
            Get one of the 1,476 unique Pulsedoge character NFTs by burning Pulsedoge tokens!
            That&apos;s right, we found a way to ACTUALLY create a pumpamental for jpegs
          </StakingText>
          <StakingButton>
            <StakingLearnMoreButton>Learn more</StakingLearnMoreButton>
            <StakingLaunchDappButton>Launch dApp</StakingLaunchDappButton>
          </StakingButton>
        </StakingCard>
      </StakingBox>
      <Footer />
    </ErrorBoundary>
  );
}
