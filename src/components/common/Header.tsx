import React from 'react';
import { ConnectKitButton } from 'connectkit';

const Header: React.FC = () => {
	return (
		<header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
			<div className="text-2xl font-bold">Deposit DApp</div>
			<div className="py-2 px-4">
				<ConnectKitButton />
			</div>
		</header>
	);
};

export default Header;
