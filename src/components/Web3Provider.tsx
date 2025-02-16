import React from 'react';
import { WagmiProvider, createConfig, http, Chain } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ethers } from 'ethers';

const localChain: Chain = {
	id: 1337, // 自定义链的ID
	name: 'Location', // 链的名称
	network: 'location', // 网络的名称
	rpcUrls: {
		default: {
			http: ['http://127.0.0.1:8545'], // 自定义RPC URL
		},
	},
};

const sepoliaChain: Chain = {
	id: 11155111, // 自定义链的ID
	name: 'Sepolia', // 链的名称
	network: 'sepolia', // 网络的名称
	rpcUrls: {
		default: {
			http: ['https://sepolia.infura.io/v3/b593dfca524048cfa8fd1a5df65d132d'], // 自定义RPC URL
		},
	},
};

const config = createConfig(
	getDefaultConfig({
		// Your dApps chains
		chains: [localChain, sepoliaChain],
		transports: {
			// RPC URL for each chain
			[localChain.id]: http(`http://127.0.0.1:8545`),
			[sepoliaChain.id]: http(`https://sepolia.infura.io/v3/b593dfca524048cfa8fd1a5df65d132d`),
		},

		// Required API Keys
		walletConnectProjectId: '21616ac53acf8008da5334bab4140d68',

		// Required App Info
		appName: 'Test App',

		// Optional App Info
		appDescription: 'Your App Description',
		appUrl: 'https://family.co', // your app's url
		appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
	}),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
