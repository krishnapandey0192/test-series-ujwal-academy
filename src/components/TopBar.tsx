// import React from "react";
import { Menu, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 h-16 border-b">
      {/* Left: Logo / Title */}
      <div className="flex items-center space-x-4">
        <Menu className="h-5 w-5 text-gray-600 cursor-pointer md:hidden" />
        <h1 className="text-xl font-semibold text-gray-800">
          Test Management System
        </h1>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6">
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
