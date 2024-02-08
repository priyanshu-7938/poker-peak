import ReactDOM from 'react-dom/client'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains"
import App from './App.jsx'
import './index.css'
import ContextProvierAllOver from './context/index.jsx';
import { RecoilRoot } from 'recoil'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvierAllOver>
    <ThirdwebProvider
      activeChain={LightlinkPegasusTestnet}
      clientId="5569ec4bd273c9e940fe4ff0cc4dd685"
    >
      {/* <Web3ContextProvider> */}
        <RecoilRoot>
          <App />
        </RecoilRoot>
      {/* </Web3ContextProvider> */}
    </ThirdwebProvider>
  </ContextProvierAllOver>
)
