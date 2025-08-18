import React from "react";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">{children}</main>
    </>
  );
};

export default Layout;
