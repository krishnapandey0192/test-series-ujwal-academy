import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import { Outlet } from "react-router-dom";

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Nested Route Content */}
            {/* {children} */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
