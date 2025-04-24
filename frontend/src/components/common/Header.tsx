import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import WalletIcon from "../../assets/img/wallet.svg";
import SolIcon from "../../assets/img/sol-logo.svg";
// import Logo from "../../assets/img/jupiter-logo.png";
import ProfileSidebar from "./ProfileSidebar";
import MobileMenu from "../Mobile/MobileMenu/MobileMenu";
import LoginModal from "../Modals/Login/LoginModal";
import { IoEarth } from "react-icons/io5";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

interface LoginResponse {
  code: number;
  data: {
    token: string;
    user: {
      id: number;
      active: boolean;
      created_at: number;
      updated_at: number;
    }
  }
}

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add this state

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname){
      case '/trade':
        setSelectedMenu("trade");
        break;
      case '/create':
        setSelectedMenu("create");
        break;
      case '/swap':
        setSelectedMenu("swap");
        break;
      case '/portfolio':
        setSelectedMenu("portfolio");
        break;
      default:
        setSelectedMenu(null)
    }
  }, [location.pathname])

  useEffect(() => {
    const savedWalletData = localStorage.getItem('pumpAuthData');

    if(savedWalletData) {
      const walletData = JSON.parse(savedWalletData);
      setWalletAddress(walletData.address);
      setBalance(walletData.balance || 0);
    }

  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileOpen && !(event.target as Element).closest('.profile-sidebar')) {
        setIsProfileOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const connectWallet = async (selectedChain: "ethereum" | "solana") => {
    if (selectedChain === "solana" && window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        const message = `Sign this message to log in: ${new Date().toISOString()}`;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");
        const signature = btoa(String.fromCharCode(...signedMessage.signature));
        const solConnection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await solConnection.getBalance(new PublicKey(address));
        
        setWalletAddress(address);
        setBalance(balance/LAMPORTS_PER_SOL);
  
        await fetch("/api/auth/web3-login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            signature,
            message,
            chain: "solana",
          }),
        })
          .then(async(response) => {
            if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
            }
            const loginData: LoginResponse = await response.json();
            const walletData = {
              address,
              balance,
              chain:selectedChain,
              token: loginData.data.token,
              user: loginData.data.user
            };

            localStorage.setItem('pumpAuthData', JSON.stringify(walletData));
            return loginData
          })
          .catch((error) => {
            console.error("CORS or server error:", error);
            alert("Failed to connect to the server. Please check your network or server configuration.");
          });
      } catch (error) {
        console.error("Failed to connect Solana wallet:", error);
      }
    } else if (selectedChain === "ethereum" && window.ethereum) {
      console.log("Attempting to connect wallet", { 
        selectedChain, 
        windowEthereum: window.ethereum, 
        isEthereum: !!window.ethereum 
      });
      
      try {
        if (!window.ethereum.isMetaMask) {
          throw new Error("Detected wallet is not MetaMask!");
        }
        console.log("MetaMask detected", window.ethereum.isMetaMask);
        
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask detected 2", window.ethereum.isMetaMask);
        console.log("Accounts:", accounts);
        
        const address = accounts[0];
        const message = `Sign this message to log in: ${new Date().toISOString()}`;
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, address],
        });
  
        setWalletAddress(address);
        console.log("Wallet connected:", address);
  
        await fetch("/api/auth/web3-login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            signature,
            message,
            chain: "ethereum",
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
            }
            return response.json();
          })
          .then((data) => console.log("Server response:", data))
          .catch((error) => {
            console.error("CORS or server error:", error);
            alert("Failed to connect to the server. Please check your network or server configuration.");
          });
      } catch (error) {
        console.error("Failed to connect Ethereum wallet:", error.message || error);
      }
    } else {
      alert(`No ${selectedChain} wallet found. Please install a compatible wallet (e.g., MetaMask for Ethereum, Phantom for Solana).`);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Placeholder functions for social logins
  const loginWithGoogle = () => {
    alert("Google login not implemented yet.");
    closeModal();
  };

  const loginWithTwitter = () => {
    alert("Twitter login not implemented yet.");
    closeModal();
  };

  const loginWithDiscord = () => {
    alert("Discord login not implemented yet.");
    closeModal();
  };

  const handleLogout = () => {
    setWalletAddress(null);
    setBalance(0);
    setIsProfileOpen(false);
    localStorage.removeItem('pumpAuthData');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-2.5 py-1.5 h-14 bg-black border-b border-gray-800 z-50">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <HiMenu size={24} />
          </button>
          {/* <img alt="Logo" loading="lazy" decoding="async" data-nimg="1" src={Logo} className="ml-2 sm:ml-0 h-[22px] w-[22px] sm:w-[28px] sm:h-[28px]" /> */}
          <IoEarth size={25} className="text-orange-500 sm:w-[30px] sm:h-[30px] ml-2 sm:ml-0" />
          <Link 
            to="/"
            onClick={() => setSelectedMenu("home")}
            className="text-md ml-2 font-bold text-white"
          >
            Bumiswap
          </Link>
          {/* Desktop Menu */}
          <div className="ml-6 hidden md:block">
            <Link
              to="/trade"
              onClick={() => setSelectedMenu("trade")}
              className={`px-2 py-2 ${selectedMenu === "trade" ? "text-orange-500" : "text-white"} text-sm font-bold rounded-lg transition`}
            >
              Trade
            </Link>
            <Link
              to="/create"
              onClick={() => setSelectedMenu("create")}
              className={`px-2 py-2 ${selectedMenu === "create" ? "text-orange-500" : "text-white"} text-sm font-bold rounded-lg transition`}
            >
              Create
            </Link>
            <Link
              to="/swap"
              onClick={() => setSelectedMenu("swap")}
              className={`px-2 py-2 ${selectedMenu === "swap" ? "text-orange-500" : "text-white"} text-sm font-bold rounded-lg transition`}
            >
              Swap
            </Link>
            <Link
              to="/portfolio"
              onClick={() => setSelectedMenu("portfolio")}
              className={`px-2 py-2 ${selectedMenu === "portfolio" ? "text-orange-500" : "text-white"} text-sm font-bold rounded-lg transition`}
            >
              Portfolio
            </Link>
          </div>
          
        </div>
        <nav className="space-x-4">
          {walletAddress ? (
            <div className="relative">
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 bg-[#1e2025] px-3 py-1.5 rounded-lg border border-orange-500 hover:bg-gray-700/50">
                {/* Wallet Icon */}
                <img src={WalletIcon} alt="Wallet"  className="w-5 h-5" />
                
                <span className="text-sm text-white">{balance}</span>
                
                {/* Solana Icon */}
                <img src={SolIcon} alt="Wallet" className="w-4 h-4" />

                
                <button 
                  className="text-white hover:text-orange-500"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <ProfileSidebar
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                walletAddress={walletAddress}
                balance={balance}
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-4 py-1.5 bg-orange-500 text-sm text-white font-bold rounded-lg hover:bg-orange-600 transition"
            >
              Connect
            </button>
          )}
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onConnectWallet={connectWallet}
        onLoginWithGoogle={loginWithGoogle}
        onLoginWithTwitter={loginWithTwitter}
        onLoginWithDiscord={loginWithDiscord}
      />
    </div>
  );
};

export default Header;