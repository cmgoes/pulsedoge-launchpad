import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "react-feather";
import styled from "styled-components/macro";
import PulseDogeLogo from "assets/images/Pulsedoge-Logo.webp";
import PulseDogeHeaderLogo from "assets/images/PulsedogeLogoWhite.webp";
import EthLogo from "assets/images/ethsym.webp";
import BSCLogo from "assets/images/bscsym.webp";
import Row, { RowFixed } from "../Row";
import Web3Status from "../Web3Status";
import MobileMenu from "./MobileMenu";
import Modal from 'react-modal';
import FAQAccordion from "../FAQAccordion";
import { FAQData } from "../../utils/faqcontent";
import { Scrollbars } from 'react-custom-scrollbars-2';
// import ToggleTheme from "components/Menu";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import "./navlink.scss"

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
  /* z-index: 2; */

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
    flex-direction: row;
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
  background-color: transparent;
  border-radius: 12px;  
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid #d16b35;
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

const BuyButton = styled.a`
  background-color: transparent;
  text-decoration: none;
  font-size: 12px;
  font-family: "SF-Pro-Display-Semibold";
  text-align: center;
  border-radius: 12px;
  border: 1px solid #d16b35;
  padding: 0.6rem 0.4rem;
  min-width: 110px;
  cursor: pointer;
  color: white;  
  :hover {
    opacity: 0.8;
  };
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `}
`

const PriceBox = styled.div`
  border: 1px solid #d16b35;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `}
`;

const PriceIcon = styled.div`
  display: flex;
  align-items: center;
  :first-child {
    padding-right: 0.1rem;
  }
`;

const PriceText = styled.a`
  font-size: 12px;
  text-decoration: none;
  padding-left: 6px;
  color: white;
  :hover {
    opacity: 0.8;
  }
`;

const activeClassName = "active";

const StyledNavLink = styled(NavLink)`
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


  /* &.${activeClassName} {
    font-weight: 600;
    color: #fff;
    border-bottom: 1px solid white;

    ::before {
      content: "";
    }
  } */
`;
const MobileMenuContent = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

const FAQButton = styled.button`
  position: relative;  
  border: 1px solid #d16b35;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 36px;  
  width: 36px;
  color: #d16b35;
  /* background-color: ${({ theme }) => theme.bg3}; */
  margin-left: 1rem;

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    /* background-color: ${({ theme }) => theme.bg4}; */
  }

  svg {
    margin-top: 2px;
  }
`;

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.6rem;  
  border-bottom: 1px solid rgb(21, 24, 30);
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const ModalHeader = styled.div`
  font-size: 24px;
  font-family: SF-Pro-Text-Medium; 
  text-transform: uppercase;
  font-weight: 500;
  color: white;
`;

const ModalClose = styled.button`
  font-size: 20px;
  padding: 8px 0;
  background-color: transparent;
  border: none;
  cursor: pointer;  
`;

const ModalContentWrapper = styled.div`
  padding: 0.5rem 0;
  height: 90vh;
  margin-right: -1px;
  /* overflow: scroll; */
  @media (min-width: 360px) {
    padding: 0.5rem 0;
  }
  @media (min-width: 768px) {
    padding: 1rem 0;
  }
`;

const ModalContentHeader = styled.div`
  padding: 0.6rem;
  text-align: center;
  font-size: 24px;
  font-family: SF-Pro-Text-Medium;   
  font-weight: 500;
  color: white;
`;

const ModalContent = styled.div`
  padding: 0 0.2rem;
  @media (min-width: 360px) {
    padding: 0 0.8rem;
  }
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
  @media (min-width: 992px) {
    padding: 0 4rem;
  }
`;
const customStyles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    height: '96vh',
    // minWidth: '1020px',
    width: '90%',
    borderRadius: '1.5rem',
    border: '1px solid rgb(21, 24, 30)',
    bottom: 'auto', 
    padding: '0',   
    zIndex: 100,
    overflow: 'hidden',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(32, 37, 45)',    
  },  
};

export default function Header() {
  const {pathname} = useLocation();
  const { authenticate } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [price, setPrice] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const getPrice = async () => {
    await authenticate();        

    const options: any = {
      chain: "bsc",
      address: '0xd4d55b811d9ede2adce61a98d67d7f91bffce495', // pulse
      exchange: "PancakeSwapv2",
    };
    const _price = await Web3Api.token.getTokenPrice(options); 
    setPrice(_price.usdPrice.toFixed(4));
    console.log("Price", typeof _price.usdPrice.toFixed(4));        
  };

  useEffect(() => {
    getPrice();
    // eslint-disable-next-line
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  } 

  return (
    <HeaderFrame>
      <RowFixed>
        <Title href=".">
          <UniIcon>
            {/* <img width={'120px'} src={isDark ? LogoDark : Logo} alt="logo" /> */}
            <img width={"160px"} src={PulseDogeHeaderLogo} alt="logo" />
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink className={`${pathname === '/' ? 'active-navlink' : ''}`} id={`swap-nav-link`} to={"/"}>
            Home
          </StyledNavLink>
          <StyledNavLink className={`${pathname === '/staking' ? 'active-navlink' : ''}`} id={`swap-nav-link`} to={"/staking"}>
            Staking
          </StyledNavLink>
          <StyledNavLink className={`${pathname === '/nft' ? 'active-navlink' : ''}`} id={`swap-nav-link`} to={"/nft"}>
            NFT
          </StyledNavLink>
          <StyledNavLink className={`${pathname === '/memebank' ? 'active-navlink' : ''}`} id={`swap-nav-link`} to={"/"}>
            Meme Bank
          </StyledNavLink>
        </HeaderLinks>
      </RowFixed>
      <HeaderControls>
        <HeaderElement>
          {/* </> */}          
          <PriceBox>
            <PriceIcon>
              <img width={"28px"} src={PulseDogeLogo} alt="profile" />
            </PriceIcon>
            <PriceIcon>
              <img width={"16px"} src={EthLogo} alt="profile" />
            </PriceIcon>
            <PriceText>$0.000</PriceText>
          </PriceBox>
          <PriceBox>
            <PriceIcon>
              <img width={"28px"} src={PulseDogeLogo} alt="profile" />
            </PriceIcon>
            <PriceIcon>
              <img width={"24px"} src={BSCLogo} alt="profile" />
            </PriceIcon>
            <PriceText href="https://dexscreener.com/bsc/0xb65697ec1a73ec1bf82677e62cb86d9369ba6c34" target="_blank">${price}</PriceText>
          </PriceBox>
          <BuyButton href="https://pancakeswap.finance/swap?outputCurrency=0xd4d55b811d9ede2adce61a98d67d7f91bffce495" target="_blank">Buy on BSC</BuyButton>
          <AccountElement active={!true}>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <MobileMenuContent>
          <MobileMenu />
        </MobileMenuContent>
        <HeaderElementWrap>          
          <FAQButton onClick={openModal}>?</FAQButton>
        </HeaderElementWrap>        
      </HeaderControls>
      <Modal
        isOpen={modalIsOpen}        
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"        
      >
        <ModalHeaderWrapper>
          <ModalHeader>
            Pulsedoge guide
          </ModalHeader>
          <ModalClose onClick={closeModal}><X size={24} color="#d16b35" /></ModalClose>
        </ModalHeaderWrapper>        
        <ModalContentWrapper>
          <Scrollbars>
            <ModalContent>
            <ModalContentHeader>
              Frequently Asked Question
            </ModalContentHeader>
            {FAQData.map((data, index) => (
              <FAQAccordion key={index} title={data.title} content={data?.content} firstlist={data?.firstlist} secondlist={data?.secondlist} link={data?.link} linktext={data?.linktext}/>
            ))}
            </ModalContent>
          </Scrollbars>
        </ModalContentWrapper>              
      </Modal>
    </HeaderFrame>
  );
}
