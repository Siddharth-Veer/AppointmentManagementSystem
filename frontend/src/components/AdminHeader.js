import React from 'react';
import '../css/AdminHeader.css';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex-1 md:grow-0 ">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
