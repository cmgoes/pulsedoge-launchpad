import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "../components/Header";
import Home from "./Home";
import Staking from "./Staking";
import Nft from "./Nft";

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  background-color: #0e131b;
  justify-content: space-between;
`;

function App() {  

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper> 
      <Switch>             
        <Route exact path="/" component={Home} />
        <Route exact path="/staking" component={Staking} />
        <Route exact path="/nft" component={Nft} /> 
      </Switch>
    </>
  );
}

export default App;
