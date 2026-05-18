import Header from '@/components/header';
import { ReactNode } from 'react';

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default StoreLayout