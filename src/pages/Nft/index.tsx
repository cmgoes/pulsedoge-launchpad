import React from 'react'
import styled from "styled-components/macro";

import Background from "../../assets/images/bodybackground2.jpg";
import Logo from "../../assets/images/pulselogo.png";

import DiscordIcon from "assets/images/discord.png";
import InstagramIcon from "assets/images/instagram.png";
import MediumIcon from "assets/images/medium.png";
import TwitterIcon from "assets/images/twitter.png";
import TelegramIcon from "assets/images/telegram.png";
import YoutubeIcon from "assets/images/youtube.png";

export default function Nft () {
  const AppWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    overflow-x: hidden;
    background: url(${Background});     
    background-size: cover;
    background-position: center right;  
    /* background-color: #0e131b; */  
  `;

  const ContentWrapper = styled.div`
    /* background-color: #0e131b; */
    background-color:rgba(14, 19, 27, 0.9);
    width: 100%;
    min-height: calc(100vh - 53px);
    padding-left: 1rem;
    padding-right: 1rem;
    @media (min-width: 500px) { 
      min-height: calc(100vh - 69px);     
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (min-width: 768px) {
      width: 50%;
      padding-left: 3rem;
      padding-right: 3rem;
    }

    @media (min-width: 900px) {      
      padding-left: 4rem;
      padding-right: 4rem;
    }
    @media (min-width: 1200px) {      
      padding-left: 5rem;
      padding-right: 5rem;
    }
    @media (min-width: 1400px) {      
      padding-left: 6rem;
      padding-right: 6rem;
    }
  `;  

  const LogoBox = styled.div`
    padding-top: 1rem;
    @media (min-width: 1400px) {
      padding: 2rem 0;
    }
  `;

  const Title = styled.div`
    font-size: 32px; 
    color: white;    
    font-family: SF-Pro-Display-Heavy;
    font-style: normal;
    font-weight: 900;
    padding: 1rem 0;
    @media (min-width: 768px) {      
      padding: 1.5rem 0;
    }
    @media (min-width: 1024px) {
      font-size: 36px;
    }
    @media (min-width: 1400px) {
      font-size: 48px;
    }
  `;

  const ContentText = styled.div`
    font-size: 16px;
    margin-top: 1rem;
    color: #FFFFFF;
    line-height: 160%;
    opacity: 0.8;    
    font-style: normal;
    font-family: SF-Pro-Display-Thin;
    letter-spacing: 0.06rem;    
    font-weight: 400;
    @media (min-width: 1200px) {      
      font-size: 18px;
    }
    @media (min-width: 1600px) {      
      line-height: 180%;
    }
  `;

  const ContactBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    @media (min-width: 500px) {      
      flex-direction: row;
    }
    @media (min-width: 768px) {      
      flex-direction: column;
    }
    @media (min-width: 1024px) {      
      flex-direction: row;
    }
    @media (min-width: 1200px) {      
      padding-top: 3rem;
    }
  `;

  const ContactText = styled.div`
    font-size: 20px;
    margin-bottom: 1.5rem;
    color: white;
    font-family: SF-Pro-Display-Medium;
    font-style: normal;
    font-weight: 800;
    @media (min-width: 500px) {      
      margin-bottom: 0;
    }
    @media (min-width: 768px) {      
      margin-bottom: 1.5rem;
    }
    @media (min-width: 1024px) {      
      margin-bottom: 0;
    }
  `;

  const JoinButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4A95D6;
    color: white;
    font-size: 16px;
    font-family: SF-Pro-Display-Thin;    
    font-weight: 400;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;    
    cursor: pointer;
  `;

  const SocialIcon = styled.img`
    width: auto;
    height: 16px;
    margin-right: 0.5rem;
    opacity: 0.5;

    @media (min-width: 768px) {
      height: 18px;
    }
  `;

  const SocialIconContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    gap: 1rem;

    @media (min-width: 576px) {
      gap: 2rem;
    }

    @media (min-width: 768px) {
      gap: 1.5rem;
    }
    @media (min-width: 1024px) {
      gap: 3rem;
    }
    @media (min-width: 1200px) {
      padding-top: 3rem;
      gap: 4rem;
    }

  `;

  const HomeButton = styled.a`    
    border-radius: 8px;
    display: inline-block;
    margin-bottom: 2rem;
    padding: 0.6rem 1.5rem;
    font-size: 14px;
    font-family: SF-Pro-Display-Thin;    
    font-weight: 400;
    border: 1px solid #FF7F37;
    text-decoration: none;
    color: #FF7F37;
    @media (min-width: 1024px) {
      margin-top: 1rem;
    }
  `;

  return (
    <AppWrapper>
      <ContentWrapper>
        <LogoBox>
          <img width={"120px"} src={Logo} alt="pulsedoge logo" />          
        </LogoBox>
        <Title>Coming Soon</Title>
        <ContentText>
          There are 1,476 unique Pulsedoge NFTs to be minted over the course of 369 days
          <br />
          The  NFTs cannot be bought, you have to win them!
          <br />
          <br />
          To participate in the NFT minting you’ll need xPulsedoge, which functions as a lottery ticket. 
          In each 24-hour period, there will be 4 NFTs minted and claimable by lucky participants that day. 
          It’s a game of chance!
          <br />
          The more xPulsedoge (% share) you have contributed, the bigger the chance you will win NFTs minted that day. 
          The daily pool is open publicly for anyone who owns xPulsedoge tokens to participate in. 
          <br />
          <br />
          To get xPulsedoge you’ll need to burn Pulsedoge. For every Pulsedoge burned you’ll receive 1 xPulsedoge. 
          You can also get xPulsedoge from echo-staking.
        </ContentText>        
        <ContactBox>
          <ContactText>Stay Updated</ContactText>
          <JoinButton>
            <SocialIcon src={TelegramIcon} alt="Icon" />
            Join Telegram
          </JoinButton>
        </ContactBox>
        <SocialIconContent>          
          <a
            href="https://telegram.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={TelegramIcon} alt="telegram" />
          </a>        
          <a
            href="https://twitter.com/?lang=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={TwitterIcon} alt="twitter" />
          </a>        
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={DiscordIcon} alt="discord" />
          </a>        
          <a
            href="https://www.instagram.com/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={InstagramIcon} alt="instagram" />
          </a>        
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={YoutubeIcon} alt="youtube" />
          </a>        
          <a
            href="https://medium.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon src={MediumIcon} alt="medium" />
          </a>          
        </SocialIconContent>
        <HomeButton href="/">Go to home page</HomeButton>
      </ContentWrapper>

    </AppWrapper>
  
  );
}

