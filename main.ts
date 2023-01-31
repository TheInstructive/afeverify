
import { configureChains, createClient, watchAccount, signMessage } from '@wagmi/core';
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

// web3modal
const web3Modal = new Web3Modal(
  {
    projectId
  },
  ethereumClient
);


// query hash
const params = new URLSearchParams(location.search);
const hash = params.get('hash');

if (hash) {
  const steps = document.getElementsByClassName('step');
  const result = document.querySelector<HTMLTextAreaElement>('#result');

  // copy results
  if (result) {
    result.addEventListener('click', function() {
      result.select();
      document.execCommand('copy');
    });
  }

  // hide info
  const verification = document.querySelector('#verification');
  const info = document.querySelector('#info');

  if (verification && info) {
    info.setAttribute('style', "display: none;");
    verification.setAttribute('style', "display: block;");
  }

  let accountAddress = "";

  // sign button
  const button = document.querySelector<HTMLButtonElement>('#sign');

  if (button) {
    button.addEventListener('click', function() {
      steps[1].children[0].classList.remove('done');

      signMessage({
        "message": hash,
      }).then(signed => {
        if (result) {
          result.textContent = "/verify hash:" + accountAddress + "-" + signed;
          steps[1].children[0].classList.add('done');
        }
      });
    });
  }

  watchAccount((account) => {
    if (button) {
      button.disabled = !account.isConnected;
    }

    if (steps) {
      if (account.isConnected) {
        accountAddress = account.address as string;
        steps[0].children[0].classList.add('done');
      } else {
        steps[0].children[0].classList.remove('done');
      }
    }
  });
}

// textarea
const textarea = document.getElementById('result') as HTMLTextAreaElement;
const button = document.getElementById('copyall') as HTMLTextAreaElement;

button.addEventListener('click', () => {
  textarea.select();
  navigator.clipboard.writeText(textarea.value);
});
