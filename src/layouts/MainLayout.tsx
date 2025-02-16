import Header from '@/components/common/Heaer';
import { Web3Provider } from '@/pages/Web3Provider';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Web3Provider>
      <Header />
      <main className="mx-auto px-4">
        <Outlet />
      </main>
    </Web3Provider>
  );
};
// MainLayout.whyDidYouRender = true;
export default memo(MainLayout);
