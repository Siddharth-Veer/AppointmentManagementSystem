import React from 'react';
import { 
  HomeIcon, 
  UserIcon, 
  PlusIcon, 
  CogIcon 
} from '@heroicons/react/24/outline'; // Import icons from Heroicons
import '../css/AdminSidebar.css';

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a className="group flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground" href="#">
          <HomeIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Home</span>
        </a>
        <a className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground" href="#">
          <UserIcon className="h-5 w-5" />
          <span className="sr-only">Doctors</span>
        </a>
        <a className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground" href="#">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Add Doctor</span>
        </a>
        <a className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground" href="#">
          <CogIcon className="h-5 w-5" />
          <span className="sr-only">Manage Doctors</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
