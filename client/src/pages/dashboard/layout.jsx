import Sidebar from '@/components/sidebar/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function DasshboardLayout() {
  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="bg-grey-50 grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DasshboardLayout;
