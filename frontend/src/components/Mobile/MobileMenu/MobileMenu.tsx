import React from 'react';
import { Link } from 'react-router-dom';
import { IoEarth } from "react-icons/io5";

interface MobileMenuProps {
  isOpen: boolean;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  selectedMenu,
  setSelectedMenu,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 left-0 w-90 bg-black border-r border-gray-800 transform transition-transform duration-300 ease-in-out z-50">
      <div className="flex flex-col h-screen">
        {/* Header Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IoEarth size={25} className="text-orange-500" />
              <span className="ml-2 text-lg font-bold text-white">Bumiswap</span>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            <Link
              to="/trade"
              onClick={() => {
                setSelectedMenu("trade");
                onClose();
              }}
              className={`flex items-center px-4 py-3 ${selectedMenu === "trade" ? "text-white border border-orange-500" : "text-gray-300 hover:bg-gray-800"} transition-all duration-200`}
            >
              <span className="text-sm font-semibold">Trade</span>
            </Link>
            <Link
              to="/create"
              onClick={() => {
                setSelectedMenu("create");
                onClose();
              }}
              className={`flex items-center px-4 py-3 ${selectedMenu === "create" ? "text-white border border-orange-500" : "text-gray-300 hover:bg-gray-800"} transition-all duration-200`}
            >
              <span className="text-sm font-semibold">Create</span>
            </Link>
            <Link
              to="/swap"
              onClick={() => {
                setSelectedMenu("swap");
                onClose();
              }}
              className={`flex items-center px-4 py-3 ${selectedMenu === "swap" ? "text-white border border-orange-500" : "text-gray-300 hover:bg-gray-800"} transition-all duration-200`}
            >
              <span className="text-sm font-semibold">Swap</span>
            </Link>
            <Link
              to="/portfolio"
              onClick={() => {
                setSelectedMenu("portfolio");
                onClose();
              }}
              className={`flex items-center px-4 py-3 ${selectedMenu === "portfolio" ? "text-white border border-orange-500" : "text-gray-300 hover:bg-gray-800"} transition-all duration-200`}
            >
              <span className="text-sm font-semibold">Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;