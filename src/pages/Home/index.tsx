import Loader from "../../components/Loader";
import ApeModeQueryParamReader from "hooks/useApeModeQueryParamReader";
import { lazy, Suspense, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import GoogleAnalyticsReporter from "../../components/analytics/GoogleAnalyticsReporter";
import ErrorBoundary from "../../components/ErrorBoundary";
import Footer from "../../components/Footer";
// import ProgressBar from "../../components/Progressbar";
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
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import BEP20_ABI from 'abis/bscpulse.json'

import PulseDogeLogo from "assets/images/Pulsedoge-Logo.webp";
import EthLogo from "assets/images/ethsym.webp";
import BSCLogo from "assets/images/bscsym.webp";

import {
  OpenClaimAddressModalAndRedirectToSwap,
  RedirectPathToSwapOnly,
  RedirectToSwap,
} from "../Swap/redirects";
import BackgroundLand from "../../assets/images/bodybackbg.webp";
import CopyIco from "../../assets/images/Vector.webp";
import StakingImage1 from "../../assets/images/SpaceSuite.webp";
import StakingImage2 from "../../assets/images/dhalsim.webp";

const Vote = lazy(() => import("../Vote"));

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  background: linear-gradient(
      180deg,
      rgba(14, 19, 27, 0.99) 2.58%,
      rgba(14, 19, 27, 0.1) 47.15%,
      rgba(14, 19, 27, 0.75) 85.22%,
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
`;

const TechContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 2rem 1.5rem;
  background-color: rgba(14,19,27,0.5);
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.1);
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;
const HeadTitle = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 700;
  font-family: SF-Pro-Display-Medium;
  padding-bottom: 10px;
  @media (min-width: 1200px) {
    font-size: 48px;
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
  padding-left: 8px;
  padding-top: 5px;
  margin-bottom: 0.5rem;
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
    max-width: 480px;
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 52px;
`;

const PriceIcon = styled.div`
  display: flex;
  align-items: center;
  :first-child {
    padding-right: 0.06rem;
  }
`;

// const AddressTitle = styled.div`
//   font-weight: 400;
//   font-family: SF-Pro-Display-Medium;
//   letter-spacing: 0.08rem;
//   color: white;
//   font-size: 18px;
//   margin-bottom: 16px;
// `

const AddressText = styled.div`
  border: none;
  color: white;
  font-weight: 400;
  font-family: SF-Pro-Display-Thin;
  letter-spacing: 0.08rem;
  padding-left: 0.3rem;
  font-size: 12px;
  line-height: 14px;

  @media (min-width: 360px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
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

// const ChartButton = styled.a`
//   margin-top: 16px;
//   text-decoration: none;
//   padding: 7px 14px;
//   width: 120px;
//   text-align: center;
//   color: white;
//   font-size: 14px;
//   font-family: SF-Pro-Display-Light;
//   letter-spacing: 0.08rem;
//   line-height: 16px;
//   font-weight: 700;
//   background: rgba(255, 255, 255, 0.05);
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(10px);
//   border-radius: 8px;
//   @media (min-width: 768px) {
//     font-size: 16px;
//     line-height: 19px;
//     padding: 8px 14px;
//   }
// `;

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
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const StateCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;    
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 32%;
  height: 132px;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 8px;
    height: 108px;
  }
`;

const StateTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  flex-grow: 1;
  align-items: center;
`;

const Statetext = styled.div`
  padding: 14px 8px;
  text-align: center;
  font-size: 18px;
  line-height: 1.4;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  color: #f3f3f3;
  font-weight: 300;
  @media (max-width: 767px) {
    padding: 14px 8px;
    font-size: 16px;
  }
`;

const StateCardTitle = styled.a`
  position: absolute;
  text-decoration: none;
  bottom: 5px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  left: 16px;
  color: #FF7F37;
  /* opacity: 30%; */
  font-size: 12px;  
`;

const StateCardTitleDisabled = styled.a`
  position: absolute;
  text-decoration: none;
  bottom: 5px;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
  left: 16px;
  color: white;
  opacity: 30%;
  font-size: 12px;  
`;

const CardHeader = styled.div`
  font-size: 12px;
  padding: 8px;
  color: white;
  font-family: SF-Pro-Display-Light;
  letter-spacing: 0.08rem;
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
  z-index: 0;
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

const CardLink = styled.a`
  text-decoration: none;
`;

const StakingImageContainer = styled.div`
  display: flex;
  justify-content: center;  
  img {
    width: 280px;
    z-index: 10;
    @media (min-width: 768px) {
      width: 320px;
    }
    @media (min-width: 1024px) {
      width: 360px;
    }
    @media (min-width: 1400px) {
      width: 400px;
    }
  }
`;

const StakingTitle = styled.div`
  padding: 16px 0;
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

const StakingLearnMoreButton = styled.a`
  cursor: pointer;
  display: block;
  margin: 24px 12px 24px 0;
  background: tranparent;
  width: 160px;
  text-decoration: none;
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

const Marginer = styled.div`
  @media (min-width: 768px) {
    margin-top: 5rem;
  }
`;

export default function Home() {
  const [isEthCopied, setIsEthCopied] = useState<boolean>(false);
  const [isBscCopied, setIsBscCopied] = useState<boolean>(false);
  const { authenticate } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [supply, setSupply] = useState(0);

  const getTotalSupply = async () => {
    await authenticate();

    const options1: any = {
      chain: "bsc",
      address: '0xd4d55b811d9ede2adce61a98d67d7f91bffce495', // pulse
      function_name: 'balanceOf',
      abi: BEP20_ABI,
      params: { account: '0xd4d55b811d9ede2adce61a98d67d7f91bffce495' },
    };
    const contractbalance = await Web3Api.native.runContractFunction(options1);    

    const options2: any = {
      chain: "bsc",
      address: '0xd4d55b811d9ede2adce61a98d67d7f91bffce495', // pulse
      function_name: 'balanceOf',
      abi: BEP20_ABI,
      params: { account: '0x000000000000000000000000000000000000dead' },
    };
    const burnbalance = await Web3Api.native.runContractFunction(options2);    

    const options: any = {
      chain: "bsc",
      address: '0xd4d55b811d9ede2adce61a98d67d7f91bffce495', // pulse
      function_name: 'totalSupply',
      abi: BEP20_ABI,
    };
    const maxSupply = await Web3Api.native.runContractFunction(options);    
    setSupply(Math.floor((Number(maxSupply) - Number(contractbalance) - Number(burnbalance)) / 10**24));  
  };

  useEffect(() => {
    getTotalSupply();
    // eslint-disable-next-line
  }, []);

  const showEthCopiedText = () => {
    setIsEthCopied(true);
    setTimeout(() => {
      setIsEthCopied(false);
    }, 2000);
  };

  const showBscCopiedText = () => {
    setIsBscCopied(true);
    setTimeout(() => {
      setIsBscCopied(false);
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
            {/* <AddressTitle>BSC address</AddressTitle> */}
            <AddressBox>
              <AddressWrapper>
                <PriceBox>
                  <PriceIcon>
                    <img width={"28px"} src={PulseDogeLogo} alt="profile" />
                  </PriceIcon>
                  <PriceIcon>
                    <img width={"20px"} height={"28px"} src={EthLogo} alt="profile" />
                  </PriceIcon>
                </PriceBox>
                <AddressText>
                  {window.innerWidth > 992? '0xd4d55b811d9ede2adce61a98d67d7f91bffce495' : '0xd4d55b811d9ede2adc...e495'}
                </AddressText>
              </AddressWrapper>
              <CopyButton>
                <CopyToClipboard
                  text={"0xd4d55b811d9ede2adce61a98d67d7f91bffce495"}
                  onCopy={showEthCopiedText}
                >
                  <img src={CopyIco} alt="copy" />
                </CopyToClipboard>
                {isEthCopied && <CopiedText>Copied</CopiedText>}
              </CopyButton>
            </AddressBox>
            <AddressBox>
              <AddressWrapper>
                <PriceBox>
                  <PriceIcon>
                    <img width={"28px"} src={PulseDogeLogo} alt="profile" />
                  </PriceIcon>
                  <PriceIcon>
                    <img width={"24px"} src={BSCLogo} alt="profile" />
                  </PriceIcon>
                </PriceBox>
                <AddressText>
                  {window.innerWidth > 992? '0xd4d55b811d9ede2adce61a98d67d7f91bffce495' : '0xd4d55b811d9ede2adc...e495'}
                </AddressText>
              </AddressWrapper>
              <CopyButton>
                <CopyToClipboard
                  text={"0xd4d55b811d9ede2adce61a98d67d7f91bffce495"}
                  onCopy={showBscCopiedText}
                >
                  <img src={CopyIco} alt="copy" />
                </CopyToClipboard>
                {isBscCopied && <CopiedText>Copied</CopiedText>}
              </CopyButton>
            </AddressBox>
            {/* <ChartButton href="https://dexscreener.com/bsc/0xb65697ec1a73ec1bf82677e62cb86d9369ba6c34" target="_blank">Price Chart</ChartButton> */}
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
          {/* <ProgressBar completed={70} /> */}
          <StateCardContainer>            
            <StateCard>
              <CardHeader>Pulsedoge - BSC</CardHeader>
              <StateTextWrapper>
                <Statetext>Supply (shrinking)<br /> {supply} Million / 1Bn</Statetext>
              </StateTextWrapper>
              <StateCardTitle href="https://dexscreener.com/bsc/0xb65697ec1a73ec1bf82677e62cb86d9369ba6c34" target="_blank">Chart</StateCardTitle>
            </StateCard>
            <StateCard>
              <CardHeader>Pulsedoge - ETH</CardHeader>
              <StateTextWrapper>
                <Statetext>Coming soon</Statetext>
              </StateTextWrapper>
              <StateCardTitleDisabled>Chart</StateCardTitleDisabled>
            </StateCard>
            <StateCard>
              <CardHeader>Pulsedoge - PLS</CardHeader>
              <StateTextWrapper>
                <Statetext>Coming soon</Statetext>
              </StateTextWrapper>
              <StateCardTitleDisabled>Chart</StateCardTitleDisabled>
            </StateCard>
          </StateCardContainer>
        </StateBox>               
      </AppWrapper>

      <StakingBox>
        <StakingCard>
          <CardLink href="#/staking">
            <StakingImageContainer>
              <img src={StakingImage1} alt="Staking" />
              {/* <img src="https://drive.google.com/uc?export=view&id=1-eZTqzi7qWIwb11WZxd8xPettZsD2r9X" alt="driveimage" /> */}
            </StakingImageContainer>
          </CardLink>
          <StakingTitle>What is Echo Staking?</StakingTitle>
          <StakingText>
            Stake your Pulsedoge and earn up to 36,9% yield - 
            the rewards come from existing supply so it is never inflationary!
          </StakingText>          
          <StakingLearnMoreButton href="https://pulsedoge.medium.com/what-is-echo-staking-c8763e1a5ade" target="_blank">Read more</StakingLearnMoreButton>
        </StakingCard>
        <StakingCard>
          <CardLink href="#/nft">
            <StakingImageContainer>
              <img src={StakingImage2} alt="Staking" />
            </StakingImageContainer>
          </CardLink>
          <StakingTitle>Pulsedoge NFT - Winners only can mint</StakingTitle>
          <StakingText>
            Get one of the 1,476 unique Pulsedoge character NFTs by burning Pulsedoge tokens!
            That&apos;s right, we found a way to ACTUALLY create a pumpamental for jpegs
          </StakingText>          
          <StakingLearnMoreButton href="https://pulsedoge.medium.com/pulsedoge-bernementals-nfts-5b245522fdcd" target="_blank">Read more</StakingLearnMoreButton>
        </StakingCard>
      </StakingBox>
      <Footer />
    </ErrorBoundary>
  );
}
