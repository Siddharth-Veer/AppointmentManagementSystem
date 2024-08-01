import React from 'react';
import '../css/AdminHeader.css';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <button className="menu-button" type="button" aria-haspopup="dialog" aria-expanded="false">
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex-1 md:grow-0">
        <h1 className="text-lg font-semibold">Doctors</h1>
      </div>
      <button className="avatar-button" type="button" aria-haspopup="menu" aria-expanded="false">
        <img src="/placeholder.svg" alt="Avatar" className="avatar" />
      </button>
    </header>
  );
};

export default Header;
