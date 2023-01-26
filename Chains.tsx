import { Chain } from '@wagmi/core'

export const cronosMainnet: Chain = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO',
  },
  rpcUrls: {
    default: { http: ['https://evm.cronos.org'] },
  },
  blockExplorers: {
    cronoscan: { name: 'CronoScan', url: 'https://cronoscan.com' },
    default: { name: 'CronoScan', url: 'https://cronoscan.com' },
  },
}

export default cronosMainnet;
