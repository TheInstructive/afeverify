
import { configureChains, createClient } from '@wagmi/core';
import { EthereumClient, modalConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { publicProvider } from '@wagmi/core/providers/public';

import { cronosMainnet } from "./Chains";
import { RockXProvider, VVSProvider } from "./RPC";


const chains = [cronosMainnet];
const projectId = "049d0d460cbc1537aca58aee3d40ed73";


// Wagmi client
const { provider } = configureChains(chains, [
  publicProvider(),
  RockXProvider(),
  VVSProvider(),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const web3Modal = new Web3Modal(
  {
    projectId
  },
  ethereumClient
)
