import { useRoutes } from 'react-router-dom';
import routes from '@/routes';
import { Web3Provider } from '@/components/Web3Provider';

const App = () => {
	const routing = useRoutes(routes);
	return <Web3Provider>{routing}</Web3Provider>;
};
export default App;
