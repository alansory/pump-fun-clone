import React from 'react';
import WalletIcon from "../../assets/img/wallet.svg";
import SolIcon from "../../assets/img/sol-logo.svg";
import { toast } from 'react-toastify';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string | null;
  balance: number;
  onLogout: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  onClose,
  walletAddress,
  balance,
  onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-100 bg-black border-l border-gray-800 shadow-lg z-50 profile-sidebar overflow-y-auto">
      <div className="p-4">
        <h2 className="flex items-center text-lg text-white mb-4">
          <img src={WalletIcon} alt="Profile" className="w-5 h-5 mr-2 filter brightness-0 invert opacity-50" />
          Profile
          <button 
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </h2>

        {/* Address */}
        <div className="bg-[#1e2025] hover:bg-neutral-800 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-400 mb-1">Address</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white font-mono break-all">{walletAddress}</span> {/* Display full address */}
            <button 
              className="text-gray-400 hover:text-gray-300"
              onClick={(event) => {
                event.stopPropagation();
                navigator.clipboard.writeText(walletAddress || '').then(() => {
                  toast.success('Address copied to clipboard!');
                }).catch(err => {
                  toast.error('Failed to copy address.');
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center justify-center p-3 bg-[#1e2025] rounded-lg hover:bg-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-1">
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            <span className="text-xs text-gray-400">Deposit</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-[#1e2025] rounded-lg hover:bg-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <span className="text-xs text-gray-400">Withdraw</span>
          </button>
          <button onClick={onLogout} className="flex flex-col items-center justify-center p-3 bg-[#1e2025] rounded-lg hover:bg-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-1">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            <span className="text-xs text-gray-400">Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 border-b border-gray-800">
          <button className="px-4 py-2 text-sm text-white border-b-2 border-white">Balances</button>
          <button className="px-4 py-2 text-sm text-gray-400">Trades</button>
        </div>

        {/* Balance */}
        <div className="mt-4">
          <div className="text-sm text-gray-400 mb-2">Net Worth →</div>
          <div className="text-2xl text-white font-bold mb-4">${balance}</div>
          
          {/* Hide Options */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox bg-[#1e2025] border-gray-800" />
              <span>Hide Frozen</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox bg-[#1e2025] border-gray-800" />
              <span>Hide Small</span>
            </label>
          </div>

          {/* Token List */}
          <div className="mt-4">
            <div className="flex items-center justify-between p-2 hover:bg-[#1e2025] rounded-lg">
              <div className="flex items-center space-x-2">
                <img src={SolIcon} alt="SOL" className="w-6 h-6" />
                <span className="text-white">SOL</span>
              </div>
              <span className="text-white">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;