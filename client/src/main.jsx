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
      clientId="e05dd9d3c5ecd6d1ce042d4b6bfc53ff"
    >
      {/* <Web3ContextProvider> */}
        <RecoilRoot>
          <App />
        </RecoilRoot>
      {/* </Web3ContextProvider> */}
    </ThirdwebProvider>
  </ContextProvierAllOver>
)
